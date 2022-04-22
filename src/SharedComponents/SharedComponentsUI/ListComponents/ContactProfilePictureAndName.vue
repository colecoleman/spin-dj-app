<template>
  <skeleton-profile-picture-name v-if="!contact" />
  <div class="contact-wrapper" v-if="contact">
    <profile-picture
      contact="person"
      :profilePicture="contact.profilePicture"
      :customStyle="profilePictureStyling"
    />
    <div class="contact-name">
      <h5 v-if="contact.given_name">
        {{ contact.given_name }}
      </h5>
      <div class="skeleton" v-if="!contact.given_name"></div>
      <h5 v-if="contact.family_name">
        {{ contact.family_name }}
      </h5>
      <div class="skeleton" v-if="!contact.family_name"></div>
    </div>
  </div>
</template>
<script>
import SkeletonProfilePictureName from "../SkeletonCards/SkeletonProfilePictureName.vue";
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
  components: { ProfilePicture, SkeletonProfilePictureName },
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

.skeleton {
  background-color: var(--textColor);
  width: 50px;
  height: 12px;
  border-radius: 3px;
  margin: 2px 0px;
}
</style>