import { getSession } from "@/lib/auth";
import { cookies } from "next/headers";

type Conversation = {
  _id: string;
  participants: string[];
  lastMessage: string;
  updatedAt: string;
};

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

  console.log(conversations);

  return (
    <div>
      <h1>Dashboard</h1>

      {conversations.map((item: Conversation) => (
        <div key={item._id}>{item.lastMessage}</div>
      ))}
    </div>
  );
};

export default Dashboard;
