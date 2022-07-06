<template>
  <layout
    :addButtonText="addButtonText"
    :figureDetails="figureDetails"
    :processing="processing"
    :productNameProperty="'title'"
    :products="automations"
    :saveButtonEnabled="automationReadyToBeSubmitted"
    @clear-form="clearForm"
    @close="close"
    @edit-button-clicked="editAutomation"
    @delete-button-clicked="deleteAutomation"
    @save-button-clicked="addAutomation"
  >
    <template v-slot:form>
      <div class="automations-form-section">
        <p class="disclaimer">
          Note: deleting or editing an automation will not affect
          currently-booked events.
        </p>
        <div class="automations-item">
          <input-with-title
            type="text"
            title="Automation Name:"
            :inputValue="automation.title"
            @input="fieldInput(automation, 'title', $event)"
          />
        </div>
        <div class="automations-item">
          <input-with-title
            title="Applicable Contact Type:"
            type="select"
            :options="contactTypes"
            :inputValue="automation.contactType"
            @input="fieldInput(automation, 'contactType', $event)"
          />
        </div>
        <div class="automations-item" v-if="automation.contactType">
          <input-with-binary-selection
            :item="
              automation.approved
                ? 'Does Not Require Approval'
                : 'Requires Approval'
            "
            :checked="!automation.approved"
            @clicked="fieldInput(automation, 'approved', !automation.approved)"
          />
          <div>
            <p>Trigger:</p>
            <p>Immediate? (will invalidate time-related selections)</p>
            <input-with-binary-selection
              :item="
                automation.trigger.immediate ? 'Immediate' : 'Not Immediate'
              "
              :checked="automation.trigger.immediate"
              @clicked="
                (automation.trigger.quantity = undefined),
                  (automation.trigger.distance = undefined),
                  (automation.direction = undefined),
                  (automation.trigger.immediate = !automation.trigger.immediate)
              "
            />

            <div v-if="!automation.trigger.immediate">
              <input-with-title
                class="distance-number"
                type="number"
                title="Distance"
                placeholder="3"
                :inputValue="automation.trigger.distance"
                @input="fieldInput(automation.trigger, 'distance', $event)"
              />

              <input-with-title
                type="select"
                title="Timeframe"
                :options="timeframes"
                :inputValue="automation.trigger.quantity"
                @input="fieldInput(automation.trigger, 'quantity', $event)"
              />
              <input-with-title
                type="select"
                title="Direction"
                :options="directions"
                :inputValue="automation.trigger.direction"
                @input="fieldInput(automation.trigger, 'direction', $event)"
              />

              <input-with-title
                type="select"
                title="Trigger"
                :options="triggers"
                :inputValue="automation.trigger.trigger"
                @input="fieldInput(automation.trigger, 'trigger', $event)"
              />
            </div>
          </div>
          <div class="automations-item">
            <input-with-title
              title="Action Type:"
              type="select"
              :options="['email']"
              :inputValue="automation.action.type"
              @input="fieldInput(automation.action, 'type', $event)"
            />
            <div v-if="automation.action.type === 'email'">
              <input-with-title
                title="From:"
                type="select"
                :options="this.$store.getters.identity.emailAddresses"
                :inputValue="automation.action.email.from"
                @input="fieldInput(automation.action.email, 'from', $event)"
              />
              <input-with-title
                title="Subject:"
                type="text"
                :inputValue="automation.action.email.subject"
                @input="fieldInput(automation.action.email, 'subject', $event)"
              />
              <round-icon-button
                svg="info"
                @click="toggleMergeTagInformation"
              />
              <p
                v-if="mergeTagInformationOpen"
                v-html="mergeTagInformation"
              ></p>
              <input-with-title
                title="Content:"
                type="textarea"
                :inputValue="automation.action.email.content"
                @input="fieldInput(automation.action.email, 'content', $event)"
              />
            </div>
            <div
              class="automations-item"
              v-if="automation.action.type === 'to-do'"
            >
              <p>Content:</p>
              <input type="text" v-model="automation.action.toDo.content" />
            </div>
          </div>
        </div>
      </div>
    </template>
  </layout>
</template>

