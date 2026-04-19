"use client";
import { useEffect, useState } from "react";
import { Message } from "@/types";
import useSocket from "@/hooks/useSocket";

const MessageThread = ({
  initialMessages,
  conversationId,
}: {
  initialMessages: Message[];
  conversationId: string;
}) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const socket = useSocket();

  useEffect(() => {
    // join the conversation room
    socket.emit("join_conversation", conversationId);

    // listen for new messages
    socket.on("new_message", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    // cleanup when component unmounts
    return () => {
      // leave the conversation room
      socket.emit("leave_conversation", conversationId);
      // stop listening
      socket.off("new_message");
    };
  }, [conversationId]);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-3 min-h-0">
      {messages.map((item: Message) => (
        <div key={item._id} className="flex flex-col items-start">
          <span className="text-[10px] text-[#ffffff70] mt-1 [font-family:var(--font-mono)]">
            {item.senderId}
          </span>
          <div className="bg-[#111111] border border-[#ffffff10] px-4 py-2 max-w-sm">
            <p className="text-sm text-[#ffffffcc] [font-family:var(--font-mono)]">
              {item.text}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageThread;
