<template>
  <div class="successes-wrapper" v-if="successes.length > 0">
    <img :src="XIconSVG" alt="" @click="clearSuccesses()" />
    <h5 v-for="(successes, index) in successs" :key="index">
      {{ successes }}
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
    clearSuccesses() {
      this.$store.dispatch("clearSuccesses");
    },
  },
  props: ["successes"],
  created() {
    setTimeout(this.clearSuccesses, 5000);
  },
};
</script>

<style scoped>
.successes-wrapper {
  position: fixed;
  bottom: 10px;
  right: 10px;
  height: fit-content;
  padding: 10px;
  padding-right: 25px;
  width: fit-content;
  background-color: rgb(64, 230, 72);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: black;
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