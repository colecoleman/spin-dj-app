<template>
  <div id="search-bar-wrapper">
    <Transition name="grow">
      <div id="search-bar-container" v-if="searchOpened">
        <input type="text" placeholder="Search Coming Soon..." />
      </div>
    </Transition>
    <round-header-button-with-icon
      :class="searchOpened ? 'cover' : 'button'"
      @click="toggleSearchOpen"
    >
      <vue-svg svg="search" :customStyle="svgStyling" />
    </round-header-button-with-icon>
  </div>
</template>
<script>
import RoundHeaderButtonWithIcon from "./RoundHeaderButtonWithIcon.vue";
import VueSvg from "../../assets/VueSvg.vue";
export default {
  data() {
    return {
      svgStyling: " width: 40%; height: 40%;",
      searchOpened: false,
    };
  },
  methods: {
    toggleSearchOpen() {
      this.searchOpened = !this.searchOpened;
    },
  },
  components: { VueSvg, RoundHeaderButtonWithIcon },
};
</script>
<style scoped>
@media screen and (min-width: 320px) {
  #search-bar-wrapper {
    display: none;
  }
}
@media screen and (min-width: 575px) {
  #search-bar-wrapper {
    height: 100%;
    margin: 10px;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: left;
  }
  #search-bar-container {
    background-color: var(--foregroundColor);
    border: 1px solid var(--cardOutline);
    position: relative;
    border-radius: 50px;
    height: 100%;
    width: 300px;
    display: flex;
    padding-left: 20px;
  }
  input {
    width: 100%;
    padding-right: 40px;
    color: var(--textcolor);
    background: none;
    border: none;
    font-weight: 600;
    font-size: 1em;
    opacity: 1;
  }

  input::placeholder {
    opacity: 0.5;
  }

  input:focus {
    outline: none;
  }
  input {
    font-size: 0.8em;
  }

  .button {
    outline: 3px solid var(--backgroundColor);
    position: absolute;
    right: 0;
    margin: 0;
    height: 100%;
  }

  .button:hover,
  .cover:hover {
    filter: none;
  }
  .cover {
    outline: 3px solid var(--backgroundColor);
    position: absolute;
    top: -11px;
    right: -10px;
    height: 100%;
  }
}

@media screen and (min-width: 1200px) {
  input {
    font-size: 1em;
  }
}

.grow-enter-active {
  animation: grow 0.5s;
}

.grow-leave-active {
  animation: grow 0.5s reverse;
}

@keyframes grow {
  from {
    width: 40px;
    overflow: hidden;
  }
  to {
    width: 300px;
  }
}
</style>