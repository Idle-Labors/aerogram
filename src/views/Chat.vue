<template>
  <div>
    <Navbar>
      <template v-slot:DirectMessageList>
        <DirectMessageList />
      </template>
    </Navbar>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import DirectMessageList from "@/components/DirectMessageList.vue";

export default {
  data() {
    return {};
  },
  name: "chat",
  components: {
    Navbar,
    DirectMessageList
  },
};
</script>
<style></style>
