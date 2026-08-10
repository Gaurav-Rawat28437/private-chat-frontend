import { io } from "socket.io-client";

const SOCKET_URL =
  import.meta.env.VITE_BACKEND_URL ||
  "http://localhost:8080";

const socket = io(SOCKET_URL, {
  autoConnect: true,
  transports: ["polling", "websocket"],
});

socket.on("connect", () => {
  console.log(
    "Socket connected:",
    socket.id
  );
});

socket.on("disconnect", (reason) => {
  console.log(
    "Socket disconnected:",
    reason
  );
});

socket.on("connect_error", (error) => {
  console.error(
    "Socket connection error:",
    error.message
  );
});

export default socket;