import { getSession } from "@/lib/auth";
import { cookies } from "next/headers";
import { Conversation } from "@/types";
import ConversationList from "@/components/ConversationList";

const Dashboard = async () => {
  const session = await getSession();

  if (!session) {
    console.error("Unauthenticated");
    return;
  }

  const cookieStore = await cookies();

  const res = await fetch("http://localhost:3000/api/conversations", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  if (!res.ok) {
    console.error("Error fetching conversations");
    return;
  }

  const { conversations } = await res.json();

  return (
    <div>
      <h1>Dashboard</h1>

      <ConversationList conversations={conversations}></ConversationList>
    </div>
  );
};

export default Dashboard;
