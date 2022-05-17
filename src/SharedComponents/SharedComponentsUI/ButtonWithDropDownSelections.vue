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
      <vue-svg
        svg="dropdown-arrow"
        :class="actionsActive ? 'down-arrow svg' : 'svg'"
      />
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
        <vue-svg v-if="action.icon" :svg="action.icon" class="svg" />
        <h5 :class="action.danger ? 'danger' : ''">
          {{ action.title }}
        </h5>
      </div>
    </div>
  </div>
</template>

<script>
import VueSvg from "../../assets/VueSvg.vue";

export default {
  data() {
    return {
      downArrow: "transform: rotate(180deg)",
      upArrow: "",
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
  components: { VueSvg },
  emits: ["button-clicked"],
  props: ["text", "actions"],
};
</script>

<style scoped>
@media screen {
  .svg {
    height: 15px;
    width: 15px;
    margin: 0 5px;
  }

  .down-arrow {
    transform: rotate(180deg);
  }
  .button-standard-with-icon {
    position: absolute;
    width: 100%;
    /* height: 100%; */
    min-height: 35px;
    height: fit-content;
    z-index: 3;
    box-sizing: border-box;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    color: var(--textColor);
    background-color: var(--foregroundColor);
    border: 1px solid var(--cardOutline);
    border-radius: 7px;
    cursor: pointer;
  }

  .actions-item {
    margin: 10px;
    display: flex;
    flex-direction: row;
  }

  .active {
    z-index: 4;
  }

  .danger {
    color: red;
  }

  .heading-container {
    height: 100%;
    /* margin: auto; */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .button-standard-with-icon:hover {
    cursor: pointer;
  }

  .actions-item {
    justify-content: center;
    align-items: center;
  }

  .inactive:hover {
    background-color: gray;
  }

  h5 {
    margin: 10px 0px;
    font-size: 0.75em;
  }

  @media (min-width: 850px) {
    .heading-container {
      height: 100%;
    }

    h5 {
      margin: 10px 0;
    }
  }
}
</style>
