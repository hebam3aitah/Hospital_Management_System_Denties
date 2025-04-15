import { NextResponse } from 'next/server';
import { StreamChat } from 'stream-chat';
import { connectToDB } from '@/lib/db';
import User from '@/models/User';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  const otherId = searchParams.get('with'); // المستخدم الآخر

  const serverClient = StreamChat.getInstance(
    process.env.STREAM_API_KEY,
    process.env.STREAM_API_SECRET
  );

  await connectToDB();

  const user = await User.findById(userId).lean();
  const otherUser = otherId ? await User.findById(otherId).lean() : null;

  // تأكد من وجودهم في Stream
  const users = [
    {
      id: user._id.toString(),
      name: user.name,
      image: user.profilePicture || undefined,
    },
  ];

  if (otherUser) {
    users.push({
      id: otherUser._id.toString(),
      name: otherUser.name,
      image: otherUser.profilePicture || undefined,
    });
  }

  await serverClient.upsertUsers(users);

  const token = serverClient.createToken(userId);

  return NextResponse.json({
    token,
    apiKey: process.env.STREAM_API_KEY,
  });
}
