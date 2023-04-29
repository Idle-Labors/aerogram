<template>
  <div class="chat-container">
    <div
      v-for="message in messages"
      :key="message.id"
      :class="{ container: true, darker: message.author != author }"
    >
      <p>{{ message.text }}</p>
      <span
        :class="{
          'time-right': message.author !== author,
          'time-left': message.author === author,
        }"
      >
        {{ message.timestamp }} - {{ message.author }}
      </span>
    </div>

    <div class="footer">
      <label for="msg">Message:</label>
      <input
        type="text"
        class="input-field"
        id="usr"
        v-model="text"
        @keyup.enter="sendMessage"
      />
      <img
        src="@/assets/paper-plane-send.svg"
        class="img-resize"
        @click="sendMessage"
      />
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import io from "socket.io-client";

export default {
  data() {
    return {
      author: sessionStorage.getItem("aeroUserName"),
      text: "",
      socket: null,
      timestamp: new Date().toLocaleTimeString(),
      messages: [
        { id: 1, author: "Alice", text: "Hello!" },
        { id: 2, author: "Bob", text: "Hi Alice!" },
      ],
    };
  },
  mounted() {
    this.socket = io("http://localhost:3000");
    this.socket.on("connect", () => {
      console.log("Connected/Client!");
    });
    this.socket.on("message", (message) => {
      console.log(`Received ${message}`);
      this.messages.push(message);
    });
  },
  methods: {
    sendMessage() {
      if (this.text) {
        const message = {
          id: uuidv4(),
          author: this.author,
          text: this.text,
          timestamp: new Date().toLocaleTimeString(),
        };
        this.socket.emit("message", message);
        console.log("message sent");
      }
      this.messages.push({
        author: this.author,
        text: this.text,
        timestamp: this.timestamp,
      });
      this.text = "";
    },
  },
};
</script>

<style scoped>
.img-resize {
  width: 2rem;
  height: 2rem;
  margin-left: 0.5rem;
}

.input-field {
  width: 75%;
  margin-left: 1rem;
  margin-bottom: 1rem;
  border-radius: 10px;
}

.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 80%;
  margin-left: 225px;
  background-color: white;
  color: black;
  text-align: center;
}

.chat-container {
  display: flex;
  flex-direction: column;
}

.container {
  border: 2px solid #dedede;
  background-color: #f1f1f1;
  border-radius: 5px;
  padding: 0px;
  margin: 10px 225px;
}

.darker {
  border-color: #ccc;
  background-color: rgba(90, 125, 115, 0.699);
  margin-left: 225px;
}

.container::after {
  content: "";
  clear: both;
  display: table;
}

.container img {
  float: left;
  max-width: 60px;
  width: 100%;
  margin-right: 20px;
  border-radius: 50%;
}

.container img.right {
  float: right;
  margin-left: 20px;
  margin-right: 0;
}

.time-right {
  float: right;
  color: #aaa;
}

.time-left {
  float: left;
  color: #999;
}
</style>
