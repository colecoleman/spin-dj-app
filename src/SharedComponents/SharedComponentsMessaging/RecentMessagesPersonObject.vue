<template>
  <section>
    <div id="messaging-profile-photo">
      <img
        :src="
          person.profilePicture ? person.profilePicture : defaultProfilePicture
        "
      />
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
      conversation: [],
    };
  },
  props: ["id", "conversationId", "person"],
  computed: {
    fullName() {
      return `${this.person.given_name} ${this.person.family_name}`;
    },
    sortedMessages() {
      let tempArray = [...this.conversation];
      return tempArray.sort((a, b) => {
        return a.data.sentDate < b.data.sentDate
          ? 1
          : a.data.sentDate > b.data.sentDate
          ? -1
          : 0;
      });
    },
    textPreview() {
      if (this.sortedMessages[0]) {
        let mostRecentMessage = this.sortedMessages[0].data.body;
        return mostRecentMessage.length >= 100
          ? mostRecentMessage.substring(0, 100) + "..."
          : mostRecentMessage;
      } else {
        return "...";
      }
    },
  },
  methods: {},
  async created() {
    await this.$store
      .dispatch("getMessageThread", this.conversationId)
      .then((res) => {
        this.conversation = [...res.Items];
      })
      .catch((err) => {
        console.log(err);
      });
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