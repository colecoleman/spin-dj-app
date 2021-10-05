<template>
  <div class="error-wrapper" v-if="errors.length > 0">
    <img :src="XIconSVG" alt="" @click="clearErrors()" />
    <h5 v-for="(error, index) in errors" :key="index">
      {{ error }}
    </h5>
  </div>
</template>

<script>
import XIconSVG from "../../assets/SVGs/x-icon.svg";

export default {
  data() {
    return {
      XIconSVG,
    };
  },
  methods: {
    clearErrors() {
      this.$store.dispatch("clearErrors");
    },
  },
  props: ["errors"],
  created() {
    setTimeout(this.clearErrors, 5000);
  },
};
</script>

<style scoped>
.error-wrapper {
  position: fixed;
  bottom: 10px;
  right: 10px;
  height: fit-content;
  padding: 10px;
  padding-right: 25px;
  width: fit-content;
  background-color: rgb(230, 64, 64);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
}

h5 {
  text-transform: capitalize;
}

img {
  height: 10px;
  width: 10px;
  position: absolute;
  right: 10px;
  top: 10px;
}
</style>