'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

export default function ContactMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [sendingReply, setSendingReply] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await axios.get('/api/admin/contact-messages');
      setMessages(res.data);
    } catch (error) {
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const filteredMessages = filter === 'all'
    ? messages
    : messages.filter(msg => (filter === 'replied' ? msg.replied : !msg.replied));

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleSendReply = async () => {
    if (!replyText.trim()) {
      toast.error('Please write a reply before sending');
      return;
    }

    setSendingReply(true);

    try {
      await axios.put(`/api/admin/contact-messages/${selectedMessage._id}`, {
        replied: true,
        replyText: replyText.trim()
      });

      toast.success('Reply sent successfully via email!');
      setReplyText('');
      setSelectedMessage(null);
      fetchMessages();
    } catch (error) {
      toast.error('An error occurred while sending the reply');
    } finally {
      setSendingReply(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      await axios.delete(`/api/admin/contact-messages/${id}`);
      toast.success('Message deleted successfully');
      fetchMessages();
      setSelectedMessage(null);
    } catch (error) {
      toast.error('An error occurred while deleting');
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <Toaster position="top-center" />
      
      <div className="pb-5 border-b border-[#D7E2E9] mb-5">
        <h1 className="text-2xl font-bold text-[#415A80]">Contact Messages</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Message List */}
        <div className="col-span-1 bg-white shadow rounded-lg overflow-hidden">
          <div className="p-4 border-b border-[#D7E2E9] flex justify-between items-center">
            <h2 className="text-lg font-medium text-[#415A80]">Messages</h2>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border-[#D7E2E9] rounded-md text-sm bg-[#E5E7E9] focus:ring-[#A5D4DC] focus:border-[#A5D4DC]"
            >
              <option value="all">All</option>
              <option value="unreplied">Unanswered</option>
              <option value="replied">Answered</option>
            </select>
          </div>

          <div className="divide-y divide-[#D7E2E9]">
            {loading ? (
              <div className="p-4 text-center text-gray-500">Loading...</div>
            ) : filteredMessages.length === 0 ? (
              <div className="p-4 text-center text-gray-500">No messages found.</div>
            ) : (
              filteredMessages.map((message) => (
                <div
                  key={message._id}
                  onClick={() => {
                    setSelectedMessage(message);
                    setReplyText('');
                  }}
                  className={`p-4 cursor-pointer hover:bg-[#E5E7E9] transition-colors ${
                    selectedMessage?._id === message._id ? 'bg-[#D7E2E9]' : ''
                  } ${!message.replied ? 'border-l-4 border-[#415A80]' : ''}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-medium text-[#415A80]">{message.name}</h3>
                      <p className="text-xs text-gray-500">{message.email}</p>
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatDate(message.createdAt)}
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 truncate">{message.message}</p>
                  <div className="mt-2 flex justify-end">
                    {message.replied ? (
                      <span className="text-green-700 text-xs bg-green-100 px-2 py-1 rounded-full">Replied</span>
                    ) : (
                      <span className="text-[#415A80] text-xs bg-[#D7E2E9] px-2 py-1 rounded-full">Awaiting Reply</span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Message Details + Reply */}
        <div className="col-span-2 bg-white shadow rounded-lg">
          {selectedMessage ? (
            <div className="h-full flex flex-col">
              <div className="p-4 border-b border-[#D7E2E9] flex justify-between items-center">
                <h2 className="text-lg font-medium text-[#415A80]">Message Details</h2>
                <button
                  onClick={() => handleDelete(selectedMessage._id)}
                  className="bg-red-600 text-white text-sm px-3 py-1 rounded hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>

              <div className="p-4 space-y-4 flex-grow">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">From</h3>
                  <p className="mt-1 text-sm text-[#415A80]">
                    {selectedMessage.name} ({selectedMessage.email})
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Message</h3>
                  <p className="mt-1 text-sm text-[#415A80]">{selectedMessage.message}</p>
                </div>
                {selectedMessage.phone && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                    <p className="mt-1 text-sm text-[#415A80]">{selectedMessage.phone}</p>
                  </div>
                )}
              </div>

              {!selectedMessage.replied && (
                <div className="p-4 border-t border-[#D7E2E9]">
                  <label className="block text-sm font-medium text-[#415A80] mb-1">
                    Reply to Message
                  </label>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    rows={4}
                    className="w-full border border-[#D7E2E9] p-2 rounded text-sm bg-[#E5E7E9] focus:ring-[#A5D4DC] focus:border-[#A5D4DC]"
                    placeholder="Write your reply here..."
                  />
                  <div className="mt-3 flex justify-end">
                    <button
                      onClick={handleSendReply}
                      disabled={sendingReply}
                      className="bg-[#415A80] text-white px-4 py-2 rounded hover:bg-[#A5D4DC] transition-colors"
                    >
                      {sendingReply ? 'Sending...' : 'Send Reply'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-6 text-gray-500">
              Select a message to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}