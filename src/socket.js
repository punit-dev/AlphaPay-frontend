import { io } from "socket.io-client";

const socket = io("https://alphapay.onrender.com", {
  withCredentials: true,
});

export default socket;
