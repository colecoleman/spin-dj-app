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