<template>
  <div>
    <Navbar
      @render-addUser="rendersAddUser"
      @render-addChannel="rendersAddChannel"
    >
      <template v-slot:DirectMessageList>
        <DirectMessageList
          :users="users"
          @selectedChannel="selectedChannel = $event"
        />
      </template>
      <template v-slot:ChannelList>
        <ChannelList
          :channels="channels"
          @selectedChannel="selectedChannel = $event"
        />
      </template>
    </Navbar>

    <ChatContainer :selected-channel="selectedChannel" />

    <component
      :is="addUser ? 'ChatAddDM' : false"
      @close-addUser="closeAddUser"
      @create-addUser="createAddUser"
    />

    <component
      :is="addChannel ? 'ChannelCreate' : false"
      @close-addChannel="closeAddChannel"
      @create-newChannel="createAddUser"
    />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
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
      channels: ["Room1", "Room2", "Room3", "Room4", "Room5"],
      users: [],
      selectedChannel: null,
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
      this.users.push(username);
    },
    createChannel(channelName) {
      this.channels.push(channelName);
    },
  },
};
</script>

<style></style>
