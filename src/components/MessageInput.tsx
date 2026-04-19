"use client";
import { useState } from "react";

const MessageInput = ({ conversationId }: { conversationId: string }) => {
  const [text, setText] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ conversationId, text }),
    });
    if (!res.ok) {
      console.error("Error sending message");
      return;
    }
    setText("");
  };

  return (
    <div className="border-t border-[#00ff88]/20 p-4 bg-[#0a0a0a]">
      <form onSubmit={handleSubmit} className="flex gap-3 items-center">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="type a message..."
          className="flex-1 bg-[#111111] border border-[#ffffff15] hover:border-[#00ff88]/30 focus:border-[#00ff88]/60 outline-none px-4 py-3 text-sm text-white placeholder-[#ffffff30] [font-family:var(--font-mono)] transition-colors"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-[#00ff88] text-black text-sm font-bold [font-family:var(--font-mono)] hover:bg-[#00ff88]/80 transition-colors disabled:opacity-30"
          disabled={!text.trim()}
        >
          SEND
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
