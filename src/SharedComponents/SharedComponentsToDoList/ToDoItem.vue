<template>
  <div id="to-do-item" @click="clickToDo(toDo)">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="21"
      viewBox="0 0 21 21"
    >
      <path
        id="Icon_feather-circle"
        data-name="Icon feather-circle"
        d="M22,12.5A9.5,9.5,0,1,1,12.5,3,9.5,9.5,0,0,1,22,12.5Z"
        transform="translate(-2 -2)"
        :fill="clicked || toDo.completed ? 'currentColor' : `none`"
        stroke="currentColor"
        stroke-width="1"
      />
    </svg>
    <h4 :class="clicked || toDo.completed ? `strike` : ``">{{ toDo.title }}</h4>
  </div>
</template>

<script>
import circleSvg from "../../assets/SVGs/fillable-circle.svg";

export default {
  data() {
    return {
      circleSvg,
      clicked: false,
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