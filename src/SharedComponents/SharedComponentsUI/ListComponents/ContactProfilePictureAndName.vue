<template>
  <div>
    <profile-picture
      contact="person"
      :profilePicture="contact.profilePicture"
      :customStyle="profilePictureStyling"
    />
    <h5 class="contact-name" v-if="contact.userId">
      {{ contact.given_name }} <br />
      <span> {{ contact.family_name }}</span>
    </h5>
  </div>
</template>
<script>
import ProfilePicture from "../../../assets/ProfilePicture.vue";
export default {
  data() {
    return {
      profilePictureStyling:
        "height: 30px; min-height: 30px; min-width: 30px; width: 30px; margin: 5px 5px 5px 0;",
    };
  },
  methods: {},
  created() {},
  components: { ProfilePicture },
  props: ["contact"],
};
</script>
<style scoped>
div {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.contact-name {
  font-size: 10pt;
  display: flex;
  flex-direction: column;
  text-align: left;
  text-transform: uppercase;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>