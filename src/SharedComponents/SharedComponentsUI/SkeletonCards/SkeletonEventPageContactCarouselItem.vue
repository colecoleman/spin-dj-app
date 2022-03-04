<template>
  <div class="contact-wrapper">
    <div class="contact-title-and-picture">
      <h4 class="skeleton"></h4>
      <profile-picture contact="person" :customStyle="svgStyling" />
    </div>
    <div class="contact-name">
      <h5 class="skeleton"></h5>
      <h5 class="skeleton"></h5>
    </div>
    <div class="contact-information">
      <p class="skeleton"></p>
      <p class="skeleton"></p>
    </div>
  </div>
</template>

<script>
import ProfilePicture from "../../../assets/ProfilePicture.vue";
export default {
  data() {
    return {
      svgStyling:
        "width: 65px; height: 65px; margin: 10px; background-color: var(--textColor);",
    };
  },
  components: { ProfilePicture },
};
</script>

<style scoped>
.contact-wrapper {
  width: 50%;
  /* height: 100%; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.skeleton {
  background-color: var(--textColor);
  width: 100px;
  height: 10px;
}

h5 {
  font-weight: 300;
  margin: 2px;
  text-transform: uppercase;
}

h5 span {
  font-weight: 600;
}

p {
  font-size: 8pt;
  margin: 5px;
}

.contact-title-and-picture > .skeleton {
  height: 11pt;
}

.contact-name > .skeleton {
  height: 11pt;
}

.contact-information > .skeleton {
  margin: 5px 0px;
}
</style>
