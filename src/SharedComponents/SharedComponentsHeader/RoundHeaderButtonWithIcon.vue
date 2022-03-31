<template>
  <div class="round-button" @mousedown.prevent="">
    <slot></slot>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {},
  created() {},
  components: {},
  props: [],
};
</script>
<style scoped>
@media screen and (min-width: 320px) {
  .round-button {
    cursor: pointer;
    background-color: var(--foregroundColor);
    border: 1px solid var(--cardOutline);
    margin: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--textColor);
    width: 30px;
    min-width: 30px;
    height: 30px;
    border-radius: 30px;
  }

  .round-button:hover {
    filter: drop-shadow(0px 0px 0.5px var(--textColor));
  }
}

@media screen and (min-width: 800px) {
  .round-button {
    width: 40px;
    min-width: 40px;
    height: 40px;
    border-radius: 40px;
  }
}

@media screen and (min-width: 1200px) {
  .round-button {
    width: 60px;
    min-width: 60px;
    height: 60px;
    border-radius: 60px;
  }
}
</style>