<template>
  <div class="name-and-photo">
    <profile-picture
      contact="location"
      :customStyle="svgStyling"
      class="profile-picture"
    />
    <h5>
      {{ location.name }}
    </h5>
  </div>
</template>
<script>
import ProfilePicture from "../../../assets/ProfilePicture.vue";
export default {
  components: { ProfilePicture },
  props: ["location"],
};
</script>
<style scoped>
.name-and-photo {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.profile-picture {
  width: 20px;
  min-width: 20px;
  height: 20px;
  min-height: 20px;
  margin: 5px 5px 5px 0;
}
.name-and-photo h5 {
  margin: 1px;
  font-size: 10pt;
  text-transform: uppercase;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
  @media screen and (min-width: 800px) {
    .profile-picture {
      height: 30px;
      min-height: 30px;
      min-width: 30px;
      width: 30px;
    }
  }
</style>