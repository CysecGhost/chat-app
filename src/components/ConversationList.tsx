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
    <div className="w-80 h-screen flex flex-col border-r border-[#00ff88]/20 bg-[#0a0a0a]">
      {/* Header */}
      <div className="p-6 border-b border-[#00ff88]/20">
        <h1 className="text-xl font-bold tracking-widest uppercase text-[#00ff88] [font-family:var(--font-syne)]">
          MESSAGES
        </h1>
        <p className="text-[#ffffff30] text-xs mt-1 [font-family:var(--font-mono)]">
          {conversations.length} conversation{conversations.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="p-6 text-center text-[#ffffff30] text-sm [font-family:var(--font-mono)]">
            no conversations yet
          </div>
        ) : (
          conversations.map((item: Conversation) => (
            <div
              key={item._id}
              onClick={() => router.push(`/chat/${item._id}`)}
              className="p-4 border-b border-[#ffffff08] cursor-pointer hover:bg-[#00ff88]/5 hover:border-l-2 hover:border-l-[#00ff88] transition-all duration-150 group"
            >
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-bold text-white group-hover:text-[#00ff88] transition-colors [font-family:var(--font-mono)]">
                  {item.participants[1]}
                </h3>
                <span className="text-[10px] text-[#ffffff30] [font-family:var(--font-mono)]">
                  {new Date(item.updatedAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-xs text-[#ffffff50] truncate [font-family:var(--font-mono)]">
                {item.lastMessage || "no messages yet"}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ConversationList;
