<template>
  <div class="wrapper">
    <backdrop @click="closeModal()"></backdrop>
    <div class="modal">
      <base-card :actionIcon="XIcon" @action-one-clicked="closeModal()">
        <template v-slot:title>Are you sure?</template>
        <template v-slot:content>
          <h5>
            {{ modalBody }}
          </h5>
          <div class="button-container">
            <button-standard-with-icon
              text="Yes"
              @click="selectButtonOne()"
            ></button-standard-with-icon>
            <button-standard-with-icon
              text="No"
              @click="selectButtonTwo()"
            ></button-standard-with-icon>
          </div>
        </template>
      </base-card>
    </div>
  </div>
</template>

<script>
import Backdrop from "./Backdrop.vue";
import XIcon from "../../assets/SVGs/x-icon.svg";

export default {
  data() {
    return {
      XIcon,
    };
  },
  methods: {
    selectButtonOne() {
      this.$emit("selectButtonOne");
    },
    selectButtonTwo() {
      this.$emit("selectButtonTwo");
    },
    closeModal() {
      this.$emit("closeModal");
      console.log("heyy");
    },
  },
  components: { Backdrop },
  props: ["modalBody"],
};
</script>

<style scoped>
.wrapper {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 3;
}
.modal {
  z-index: 3;
  position: fixed;
  /* height: 160px; */
  max-width: 50%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.button-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}

.button-standard-with-icon {
  height: 35px;
  width: 100px;
}
</style>