<template>
  <div id="document-wrapper">
    <backdrop @click="close" />
    <div class="document">
      <div class="toolbar-wrapper">
        <toolbar
          :icons="icons"
          :addOnItems="addOnItems"
          :includedItems="includedItems"
          :addOnItemTitle="addOnItemTitle"
          @toggle-add-on-item-from-included="toggleAddOnItemFromIncluded"
          @submit-admin-e-signature="submitAdminESignature"
          @submit-e-signature="submitESignature"
          @left-arrow-clicked="leftArrowClicked"
          @save-button-clicked="saveButtonClicked"
          @right-arrow-clicked="rightArrowClicked"
          @close="close"
        />
      </div>
      <div class="page">
        <slot name="document"></slot>
      </div>
    </div>
  </div>
</template>
<script>
import Backdrop from "./Backdrop.vue";
import Toolbar from "./DocumentToolbar.vue";
export default {
  data() {
    return {};
  },
  methods: {
    close() {
      this.$emit("close");
    },
    submitESignature(signature) {
      this.$emit("submitESignature", signature);
    },
    toggleAddOnItemFromIncluded(item) {
      this.$emit("toggleAddOnItemFromIncluded", item);
    },
    submitAdminESignature(signature) {
      this.$emit("submitAdminESignature", signature);
    },
    leftArrowClicked() {
      this.$emit("leftArrowClicked");
    },
    saveButtonClicked() {
      this.$emit("saveButtonClicked");
    },
    rightArrowClicked() {
      this.$emit("rightArrowClicked");
    },
  },
  created() {},
  components: {
    Toolbar,
    Backdrop,
  },
  emits: [
    "close",
    "submitESignature",
    "submitAdminESignature",
    "toggleAddOnItemFromIncluded",
    "leftArrowClicked",
    "saveButtonClicked",
    "rightArrowClicked",
  ],
  props: ["icons", "addOnItems", "includedItems", "addOnItemTitle"],
};
</script>
<style scoped>
@media screen {
  #document-wrapper {
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    position: fixed;
    overflow: scroll;
    z-index: 10;
  }
  .document {
    position: absolute;
    z-index: 10;
    width: 90%;
    height: fit-content;
    min-height: 100%;
    z-index: 25;
    margin: 50px 5% 0% 5%;
  }
  .toolbar-wrapper {
    width: 100%;
    background-color: white;
    position: -webkit-sticky; /* Safari */
    position: sticky;
    top: 0;
  }
  .page {
    background-color: white;
    width: 100%;
    height: 100%;
    aspect-ratio: 8.5/11;
    margin-bottom: 80px;
  }

  @media (min-width: 800px) {
    #document-wrapper {
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      position: fixed;
      overflow: scroll;
      z-index: 10;
    }
    .document {
      /* background-color: white; */
      position: absolute;
      z-index: 10;
      width: 60%;
      margin: 100px 20% 15% 20%;
    }
  }
}

@media print {
  #document-wrapper {
    /* height: fit-content; */
    width: 100%;
    /* top: 0; */
    /* left: 0; */
    /* position: fixed; */
    z-index: 10;
  }
  .document {
    background-color: white;
    aspect-ratio: 8.5/11;
    height: auto;
    width: auto;
    margin: 0;
  }
  .scroll-padding-wrapper {
    height: auto;
    width: 100%;
  }
}
</style>