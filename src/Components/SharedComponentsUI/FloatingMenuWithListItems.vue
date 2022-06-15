<template>
  <section id="section">
    <p
      v-for="(action, index) in actions"
      :key="index"
      @click="clickAction(action.logic)"
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
  display: flex;
  flex-direction: column;
  right: 0%;
  background-color: var(--foregroundColor);
  width: fit-content;
  height: fit-content;
  z-index: 4;
  box-shadow: 0px 8px 8px rgba(122, 122, 122, 0.4);
  border: 1px solid var(--cardOutline);
  border-top: 0;
  border-radius: 0px 0px 15px 15px;
}

p {
  margin: 15px;
  white-space: nowrap;
}

p:hover {
  font-weight: 800;
  margin-left: 14px;
  cursor: pointer;
}
</style>