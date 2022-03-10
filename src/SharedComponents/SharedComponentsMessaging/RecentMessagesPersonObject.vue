<template>
  <section>
    <div id="messaging-profile-photo">
      <profile-picture
        contact="person"
        :profilePicture="person.profilePicture"
        :customStyle="svgStyling"
      />
    </div>
    <div id="messaging-content">
      <h5>{{ fullName }}</h5>
      <p>{{ textPreview }}</p>
    </div>
  </section>
</template>

<script>
import ProfilePicture from "../../assets/ProfilePicture.vue";

export default {
  data() {
    return {
      svgStyling: "border-radius: 50%; height: 40px; width: 40px",
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
  components: { ProfilePicture },
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