
import { Server } from "socket.io";

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log('Socket is already running');
    res.end();
    return;
  }
  
  console.log('Setting up socket');
  const io = new Server(res.socket.server);
  res.socket.server.io = io;
  
  // تخزين قائمة المستخدمين في كل غرفة
  const roomUsers = {};
  
  io.on('connection', socket => {
    console.log(`User Connected: ${socket.id}`);
    
    socket.on('join-room', roomId => {
      // إنشاء الغرفة إذا لم تكن موجودة
      if (!roomUsers[roomId]) {
        roomUsers[roomId] = [];
      }
      
      // إضافة المستخدم الجديد إلى الغرفة
      socket.join(roomId);
      roomUsers[roomId].push(socket.id);
      console.log(`User ${socket.id} joined room: ${roomId}`);
      
      // إرسال قائمة المستخدمين الحاليين للمستخدم الجديد
      socket.emit('existing-users', roomUsers[roomId].filter(id => id !== socket.id));
      
      // إعلام باقي المستخدمين عن المستخدم الجديد
      socket.to(roomId).emit('user-connected', socket.id);
      
      socket.on('disconnect', () => {
        console.log(`User ${socket.id} disconnected from room: ${roomId}`);
        
        // إزالة المستخدم من قائمة الغرفة
        if (roomUsers[roomId]) {
          roomUsers[roomId] = roomUsers[roomId].filter(id => id !== socket.id);
          
          // حذف الغرفة إذا أصبحت فارغة
          if (roomUsers[roomId].length === 0) {
            delete roomUsers[roomId];
          }
        }
        
        // إخبار المستخدمين الآخرين بأن هذا المستخدم قد غادر
        socket.to(roomId).emit('user-disconnected', socket.id);
      });
      
      // نقل إشارات WebRTC بين المستخدمين
      socket.on('offer', payload => {
        console.log(`Relaying offer from ${socket.id} to ${payload.targetId} in room: ${roomId}`);
        io.to(payload.targetId).emit('offer', {
          sdp: payload.sdp,
          offererId: socket.id
        });
      });
      
      socket.on('answer', payload => {
        console.log(`Relaying answer from ${socket.id} to ${payload.targetId} in room: ${roomId}`);
        io.to(payload.targetId).emit('answer', {
          sdp: payload.sdp,
          answererId: socket.id
        });
      });
      
      socket.on('ice-candidate', payload => {
        console.log(`Relaying ICE candidate from ${socket.id} to ${payload.targetId} in room: ${roomId}`);
        io.to(payload.targetId).emit('ice-candidate', {
          candidate: payload.candidate,
          senderId: socket.id
        });
      });
    });
  });
  
  res.end();
};

export const config = {
  api: {
    bodyParser: false
  }
};

export default SocketHandler;