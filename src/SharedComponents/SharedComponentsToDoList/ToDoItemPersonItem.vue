<template>
  <div class="to-do-contact-item">
    <profile-picture
      contact="person"
      :profilePicture="
        contact
          ? contact.profilePicture
            ? contact.profilePicture
            : undefined
          : undefined
      "
      :customStyle="'width: 25px; height: 25px; margin-left: 10px; padding: 5px;'"
    />
    <h5 v-if="contact">
      {{ contact.given_name + " " + contact.family_name }}
    </h5>
  </div>
</template>
<script>
import ProfilePicture from "../../assets/ProfilePicture.vue";
export default {
  data() {
    return {};
  },
  methods: {},

  components: {
    ProfilePicture,
  },
  props: ["contact"],
};
</script>
<style scoped>
.to-do-contact-item {
  display: flex;
  align-items: center;
}

h5 {
  margin: 0;
  font-size: 8pt;
  text-transform: uppercase;
}
</style>