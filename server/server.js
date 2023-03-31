//import 'dotenv/config'
import express from "express";
import { Server } from "socket.io";
import http from "http";
import { api } from "./routes/routes.js";
import Yup from "yup";

const app = express();
const server = http.createServer(app);
const port = process.env.port || 3000;
const io = new Server(server);

app.use('/api', api);
app.use(express.json());

io.on("connection", (socket) => {
  console.log("a user connected");
});

server.listen(port, () => console.log(`Server running on ${port}`));
