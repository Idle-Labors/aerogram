//import 'dotenv/config'
import express from "express";
import { Server } from "socket.io";
import http from "http";
import { api } from "./routes/routes.js";
import helmet from "helmet";

const app = express();
const server = http.createServer(app);
const port = process.env.port || 3000;
const io = new Server(server);

app.use("/api", api);
app.use(express.json());
app.use(helmet());
app.use(express.urlencoded({ extended: false }));

io.on("connection", (socket) => {
  console.log("a user connected");
});

server.listen(port, () => console.log(`Server running on ${port}`));
