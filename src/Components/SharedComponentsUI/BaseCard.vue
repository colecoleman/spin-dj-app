<template>
  <div :class="loading ? 'loading-background card' : 'card'">
    <div
      :class="soloHeading ? 'solo-heading' : 'heading'"
      v-if="svg || title || subtitle || actionIcon"
    >
      <vue-svg :svg="svg" v-if="svg" class="svg" />
      <div class="title">
        <h3 v-if="title">
          {{ title }}
        </h3>
        <h5 v-if="subtitle" class="subtitle">
          {{ subtitle }}
        </h5>
      </div>
      <div class="right-top">
        <h3 @click="actionOneClicked()" v-if="actionText">
          {{ actionText }}
        </h3>

        <search-icon
          class="search-container right-icon"
          :svg="searchProcessing ? 'loading' : 'search'"
          v-if="searchIcon"
          :searchResults="searchResults"
          :searchResultFormat="searchResultFormat"
          :inputValue="inputValue"
          @input="searchInput"
          @search-icon-clicked="searchIconClicked"
          @search-blurred="searchBlurred"
          @select-search-result="selectSearchResult"
        />

        <round-icon-button
          class="right-icon"
          v-if="actionIcon"
          @click="actionOneClicked"
          :svg="actionIcon"
        />
        <div class="dropdown-container">
          <slot name="dropdownContainer"></slot>
        </div>
      </div>
    </div>
    <div v-if="!soloHeading" :class="title ? 'content' : 'sole-content'">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
import RoundIconButton from "./RoundIconButton.vue";
import SearchIcon from "./SearchIconWithExpandingField.vue";
import VueSvg from "../../assets/VueSvg.vue";
export default {
  props: [
    "svg",
    "actionIcon",
    "loading",
    "actionText",
    "title",
    "subtitle",
    "soloHeading",
    "searchIcon",
    "searchProcessing",
    "searchResults",
    "searchResultFormat",
    "inputValue",
  ],
  methods: {
    actionOneClicked() {
      this.$emit("actionOneClicked");
    },
    searchInput(value) {
      this.$emit("search-input", value);
    },
    searchBlurred() {
      this.$emit("search-blurred");
    },
    selectSearchResult(value) {
      this.$emit("select-search-result", value);
    },
    searchIconClicked() {
      this.$emit("search-icon-clicked");
    },
  },
  emits: [
    "actionOneClicked",
    "search-input",
    "search-blurred",
    "search-icon-clicked",
  ],
  components: { VueSvg, RoundIconButton, SearchIcon },
};
</script>

<style scoped>
@media print {
  .content,
  .card {
    display: block !important;
    position: relative !important;
    width: auto !important;
    height: auto !important;
    overflow: visible !important;
    margin-left: 0 !important;
  }
  .heading {
    visibility: hidden;
  }
}

.card {
  border-radius: 12px;
  background-color: var(--foregroundColor);
  box-sizing: border-box;
  filter: drop-shadow(0px 2px 2px var(--cardOutline));
  width: 100%;
  height: 100%;
}

.content {
  padding: 0 20px 0 20px;
  max-height: calc(100% - 44px);
  height: calc(100% - 44px);
  display: inherit;
  overflow: visible;
}

.sole-content {
  padding: 0 20px 0 20px;
  height: 100%;
  display: inherit;
}

.heading,
.title,
.right-top,
.solo-heading {
  display: flex;
  align-items: center;
  text-transform: uppercase;
  color: var(--textColor);
}

.heading,
.solo-heading {
  padding: 0 20px 0 20px;
  height: 44px;
  width: calc(100% - 40px);
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: 20px minmax(0, 1fr) 25px 25px;
}

.solo-heading {
  height: 100%;
}
.title {
  flex-direction: column;
  grid-column: 2/3;
  left: 30px;
  word-wrap: normal;
  text-align: left;
  align-items: flex-start;
}
.svg {
  width: 14px;
  height: 14px;
  margin: auto;
  grid-column: 1/2;
}
h3,
h4 {
  font-size: 11pt;
  margin: 0 0 0 10px;
  text-align: left;
}

h5 {
  border-top: 1px solid var(--textColor);
  font-size: 8pt;
  text-align: left;
  margin: 0 0 0 10px;
  font-weight: 400;
}

.right-top {
  grid-column: 3/5;
  display: flex;
  width: 100%;
  justify-content: flex-end;
  position: relative;
  height: 100%;
  cursor: pointer;
}

.search-container {
  position: relative;
  z-index: 9;
}

.search-icon {
  position: absolute;
  margin-top: 0;
  top: 0;
  right: 0;
}
.dropdown-container {
  position: absolute;
  left: 100%;
  top: 100%;
}
</style>