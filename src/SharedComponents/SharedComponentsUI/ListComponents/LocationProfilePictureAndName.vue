<template>
  <div class="name-and-photo">
    <profile-picture contact="location" :customStyle="svgStyling" />
    <h5>
      {{ location.name }}
    </h5>
  </div>
</template>
<script>
import ProfilePicture from "../../../assets/ProfilePicture.vue";
export default {
  data() {
    return {
      svgStyling:
        "width: 30px; min-width: 30px; height: 30px; min-height: 30px; margin: 5px 5px 5px 0;",
    };
  },
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
.name-and-photo h5 {
  margin: 1px;
  font-size: 10pt;
  text-transform: uppercase;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>