<script>
import Layout from "../AdminConfigUIComponents/AdminConfigLayoutTileAndForm.vue";
import InputWithTitle from "../../../SharedComponentsUI/ElementLibrary/InputWithTitle.vue";
import InputWithBinarySelection from "../../../SharedComponentsUI/ElementLibrary/InputWithBinarySelection.vue";
import RoundIconButton from "../../../SharedComponentsUI/RoundIconButton.vue";
export default {
  data() {
    return {
      addButtonText: "Add New Automation",
      activeView: "automations-list",
      editIndex: undefined,
      mergeTagInformationOpen: false,
      mergeTagInformation:
        "Use the following merge tags to personalize your emails to your contacts: First Name: {given_name} || Last Name: {family_name}. Be sure to include the brackets {}. Otherwise, the tag will not be replaced.",
      timeframes: ["days", "weeks", "months"],
      directions: ["before", "after"],
      triggers: ["book-date", "event-date"],
      processing: false,
      contactTypes: ["client", "employee", "organizer", "vendor", "location"],

      automation: {
        applyToExistingEvents: false,
        title: undefined,
        id: "automation" + Date.now(),
        contactType: undefined,
        approved: true,
        trigger: {
          quantity: undefined,
          distance: undefined,
          trigger: undefined,
          direction: undefined,
          immediate: false,
        },
        action: {
          type: undefined,
          email: {
            to: undefined,
            from: undefined,
            replyTo: undefined,
            subject: undefined,
            content: undefined,
          },
          toDo: {
            content: undefined,
          },
        },
      },
    };
  },
  methods: {
    figureDetails(automation) {
      let array = [];
      array.push("Contact: " + automation.contactType);
      if (!automation.immediate) {
        array.push(
          ` ${automation.trigger.distance} ${automation.trigger.quantity} ${automation.trigger.direction} ${automation.trigger.trigger}`
        );
      } else {
        array.push("Trigger: immediate");
      }
      return array;
    },
    clearForm() {
      this.editIndex = undefined;
      this.automation = {
        applyToExistingEvents: false,
        title: undefined,
        id: undefined,
        contactType: undefined,
        approved: true,
        trigger: {
          quantity: undefined,
          distance: undefined,
          trigger: undefined,
          direction: undefined,
          immediate: false,
        },
        action: {
          type: undefined,
          email: {
            to: undefined,
            from: undefined,
            replyTo: undefined,
            subject: undefined,
            content: undefined,
          },
          toDo: {
            content: undefined,
          },
        },
      };
    },

    close() {
      this.$emit("close");
    },
    fieldInput(object, property, value) {
      if (object) {
        object[property] = value;
      } else {
        this[property] = value;
      }
    },
    toggleMergeTagInformation() {
      this.mergeTagInformationOpen = !this.mergeTagInformationOpen;
    },
    async addAutomation() {
      this.processing = true;
      if (this.editIndex != undefined) {
        await this.$store.dispatch("editAutomation", this.automation);
      } else {
        if (this.automation.action.type === "email") {
          this.automation.action.email.replyTo === this.$store.state.user.email;
        }
        await this.$store.dispatch("addAutomation", this.automation);
      }
      this.processing = false;
    },
    editAutomation(automation, index) {
      this.automation = { ...this.automation, ...automation };
      this.editIndex = index;
    },
    async deleteAutomation(automation) {
      await this.$store.dispatch("deleteAutomation", automation.id);
    },
  },
  computed: {
    automations() {
      return this.$store.getters.automations;
    },
    automationReadyToBeSubmitted() {
      let automation = this.automation;
      let triggerReady;
      let contentReady;
      if (automation.trigger.immediate) {
        triggerReady = true;
      } else {
        triggerReady =
          automation.trigger.distance &&
          automation.trigger.direction &&
          automation.trigger.quantity &&
          automation.trigger.trigger;
      }
      contentReady =
        automation.action.email.from &&
        automation.action.email.subject &&
        automation.action.email.content;
      return contentReady && triggerReady;
    },
  },
  emits: ["close"],
  components: {
    InputWithTitle,
    InputWithBinarySelection,
    RoundIconButton,
    Layout,
  },
};
</script>

<style scoped>
@media screen {
  p {
    text-align: left;
    font-size: 9pt;
  }

  .automations-form-section {
    width: calc(100% - 10px);
    height: 100%;
    padding: 5px;
    overflow: scroll;
  }
  .disclaimer {
    font-size: 8pt;
    font-style: italic;
    margin-top: 0;
  }

  .automations-item {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .distance-number {
    width: 100px;
  }
}
</style>
