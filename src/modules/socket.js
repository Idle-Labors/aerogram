import io from "socket.io-client";

const token = localStorage.getItem("aeroChatToken");
const socket = io.connect("http://localhost:3000", {
  query: { token },
});
export default socket;
