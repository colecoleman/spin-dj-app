<template>
  <div class="button-standard-with-icon">
    <h5 v-if="!loading && text">{{ text }}</h5>
    <h5 v-if="loading">Loading</h5>
    <vue-svg
      v-if="svg"
      :svg="svg"
      :customStyle="text ? companionIcon : soleIcon"
    />
  </div>
</template>

<script>
import VueSvg from "../../assets/VueSvg.vue";
export default {
  data() {
    return {
      companionIcon:
        "max-height: 13px; min-height: 13px; width: 13px; margin: 0px 10px;",
      soleIcon:
        "max-height: 13px; min-height: 13px; width: 13px; margin: 0px 10px;",
    };
  },
  props: ["text", "svg", "loading"],
  components: { VueSvg },
};
</script>

<style scoped>
@media screen {
  .button-standard-with-icon {
    display: flex;
    max-height: 35px;
    height: 100%;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    color: var(--textColor);
    border: 1px solid var(--cardOutline);
    border-radius: 7px;
    cursor: pointer;
    box-sizing: border-box;
  }

  .button-standard-with-icon:hover {
    background-color: gray;
  }

  .button-standard-with-icon:active {
    filter: invert(100%);
  }

  h5 {
    padding: 5px;
    color: inherit;
    font-size: 0.75em;
  }

  @media (min-width: 850px) {
    .button-standard-with-icon {
      padding: 10px;
    }
  }
}
</style>