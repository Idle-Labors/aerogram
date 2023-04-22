<template>
  <div>
    <Navbar>
      <template v-slot:DirectMessageList>
        <DirectMessageList />
      </template>
      <template v-slot:ChannelList>
        <ChannelList />
      </template>
    </Navbar>
    <component
      :is="addUser ? 'ChatAddDM' : false"
      @render-addUser="rendersAddUser"
      @close-addUser="closeAddUser"
    />
    <component
      :is="addChannel ? 'ChannelCreate' : false"
      @render-addChannel="rendersAddChannel"
      @close-addChannel="closeAddChannel"
    />
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import DirectMessageList from "@/components/DirectMessageList.vue";
import ChannelList from "@/components/ChannelList.vue";
import ChatAddDM from "@/components/ChatAddDM.vue";
import ChannelCreate from "@/components/ChannelCreate.vue";

export default {
  data() {
    return {
      addUser: false,
      addChannel: false,
    };
  },
  name: "chat",
  components: {
    Navbar,
    DirectMessageList,
    ChannelList,
    ChatAddDM,
    ChannelCreate,
  },
  methods: {
    rendersAddUser() {
      console.log('check')
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
  },
};
</script>
<style></style>
