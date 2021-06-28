<template>
  <transition>
    <div class="container-div">
      <div class="left-div">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="21"
          viewBox="0 0 21 21"
          @click="selectButton(id)"
          @mousedown.prevent=""
        >
          <path
            id="Icon_feather-circle"
            data-name="Icon feather-circle"
            d="M22,12.5A9.5,9.5,0,1,1,12.5,3,9.5,9.5,0,0,1,22,12.5Z"
            transform="translate(-2 -2)"
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          />
          <circle
            id="Ellipse_40"
            data-name="Ellipse 40"
            cx="7"
            cy="7"
            r="7"
            transform="translate(3.5 3.5)"
            :fill="getButtonColor"
          />
        </svg>

        <h4 :class="strikethough">{{ type }}</h4>
      </div>
      <div class="right-div">
        <h5>{{ client }}</h5>
        <p>{{ status }}, {{ value }}</p>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: ["id", "type", "client", "status", "value"],
  data() {
    return {
      buttonSelected: false,
    };
  },
  methods: {
    selectButton(id) {
      this.buttonSelected = true;
      console.log("Booyah!");
      setTimeout(() => {
        this.$emit("remove-task", id);
      }, 300);
      console.log(id);
    },
  },
  computed: {
    getButtonColor() {
      return this.buttonSelected ? "#ffffff" : "#000000";
    },
    strikethough() {
      return this.buttonSelected ? "strike" : null;
    },
  },
  beforeUnmount() {
    this.buttonSelected = true;
  },
};
</script>



<style scoped>
.left-div {
  flex: 1;
  display: flex;
  flex-direction: row;
}

.right-div {
  flex: 1;
  display: flex;
  flex-direction: column;
  text-align: right;
  margin: 0;
  align-content: center;
}

.right-div > h5 {
  margin: 0;
  font-weight: 500;
  text-transform: uppercase;
}

.right-div > p {
  margin: 2px;
  font-size: 10pt;
  text-transform: uppercase;
}

.container-div {
  display: flex;
  flex-direction: row;
  width: 100%;
  align-content: center;
  align-items: center;
  padding: 10px;
}

.left-div > svg {
  margin-right: 10px;
  cursor: pointer;
}

.strike {
  position: relative;
  display: inline-block;
}
@keyframes strike {
  from {
    width: 0%;
  }
  to {
    width: 110%;
  }
}
.strike::before {
  content: "";
  border-bottom: 2px solid white;
  width: 110%;
  position: absolute;
  right: 10;
  top: 50%;
  animation-name: strike;
  animation-duration: 0.75s;
}
</style>