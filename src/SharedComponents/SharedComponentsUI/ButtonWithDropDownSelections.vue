<template>
  <div
    :class="
      actionsActive
        ? 'active button-standard-with-icon'
        : 'inactive button-standard-with-icon'
    "
    @click="actionsClicked()"
    @mousedown.prevent=""
    :style="cssVars"
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
  computed: {
    foregroundColor() {
      return this.$store.state.businessSettings.brandingPreferences
        .foregroundColor;
    },
    backgroundColor() {
      return this.$store.state.businessSettings.brandingPreferences
        .backgroundColor;
    },
    textColor() {
      return this.$store.state.businessSettings.brandingPreferences.textColor;
    },
    cssVars() {
      return {
        "--textcolor": this.textColor,
        "--backgroundColor": this.backgroundColor,
        "--foregroundColor": this.foregroundColor,
      };
    },
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
  border: 1px solid var(--textcolor);
  border-radius: 7px;
  fill: white;
  /* z-index: 2; */
  /* position: relative; */
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
  color: var(--textcolor);
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