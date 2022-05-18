<template>
  <div class="search-button-wrapper">
    <div class="search-components">
      <input
        type="text"
        v-if="searchFieldOpen"
        placeholder="Start typing to search..."
        id="search-input"
        v-model="value"
        @blur="blur"
        @keydown="keydown"
      />
      <round-icon-button
        class="search-icon"
        :svg="svg ? svg : 'search'"
        @click="toggleSearchField"
      />
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
  </div>
</template>
<script>
import RoundIconButton from "./RoundIconButton.vue";
import ListItemStyleWrapper from "./ListItemStyleWrapper.vue";
export default {
  data() {
    return {
      searchFieldOpen: false,
      dropdownOpen: true,
    };
  },
  computed: {
    value: {
      get() {
        return this.inputValue;
      },
      set(val) {
        console.log(val);
        return this.$emit("input", val);
      },
    },
    searchActive() {
      if (this.searchResults) {
        if (this.searchResults.length > 0) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
  },
  methods: {
    keydown() {
      this.dropdownOpen = true;
    },
    blur() {
      setTimeout(() => {
        this.dropdownOpen = false;
        this.toggleSearchField();
        this.dropdownOpen = false;
        this.$emit("search-blurred");
      }, 300);
    },
    selectSearchResult(item) {
      console.log(item);
      this.$emit("select-search-result", item);
    },
    dropdownSelected(item) {
      this.$emit("dropdownSelected", item);
    },
    dropdownItemDisplay(item) {
      let str = "";
      this.searchResultFormat.forEach((element) => {
        str = str + " " + item[element];
      });
      return str;
    },
    toggleSearchField() {
      this.searchFieldOpen = !this.searchFieldOpen;
    },
  },
  components: {
    RoundIconButton,
    ListItemStyleWrapper,
  },
  emits: ["input", "search-blurred", "select-search-result"],
  props: [
    "svg",
    "searchResults",
    "searchResultFormat",
    "searchProcessing",
    "inputValue",
  ],
};
</script>
<style scoped>
.search-button-wrapper {
  width: auto;
  height: auto;
  min-height: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  box-sizing: border-box;
  filter: drop-shadow(0px 1px 1px var(--cardOutline));
  margin: 0;
  z-index: 11;
}
.backdrop {
  z-index: 10;
}
.search-components {
  width: 100%;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: auto;
  position: relative;
}
.search-results {
  width: 100%;
  max-height: 200px;
  overflow: scroll;
  padding: 10px;
  margin-top: 5px;
  box-sizing: border-box;
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 50;
  border-radius: 15px;
  background-color: var(--foregroundColor);
}
.search-result-item {
  width: 100%;
  box-sizing: border-box;
  margin-left: 0;
  margin-right: 0;
}

input {
  outline: none;
  padding-left: 10px;
  border-radius: 20px;
  background-color: var(--foregroundColor);
  padding: 10px;
  height: 100%;
  border: none;
  margin-left: 10px;
  box-sizing: border-box;
}

input:focus {
  outline: none;
}

.search-button-wrapper:hover {
  filter: drop-shadow(0px 2px 2px var(--cardOutline));
}

@media screen and (min-width: 800px) {
  .search-button-wrapper {
    /* width: auto; */
    min-height: 35px;
    height: auto;
    /* padding: 5px; */
  }
}
</style>
