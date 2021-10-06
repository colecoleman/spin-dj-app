<template>
  <section id="section">
    <div>
      <p
        v-for="(action, index) in actions.left"
        :key="index"
        @click="selectLeft(action)"
        :class="action === currentLeftSelected ? 'selected' : ''"
      >
        {{ action }}
      </p>
    </div>
    <div>
      <p
        v-for="(action, index) in actions.right"
        :key="index"
        @click="selectRight(index)"
        :class="index === currentRightSelected - 1 ? 'selected' : ''"
      >
        {{ action }}
      </p>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      selections: {
        left: undefined,
        right: undefined,
      },
      currentLeftSelected: this.currentLeftSelection,
      currentRightSelected: this.currentRightSelection,
    };
  },
  methods: {
    selectLeft(action) {
      this.currentLeftSelected = action;
      this.selections.left = action;
    },
    selectRight(action) {
      this.currentRightSelected = action;
      this.selections.right = action;
      console.log(this.selections);
      console.log(action);
      this.$emit("actionsClicked", this.selections);
    },
  },
  created() {
    console.log(this.actions);
    console.log(this.currentLeftSelected);
    console.log(this.currentRightSelected);
  },

  props: [
    "actions",
    "identifier",
    "currentLeftSelection",
    "currentRightSelection",
  ],
  components: {},
};
</script>

<style scoped>
#section {
  display: flex;
  flex-direction: row;
  position: absolute;
  padding: 10px;
  top: 15px;
  right: 0;
  max-height: 200px;
  background-color: var(--foregroundColor);
  width: fit-content;
  height: fit-content;
  z-index: 100;
  box-shadow: 0px 12px 10px rgba(122, 122, 122, 0.4);
  border: 1px solid var(--cardOutline);
  border-top: 0;
  border-radius: 5px 5px 15px 15px;
}
div {
  overflow: scroll;
}

p {
  margin: 15px;
  white-space: nowrap;
}

p:hover {
  font-weight: bold;
  margin-left: 11px;
  cursor: pointer;
}

.selected {
  font-weight: 600;
}
</style>