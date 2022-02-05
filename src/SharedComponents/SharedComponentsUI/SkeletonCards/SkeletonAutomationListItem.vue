<template>
  <div id="item-wrapper">
    <div class="left-div">
      <p class="skeleton title"></p>
      <p class="skeleton"></p>
      <p class="skeleton"></p>
    </div>
    <div class="right-div">
      <skeleton-button />
    </div>
  </div>
</template>

<script>
import SkeletonButton from "./SkeletonButton.vue";

export default {
  components: { SkeletonButton },
};
</script>

<style scoped>
#item-wrapper {
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.left-div {
  text-align: left;
  width: 70%;
}
.right-div {
  max-width: 30%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}

.right-div > * {
  margin-left: 10px;
}

.skeleton {
  margin: 5px;
  background-color: var(--textColor);
  height: 9px;
  width: 150px;
}
</style>