<template>
  <div
    :class="
      loading
        ? 'button-standard-with-icon loading'
        : 'button-standard-with-icon'
    "
  >
    <h5 v-if="!loading">{{ text }}</h5>
    <h5 v-if="loading">Loading</h5>
    <img v-if="icon" :src="icon" alt="" />
  </div>
</template>

<script>
export default {
  props: ["text", "icon", "loading"],
};
</script>

<style scoped>
.button-standard-with-icon {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  /* margin: 1%; */
  border: 1px solid var(--textColor);
  border-radius: 7px;
  cursor: pointer;
}

.loading {
  animation: spin 0.5s linear infinite;
}

.button-standard-with-icon:hover {
  background-color: gray;
}

.button-standard-with-icon:active {
  filter: invert(100%);
}

img {
  height: 15px;
  width: 15px;
}

h5 {
  margin: 10px;
}
</style>