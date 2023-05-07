<template>
  <div>
    <ChatContainer />
    <Navbar>
      <template v-slot:DirectMessageList>
        <DirectMessageList :users="users" />
      </template>
      <template v-slot:ChannelList>
        <ChannelList :channels="channels" />
      </template>
    </Navbar>
    <component
      :is="addUser ? 'ChatAddDM' : false"
      @render-addUser="rendersAddUser"
      @close-addUser="closeAddUser"
      @create-addUser="createAddUser"
    />
    <component
      :is="addChannel ? 'ChannelCreate' : false"
      @render-addChannel="rendersAddChannel"
      @close-addChannel="closeAddChannel"
      @create-newChannel="createChannel"
    />
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import DirectMessageList from "@/components/DirectMessageList.vue";
import ChannelList from "@/components/ChannelList.vue";
import ChatAddDM from "@/components/ChatAddDM.vue";
import ChannelCreate from "@/components/ChannelCreate.vue";
import ChatContainer from "@/components/ChatContainer.vue";

export default {
  data() {
    return {
      addUser: false,
      addChannel: false,
      channels: [],
      users: [],
    };
  },
  name: "chat",
  components: {
    Navbar,
    DirectMessageList,
    ChannelList,
    ChatAddDM,
    ChannelCreate,
    ChatContainer,
  },
  methods: {
    rendersAddUser() {
      console.log("check");
      this.addUser = true;
    },
    closeAddUser() {
      this.addUser = false;
    },
    rendersAddChannel() {
      this.addChannel = true;
    },
    closeAddChannel() {
      this.addChannel = false;
    },
    createAddUser(username) {
      console.log("in create user");
      this.users.push(username);
    },
    createChannel(channelName) {
      console.log("in createChannel");
      this.channels.push(channelName);
      console.log("pushed channel");
      console.log(this.channels);
    },
  },
};
</script>
<style></style>
