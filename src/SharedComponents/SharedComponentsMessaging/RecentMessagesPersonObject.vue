<template>
  <section>
    <div id="messaging-profile-photo">
      <img
        v-if="person"
        :src="
          person.profilePicture ? person.profilePicture : defaultProfilePicture
        "
      />
      <img v-if="!person" :src="defaultProfilePicture" />
    </div>
    <div id="messaging-content">
      <h5>{{ fullName }}</h5>
      <p>{{ textPreview }}</p>
    </div>
  </section>
</template>

<script>
import defaultProfilePicture from "../../assets/default-profile-picture.svg";

export default {
  data() {
    return {
      defaultProfilePicture,
    };
  },
  props: ["id", "conversationId", "conversation"],
  computed: {
    fullName() {
      if (this.person) {
        return `${this.person.given_name} ${this.person.family_name}`;
      } else {
        return "Deleted Contact";
      }
    },
    textPreview() {
      let mostRecentMessage =
        this.conversation.thread[this.conversation.thread.length - 1].data.body;
      return mostRecentMessage.length >= 100
        ? mostRecentMessage.substring(0, 100) + "..."
        : mostRecentMessage;
    },
    person() {
      console.log(this.conversation);
      return this.conversation.users[0];
    },
  },
};
</script>

<style scoped>
#messaging-profile-photo {
  padding: 5px;
}

h5 {
  text-transform: uppercase;
  font-weight: normal;
  font-size: 14px;
  margin: 5px;
}

#messaging-content {
  align-items: center;
  text-align: left;
}

img {
  border-radius: 50%;
  height: 40px;
  width: 40px;
}

p {
  font-size: 8pt;
  margin: 5px;
}

section {
  display: flex;
  height: fit-content;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
  overflow: none;
}
</style>