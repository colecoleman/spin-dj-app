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

    <round-icon-button
      svg="circle-checkmark"
      @click="approveAutomation"
      v-if="!automation.approved"
    />
  </div>
</template>

<script>
import RoundIconButton from "../../../../SharedComponents/SharedComponentsUI/RoundIconButton.vue";
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
  },
};
</script>

<style scoped>
#item-wrapper {
  width: 100%;
  margin: 0;
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  margin-bottom: 10px;
  border: 1px solid var(--cardOutline);
  border-radius: 10px;
  background-color: var(--foregroundColor);
  filter: drop-shadow(0px 1px 2px var(--cardOutline));
  /* border-bottom: 1px solid var(--textColor); */
}

.left-div {
  text-align: left;
}

p {
  margin: 5px;
}
</style>