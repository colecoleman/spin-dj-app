<template>
  <section id="section">
    <p
      v-for="(action, index) in actions"
      :key="index"
      @click="clickAction(action.sortLogic)"
    >
      {{ action.title }}
    </p>
  </section>
</template>

<script>
export default {
  methods: {
    clickAction(action) {
      this.$emit("actionClicked", action, this.identifier);
    },
  },

  props: ["actions", "identifier"],
  components: {},
};
</script>

<style scoped>
#section {
  position: absolute;
  padding: 10px;
  top: 15px;
  right: 0;
  background-color: var(--foregroundColor);
  width: fit-content;
  height: fit-content;
  z-index: 100;
  box-shadow: 0px 12px 10px rgba(122, 122, 122, 0.4);
  border: 1px solid var(--cardOutline);
  border-top: 0;
  border-radius: 5px 5px 15px 15px;
}

p {
  margin: 15px;
  white-space: nowrap;
}

p:hover {
  font-weight: bold;
  margin-left: 11px;
  cursor: pointer;
}
</style>