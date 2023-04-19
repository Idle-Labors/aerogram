//import 'dotenv/config'
import express from "express";
import http from "http";
import { api } from "./routes/routes.js";
import helmet from "helmet";
import io from "socket.io";
import cors from "cors";

const app = express();
const server = http.createServer(app);
const port = process.env.port || 3000;
const socketIo = io(server);

app.options("*", cors(), (req, res) => {
  res.header("Access-Control-Allow-Methods", "POST");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.send();
});

app.use(cors());

app.use(express.json());
app.use("/", api);
app.use(helmet());
app.use(express.urlencoded({ extended: false }));

socketIo.on("connection", (socket) => {
  console.log("a user connected");
});

server.listen(port, () => console.log(`Server running on ${port}`));
