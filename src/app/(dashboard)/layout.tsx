import { getSession } from "@/lib/auth"
import { cookies } from "next/headers"
import ConversationList from "@/components/ConversationList"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()
  const cookieStore = await cookies()
  const res = await fetch("http://localhost:3000/api/conversations", {
    headers: { Cookie: cookieStore.toString() }
  })
  const { conversations } = await res.json()

  return (
    <div className="flex h-screen bg-[#0a0a0a] overflow-hidden">
      <ConversationList conversations={conversations} />
      <main className="flex-1 flex flex-col overflow-hidden">
        {children}
      </main>
    </div>
  )
}