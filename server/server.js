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
const socketIo = new Server(server);

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
socketIo.on("connection", (socket) => {
  console.log(socket.id);
});

server.listen(port, () => console.log(`Server running on ${port}`));
