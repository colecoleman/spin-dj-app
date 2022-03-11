<template>
  <div id="item-wrapper">
    <div class="left-div">
      <p class="bold">{{ automation.title }}</p>
      <p class="bold" v-if="automation.contact">
        {{
          automation.contact.given_name + " " + automation.contact.family_name
        }}
      </p>
      <p>Type: {{ capitalizeFirstLetter(automation.action.type) }}</p>
      <p>{{ formatDate(automation.triggerDate) }}</p>
      <p></p>
    </div>
    <div class="right-div">
      <button-standard-with-icon
        svg="circle-checkmark"
        @click="approveAutomation"
        v-if="!automation.approved"
      />
    </div>
  </div>
</template>

<script>
import { formatDate } from "../../../../helpers.js";

export default {
  methods: {
    formatDate,
    capitalizeFirstLetter(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    approveAutomation() {
      let payload = {
        id: this.automation.id,
        payload: {
          variable: "approved",
          value: true,
        },
      };
      this.$store.dispatch("adminApproveAutomation", payload).then(() => {
        this.$emit("automationApproved", this.automation.id);
      });
    },
  },
  emits: ["automationApproved"],
  props: ["automation"],
};
</script>

<style scoped>
#item-wrapper {
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  border-bottom: 1px solid var(--textColor);
}

.left-div {
  text-align: left;
}
.right-div {
  max-width: 30%;
  display: flex;
  flex-direction: row;
  justify-content: right;
}

.right-div > * {
  margin-left: 10px;
}

p {
  margin: 5px;
}
</style>