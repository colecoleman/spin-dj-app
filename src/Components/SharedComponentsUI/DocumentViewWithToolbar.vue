<template>
  <div id="document-wrapper" @click.self="close">
    <div class="document">
      <div class="toolbar-wrapper">
        <toolbar
          :icons="icons"
          :addOnItems="addOnItems"
          :includedItems="includedItems"
          :addOnItemTitle="addOnItemTitle"
          :adminESignatureProcessing="adminESignatureProcessing"
          :normalESignatureProcessing="normalESignatureProcessing"
          :saveProcessing="saveProcessing"
          @toggle-add-on-item-from-included="toggleAddOnItemFromIncluded"
          @submit-admin-e-signature="submitAdminESignature"
          @submit-e-signature="submitESignature"
          @left-arrow-clicked="leftArrowClicked"
          @save-button-clicked="saveButtonClicked"
          @right-arrow-clicked="rightArrowClicked"
          @close="close"
        />
      </div>
      <div class="pages-scroll-wrapper" v-if="documents">
        <div class="page" v-for="(document, index) in documents" :key="index">
          <slot name="document" v-bind:document="document"></slot>
        </div>
      </div>
      <div class="page" v-else>
        <slot name="document"></slot>
      </div>
    </div>
  </div>
</template>
<script>
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
  props: [
    "icons",
    "addOnItems",
    "saveProcessing",
    "normalESignatureProcessing",
    "adminESignatureProcessing",
    "includedItems",
    "addOnItemTitle",
    "documents",
  ],
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
    z-index: 11;
  }
  .document {
    position: absolute;
    z-index: 10;
    width: 90%;
    height: fit-content;
    min-height: 100%;
    z-index: 25;
    margin: 50px 5% 0% 5%;
    filter: drop-shadow(1px 1px 3px rgba(0, 0, 0, 1));
  }
  .toolbar-wrapper {
    width: 100%;
    background-color: white;
    position: -webkit-sticky; /* Safari */
    position: sticky;
    top: 0;
    z-index: 10;
  }
  .page {
    background-color: white;
    /* width: 100%; */
    min-height: 100%;
    height: fit-content;
    padding: 50px;
    /* aspect-ratio: 8.5/11; */
    margin-bottom: 50px;
  }

  @media (min-width: 800px) {
    .document {
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
    z-index: 11;
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