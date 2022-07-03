<template>
  <div class="floating-card">
    <slot></slot>
  </div>
</template>
<style scoped>
.floating-card {
  height: fit-content;
  width: fit-content;
  position: fixed;
  padding: 10px;
  background-color: var(--foregroundColor);
  border-radius: 10px;
  filter: drop-shadow(0px 4px 3px var(--cardOutline));
}
</style>