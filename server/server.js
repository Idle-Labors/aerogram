import express from "express";
import http from "http";
import { api } from "./routes/routes.js";
import helmet from "helmet";
import cors from "cors";
import { redisClient } from "./redis.js";
import rateLimit from "express-rate-limit";
import { Server } from "socket.io";
import { storeRoomMessages } from "./modules/modules.js";

const corsOptions = {
  origin: "http://localhost:8080",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 50,
  message: "What do you think you're doing?",
});
/*************************************
 * Express Server                    *
 *************************************/
const app = express();
const server = http.createServer(app);
const port = process.env.port || 3000;
//Create new instance of Socket.Io running on top of express server
const socket = new Server(server, { cors: corsOptions });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(limiter);
app.use(cors(corsOptions));

app.use("/", api);
app.use(helmet());

/****************************************************
 * Websocket Server                                 *
 ****************************************************/
//Creates five rooms when server starts up
for (let i = 1; i <= 5; i++) {
  const roomName = `room${i}`;
  socket.of("/").adapter.rooms.set(roomName, new Set());
}

socket.on("connection", (socket) => {
  socket.on("message", async (messageData) => {
    console.log(`Received message from client: ${messageData}`);
    const roomName = messageData.channel;
    // Store the message in Redis associated with the room
    await redisClient.lPush(roomName, JSON.stringify(messageData));
    console.log(`Message stored in Redis for room ${roomName}`);
    socket.broadcast.emit("message", messageData);
  });

  socket.on("joinRoom", async (roomName) => {
    socket.join(roomName.channel);
    console.log(`joined ${roomName.channel}`);
    // Add the channel to the user's active room hash table
    await redisClient.sAdd(`UserRooms:${roomName.user}`, roomName.channel);

    //Generate and send a list of active users in the room
    const activeUsersKey = `Users:${roomName.channel}`;
    const userListExists = await redisClient.exists(activeUsersKey);
    if (!userListExists) {
      await redisClient.lPush(activeUsersKey, roomName.user);
    }
    const userList = await redisClient.LRANGE(activeUsersKey, 0, -1);
    if (!userList.includes(roomName.user)) {
      await redisClient.lPush(activeUsersKey, roomName.user);
      userList.push(roomName.user);
    }

    // Emit active user list
    socket.emit("userList", userList);
    socket.to(roomName.channel).emit("userList", userList);

    //Send a welcome message when a user joins
    const welcomeMsg = {
      channel: roomName.channel,
      author: "WelcomeBot",
      text: `User ${roomName.user} joined room ${roomName.channel}`,
      timestamp: new Date().toLocaleTimeString(),
    };
    socket.broadcast.emit("message", welcomeMsg);
    console.log(`User ${roomName.user} joined room ${roomName.channel}`);
  });

  socket.on("createRoom", async (roomName) => {
    await redisClient.lPush(roomName, "");
    console.log(`Room ${roomName} created`);
  });

  socket.on("logout", async (username) => {
    const userRoomsKey = `UserRooms:${username}`;
    const userRooms = await redisClient.sMembers(userRoomsKey);
    for (const room of userRooms) {
      //Go through and remove the user from the active user list for each room they are a part of
      await redisClient.LREM(`Users:${room}`, 0, username);
      console.log(userRooms);
      const userList = await redisClient.LRANGE(`Users:${room}`, 0, -1);
      //Emit updated list
      socket.to(room).emit("userList", userList);
    }
    // Remove the user's rooms entry from Redis
    await redisClient.del(userRoomsKey);
  });
});
/*
const interval = 60 * 60 * 1000; // 1 hour in milliseconds
setTimeout(storeRoomMessages, interval);
*/
server.listen(port, () => console.log(`Server running on ${port}`));
