<template>
  <div class="client-event-identifier">
    <profile-picture contact="person" :customStyle="svgStyling" />
    <div class="client-name">
      <h5 class="skeleton"></h5>
      <h5 class="skeleton"></h5>
    </div>
  </div>
</template>
<script>
import ProfilePicture from "../../../assets/ProfilePicture.vue";
export default {
  data() {
    return {
      svgStyling: "height: 30px; width: 30px; margin: 5px 5px 5px 0;",
    };
  },
  methods: {},
  created() {},
  components: { ProfilePicture },
  props: [],
};
</script>
<style scoped>
.client-event-identifier {
  flex-direction: row;
  align-items: center;
  min-width: 100%;
}

.client-event-identifier img {
  height: 40px;
  margin: 10px;
}

.skeleton {
  background-color: var(--textColor);
  width: 100px;
  height: 9px;
  border-radius: 3px;
}
.client-name > .skeleton {
  width: 70px;
  height: 9pt;
  margin: 2px 0px;
}

.client-name {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}
</style>