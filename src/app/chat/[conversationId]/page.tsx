import { Message } from "@/types";
import { cookies } from "next/headers";

const ChatPage = async ({
  params,
}: {
  params: Promise<{ conversationId: string }>;
}) => {
  const { conversationId } = await params;

  const cookieStore = await cookies();

  const res = await fetch(
    `http://localhost:3000/api/messages?conversationId=${conversationId}`,
    {
      headers: { Cookie: cookieStore.toString() },
    },
  );

  if (!res.ok) {
    console.log("Error fetching messages");
  }

  const { messages } = await res.json();

  return (
    <div>
      <h1 className="text-3xl font-bold">Messages</h1>

      {messages.map((item: Message) => (
        <div key={item._id}>
          <h3>{item.senderId}</h3>
          <p>{item.text}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatPage;
