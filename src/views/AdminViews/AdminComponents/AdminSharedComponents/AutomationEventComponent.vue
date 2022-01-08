<template>
  <base-card :icon="svg.automationSvg" :loading="loading">
    <template v-slot:title>Automation</template>
    <template v-slot:content
      ><div id="list-wrapper" v-if="automations">
        <automation-list-item
          v-for="automation in automationsPending"
          :key="automation.id"
          :automation-item="automation"
        ></automation-list-item>
        <div
          id="empty-automations"
          v-if="automationsApproved.length < 1 && automationsPending.length < 1"
        >
          <h4>There are no automations for this event!</h4>
          <p>Click the button below to make life easier.</p>
          <div id="button-container">
            <button-standard-with-icon text="Click here!">
            </button-standard-with-icon>
          </div>
        </div></div
    ></template>
  </base-card>
</template>

<script>
import AutomationListItem from "./AutomationListItem.vue";
import automationSvg from "../../../../assets/SVGs/automation.svg";

export default {
  data() {
    return {
      svg: {
        automationSvg,
      },
    };
  },
  computed: {
    automationsPending() {
      return this.$store.state.automations.pending;
    },
    automationsApproved() {
      return this.$store.state.automations.approved;
    },
  },
  props: ["automations", "loading"],
  components: {
    AutomationListItem,
  },
};
</script>

<style scoped>
#list-wrapper {
  height: 90%;
  overflow: scroll;
}

#empty-automations {
  height: 100%;
  align-content: center;
  align-items: center;
  justify-items: center;
  justify-content: center;
}

#button-container {
  width: 60%;
  margin: 0;
}
</style>