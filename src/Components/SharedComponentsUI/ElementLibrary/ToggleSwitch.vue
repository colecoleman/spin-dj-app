<template>
  <div class="wrapper">
    <p>{{ options[0].value }}</p>
    <Transition mode="out-in">
      <div
        v-if="selection === this.options[0].value"
        class="switch-wrapper left"
        @click="toggleSwitch"
      >
        <div class="switch left">
          <img :src="options[0].icon" alt="" v-if="options[0].icon" />
        </div>
      </div>
      <div v-else class="switch-wrapper right" @click="toggleSwitch">
        <div class="switch right">
          <img :src="options[1].icon" alt="" v-if="options[1].icon" />
        </div>
      </div>
    </Transition>
    <p>{{ options[1].value }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // options: [
      //   {
      //     value: "AM",
      //     icon: Sun,
      //   },
      //   {
      //     value: "PM",
      //     icon: Moon,
      //   },
      // ],
    };
  },
  computed: {
    selection: {
      get() {
        return this.options[0].value;
      },
      set(val) {
        return val;
        // this.$emit("toggle", val);
      },
    },
  },
  methods: {
    toggleSwitch() {
      if (this.selection === this.options[0].value) {
        this.selection = this.options[1].value;
      } else {
        this.selection = this.options[0].value;
      }
    },
  },
  created() {},
  components: {},
  //   props: ["options"],
};
</script>
<style scoped>
div {
  display: flex;
  align-items: center;
}
.wrapper {
  margin: 150px;
  display: flex;
  align-items: center;
}
.switch-wrapper {
  height: 20px;
  width: 40px;
  margin: 0px 5px;
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid var(--textColor);
  border-radius: 10px;
}

.switch-wrapper.left {
  background-color: var(--foregroundColor);
}

.switch-wrapper.right {
  background-color: var(--backgroundColor);
}

.switch {
  height: 80%;
  position: absolute;
  margin: 3px;
  filter: drop-shadow(0px 0px 1px var(--textColor));
  border-radius: 50%;
  width: 40%;
  justify-content: center;
}

.switch.left {
  background-color: var(--backgroundColor);
  left: 0;
}

.switch.right {
  background-color: var(--foregroundColor);
  right: 0;
}

.switch > img {
  height: 80%;
}

p {
  text-transform: capitalize;
}
</style>