<template>
  <div class="input-with-actionable-icon-wrapper">
    <input-with-title
      :title="title"
      class="input"
      :placeholder="placeholder"
      @input="input"
    />
    <round-icon-button @click="clicked" :svg="svg" />
  </div>
</template>
<script>
import InputWithTitle from "./InputWithTitle.vue";
import RoundIconButton from "../RoundIconButton.vue";
export default {
  methods: {
    input(val) {
      this.$emit("input", val);
    },
    clicked() {
      this.$emit("actionable-icon-clicked");
    },
  },
  components: {
    InputWithTitle,
    RoundIconButton,
  },
  emits: ["input", "actionable-icon-clicked"],
  props: ["placeholder", "svg", "title"],
};
</script>
<style scoped>
.input-with-actionable-icon-wrapper {
  display: flex;
  align-items: center;
}

.input {
  padding: 0;
  margin: 0;
}
</style>