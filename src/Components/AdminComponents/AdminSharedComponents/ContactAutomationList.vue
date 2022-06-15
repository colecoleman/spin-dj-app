<template>
  <base-card
    svg="automation"
    title="Automation"
    actionIcon="edit-pen"
    @action-one-clicked="toggleAddAutomationsOpen"
  >
    <template v-slot:content>
      <div id="add-automations-wrapper" v-if="addAutomationsOpen">
        <div
          class="automations-section"
          v-for="event in events"
          :key="event.userId"
        >
          <h5>
            {{ eventTitle(event) }}
          </h5>
          <div class="bubble-wrapper">
            <input-with-binary-selection
              v-for="automation in contactTypeAutomations"
              :key="automation.id"
              :item="automation.title"
              :checked="checkForAutomation(automation, event)"
              @clicked="toggleAutomationIncluded(automation, event)"
            />
          </div>
        </div>
      </div>
      <div id="list-wrapper" v-if="!addAutomationsOpen">
        <automation-list-item
          v-for="automation in automations"
          :key="automation.id"
          :automation="automation"
          @automation-deleted="automationDeleted"
          @automation-approved="automationApproved"
        />
        <div id="empty-automations" v-if="automations.length <= 0">
          <p class="bold">There are no automations for this event!</p>
          <p>Add some in settings to make your life easier.</p>
        </div>
      </div>
    </template>
  </base-card>
</template>

<script>
import InputWithBinarySelection from "../../SharedComponentsUI/ElementLibrary/InputWithBinarySelection.vue";
import AutomationListItem from "./AutomationListItem.vue";
import { formatDate } from "../../../helpers.js";
export default {
  data() {
    return {
      automations: [],
      addAutomationsOpen: false,
    };
  },
  computed: {
    contactTypeAutomations() {
      let automations = this.$store.getters.automations;
      return automations.filter((x) => {
        return x.contactType == this.contact.role;
      });
    },
  },
  methods: {
    eventTitle(event) {
      return event.title ? event.title : formatDate(event.data.date);
    },
    toggleAddAutomationsOpen() {
      this.addAutomationsOpen = !this.addAutomationsOpen;
    },
    checkForAutomation(automation) {
      let id;
      if (automation.id) {
        id = automation.id;
      }
      if (automation.configId) {
        id = automation.configId;
      }
      if (this.automations.findIndex((x) => x.configId == id) > -1) {
        return true;
      } else {
        return false;
      }
    },
    async toggleAutomationIncluded(automation, event) {
      if (this.checkForAutomation(automation)) {
        let index = this.automations.findIndex(
          (x) => x.configId == automation.id
        );
        let targetAutomation = this.automations[index].id;
        await this.$store.dispatch("adminDeleteAutomation", targetAutomation);
        this.automations.splice(index, 1);
      } else {
        let payload = {
          contactId: this.contact.userId,
          eventId: event.userId,
          configId: automation.id,
          automation: automation,
          targetDate: event.data.startTime,
        };
        await this.$store
          .dispatch("adminManualAddAutomation", payload)
          .then((res) => {
            this.automations.push(res.data);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    automationDeleted(id) {
      let deleteIndex = this.automations.findIndex((x) => {
        return x.id === id;
      });
      this.automations.splice(deleteIndex, 1);
    },
    automationApproved(id) {
      let editIndex = this.automations.findIndex((x) => {
        return x.id === id;
      });
      this.automations[editIndex].approved = true;
    },
  },
  components: {
    AutomationListItem,
    InputWithBinarySelection,
  },
  async created() {
    await this.$store
      .dispatch(`getContactAutomations`, this.$route.params.id)
      .then((res) => {
        this.automations = [...res.Items];
      });
  },

  props: ["automationType", "events", "contact"],
};
</script>

<style scoped>
#list-wrapper,
#add-automations-wrapper {
  height: 90%;
  max-height: 90%;
  max-width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
}

.automations-section h5,
.automations-section p {
  text-transform: uppercase;
  margin: 0;
  text-align: left;
}

.bubble-wrapper {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  border-bottom: 1px solid var(--textColor);
}

#empty-automations {
  height: 100%;
  align-content: center;
  align-items: center;
  justify-items: center;
  justify-content: center;
}
</style>