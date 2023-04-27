<template>
  <div class="chat-container">
    <div class="container">
      <img src="/w3images/bandmember.jpg" alt="Avatar" />
      <p>Hello. How are you today?</p>
      <span class="time-right">11:00</span>
    </div>

    <div class="container darker">
      <img src="/w3images/avatar_g2.jpg" alt="Avatar" class="right" />
      <p>Hey! I'm fine. Thanks for asking!</p>
      <span class="time-left">11:01</span>
    </div>

    <div class="container">
      <img src="/w3images/bandmember.jpg" alt="Avatar" />
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum.</p>
      <span class="time-right">11:02</span>
    </div>

    <div class="container darker">
      <img src="/w3images/avatar_g2.jpg" alt="Avatar" class="right" />
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
      <span class="time-left">11:05</span>
    </div>
    <div class="footer">
      <label for="msg">Message:</label>
      <input type="text" class="input-field" id="usr" />
      <img src="@/assets/paper-plane-send.svg" class="img-resize" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [
        { id: 1, author: "Alice", text: "Hello!" },
        { id: 2, author: "Bob", text: "Hi Alice!" },
      ],
      newMessage: "",
    };
  },
  methods: {
    sendMessage() {
      const message = {
        id: Date.now(),
        author: "You",
        text: this.newMessage,
      };
      this.messages.push(message);
      this.newMessage = "";
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
  width: 90%;
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
