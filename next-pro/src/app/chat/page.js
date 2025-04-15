// import { getCurrentUser } from "@/lib/getCurrentUser";
// import User from "@/models/User";
// import ChatProvider from "../components/ChatProvider";
// import { connectToDB } from "@/lib/db";

// export default async function ChatPage({ searchParams }) {
//   const user = await getCurrentUser();
//   await connectToDB();

//   const users = await User.find({ _id: { $ne: user._id } }).lean();
//   const selectedUserId = searchParams?.with;
//   const selectedUser = selectedUserId
//     ? await User.findById(selectedUserId).lean()
//     : null;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">💬 اختر مستخدم لبدء المحادثة</h1>

//       <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
//         {users.map((u) => (
//           <form key={u._id.toString()} method="GET">
//             <input type="hidden" name="with" value={u._id.toString()} />
//             <button className="border rounded p-4 bg-white shadow hover:bg-gray-100 w-full text-left">
//               <p className="font-bold">{u.name}</p>
//               <p className="text-sm text-gray-500">{u.email}</p>
//             </button>
//           </form>
//         ))}
//       </div>

//       {selectedUser ? (
//         <div className="border p-4 rounded shadow">
//           <h2 className="text-xl font-semibold mb-2">
//             💬 دردشة مع: {selectedUser.name}
//           </h2>
//           <ChatProvider
//             user={{
//               _id: user._id.toString(),
//               name: user.name,
//               profilePicture: user.profilePicture || "",
//             }}
//             selectedUser={{
//               _id: selectedUser._id.toString(),
//               name: selectedUser.name,
//               profilePicture: selectedUser.profilePicture || "",
//             }}
//           />
//         </div>
//       ) : (
//         <div className="text-gray-500">
//           👈 اختر مستخدم من الأعلى لبدء المحادثة.
//         </div>
//       )}
//     </div>
//   );
// }


import { getCurrentUser } from "@/lib/getCurrentUser";
import User from "@/models/User";
import ChatProvider from "../components/ChatProvider";
import { connectToDB } from "@/lib/db";
import { MessageSquare, ChevronRight, User as UserIcon } from 'lucide-react';
import Link from "next/link";

export default async function ChatPage({ searchParams }) {
  const user = await getCurrentUser();
  await connectToDB();

  const users = await User.find({ _id: { $ne: user._id } }).lean();
  const selectedUserId = searchParams?.with;
  const selectedUser = selectedUserId
    ? await User.findById(selectedUserId).lean()
    : null;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <div className="pb-5 border-b border-[#D7E2E9] mb-6">
        <h1 className="text-2xl font-bold text-[#415A80]">Messages</h1>
        <p className="text-gray-500 mt-1">Select a user to start a conversation</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Users list */}
        <div className="w-full md:w-1/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b border-[#D7E2E9] flex items-center">
              <MessageSquare className="h-5 w-5 text-[#415A80] mr-2" />
              <h2 className="font-medium text-[#415A80]">Recent Contacts</h2>
            </div>
            
            <div className="divide-y divide-[#D7E2E9]">
              {users.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  No users available for chat
                </div>
              ) : (
                users.map((u) => {
                  const isSelected = selectedUserId === u._id.toString();
                  return (
                    <Link 
                      key={u._id.toString()} 
                      href={`?with=${u._id.toString()}`}
                      className={`block p-4 hover:bg-[#E5E7E9]/50 transition-colors ${
                        isSelected ? 'bg-[#E5E7E9]' : ''
                      }`}
                    >
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-[#A5D4DC] flex items-center justify-center text-[#415A80] font-bold mr-3">
                          {u.profilePicture ? (
                            <img 
                              src={u.profilePicture} 
                              alt={u.name} 
                              className="h-10 w-10 rounded-full object-cover"
                            />
                          ) : (
                            <UserIcon className="h-5 w-5" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-[#415A80] truncate">{u.name}</p>
                          <p className="text-sm text-gray-500 truncate">{u.email}</p>
                        </div>
                        {isSelected && (
                          <ChevronRight className="h-5 w-5 text-[#415A80]" />
                        )}
                      </div>
                    </Link>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1">
          {selectedUser ? (
            <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
              <div className="p-4 border-b border-[#D7E2E9] flex items-center">
                <div className="h-10 w-10 rounded-full bg-[#A5D4DC] flex items-center justify-center text-[#415A80] font-bold mr-3">
                  {selectedUser.profilePicture ? (
                    <img 
                      src={selectedUser.profilePicture} 
                      alt={selectedUser.name} 
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <UserIcon className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <h2 className="font-medium text-[#415A80]">
                    {selectedUser.name}
                  </h2>
                  <p className="text-xs text-gray-500">
                    {/* You could add status or other details here */}
                    Active now
                  </p>
                </div>
              </div>
              
              <div className="flex-1">
                <ChatProvider
                  user={{
                    _id: user._id.toString(),
                    name: user.name,
                    profilePicture: user.profilePicture || "",
                  }}
                  selectedUser={{
                    _id: selectedUser._id.toString(),
                    name: selectedUser.name,
                    profilePicture: selectedUser.profilePicture || "",
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center h-full flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-[#E5E7E9] rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="h-8 w-8 text-[#415A80]" />
              </div>
              <h2 className="text-xl font-medium text-[#415A80] mb-2">
                No Conversation Selected
              </h2>
              <p className="text-gray-500 max-w-md">
                Select a user from the contacts list to start messaging
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}