import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Conversation } from "@/lib/models/Conversation";
import { getSession } from "@/lib/auth";

export const GET = async () => {
  const session = await getSession();

  if (!session)
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

  // connect to db
  await connectDB();

  // find conversations of user
  const conversations = await Conversation.find({
    participants: session.user.id,
  });

  return NextResponse.json({ conversations }, { status: 200 });
};

export const POST = async (req: NextRequest) => {
  const session = await getSession();

  if (!session)
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

  //   get pariticipant's id
  const { participantId } = await req.json();

  // connect to db
  await connectDB();

  //   check if conversation already exists to avoid duplicate chats
  const exists = await Conversation.findOne({
    participants: { $all: [session.user.id, participantId] },
  });

  if (exists) return NextResponse.json({ exists });

  // create new conversation
  const conversation = await Conversation.create({
    participants: [session.user.id, participantId],
  });

  return NextResponse.json({ conversation });
};
