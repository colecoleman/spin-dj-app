<template>
  <list-item-style-wrapper>
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

    <round-icon-button
      svg="circle-checkmark"
      @click="approveAutomation"
      v-if="!automation.approved"
    />
  </list-item-style-wrapper>
</template>

<script>
import RoundIconButton from "../../../../SharedComponents/SharedComponentsUI/RoundIconButton.vue";
import ListItemStyleWrapper from "../../../../SharedComponents/SharedComponentsUI/ListItemStyleWrapper.vue";
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
  components: {
    RoundIconButton,
    ListItemStyleWrapper,
  },
};
</script>

<style scoped>
.left-div {
  text-align: left;
}

p {
  margin: 5px;
}
</style>