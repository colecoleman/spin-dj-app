
<template>
  <!-- <right-side-drawer
    :items="items"
    :open="isClicked"
    @closeDrawer="closeDialog()"
  ></right-side-drawer> -->
  <div
    id="add-button"
    @click="newEvent()"
    @mousedown.prevent=""
    :class="isClicked ? `` : `pointer`"
  >
    <img
      :src="plusButton"
      :class="isClicked ? `clicked` : `unclicked`"
      alt=""
    />
  </div>
</template>

<script>
import plusButton from "../../assets/SVGs/plus-sign.svg";
// import RightSideDrawer from "../SharedComponentsUI/RightSideDrawer.vue";

export default {
  data() {
    return {
      plusButton,
      isClicked: false,
      items: [
        {
          text: "New Event",
          action: this.newEvent,
        },
        {
          text: "New Proposal",
          action: this.newProposal,
        },
      ],
    };
  },
  methods: {
    newEvent() {
      this.$router.push("/admin/createnewevent");
      this.isClicked = false;
    },
    newProposal() {
      this.$router.push("/admin/");
      this.isClicked = false;
    },
    closeDialog() {
      this.isClicked = false;
    },
  },
  emits: ["closeDrawer"],
  components: {
    // RightSideDrawer,
  },
};
</script>

<style scoped>
img {
  width: 35%;
  height: 35%;
  margin: 32.5%;
}

#add-button {
  width: 60px;
  min-width: 60px;
  height: 60px;
  border-radius: 50px;
  margin-left: 10px;
  border: 1px solid var(--cardOutline);
  background-color: var(--foregroundColor);
}
</style>