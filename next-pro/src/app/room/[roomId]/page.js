// app/room/[roomId]/page.js
"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation"; // إضافة استيراد useRouter
import io from "socket.io-client";
import Head from "next/head";

export default function Room() {
  const params = useParams();
  const router = useRouter(); // تعريف router للاستخدام في دالة endCall
  const roomId = params.roomId;
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const localStreamRef = useRef(null);

  const [isConnected, setIsConnected] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [error, setError] = useState(null);
  const [socket, setSocket] = useState(null);
  const [isInitiator, setIsInitiator] = useState(false); // للتمييز بين المتصل والمستقبل

  // التأكد من أن الكود يعمل فقط على المتصفح وليس على الخادم
  const isClient = typeof window !== "undefined";

  // إنشاء نسخة من RTCPeerConnection إذا كنت في المتصفح
  const createPeerConnection = () => {
    if (!isClient) return null;

    const configuration = {
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" },
      ],
    };

    const pc = new RTCPeerConnection(configuration);

    pc.onicecandidate = (event) => {
      if (event.candidate && socket) {
        socket.emit("ice-candidate", {
          candidate: event.candidate,
          room: roomId // إضافة معرّف الغرفة للتأكد من إرسال الإشارة للغرفة الصحيحة
        });
      }
    };

    pc.ontrack = (event) => {
      console.log("Got remote track");
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
        setIsConnected(true);
      }
    };

    // الكشف عن حالة الاتصال
    pc.oniceconnectionstatechange = () => {
      console.log("ICE Connection State:", pc.iceConnectionState);
      if (
        pc.iceConnectionState === "disconnected" ||
        pc.iceConnectionState === "failed" ||
        pc.iceConnectionState === "closed"
      ) {
        setIsConnected(false);
      } else if (pc.iceConnectionState === "connected") {
        setIsConnected(true);
      }
    };

    return pc;
  };

  // تعديل طريقة الاتصال بالسوكيت
  useEffect(() => {
    if (!roomId || !isClient) return;

    let socketInstance = null;

    // الاتصال بخادم Socket.io
    const socketInitializer = async () => {
      try {
        await fetch("/api/socket");
        const socketIo = io();
        socketInstance = socketIo;
        setSocket(socketIo);

        socketIo.on("connect", () => {
          console.log("Connected to socket server with ID:", socketIo.id);
          socketIo.emit("join-room", roomId);
        });

        // تحديد ما إذا كان هذا المستخدم هو المبادر بالاتصال
        socketIo.on("room-user-count", (count) => {
          console.log(`Users in room: ${count}`);
          // إذا كان أول مستخدم في الغرفة فهو المبادر
          setIsInitiator(count === 1);
        });
      } catch (err) {
        console.error("Socket initialization error:", err);
        setError(
          "فشل الاتصال بخادم الإشارة. يرجى تحديث الصفحة والمحاولة مرة أخرى."
        );
      }
    };

    // الحصول على تدفق الفيديو المحلي
    const getLocalStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        localStreamRef.current = stream;

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        return stream;
      } catch (error) {
        console.error("Error accessing media devices:", error);
        let errorMessage = "حدث خطأ أثناء الوصول إلى الكاميرا أو الميكروفون.";

        if (
          error.name === "NotFoundError" ||
          error.name === "DevicesNotFoundError"
        ) {
          errorMessage =
            "لم يتم العثور على كاميرا أو ميكروفون. يرجى التأكد من توصيل الأجهزة.";
        } else if (
          error.name === "NotAllowedError" ||
          error.name === "PermissionDeniedError"
        ) {
          errorMessage =
            "تم رفض الإذن للوصول إلى الكاميرا أو الميكروفون. يرجى السماح بالوصول والمحاولة مرة أخرى.";
        } else if (
          error.name === "NotReadableError" ||
          error.name === "TrackStartError"
        ) {
          errorMessage =
            "لا يمكن الوصول إلى الكاميرا أو الميكروفون لأنها قيد الاستخدام من قبل تطبيق آخر.";
        }

        setError(errorMessage);
        return null;
      }
    };

    const initialize = async () => {
      await socketInitializer();
      const stream = await getLocalStream();

      if (!stream) return;

      // إنشاء اتصال WebRTC
      const pc = createPeerConnection();
      if (!pc) return;

      peerConnectionRef.current = pc;

      // إضافة التدفق المحلي إلى الاتصال
      stream.getTracks().forEach((track) => {
        pc.addTrack(track, stream);
      });
    };

    initialize();

    // تنظيف عند إلغاء التحميل
    return () => {
      if (socketInstance) {
        console.log("Disconnecting socket");
        socketInstance.disconnect();
      }

      if (peerConnectionRef.current) {
        console.log("Closing peer connection");
        peerConnectionRef.current.close();
      }

      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, [roomId, isClient]);

  // معالجة الاتصال والإشارات
  useEffect(() => {
    if (!socket || !peerConnectionRef.current) return;

    const handleUserConnected = async (userId) => {
      console.log(`User connected: ${userId}`);
      
      // فقط المبادر يقوم بإنشاء العرض عند اتصال مستخدم جديد
      if (isInitiator) {
        await createOffer();
      }
    };

    const handleUserDisconnected = (userId) => {
      console.log(`User disconnected: ${userId}`);
      setIsConnected(false);
      
      // إعادة تعيين فيديو العرض البعيد
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = null;
      }
    };

    const handleReceiveOffer = async (payload) => {
      console.log("Received offer");
      if (!peerConnectionRef.current) return;

      try {
        await peerConnectionRef.current.setRemoteDescription(
          new RTCSessionDescription(payload.sdp)
        );

        // إنشاء الإجابة تلقائياً عند استلام العرض
        const answer = await peerConnectionRef.current.createAnswer();
        await peerConnectionRef.current.setLocalDescription(answer);

        socket.emit("answer", {
          sdp: peerConnectionRef.current.localDescription,
          room: roomId // إضافة معرّف الغرفة
        });
      } catch (error) {
        console.error("Error handling offer:", error);
      }
    };

    const handleReceiveAnswer = async (payload) => {
      console.log("Received answer");
      if (!peerConnectionRef.current) return;

      try {
        await peerConnectionRef.current.setRemoteDescription(
          new RTCSessionDescription(payload.sdp)
        );
      } catch (error) {
        console.error("Error handling answer:", error);
      }
    };

    const handleIceCandidate = async (payload) => {
      console.log("Received ICE candidate");
      if (!peerConnectionRef.current) return;

      try {
        await peerConnectionRef.current.addIceCandidate(
          new RTCIceCandidate(payload.candidate)
        );
      } catch (error) {
        console.error("Error adding ice candidate:", error);
      }
    };

    // إضافة كل مستمعي الأحداث
    socket.on("user-connected", handleUserConnected);
    socket.on("user-disconnected", handleUserDisconnected);
    socket.on("offer", handleReceiveOffer);
    socket.on("answer", handleReceiveAnswer);
    socket.on("ice-candidate", handleIceCandidate);

    // يمكن للمستخدم الثاني طلب عرض إذا لم يكن هناك اتصال بعد فترة من الوقت
    if (!isInitiator) {
      const delayedConnectionCheck = setTimeout(() => {
        if (!isConnected) {
          console.log("No connection detected, requesting connection as second user");
          socket.emit("request-connection", { room: roomId });
        }
      }, 3000);

      return () => {
        clearTimeout(delayedConnectionCheck);
        socket.off("user-connected", handleUserConnected);
        socket.off("user-disconnected", handleUserDisconnected);
        socket.off("offer", handleReceiveOffer);
        socket.off("answer", handleReceiveAnswer);
        socket.off("ice-candidate", handleIceCandidate);
      };
    }

    // إزالة مستمعي الأحداث عند التنظيف
    return () => {
      socket.off("user-connected", handleUserConnected);
      socket.off("user-disconnected", handleUserDisconnected);
      socket.off("offer", handleReceiveOffer);
      socket.off("answer", handleReceiveAnswer);
      socket.off("ice-candidate", handleIceCandidate);
    };
  }, [socket, isInitiator, isConnected, roomId]);

  // معالجة طلب الاتصال من المستخدم الثاني
  useEffect(() => {
    if (!socket || !isInitiator) return;

    const handleConnectionRequest = async () => {
      console.log("Received connection request from second user");
      await createOffer();
    };

    socket.on("request-connection", handleConnectionRequest);

    return () => {
      socket.off("request-connection", handleConnectionRequest);
    };
  }, [socket, isInitiator]);

  // إنشاء عرض WebRTC
  const createOffer = async () => {
    if (!peerConnectionRef.current || !socket) return;

    try {
      const offer = await peerConnectionRef.current.createOffer();
      await peerConnectionRef.current.setLocalDescription(offer);

      console.log("Sending offer");
      socket.emit("offer", {
        sdp: peerConnectionRef.current.localDescription,
        room: roomId // إضافة معرّف الغرفة
      });
    } catch (error) {
      console.error("Error creating offer:", error);
    }
  };

  // التبديل بين تشغيل/إيقاف الصوت
  const toggleMute = () => {
    if (!localStreamRef.current) return;

    const audioTracks = localStreamRef.current.getAudioTracks();
    audioTracks.forEach((track) => {
      track.enabled = !track.enabled;
    });

    setIsMuted(!isMuted);
  };

  // التبديل بين تشغيل/إيقاف الفيديو
  const toggleVideo = () => {
    if (!localStreamRef.current) return;

    const videoTracks = localStreamRef.current.getVideoTracks();
    videoTracks.forEach((track) => {
      track.enabled = !track.enabled;
    });

    setIsVideoOff(!isVideoOff);
  };

  // إنهاء المكالمة والعودة إلى الصفحة الرئيسية
  const endCall = () => {
    router.push("/");
  };

  // نسخ رابط الدعوة إلى الحافظة
  const copyInviteLink = () => {
    const inviteUrl = `/room/${roomId}`;
    navigator.clipboard.writeText(inviteUrl);
    alert("تم نسخ رابط الدعوة إلى الحافظة");
  };

  return (
    <div className="container">
      <Head>
        <title>غرفة مكالمة فيديو - {roomId}</title>
        <meta name="description" content={`غرفة مكالمة فيديو ${roomId}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">غرفة فيديو: {roomId}</h1>

        <div className="invite-section">
          <button onClick={copyInviteLink} className="invite-button">
            نسخ رابط الدعوة
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="video-container">
          <div className="video-box local-video">
            <h2>الفيديو المحلي</h2>
            <video ref={localVideoRef} autoPlay muted playsInline />
            {isVideoOff && (
              <div className="video-off-overlay">تم إيقاف الكاميرا</div>
            )}
          </div>

          <div className="video-box remote-video">
            <h2>الفيديو البعيد</h2>
            <video ref={remoteVideoRef} autoPlay playsInline />
            {!isConnected && (
              <div className="waiting-overlay">
                في انتظار اتصال المستخدم الآخر...
              </div>
            )}
          </div>
        </div>

        <div className="controls">
          <button
            onClick={toggleMute}
            className={`control-button ${isMuted ? "active" : ""}`}
          >
            {isMuted ? "تشغيل الميكروفون" : "كتم الصوت"}
          </button>

          <button
            onClick={toggleVideo}
            className={`control-button ${isVideoOff ? "active" : ""}`}
          >
            {isVideoOff ? "تشغيل الكاميرا" : "إيقاف الكاميرا"}
          </button>

          <button onClick={endCall} className="end-call-button">
            إنهاء المكالمة
          </button>
        </div>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          background-color: #f5f5f5;
        }

        main {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .title {
          margin: 0;
          margin-bottom: 1rem;
          line-height: 1.15;
          font-size: 2rem;
          text-align: center;
          color: #0070f3;
        }

        .invite-section {
          margin-bottom: 1rem;
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .invite-button {
          padding: 8px 16px;
          background-color: #28a745;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 0.9rem;
        }

        .error-message {
          padding: 1rem;
          margin-bottom: 1rem;
          background-color: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
          border-radius: 5px;
          text-align: center;
          width: 100%;
          max-width: 800px;
        }

        .video-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
          width: 100%;
          max-width: 1200px;
          margin-bottom: 1rem;
        }

        @media (min-width: 768px) {
          .video-container {
            flex-direction: row;
          }
        }

        .video-box {
          flex: 1;
          position: relative;
          border: 1px solid #ccc;
          padding: 10px;
          border-radius: 10px;
          background-color: white;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .video-box h2 {
          margin-top: 0;
          text-align: center;
          font-size: 1.2rem;
          color: #444;
        }

        .video-box video {
          width: 100%;
          border-radius: 5px;
          background-color: #2c2c2c;
        }

        .waiting-overlay,
        .video-off-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgba(0, 0, 0, 0.7);
          color: white;
          font-size: 1.2rem;
          border-radius: 10px;
          margin-top: 40px; /* لترك مساحة للعنوان */
        }

        .controls {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 1rem;
          flex-wrap: wrap;
        }

        .control-button {
          padding: 10px 20px;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .control-button.active {
          background-color: #6c757d;
        }

        .end-call-button {
          padding: 10px 20px;
          background-color: #dc3545;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}