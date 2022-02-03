<template>
  <div
    :class="
      actionsActive
        ? 'active button-standard-with-icon'
        : 'inactive button-standard-with-icon'
    "
    @click="actionsClicked()"
    @mousedown.prevent=""
  >
    <div class="heading-container">
      <h5>{{ text }}</h5>
      <img :src="dropdownArrow" alt="" />
    </div>
    <div v-if="actionsActive" class="dropdown">
      <div
        class="actions-item"
        v-for="action in actions"
        :key="action.title"
        @click="
          action.action
            ? action.action(action.title)
            : buttonClicked(action.parameter)
        "
      >
        <img v-if="action.icon" :src="action.icon" alt="" />
        <h5 :class="action.danger ? 'danger' : ''">
          {{ action.title }}
        </h5>
      </div>
    </div>
  </div>
</template>

<script>
import dropdownArrow from "../../assets/SVGs/dropdown-arrow.svg";
export default {
  data() {
    return {
      dropdownArrow,
      actionsActive: false,
    };
  },
  methods: {
    actionsClicked() {
      this.actionsActive = !this.actionsActive;
    },
    buttonClicked(param) {
      this.$emit("button-clicked", param);
    },
  },

  props: ["text", "actions"],
};
</script>

<style scoped>
.button-standard-with-icon {
  position: absolute;
  z-index: 2;
  width: 100%;
  text-transform: uppercase;
  border: 1px solid var(--textColor);
  border-radius: 7px;
  background-color: var(--foregroundColor);
}

.active {
  z-index: 3;
}

.heading-container > img {
  margin: 5px;
}

.actions-item {
  display: flex;
  flex-direction: row;
}

.danger {
  color: red;
}

.heading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.button-standard-with-icon:hover {
  cursor: pointer;
}

.actions-item {
  justify-content: center;
  align-items: center;
}

.actions-item > img {
  height: 12px;
  margin-right: 10px;
}

.inactive:hover {
  background-color: gray;
}

h5 {
  margin: 10px 0;
}
</style>
