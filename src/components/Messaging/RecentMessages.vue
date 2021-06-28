<template>
  <div id="container">
    <recent-messages-person-object
      v-for="client in clients"
      :key="client.id"
      :firstName="client.firstName"
      :lastName="client.lastName"
      :profilePicture="client.profilePicture"
      :recentMessage="client.recentMessage"
    >
    </recent-messages-person-object>
  </div>
</template>

<script>
import RecentMessagesPersonObject from "./RecentMessagesPersonObject.vue";

export default {
  components: {
    RecentMessagesPersonObject,
  },
  computed: {
    clients() {
      return this.$store.state.contacts.clients;
    },
  },
};
</script>

<style scoped>
#heading {
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
  align-self: flex-start;
}

h4 {
  font-weight: 600;
  text-transform: uppercase;
}

svg {
  margin: 5px;
}

#container {
  height: 100%;
  overflow: scroll;
  margin: auto;
}

</style>