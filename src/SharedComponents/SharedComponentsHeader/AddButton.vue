
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
    <vue-svg svg="plus-sign" :customStyle="svgStyling" />
  </div>
</template>

<script>
import VueSvg from "../../assets/VueSvg.vue";
// import RightSideDrawer from "../SharedComponentsUI/RightSideDrawer.vue";

export default {
  data() {
    return {
      svgStyling: "width: 35%; height: 35%; margin: auto;",
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
    VueSvg,
    // RightSideDrawer,
  },
};
</script>

<style scoped>
@media screen and (min-width: 320px) {
  #add-button {
    cursor: pointer;
    width: 60px;
    min-width: 60px;
    height: 60px;
    border-radius: 50px;
    margin-left: 10px;
    border: 1px solid var(--cardOutline);
    background-color: var(--foregroundColor);
    color: var(--textColor);
    display: flex;
  }

  #add-button:hover {
    filter: drop-shadow(0px 0px 0.5px var(--textColor));
  }

  #add-button {
    cursor: pointer;
    border: 1px solid var(--cardOutline);
    background-color: var(--foregroundColor);
    display: flex;
    width: 30px;
    min-width: 30px;
    height: 30px;
    border-radius: 30px;
    margin-left: 10px;
  }
}

@media screen and (min-width: 800px) {
  #add-button {
    width: 40px;
    min-width: 40px;
    height: 40px;
    border-radius: 40px;
    margin-left: 10px;
  }
}

@media screen and (min-width: 1200px) {
  #add-button {
    width: 60px;
    min-width: 60px;
    height: 60px;
    border-radius: 40px;
    margin-left: 10px;
  }
}

/*
#add-button {
  cursor: pointer;
  width: 60px;
  min-width: 60px;
  height: 60px;
  border-radius: 50px;
  margin-left: 10px;
  border: 1px solid var(--cardOutline);
  background-color: var(--foregroundColor);
}

#add-button:hover {
  filter: drop-shadow(0px 0px 0.5px var(--textColor));
} */
</style>