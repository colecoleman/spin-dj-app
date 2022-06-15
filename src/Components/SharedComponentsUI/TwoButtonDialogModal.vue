<template>
  <div class="wrapper">
    <backdrop @click="closeModal()" />
    <div class="modal">
      <base-card
        actionIcon="x-icon"
        title="Are you sure?"
        @action-one-clicked="closeModal()"
      >
        <template v-slot:content>
          <h5>
            {{ modalBody }}
          </h5>
          <div class="button-container">
            <button-standard-with-icon text="Yes" @click="selectButtonOne()" />
            <button-standard-with-icon text="No" @click="selectButtonTwo()" />
          </div>
        </template>
      </base-card>
    </div>
  </div>
</template>

<script>

import Backdrop from "./Backdrop.vue";
export default {
  data() {
    return {

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
    },
  },
  components: { Backdrop },
  emits: ["selectButtonOne", "selectButtonTwo", "closeModal"],
  props: ["modalBody"],
};
</script>

<style scoped>
@media screen and (min-width: 320px) {
  .wrapper {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 6;
  }
  .modal {
    z-index: 10;
    position: fixed;
    /* top: 35%; */
    /* left: 10%; */
    /* height: 160px; */
    /* max-width: unset; */
    width: 80%;
    top: 50%;
    left: 50%;
    /* bring your own prefixes */
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
    height: 15px;
    width: 75px;
    margin: 10px;
  }
}
@media screen and (min-width: 850px) {
  .wrapper {
    position: fixed;
    width: 100%;
    height: 100%;
  }
  .modal {
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
    height: 15px;
    width: 75px;
    margin: 10px;
  }
}
</style>
