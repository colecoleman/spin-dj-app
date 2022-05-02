<template>
  <div :class="hoverable ? 'hoverable list-item-wrapper' : 'list-item-wrapper'">
    <h4 v-if="title" class="list-item-title">
      <span>{{ title }}</span>
    </h4>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: ["hoverable", "title"],
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
  position: relative;
}
.list-item-title {
  position: absolute;
  top: -5px;
  font-size: 10px;
  left: 5px;
  filter: drop-shadow(0px 0px 3px var(--foregroundColor));
}
.list-item-title span {
  background-color: var(--foregroundColor);
  padding: 2px 5px;
}
.hoverable {
  cursor: pointer;
}

.hoverable:hover {
  filter: drop-shadow(0px 2px 1px var(--cardOutline));
}
</style>