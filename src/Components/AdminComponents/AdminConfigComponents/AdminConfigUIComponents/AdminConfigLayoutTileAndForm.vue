<template>
  <large-floating-card @close="close">
    <div class="form-section section" v-if="activeView === 'form'">
      <div class="buttons-wrapper">
        <round-icon-button
          v-if="saveButtonEnabled"
          :svg="processing ? 'loading' : 'save'"
          @click="saveButtonClicked"
        />
        <round-icon-button
          :svg="processing ? 'loading' : 'back-arrow'"
          @click="toggleView('list')"
        />
      </div>
      <slot name="form"></slot>
    </div>
    <div class="list-section section" v-if="activeView === 'list'">
      <item-tile class="add-item-button" @click="toggleView('form')">
        <round-icon-button svg="plus-sign" />
        <p class="add-item-title">{{ addButtonText }}</p>
      </item-tile>
      <product-tile
        v-for="(product, index) in products"
        :key="index"
        :title="product[productNameProperty]"
        :photo="
          productPhotoProperty ? product[productPhotoProperty] : undefined
        "
        :details="figureDetails ? figureDetails(product) : []"
        @delete="deleteClicked(product)"
        @edit="editClicked(product, index)"
      />
    </div>
  </large-floating-card>
</template>
<script>
import ItemTile from "../../../SharedComponentsUI/ItemTile.vue";
import ProductTile from "./AdminConfigProductItemTile.vue";
import LargeFloatingCard from "../../../SharedComponentsUI/FloatingCards/LargeFloatingCard.vue";
import RoundIconButton from "../../../SharedComponentsUI/RoundIconButton.vue";

export default {
  data() {
    return {
      activeView: "list",
    };
  },
  computed: {},
  methods: {
    toggleView(view) {
      if (this.activeView === "form") {
        this.$emit("clear-form");
      }
      this.activeView = view;
    },
    saveButtonClicked() {
      this.$emit("save-button-clicked");
      this.toggleView("list");
    },
    deleteClicked(product) {
      this.$emit("delete-button-clicked", product);
    },
    editClicked(product, index) {
      this.$emit("edit-button-clicked", product, index);
      this.toggleView("form");
    },
    close() {
      this.$emit("close");
    },
  },
  created() {},
  components: {
    ItemTile,
    ProductTile,
    LargeFloatingCard,
    RoundIconButton,
  },
  props: [
    "addButtonText",
    "figureDetails",
    "processing",
    "productNameProperty",
    "productPhotoProperty",
    "products",
    "saveButtonEnabled",
  ],
  emits: [
    "clear-form",
    "close",
    "delete-button-clicked",
    "edit-button-clicked",
    "save-button-clicked",
  ],
};
</script>
<style scoped>
.config-tile-and-form-wrapper {
  height: 100%;
  width: 100%;
}

.section {
  padding: 10px;
  height: calc(100% - 20px);
}

.list-section {
  width: calc(100% - 20px);
  display: grid;
  grid-template-columns: repeat(auto-fit, 120px);
  gap: 10px;
  align-content: flex-start;
  justify-items: start;
  /* align-items: flex-start; */
  /* flex-wrap: wrap; */
  overflow-x: hidden;
  z-index: 1;
}

.form-section {
  display: flex;
  overflow-y: scroll;
  width: 100%;
}

.buttons-wrapper {
  display: flex;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 2;
}

.add-item-button {
  align-items: flex-end;
  justify-content: space-between;
  margin: 10px;
}

.add-item-title {
  padding: 0 10px 10px 0;
  width: fit-content;
  max-width: 90%;
  margin: 0;
  text-align: right;
  text-transform: uppercase;
  font-size: 12pt;
  font-weight: 600;
  max-height: 50%;
  overflow: hidden;
  text-overflow: ellipsis;
}
@media screen and (min-width: 800px) {
  .config-tile-and-form-wrapper {
    height: 100%;
  }

  .section {
    display: grid;
    grid-template-columns: repeat(auto-fit, 135px);
    flex-wrap: wrap;
    padding: 5px;
    overflow: scroll;
    z-index: 1;
  }
  .form-section {
    display: flex;
    overflow-y: scroll;
    width: 100%;
  }

  .buttons-wrapper {
    display: flex;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 2;
  }

  .add-item-button {
    align-items: flex-end;
    justify-content: space-between;
    margin: 10px;
  }

  .add-item-title {
    padding: 0 10px 10px 0;
    width: fit-content;
    max-width: 90%;
    margin: 0;
    text-align: right;
    text-transform: uppercase;
    font-size: 15pt;
    font-weight: 600;
    max-height: 50%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>