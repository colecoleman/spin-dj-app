<template>
  <div class="button-standard-with-icon">
    <h5 v-if="!processing && text">{{ text }}</h5>
    <vue-svg v-if="processing" class="svg spinning" svg="spinner" />
    <vue-svg v-if="svg" :svg="svg" class="svg" />
  </div>
</template>

<script>
import VueSvg from "../../assets/VueSvg.vue";
export default {
  props: ["text", "svg", "processing"],
  components: { VueSvg },
};
</script>

<style scoped>
@media screen {
  .svg {
    max-height: 13px;
    min-height: 13px;
    width: 13px;
    margin: 0px 10px;
  }
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

  .spinning {
    animation-name: spin;
    animation-duration: 1s;
    animation-direction: normal;
    animation-iteration-count: infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @media (min-width: 850px) {
    .button-standard-with-icon {
      padding: 10px;
    }
  }
}
</style>