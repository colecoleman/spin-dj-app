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
  width: 120px;
  height: 120px;
  border-radius: 5px;
  filter: drop-shadow(0px 4px 3px var(--cardOutline));
  background-color: var(--foregroundColor);
  cursor: pointer;
}

.item-tile > p {
  margin: 0 0 20px 0;
  font-size: 8px;
}

@media screen and (min-width: 800px) {
  .item-tile {
    width: 135px;
    height: 135px;
  }

  .item-tile > p {
    font-size: 11px;
  }
}
</style>
