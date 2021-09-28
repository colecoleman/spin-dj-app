<template>
  <base-card :icon="automationsvg">
    <template v-slot:title>Automation</template>
    <template v-slot:content>
      <div id="list-wrapper" v-if="automationsPending || automationsApproved">
        <automation-contact-list-item
          v-for="automation in automationsPending"
          :key="automation.id"
          :automation-item="automation"
        ></automation-contact-list-item>
        <automation-contact-list-item-approved
          v-for="automation in automationsApproved"
          :key="automation.id"
          :automation-item-approved="automation"
        ></automation-contact-list-item-approved>
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
        </div>
      </div>
    </template>
  </base-card>
</template>

<script>
import ButtonStandardWithIcon from "../../../../SharedComponents/SharedComponentsUI/ButtonStandardWithIcon.vue";
import AutomationContactListItem from "../../AdminViewsSharedComponents/Automation/AutomationComponents/AutomationContactListItem.vue";
import AutomationContactListItemApproved from "../../AdminViewsSharedComponents/Automation/AutomationComponents/AutomationContactListItemApproved.vue";
import automationsvg from "../../../../assets/SVGs/automation.svg";

export default {
  data() {
    return {
      automationsvg,
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
  components: {
    AutomationContactListItem,
    AutomationContactListItemApproved,
    ButtonStandardWithIcon,
  },
};
</script>

<style scoped>
#list-wrapper {
  height: 90%;
  max-height: 90%;
  width: 100%;
  overflow-y: scroll;
  overflow-x: visible;
}

#empty-automations {
  height: 100%;
  align-content: center;
  align-items: center;
  justify-items: center;
  justify-content: center;
}

#button-container {
  width: 50%;
}
</style>