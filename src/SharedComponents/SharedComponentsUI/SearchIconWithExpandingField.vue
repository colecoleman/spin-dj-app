<template>
  <div class="round-button-wrapper">
    <div class="search-components">
      <input
        type="text"
        v-if="searchActive"
        placeholder="Start typing to search..."
        id="search-input"
        v-model="value"
        @blur="blur"
        @keydown="keydown()"
      />
      <vue-svg :svg="svg" @clicked="toggleSearchActive" />
    </div>
    <div class="search-results" v-if="searchActive">
      <list-item-style-wrapper
        class="search-result-item"
        v-for="(item, index) in searchResults"
        :key="index"
        @click="selectSearchResult(item)"
      >
        <p>{{ dropdownItemDisplay(item) }}</p>
      </list-item-style-wrapper>
    </div>
  </div>
</template>
<script>
import VueSvg from "../../assets/VueSvg.vue";
import ListItemStyleWrapper from "./ListItemStyleWrapper.vue";
export default {
  data() {
    return {
      searchActive: false,
      dropdownOpen: true,
      //   inputValue: undefined,
    };
  },
  computed: {
    value: {
      get() {
        return this.inputValue;
      },
      set(val) {
        return this.$emit("input", val);
      },
    },
  },
  methods: {
    keydown() {
      this.dropdownOpen = true;
    },
    blur() {
      setTimeout(() => {
        this.dropdownOpen = false;
      }, 300);
      this.toggleSearchActive();
      this.$emit("search-blurred");
    },
    selectSearchResult(item) {
      this.$emit("select-search-result", item);
    },
    dropdownSelected(item) {
      this.$emit("dropdownSelected", item);
    },
    dropdownItemDisplay(item) {
      console.log(item);
      let str = "";
      this.searchResultFormat.forEach((element) => {
        str = str + " " + item[element];
      });
      return str;
    },
    toggleSearchActive() {
      this.searchActive = !this.searchActive;
    },
  },
  components: {
    VueSvg,
    ListItemStyleWrapper,
  },
  emits: ["input", "search-blurred", "select-search-result"],
  props: ["svg", "searchResults", "searchResultFormat", "inputValue"],
};
</script>
<style scoped>
.round-button-wrapper {
  width: auto;
  height: auto;
  min-height: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
  padding: 3px;
  border-radius: 20px;
  box-sizing: border-box;
  background-color: var(--foregroundColor);
  filter: drop-shadow(0px 1px 1px var(--cardOutline));
  /* border: 1px solid var(--cardOutline); */
  margin: 10px;
  z-index: 5;
}

input {
  outline: none;
  border: none;
  margin-left: 10px;
  padding-bottom: 3px;
  box-sizing: border-box;
}

input:focus {
  outline: none;
}

.search-components {
  height: auto;
  width: 100%;
  display: flex;
}
.search-results {
  width: calc(100% - 20px);
  box-sizing: border-box;
}
.search-result-item {
  width: 100%;
  box-sizing: border-box;
  margin-left: 0;
  margin-right: 0;
}

.round-button-wrapper:hover {
  filter: drop-shadow(0px 2px 2px var(--cardOutline));
}

@media screen and (min-width: 800px) {
  .round-button-wrapper {
    /* width: auto; */
    min-height: 35px;
    height: auto;
    padding: 5px;
  }
}
</style>
