// app/page.js
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // لاحظ الاختلاف هنا: استخدام next/navigation
import Head from 'next/head';

export default function Home() {
  const [roomId, setRoomId] = useState('');
  const router = useRouter();
  
  const createRoom = () => {
    // إنشاء معرف عشوائي للغرفة
    const newRoomId = Math.random().toString(36).substring(2, 7);
    router.push(`/room/${newRoomId}`);
  };
  
  const joinRoom = () => {
    if (roomId.trim()) {
      router.push(`/${roomId}`);
    }
  };
  
  return (
    <div className="container">
      <main>
        <h1 className="title">تطبيق مكالمات الفيديو</h1>
        <p className="description">قم بإنشاء غرفة جديدة أو انضم إلى غرفة موجودة</p>
        
        <div className="actions">
          <button className="create-button" onClick={createRoom}>إنشاء غرفة جديدة</button>
          
          <div className="join-form">
            <input
              type="text"
              placeholder="أدخل معرف الغرفة"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
            />
            <button onClick={joinRoom}>انضمام للغرفة</button>
          </div>
        </div>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: #f5f5f5;
        }
        
        main {
          padding: 2rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: white;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 500px;
        }
        
        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 2.5rem;
          text-align: center;
          color: #0070f3;
        }
        
        .description {
          text-align: center;
          line-height: 1.5;
          font-size: 1.2rem;
          color: #666;
          margin: 1rem 0 2rem;
        }
        
        .actions {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        button {
          padding: 12px 20px;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 500;
          transition: background-color 0.3s;
        }
        
        button:hover {
          background-color: #0060df;
        }
        
        .create-button {
          width: 100%;
        }
        
        .join-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
          width: 100%;
        }
        
        input {
          padding: 12px;
          border: 1px solid #ccc;
          border-radius: 5px;
          width: 100%;
          font-size: 1rem;
        }
      `}</style>
    </div>
  );
}