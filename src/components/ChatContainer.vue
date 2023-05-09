<template>
  <div class="wrapper">
    <div class="chat-container"></div>
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
      <label for="msg"></label>
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
import socket from "@/modules/socket.js";

export default {
  props: {
    selectedChannel: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      author: sessionStorage.getItem("aeroUserName"),
      text: "",
      timestamp: new Date().toLocaleTimeString(),
      messages: [
        { id: 1, author: "Alice", text: "Hello!" },
        { id: 2, author: "Bob", text: "Hi Alice!" },
      ],
    };
  },
  mounted() {
    socket.on("connect", () => {
      console.log(`Connected ${socket.id}`);
    });

    socket.on("message", (message) => {
      if (message.channel === this.selectedChannel) {
        console.log(`Received ${message}`);
        this.messages.push(message);
      }
    });
  },
  watch: {
    selectedChannel(newVal) {
      // Clear the messages array when the selected channel changes
      this.messages = [];
    },
  },
  methods: {
    sendMessage() {
      if (this.text) {
        const message = {
          id: uuidv4(),
          channel: this.selectedChannel,
          author: this.author,
          text: this.text,
          timestamp: new Date().toLocaleTimeString(),
        };
        socket.emit("message", message);
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
}

input:focus {
  outline: none;
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
  content: "";
  background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAgOCkiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGNpcmNsZSBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS4yNSIgY3g9IjE3NiIgY3k9IjEyIiByPSI0Ii8+PHBhdGggZD0iTTIwLjUuNWwyMyAxMW0tMjkgODRsLTMuNzkgMTAuMzc3TTI3LjAzNyAxMzEuNGw1Ljg5OCAyLjIwMy0zLjQ2IDUuOTQ3IDYuMDcyIDIuMzkyLTMuOTMzIDUuNzU4bTEyOC43MzMgMzUuMzdsLjY5My05LjMxNiAxMC4yOTIuMDUyLjQxNi05LjIyMiA5LjI3NC4zMzJNLjUgNDguNXM2LjEzMSA2LjQxMyA2Ljg0NyAxNC44MDVjLjcxNSA4LjM5My0yLjUyIDE0LjgwNi0yLjUyIDE0LjgwNk0xMjQuNTU1IDkwcy03LjQ0NCAwLTEzLjY3IDYuMTkyYy02LjIyNyA2LjE5Mi00LjgzOCAxMi4wMTItNC44MzggMTIuMDEybTIuMjQgNjguNjI2cy00LjAyNi05LjAyNS0xOC4xNDUtOS4wMjUtMTguMTQ1IDUuNy0xOC4xNDUgNS43IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS4yNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTg1LjcxNiAzNi4xNDZsNS4yNDMtOS41MjFoMTEuMDkzbDUuNDE2IDkuNTIxLTUuNDEgOS4xODVIOTAuOTUzbC01LjIzNy05LjE4NXptNjMuOTA5IDE1LjQ3OWgxMC43NXYxMC43NWgtMTAuNzV6IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS4yNSIvPjxjaXJjbGUgZmlsbD0iIzAwMCIgY3g9IjcxLjUiIGN5PSI3LjUiIHI9IjEuNSIvPjxjaXJjbGUgZmlsbD0iIzAwMCIgY3g9IjE3MC41IiBjeT0iOTUuNSIgcj0iMS41Ii8+PGNpcmNsZSBmaWxsPSIjMDAwIiBjeD0iODEuNSIgY3k9IjEzNC41IiByPSIxLjUiLz48Y2lyY2xlIGZpbGw9IiMwMDAiIGN4PSIxMy41IiBjeT0iMjMuNSIgcj0iMS41Ii8+PHBhdGggZmlsbD0iIzAwMCIgZD0iTTkzIDcxaDN2M2gtM3ptMzMgODRoM3YzaC0zem0tODUgMThoM3YzaC0zeiIvPjxwYXRoIGQ9Ik0zOS4zODQgNTEuMTIybDUuNzU4LTQuNDU0IDYuNDUzIDQuMjA1LTIuMjk0IDcuMzYzaC03Ljc5bC0yLjEyNy03LjExNHpNMTMwLjE5NSA0LjAzbDEzLjgzIDUuMDYyLTEwLjA5IDcuMDQ4LTMuNzQtMTIuMTF6bS04MyA5NWwxNC44MyA1LjQyOS0xMC44MiA3LjU1Ny00LjAxLTEyLjk4N3pNNS4yMTMgMTYxLjQ5NWwxMS4zMjggMjAuODk3TDIuMjY1IDE4MGwyLjk0OC0xOC41MDV6IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS4yNSIvPjxwYXRoIGQ9Ik0xNDkuMDUgMTI3LjQ2OHMtLjUxIDIuMTgzLjk5NSAzLjM2NmMxLjU2IDEuMjI2IDguNjQyLTEuODk1IDMuOTY3LTcuNzg1LTIuMzY3LTIuNDc3LTYuNS0zLjIyNi05LjMzIDAtNS4yMDggNS45MzYgMCAxNy41MSAxMS42MSAxMy43MyAxMi40NTgtNi4yNTcgNS42MzMtMjEuNjU2LTUuMDczLTIyLjY1NC02LjYwMi0uNjA2LTE0LjA0MyAxLjc1Ni0xNi4xNTcgMTAuMjY4LTEuNzE4IDYuOTIgMS41ODQgMTcuMzg3IDEyLjQ1IDIwLjQ3NiAxMC44NjYgMy4wOSAxOS4zMzEtNC4zMSAxOS4zMzEtNC4zMSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjEuMjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvZz48L3N2Zz4=");
  opacity: 0.06;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  position: absolute;
}

.container {
  border: 2px solid #dedede;
  background-color: #f1f1f1;
  border-radius: 10px 10px 10px 10px;
  display: block;
  max-width: 75%;
  padding-right: 1rem;
  padding-top: 0.2rem;
  text-align: right;
  margin: 10px 225px;
  margin-bottom: 1.5rem;
}

.darker {
  background-color: rgba(90, 125, 115, 0.699);
  border-radius: 10px 10px 10px 10px;
  display: block;
  max-width: 75%;
  margin-bottom: 1.5rem;
  padding-left: 1rem;
  padding-top: 0.2rem;
  text-align: left;
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
