"use client";
import { useRouter } from "next/navigation";
import { Conversation } from "@/types";

const ConversationList = ({
  conversations,
}: {
  conversations: Conversation[];
}) => {
  const router = useRouter();

  return (
    <div>
      <h1 className="text-3xl font-bold">Conversation List</h1>

      {conversations.map((item: Conversation) => (
        <div key={item._id} onClick={() => router.push(`/chat/${item._id}`)}>
          <h3>{item.participants[1]}</h3>
          <p>{item.lastMessage}</p>
        </div>
      ))}
    </div>
  );
};

export default ConversationList;
