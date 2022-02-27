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
  emits: ["button-clicked"],
  props: ["text", "actions"],
};
</script>

<style scoped>
@media screen {
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
    border: 1px solid var(--textColor);
    border-radius: 7px;
    cursor: pointer;
  }
  .heading-container > img {
    margin: 0 3px;
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

  .actions-item > img {
    height: 10px;
    margin-right: 10px;
  }

  .inactive:hover {
    background-color: gray;
  }

  h5 {
    margin: 0px;
    font-size: 0.75em;
  }

  @media (min-width: 850px) {
    .heading-container > img {
      margin: 5px;
    }

    .heading-container {
      height: 100%;
    }

    .actions-item > img {
      height: 12px;
    }

    h5 {
      margin: 10px 0;
    }
  }
}
</style>
