<template>
  <div
    :class="
      loading
        ? 'button-standard-with-icon loading'
        : 'button-standard-with-icon'
    "
  >
    <h5 v-if="!loading && text">{{ text }}</h5>
    <h5 v-if="loading">Loading</h5>
    <img
      v-if="icon"
      :src="icon"
      :class="text ? 'companion-icon' : 'sole-icon'"
    />
  </div>
</template>

<script>
export default {
  props: ["text", "icon", "loading"],
};
</script>

<style scoped>
@media screen {
  .button-standard-with-icon {
    display: flex;
    height: 35px;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    color: var(--textColor);
    border: 1px solid var(--textColor);
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

  img {
    max-height: 13px;
    min-height: 13px;
    width: 13px;
    margin: 0px 10px;
  }

  .companion-icon {
    padding-left: 10px;
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