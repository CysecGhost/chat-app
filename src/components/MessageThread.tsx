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

      socket.off("new_message");
    };
  }, [conversationId]);

  return (
    <div>
      {messages.map((item: Message) => (
        <div key={item._id}>
          <h3>{item.senderId}</h3>
          <p>{item.text}</p>
        </div>
      ))}
    </div>
  );
};

export default MessageThread;
