<template>
  <div
    :class="
      actionsActive
        ? 'active button-standard-with-icon'
        : 'inactive button-standard-with-icon'
    "
  >
    <div class="primary-container" @click="actionsActive = !actionsActive">
      <h5>{{ text }}</h5>
      <slot name="icon" style="margin: 5px"></slot>
    </div>
    <div v-if="actionsActive">
      <div
        class="actions-item"
        v-for="action in actions"
        :key="action.title"
        @click="
          action.action(action.title);
          actionsActive = !actionsActive;
        "
      >
        <h5 :class="action.danger ? 'danger' : ''">
          {{ action.title }}
        </h5>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      actionsActive: false,
    };
  },
  methods: {
    actionsClicked() {
      this.actionsActive = !this.actionsActive;
    },
  },
  props: ["text", "actions", "clicked"],
};
</script>

<style scoped>
.button-wrapper {
  z-index: 1;
}

.button-standard-with-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
  text-transform: uppercase;
  width: 100%;
  border: 1px solid white;
  border-radius: 7px;
  fill: white;
  z-index: 100;
  position: relative;
}

.inactive {
  background-color: black;
  color: white;
  fill: white;
}

.active {
  background-color: white;
  color: black;
  fill: black;

  position: absolute;
}

.active > .primary-container > svg {
  transform: rotate(180);
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
}

.inactive:hover {
  background-color: gray;
}

.button-standard-with-icon:active {
  background: white;
  color: black;
  fill: black;
}

h5 {
  margin: 10px 0;
}

#icon {
  margin: 5px;
}
</style>