"use client";
import React from "react";

export default function VideoCallPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-[#415A80] mb-4">📞 مكالمة فيديو مباشرة</h1>
      <iframe
        src="https://meet.jit.si/smileclinic-room"
        allow="camera; microphone; fullscreen; display-capture"
        className="w-full h-[80vh] rounded-xl border shadow-lg"
        title="Jitsi Video Call"
      ></iframe>
    </div>
  );
}
