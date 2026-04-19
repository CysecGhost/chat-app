import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Message } from "@/lib/models/Message";
import { Conversation } from "@/lib/models/Conversation";
import { getSession } from "@/lib/auth";
import mongoose from "mongoose";

export const GET = async (req: NextRequest) => {
  const session = await getSession();

  if (!session)
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

  // get conversation id
  const conversationId = req.nextUrl.searchParams.get("conversationId");

  // connect to db
  await connectDB();

  // fetch all messages
  const messages = await Message.find({ conversationId }).sort({
    createdAt: 1,
  });

  return NextResponse.json({ messages });
};

export const POST = async (req: NextRequest) => {
  const { conversationId, text } = await req.json();

  const session = await getSession();

  if (!session)
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

  // connect to db
  await connectDB();

  // save message to db
  const message = await Message.create({
    conversationId: new mongoose.Types.ObjectId(conversationId!),
    senderId: new mongoose.Types.ObjectId(session.user.id),
    text,
  });

  //   update last message in conversation
  const lastMessage = await Conversation.findByIdAndUpdate(conversationId, {
    lastMessage: text,
  });

  // emit socket event or send message
  const io = (global as any).io;
  io?.to(conversationId).emit("new_message", message);

  return NextResponse.json({ message });
};
