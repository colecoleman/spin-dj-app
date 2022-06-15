<template>
  <div>
    <round-icon-button class="icon" svg="dashboard" @click="clicked('Home')" />
    <round-icon-button class="icon" svg="music" @click="clicked('Library')" />
  </div>
</template>
<script>
import RoundIconButton from "../../../../Components/SharedComponentsUI/RoundIconButton.vue";
export default {
  methods: {
    clicked(icon) {
      this.$emit("navigate", icon);
    },
  },
  emits: ["navigate"],
  props: ["active"],
  components: {
    RoundIconButton,
  },
};
</script>
<style scoped>
.icon {
  height: 55px;
  width: 55px;
  border-radius: 30px;
  margin: 5px;
}

div {
  display: flex;
  width: 100%;
  justify-content: center;
}
</style>
