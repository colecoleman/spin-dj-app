<template>
  <backdrop @click.self="closePopup">

  <div class="window">
    <base-card
      actionIcon="x-icon"
      @action-one-clicked="closePopup()"
      :title="title"
    >
      <template v-slot:content><slot name="window"></slot></template>
    </base-card>
  </div>
  </backdrop>
</template>

<script>
import Backdrop from "../SharedComponentsUI/Backdrop.vue";
export default {
  methods: {
    closePopup() {
      this.$emit("close-popup");
    },
  },
  props: ["title"],
  emits: ["close-popup"],
  components: { Backdrop },
};
</script>

<style scoped>
.window {
  position: fixed;
  z-index: 10;
  width: 80%;
  left: 10%;
  top: 15%;
  /* height: fit-content; */
  border-radius: 14px;
}

@media screen and (min-width: 850px) {
  .window {
    position: fixed;
    z-index: 10;
    width: 40%;
    left: 30%;
    /* height: fit-content; */
    top: auto;
    border-radius: 14px;
  }
}
</style>

