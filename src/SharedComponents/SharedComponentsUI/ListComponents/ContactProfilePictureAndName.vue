<template>
  <div class="contact-wrapper">
    <skeleton-profile-picture-name v-if="!contact" />
    <profile-picture
      v-if="contact"
      contact="person"
      class="profile-picture"
      :profilePicture="contact.profilePicture"
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
  components: { ProfilePicture, SkeletonProfilePictureName, Skeleton },
  props: ["contact"],
};
</script>
<style scoped>
.profile-picture {
  height: 20px;
  min-height: 20px;
  min-width: 20px;
  width: 20px;
  margin: 5px 5px 5px 0;
}
.contact-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
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
  font-size: 8pt;
  margin: 0;
  text-transform: uppercase;
}

@media screen and (min-width: 800px) {
  .profile-picture {
    height: 30px;
    min-height: 30px;
    min-width: 30px;
    width: 30px;
  }
}
@media screen and (min-width: 1200px) {
  h5 {
    font-size: 9pt;
  }
}
</style>
