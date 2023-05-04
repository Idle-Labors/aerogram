//import 'dotenv/config'
import express from "express";
import http from "http";
import { api } from "./routes/routes.js";
import helmet from "helmet";
import cors from "cors";
//import redisClient from "./redis.js";
import rateLimit from "express-rate-limit";
import { Server } from "socket.io";

const corsOptions = {
  origin: "http://localhost:8080",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100,
  message: "What do you think you're doing?",
});
const app = express();
const server = http.createServer(app);
const port = process.env.port || 3000;
//Create new instance of Socket.Io running on top of express server
const socket = new Server(server, { cors: corsOptions });

//CLEAN AND/OR FIX UP CORS
/*
app.options("*", cors(), (req, res) => {
  res.header("Access-Control-Allow-Methods", "POST");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.send();
});*/
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(limiter);
app.use(cors(corsOptions));

app.use("/", api);
app.use(helmet());

//socketIo.use((socket, next) => {})
socket.on("connection", (socket) => {
  socket.on("message", (messageData) => {
    console.log(`Received message from client: ${messageData}`);
    socket.broadcast.emit("message", messageData);
  });

  socket.on("createRoom", (roomName) => {
    // Join the room
    socket.join(roomName);

    // Broadcast to everyone in the room
    socket
      .to(roomName)
      .emit("message", `A new room has been created: ${roomName}`);
  });
});

server.listen(port, () => console.log(`Server running on ${port}`));
