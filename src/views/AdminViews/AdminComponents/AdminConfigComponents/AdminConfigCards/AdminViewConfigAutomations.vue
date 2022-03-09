<template>
  <base-card title="Automations">
    <template v-slot:content>
      <div class="automations-wrapper">
        <div class="automations-section">
          <h5 class="bold">Add New Automation:</h5>
          <div class="automations-item">
            <!-- <p>Automation Name:</p>
            <input type="text" v-model.trim="automation.title" /> -->
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
            <div class="automations-item">
              <p>
                <input
                  type="checkbox"
                  @click="automation.approved = !automation.approved"
                />
                Approval Required?:
                <input-with-binary-selection
                  :item="
                    automation.approved
                      ? 'Does Not Require Approval'
                      : 'Requires Approval'
                  "
                  :checked="!automation.approved"
                  @clicked="
                    fieldInput(automation, 'approved', !automation.approved)
                  "
                />
              </p>
            </div>
            <div class="automations-item">
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
                    (automation.trigger.immediate =
                      !automation.trigger.immediate)
                "
              />

              <div
                class="automations-item"
                v-if="!automation.trigger.immediate"
              >
                <div class="distance-number">
                  <input-with-title
                    type="number"
                    title="Distance"
                    placeholder="3"
                    :inputValue="automation.trigger.distance"
                    @input="fieldInput(automation.trigger, 'distance', $event)"
                  />
                </div>
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
                  :options="
                    this.$store.state.businessSettings.identity.emailAddresses
                  "
                  :inputValue="automation.action.email.from"
                  @input="fieldInput(automation.action.email, 'from', $event)"
                />
                <input-with-title
                  title="Subject:"
                  type="text"
                  :inputValue="automation.action.email.subject"
                  @input="
                    fieldInput(automation.action.email, 'subject', $event)
                  "
                />
                <div class="information-hover-container">
                  <vue-svg
                    svg="info"
                    @clicked="toggleMergeTagInformation"
                    customStyle="width: 10px;"
                  />
                  <information-hover
                    heading="Templating"
                    :body="mergeTagInformation"
                    v-if="mergeTagInformationOpen"
                  ></information-hover>
                </div>
                <input-with-title
                  title="Content:"
                  type="textarea"
                  :inputValue="automation.action.email.content"
                  @input="
                    fieldInput(automation.action.email, 'content', $event)
                  "
                />
                <input-with-binary-selection
                  item="Apply To Existing Events?"
                  :checked="automation.applyToExistingEvents"
                  @clicked="
                    fieldInput(
                      automation,
                      'applyToExistingEvents',
                      !automation.applyToExistingEvents
                    )
                  "
                />
                <button-standard-with-icon
                  text="Add Automation"
                  @click="addAutomation()"
                  class="form-button"
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
        <div class="automations-section">
          <h5 v-if="!hasAutomations">
            No automations have been added yet! Add some!
          </h5>
          <div v-if="hasAutomations" class="automation-conditional-wrapper">
            <p class="disclaimer">
              Note: deleting or editing an automation will not affect
              currently-booked events.
            </p>
            <div
              class="automations-item"
              style="border-bottom: 1px solid gray; margin-bottom: 10px"
              v-for="(automation, index) in this.$store.state.businessSettings
                .automations"
              :key="automation.id"
            >
              <h4>
                {{ automation.title }}
                <vue-svg
                  svg="x-icon"
                  :customStyle="iconStyling"
                  @clicked="deleteAutomation(index)"
                />
                <vue-svg
                  svg="edit-pen"
                  :customStyle="iconStyling"
                  @clicked="editAutomation(automation, index)"
                />
              </h4>

              <div class="automations-display-section">
                <div class="automations-item">
                  <p>
                    <b>Contact Type:</b>
                    {{ automation.contactType }}
                  </p>
                  <p>
                    <b>Trigger: </b>
                    {{
                      `${automation.trigger.distance} ${automation.trigger.quantity} ${automation.trigger.direction} ${automation.trigger.trigger}`
                    }}
                  </p>
                  <p>
                    <b>Approval Required:</b>
                    {{ automation.approved }}
                  </p>
                  <p>
                    <b>Automation Type:</b>
                    {{ automation.action.type }}
                  </p>

                  <div
                    class="automations-item"
                    v-if="automation.action.type === 'email'"
                  >
                    <p>
                      <b>From Email: </b>
                      {{ automation.action.email.from }}
                    </p>
                    <p>
                      <b>Subject: </b>
                      {{ automation.action.email.subject }}
                    </p>
                    <p>
                      <b>Content: </b>
                      {{ automation.action.email.content }}
                    </p>
                  </div>
                  <div
                    class="automations-item"
                    v-if="automation.action.type === 'toDo'"
                  >
                    <p>
                      <b>Content: </b>
                      {{ automation.action.toDo.content }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </base-card>
</template>

<script>
import InformationHover from "../../../../../SharedComponents/SharedComponentsUI/InformationHover.vue";
import InputWithTitle from "../../../../../SharedComponents/SharedComponentsUI/ElementLibrary/InputWithTitle.vue";
import InputWithBinarySelection from "../../../../../SharedComponents/SharedComponentsUI/ElementLibrary/InputWithBinarySelection.vue";
import VueSvg from "../../../../../assets/VueSvg.vue";
export default {
  data() {
    return {
      iconStyling:
        "height: 10px; width: 10px; margin: 0px 5px; cursor: pointer;",
      editIndex: undefined,
      mergeTagInformationOpen: false,
      mergeTagInformation:
        "Use the following merge tags to personalize your emails to your contacts: First Name: {given_name} || Last Name: {family_name}. Be sure to include the brackets {}. Otherwise, the tag will not be replaced.",
      timeframes: ["days", "weeks", "months"],
      directions: ["before", "after"],
      triggers: ["book-date", "event-date"],
      contactTypes: ["client", "employee", "organizer", "vendor", "venue"],

      automation: {
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
        // work within aws to determine allowable triggers
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
    fieldInput(object, property, value) {
      console.log(value);
      if (object) {
        object[property] = value;
      } else {
        this[property] = value;
      }
      console.log(this.automation);
    },
    toggleMergeTagInformation() {
      this.mergeTagInformationOpen = !this.mergeTagInformationOpen;
    },
    addAutomation() {
      if (this.editIndex != undefined) {
        let payload = {
          index: this.editIndex,
          automation: this.automation,
        };
        this.$store.commit("adminConfigEditAutomation", payload);
      } else {
        if (this.automation.action.type === "email") {
          this.automation.action.email.replyTo === this.$store.state.user.email;
          this.automation.id = "automation" + Date.now();
        }
        this.$store.commit("adminConfigAddAutomation", this.automation);
      }
      this.automation = {
        title: undefined,
        applicablePackages: [],
        contactType: undefined,
        approved: false,
        trigger: {
          quantity: undefined,
          distance: undefined,
          direction: undefined,
          trigger: undefined,
        },
        action: {
          type: undefined,
          email: {
            to: undefined,
            from: undefined,
            subject: undefined,
            content: undefined,
          },
          toDo: {
            content: undefined,
          },
        },
      };
    },
    editAutomation(automation, index) {
      console.log(automation, index);
      this.automation = { ...this.automation, ...automation };
      this.editIndex = index;
    },
    deleteAutomation(index) {
      this.$store.commit("adminConfigDeleteAutomation", index);
    },
  },
  computed: {
    hasAutomations() {
      if ("automations" in this.$store.state.businessSettings) {
        if (this.$store.state.businessSettings.automations.length > 0) {
          return true;
        }
      }
      return false;
    },
  },
  components: {
    InformationHover,
    InputWithTitle,
    InputWithBinarySelection,
    VueSvg,
  },
};
</script>

<style scoped>
@media screen {
  p {
    font-size: 9pt;
  }

  .disclaimer {
    font-size: 8pt;
    font-style: italic;
    margin-top: 0;
  }
  .automations-wrapper {
    display: flex;
    flex-direction: column-reverse;
    flex-wrap: wrap;
    max-height: 100%;
    overflow-y: scroll;
    margin-top: 10px;
  }

  .automation-conditional-wrapper {
    max-height: 300px;
    overflow: scroll;
  }
  .automations-section {
    width: 100%;
  }

  .automations-item {
    display: flex;
    flex-direction: column;
    justify-content: left;
    margin-left: 10px;
  }

  .automations-item > p,
  .automations-section > h5 {
    text-align: left;
  }

  .automations-item > select,
  .automations-item > label,
  .automations-item > input,
  .form-button {
    width: 90%;
    align-self: left;
    justify-self: left;
  }

  .inline-input-with-button {
    display: flex;
    flex-direction: row;
    height: 30px;
  }

  .inline-input-with-button > input {
    margin-right: 5px;
  }

  .information-hover-container {
    position: relative;
    width: fit-content;
    height: fit-content;
    justify-self: right;
    align-self: right;
  }

  :disabled {
    opacity: 0.5;
  }

  .distance-number {
    width: 100px;
  }

  .row-flex {
    display: flex;
  }
  @media (min-width: 850px) {
    .automation-conditional-wrapper {
      height: fit-content;
      max-height: 100%;
      overflow: scroll;
    }

    .automations-wrapper {
      flex-direction: row;
    }

    .automations-section {
      width: 50%;
    }

    .automations-item > select,
    .automations-item > label,
    .automations-item > input,
    .form-button {
      width: 50%;
    }
  }
}
</style>