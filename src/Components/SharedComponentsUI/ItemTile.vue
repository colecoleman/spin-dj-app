<template>
  <div class="item-tile">
    <slot></slot>
  </div>
</template>
<style scoped>
.item-tile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 135px;
  height: 135px;
  border-radius: 5px;
  filter: drop-shadow(0px 4px 3px var(--cardOutline));
  background-color: var(--foregroundColor);
  cursor: pointer;
}

.item-tile:hover {
  filter: drop-shadow(0px 6px 4px var(--cardOutline));
}

.item-tile > p {
  margin: 0 0 20px 0;
  font-size: 11px;
}
</style>
