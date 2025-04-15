"use client";
import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import toast, { Toaster } from "react-hot-toast";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

export default function GlobalStreamListener({ user }) {
  const [client, setClient] = useState(null);

  useEffect(() => {
    if (!user) return;

    const initStream = async () => {
      const res = await fetch(`/api/chat/token?userId=${user._id}`);
      const data = await res.json();

      const chatClient = StreamChat.getInstance(data.apiKey);

      await chatClient.connectUser(
        {
          id: user._id,
          name: user.name,
          image: user.profilePicture || undefined,
        },
        data.token
      );

      chatClient.on("message.new", (event) => {
        if (event.user.id !== user._id) {
          toast.success(`📨 رسالة جديدة من ${event.user.name}`, {
            duration: 4000,
            style: {
              background: "#415A80",
              color: "#fff",
            },
          });
        }
      });

      setClient(chatClient);
    };

    initStream();

    return () => {
      if (client) client.disconnectUser();
    };
  }, [user]);

  return <Toaster position="top-right" />;
}
