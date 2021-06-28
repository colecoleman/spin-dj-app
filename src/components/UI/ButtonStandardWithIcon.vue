<template>
  <div class="button-standard-with-icon">
    <h5>{{ text }}</h5>
    <slot name="icon" id="icon"></slot>
  </div>
</template>

<script>
export default {
  props: ["text"],
};
</script>

<style scoped>
.button-standard-with-icon {
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  justify-content: center;
  text-transform: uppercase;
  margin: 10px;
  padding: 5px 15px 5px 5px;
  border: 1px solid white;
  border-radius: 7px;
  fill: white;
}

.button-standard-with-icon:hover {
  background-color: gray;
}

.button-standard-with-icon:active {
  background: white;
  color: black;
  fill: black;
}

h5 {
  margin: 10px;
}
</style>