<template>
  <section>
    <div id="messaging-profile-photo">
      <img :src="profilePicture ? profilePicture : defaultProfilePicture" />
    </div>
    <div id="messaging-content">
      <h5>{{ firstName }} {{ lastName }}</h5>
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
  props: ["id", "firstName", "lastName", "recentMessage", "profilePicture"],
  computed: {
    textPreview: function () {
      return this.recentMessage.length >= 100
        ? this.recentMessage.substring(0, 100) + "..."
        : this.recentMessage;
    },
  },
  methods: {},
};
</script>

<style scoped>
#messaging-profile-photo {
  padding: 10px;
}

h5 {
  text-transform: uppercase;
  font-weight: normal;
  font-size: 14px;
  margin: 5px;
}

#messaging-content {
  align-items: left;
  text-align: left;
}

img {
  border-radius: 50%;
  margin: 5px;
  height: 50px;
}

p {
  font-size: 8pt;
  margin: 5px;
}

section {
  display: flex;
  height: fit-content;
  align-content: center;
  width: 100%;
  overflow: none;
}
</style>