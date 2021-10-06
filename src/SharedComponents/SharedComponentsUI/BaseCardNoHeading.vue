<template>
  <div class="card">
    <slot></slot>
  </div>
</template>
<style scoped>
.card {
  background-color: var(--foregroundColor);
  border: 1px solid var(--cardOutline);
  border-radius: 25px;
  align-items: stretch;
  width: calc(100% - 40px);
  max-width: calc(100% - 80px);
  height: calc(100% - 60px);
  padding: 20px 30px;
  margin: 10px;
}
</style>