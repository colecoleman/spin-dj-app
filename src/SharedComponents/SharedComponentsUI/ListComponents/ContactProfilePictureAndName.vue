<template>
  <div class="contact-wrapper">
    <skeleton-profile-picture-name v-if="!contact" />
    <profile-picture
      v-if="contact"
      contact="person"
      :profilePicture="contact.profilePicture"
      :customStyle="profilePictureStyling"
    />
    <div class="contact-name" v-if="contact">
      <h5 v-if="contact.given_name">
        {{ contact.given_name }}
      </h5>
      <skeleton v-if="!contact.given_name" />
      <h5 v-if="contact.family_name">
        {{ contact.family_name }}
      </h5>
      <skeleton v-if="!contact.family_name" />
    </div>
  </div>
</template>
<script>
import SkeletonProfilePictureName from "../SkeletonCards/SkeletonProfilePictureName.vue";
import Skeleton from "../SkeletonCards/SkeletonText.vue";
import ProfilePicture from "../../../assets/ProfilePicture.vue";
export default {
  data() {
    return {
      profilePictureStyling:
        "height: 30px; min-height: 30px; min-width: 30px; width: 30px; margin: 5px 5px 5px 0;",
    };
  },
  computed: {},
  methods: {},
  created() {},
  components: { ProfilePicture, SkeletonProfilePictureName, Skeleton },
  props: ["contact"],
};
</script>
<style scoped>
.contact-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.contact-name {
  display: flex;
  flex-direction: column;
}

h5 {
  text-align: left;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 10pt;
  margin: 0;
  text-transform: uppercase;
}
</style>