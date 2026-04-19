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
    <div>
      <h1 className="text-3xl font-bold">Enter Message</h1>

      <form onSubmit={handleSubmit}>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700"
        >
          Message
        </label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default MessageInput;
