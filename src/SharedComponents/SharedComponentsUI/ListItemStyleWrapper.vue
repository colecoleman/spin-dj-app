<template>
  <div :class="hoverable ? 'hoverable list-item-wrapper' : 'list-item-wrapper'">
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: ["hoverable"],
};
</script>
<style scoped>
.list-item-wrapper {
  background-color: var(--foregroundColor);
  border: 1px solid var(--cardOutline);
  filter: drop-shadow(0px 1px 1px var(--cardOutline));
  border-radius: 10px;
  margin: 10px;
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.hoverable {
  cursor: pointer;
}

.hoverable:hover {
  filter: drop-shadow(0px 2px 1px var(--cardOutline));
}
</style>