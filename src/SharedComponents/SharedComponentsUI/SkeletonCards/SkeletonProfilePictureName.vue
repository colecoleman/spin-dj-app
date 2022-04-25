<template>
  <div class="client-skeleton-card">
    <profile-picture contact="person" :customStyle="profilePictureStyling" />
    <div class="client-name">
      <h5 class="skeleton"></h5>
      <h5 class="skeleton"></h5>
    </div>
  </div>
</template>
<script>
import ProfilePicture from "../../../assets/ProfilePicture.vue";
export default {
  computed: {
    profilePictureStyling() {
      if (window.innerWidth < 800) {
        return "height: 20px; min-height: 20px; min-width: 20px; width: 20px; margin: 0;";
      } else {
        return "height: 30px; min-height: 30px; min-width: 30px; width: 30px; margin: 5px 5px 5px 0;";
      }
    },
  },
  methods: {},
  created() {},
  components: { ProfilePicture },
  props: [],
};
</script>
<style scoped>
.client-skeleton-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  min-width: 100%;
}

.skeleton {
  background-color: var(--textColor);
  width: 100px;
  height: 9px;
  border-radius: 3px;
}
.client-name > .skeleton {
  width: 40px;
  height: 7pt;
  margin: 2px 0px;
}

.client-name {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}
@media screen and (min-width: 800px) {
  .client-name > .skeleton {
    width: 70px;
    height: 9pt;
  }
}
</style>
