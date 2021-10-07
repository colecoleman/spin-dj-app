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
    <div class="primary-container">
      <h5>{{ text }}</h5>
      <img :src="dropdownArrow" alt="" />
    </div>
    <div v-if="actionsActive">
      <div
        class="actions-item"
        v-for="action in actions"
        :key="action.title"
        @click="action.action(action.title)"
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
  },

  props: ["text", "actions"],
};
</script>

<style scoped>
.button-standard-with-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
  text-transform: uppercase;
  width: 100%;
  border: 1px solid var(--textColor);
  border-radius: 7px;
}

.primary-container > img {
  height: 14px;
  width: 14px;
  margin: 5px;
}

.inactive {
  background-color: var(--foregroundColor);
}

.active {
  background-color: var(--foregroundColor);
  color: var(--textColor);
  z-index: 3;
  position: absolute;
}

.actions-item {
  display: flex;
  flex-direction: row;
}

.actions-item > h5:hover {
  font-weight: 600;
}

.danger {
  color: red;
}

.primary-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  justify-content: center;
  position: relative;
}

.button-standard-with-icon:hover {
  cursor: pointer;
}

.actions-item {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.actions-item > img {
  height: 12px;
  width: 12px;
  margin-right: 10px;
}

.inactive:hover {
  background-color: gray;
}

h5 {
  margin: 10px 0;
}
</style>