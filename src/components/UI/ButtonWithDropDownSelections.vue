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
      <svg width="13.604" height="13.604" viewBox="0 0 13.604 13.604">
        <path
          d="M13.6,6.8A6.8,6.8,0,1,1,6.8,0,6.8,6.8,0,0,1,13.6,6.8ZM5.6,3.62V6.8H3.651a.329.329,0,0,0-.233.562L6.569,10.5a.326.326,0,0,0,.464,0l3.151-3.135A.329.329,0,0,0,9.951,6.8H8.009V3.62a.33.33,0,0,0-.329-.329H5.924A.33.33,0,0,0,5.6,3.62Z"
        />
      </svg>
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
  /* z-index: 1; */
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
  /* z-index: 2; */
  /* position: relative; */
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
  z-index: 3;
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
  position: relative;
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

svg {
  margin: 5px;
}
</style>