import { cookies } from "next/headers";
import { getSession } from "@/lib/auth";
import MessageInput from "@/components/MessageInput";
import MessageThread from "@/components/MessageThread";

const ChatPage = async ({
  params,
}: {
  params: Promise<{ conversationId: string }>;
}) => {
  const session = await getSession();

  if (!session) {
    console.error("Unauthenticated");
    return;
  }

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
    <div className="h-full overflow-y-scroll">
      <MessageThread
        initialMessages={messages}
        conversationId={conversationId}
      ></MessageThread>
      <MessageInput conversationId={conversationId}></MessageInput>
    </div>
  );
};

export default ChatPage;
