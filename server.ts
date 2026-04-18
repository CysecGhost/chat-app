import next from "next";
import { createServer } from "http";
import { Server } from "socket.io";

const app = next({ dev: process.env.NODE_ENV !== "production" });

app.prepare().then(() => {
  const reqHandler = app.getRequestHandler();

  const server = createServer(reqHandler);

  const io = new Server(server);

  (global as any).io = io;

  io.on("connection", (socket) => {
    console.log("User connected: ", socket.id);

    socket.on("join_conversation", (conversationId: string) => {
      socket.join(conversationId);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected: ", socket.id);
    });
  });

  server.listen(3000, () => {
    console.log("Server running on port 3000");
  });
});
