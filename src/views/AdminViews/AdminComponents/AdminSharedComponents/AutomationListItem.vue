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
      <button-standard-with-icon svg="trash-can" @click="deleteAutomation" />
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
    deleteAutomation() {
      this.$store
        .dispatch("adminDeleteAutomation", this.automation.id)
        .then(() => {
          this.$emit("automationDeleted", this.automation.id);
        });
    },
  },
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
}

.left-div {
  text-align: left;
  /* width: auto; */
}
.right-div {
  max-width: 30%;
  /* width: 40%; */
  /* width: auto; */
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