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
        :icon="SVGs.CircleCheckmarkSVG"
        @click="approveAutomation"
        v-if="!automation.approved"
      >
      </button-standard-with-icon>
      <button-standard-with-icon
        :icon="SVGs.TrashCanSVG"
        @click="deleteAutomation"
      ></button-standard-with-icon>
    </div>
  </div>
</template>

<script>
import SVGs from "../../../../assets/SVGs/svgIndex.js";
import helpers from "../../../../helpers.js";

export default {
  data() {
    return {
      SVGs,
    };
  },
  methods: {
    formatDate: helpers.formatDate,
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
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.left-div {
  text-align: left;
  width: 70%;
}
.right-div {
  max-width: 30%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}

.right-div > * {
  margin-left: 10px;
}

p {
  margin: 5px;
}
</style>