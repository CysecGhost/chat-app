import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

const useSocket = () => {
  if (!socket) {
    socket = io();
  }
  return socket;
};

export default useSocket;
