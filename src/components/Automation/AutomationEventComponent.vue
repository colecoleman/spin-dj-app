<template>
  <base-card>
    <template v-slot:icon>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15.273"
        height="21"
        viewBox="0 0 15.273 21"
      >
        <path
          id="Icon_material-autorenew"
          data-name="Icon material-autorenew"
          d="M11.136,5.648V8.511l3.818-3.818L11.136.875V3.739a7.623,7.623,0,0,0-6.453,11.7l1.394-1.394a5.6,5.6,0,0,1-.668-2.673A5.732,5.732,0,0,1,11.136,5.648Zm6.453,1.661L16.2,8.7a5.718,5.718,0,0,1-5.059,8.4V14.239L7.318,18.057l3.818,3.818V19.011a7.623,7.623,0,0,0,6.453-11.7Z"
          transform="translate(-3.5 -0.875)"
          fill="#fff"
        />
      </svg>
    </template>
    <template v-slot:title>Automation</template>
    <template v-slot:content
      ><div id="list-wrapper">
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
        </div></div
    ></template>
  </base-card>
</template>

<script>
import ButtonStandardWithIcon from "../UI/ButtonStandardWithIcon.vue";
import AutomationContactListItem from "./AutomationContactListItem.vue";
import AutomationContactListItemApproved from "./AutomationContactListItemApproved.vue";
import BaseCard from "../UI/BaseCard.vue";
export default {
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
    BaseCard,
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
  margin: 0 20%;
}
</style>