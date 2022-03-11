<template>
  <base-card
    svg="automation"
    title="Automation"
    actionIcon="plus-sign"
    @action-one-clicked="toggleAddAutomationsOpen"
  >
    <template v-slot:content>
      <div id="add-automations-wrapper" v-if="addAutomationsOpen">
        <div
          class="automations-section"
          v-for="contact in contacts"
          :key="contact.userId"
        >
          <h5>{{ contact.given_name + " " + contact.family_name }}</h5>
          <p>{{ contact.role }}</p>
          <div class="bubble-wrapper">
            <input-with-binary-selection
              v-for="automation in contactTypeAutomations(contact.role)"
              :key="automation.id"
              :item="automation.title"
              :checked="checkForAutomation(automation, contact)"
              @clicked="toggleAutomationIncluded(automation, contact)"
            />
          </div>
        </div>
      </div>
      <div id="list-wrapper" v-if="!addAutomationsOpen">
        <automation-list-item
          v-for="automation in automations"
          :key="automation.id"
          :automation="automation"
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
import InputWithBinarySelection from "../../../../SharedComponents/SharedComponentsUI/ElementLibrary/InputWithBinarySelection.vue";
import AutomationListItem from "./AutomationListItem.vue";

export default {
  data() {
    return {
      automations: [],
      addAutomationsOpen: false,
    };
  },
  computed: {
    presentContactTypes() {
      let roles = this.contacts.map((x) => {
        return x.role;
      });
      return [...new Set(roles)];
    },
  },
  methods: {
    contactTypeAutomations(type) {
      let automations = this.$store.state.businessSettings.automations;
      if (type) {
        return automations.filter((x) => {
          return x.contactType == type;
        });
      } else {
        return automations;
      }
    },
    toggleAddAutomationsOpen() {
      this.addAutomationsOpen = !this.addAutomationsOpen;
    },
    checkForAutomation(automation, contact) {
      if (
        this.automations.findIndex(
          (x) => x.configId == automation.id && x.contactId == contact.userId
        ) > -1
      ) {
        return true;
      } else {
        return false;
      }
    },

    async toggleAutomationIncluded(automation, contact) {
      if (this.checkForAutomation(automation, contact)) {
        let index = this.automations.findIndex(
          (x) => x.configId == automation.id
        );
        let targetAutomation = this.automations[index].id;
        await this.$store.dispatch("adminDeleteAutomation", targetAutomation);
        this.automations.splice(index, 1);
      } else {
        let payload = {
          contactId: contact.userId,
          eventId: this.event.userId,
          configId: automation.id,
          automation: automation,
          targetDate: this.event.data.startTime,
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
      .dispatch(`getEventAutomations`, this.$route.params.id)
      .then((res) => {
        console.log(res);
        if (this.contacts.length > 0) {
          this.automations = [...res.Items].map((automation) => ({
            ...automation,
            contact: this.contacts.find((c) => {
              return c.userId === automation.contactId;
            }),
          }));
        } else {
          this.automations = [...res.Items];
        }
      });
  },

  props: ["contacts", "event"],
};
</script>

<style scoped>
#list-wrapper,
#add-automations-wrapper {
  max-height: 100%;
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