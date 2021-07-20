<template>
  <div id="to-do-item" @click="clickToDo(toDo.id)" :style="cssVars">
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
        :fill="clicked || toDo.completed ? textColor : `none`"
        :stroke="textColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
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
    clickToDo(id) {
      if (!this.toDo.completed) {
        this.clicked = true;
        setTimeout(() => {
          this.$store.dispatch("completeToDo", id);
          console.log("bitchass", id);
        }, 500);
      }
    },
  },
  computed: {
    foregroundColor() {
      return this.$store.state.businessSettings.brandingPreferences
        .foregroundColor;
    },
    cardOutline() {
      return this.$store.state.businessSettings.brandingPreferences.cardOutline;
    },
    textColor() {
      return this.$store.state.businessSettings.brandingPreferences.textColor;
    },
    cssVars() {
      return {
        "--cardOutline": this.cardOutline,
        "--foregroundColor": this.foregroundColor,
        "--textColor": this.textColor,
      };
    },
  },
};
</script>

<style scoped>
#to-do-item {
  height: 50px;
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
}

h4 {
  margin: 10px;
  text-align: left;
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
  width: 100%;
  height: 2px;
  background: var(--textColor);
  animation-name: strike;
  animation-duration: 0.3s;
  animation-timing-function: linear;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
</style>