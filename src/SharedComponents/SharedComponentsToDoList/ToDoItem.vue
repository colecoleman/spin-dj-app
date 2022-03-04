<template>
  <div id="to-do-item" @click="clickToDo(toDo)">
    <vue-svg
      svg="fillable-circle"
      :customStyle="toDo.completed ? completedSvg : uncompletedSvg"
    />
    <h4 :class="clicked || toDo.completed ? `strike` : ``">{{ toDo.title }}</h4>
  </div>
</template>

<script>
import VueSvg from "../../assets/VueSvg.vue";
export default {
  data() {
    return {
      clicked: false,
      completedSvg:
        "width: 14px; height: 14px; fill: currentColor: stroke: currentColor",
      uncompletedSvg: "fill: none; stroke: currentColor",
    };
  },
  props: ["toDo"],
  methods: {
    clickToDo(toDo) {
      this.clicked = true;
      setTimeout(() => {
        this.$store.dispatch("completeToDo", {
          id: toDo.userId,
          variable: "completed",
          value: !toDo.completed,
        });
      }, 500);
      toDo.completed = !toDo.completed;
    },
  },
  components: { VueSvg },
};
</script>

<style scoped>
#to-do-item {
  height: 30px;
  display: flex;
  align-items: center;
}

h4 {
  margin: 10px;
  font-size: 10pt;
}

@keyframes strike {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}
.strike {
  position: relative;
}
.strike::after {
  content: " ";
  position: absolute;
  top: 50%;
  left: 0;
  height: 1px;
  background: var(--textColor);
  animation-name: strike;
  animation-duration: 0.3s;
  animation-timing-function: linear;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
</style>