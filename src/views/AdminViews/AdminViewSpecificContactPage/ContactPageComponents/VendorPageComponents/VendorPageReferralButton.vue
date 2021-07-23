<template>
  <base-card :icon="referralCircleSvg">
    <template v-slot:title>Referral</template>
    <template v-slot:content>
      <button-standard-with-icon
        @click="clicked()"
        text="Refer To A Client"
      ></button-standard-with-icon>
    </template>
  </base-card>
</template>

<script>
import ButtonStandardWithIcon from "../../../../../SharedComponents/SharedComponentsUI/ButtonStandardWithIcon.vue";

import referralCircleSvg from "../../../../../assets/SVGs/refer-circle.svg";

export default {
  data() {
    return {
      referralCircleSvg,
    };
  },
  methods: {
    clicked() {
      this.$emit("referral-clicked");
    },
  },
  props: ["vendor"],
  components: { ButtonStandardWithIcon },
};
</script>

<style scoped>
</style>