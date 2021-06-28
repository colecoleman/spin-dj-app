<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<style scoped>
.card {
  background-color: black;
  border-radius: 25px;
  align-items: stretch;
  width: calc(100% - 40px);
  max-width: calc(100% - 80px);
  height: calc(100% - 60px);
  padding: 20px 30px;
  margin: 10px;
}
</style>