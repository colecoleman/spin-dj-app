<template>
  <base-card title="Automations">
    <template v-slot:content>
      <div class="discounts-wrapper">
        <div class="discounts-section">
          <h5 class="bold">Add New Automation:</h5>
          <div class="discounts-item">
            <p>Automation Name:</p>
            <input type="text" v-model.trim="automation.title" />
          </div>
          <div class="discounts-item">
            <p>Applicable Contact Type:</p>
            <select v-model="automation.contactType" class="capitalize">
              <option
                v-for="(type, index) in contactTypes"
                :key="index"
                :disabled="type === undefined"
                :value="type"
              >
                {{ type === undefined ? "Choose Contact Type" : type }}
              </option>
            </select>
          </div>
          <div class="discounts-item" v-if="automation.contactType">
            <div class="discounts-item">
              <p>
                <input
                  type="checkbox"
                  @click="automation.approved = !automation.approved"
                />
                Approval Required?:
              </p>
            </div>
            <div class="discounts-item">
              <p>Trigger:</p>
              <p>
                <input
                  type="checkbox"
                  @click="
                    (automation.trigger.quantity = undefined),
                      (automation.trigger.distance = undefined),
                      (automation.direction = undefined),
                      (automation.trigger.immediate =
                        !automation.trigger.immediate)
                  "
                />
                Immediate? (will invalidate time-related selections)
              </p>
              <p>
                <input
                  type="number"
                  placeholder="3"
                  v-model="automation.trigger.distance"
                  :disabled="automation.trigger.immediate"
                  style="width: 40px; padding: 4px; margin-right: 10px"
                />
                <select
                  :disabled="automation.trigger.immediate"
                  name=""
                  id=""
                  v-model="automation.trigger.quantity"
                >
                  <option
                    v-for="(timeframe, index) in timeframes"
                    :key="index"
                    :disabled="timeframe === undefined"
                    :value="timeframe"
                  >
                    {{ timeframe !== undefined ? timeframe : "timeframe" }}
                  </option>
                </select>
                <select
                  name=""
                  id=""
                  v-model="automation.trigger.direction"
                  :disabled="automation.trigger.immediate"
                >
                  <option
                    v-for="(direction, index) in directions"
                    :key="index"
                    :value="direction"
                  >
                    {{ direction !== undefined ? direction : "direction" }}
                  </option>
                </select>
                <select
                  id=""
                  v-model="automation.trigger.trigger"
                  :disabled="automation.trigger.immediate"
                >
                  <option disabled value="undefined">trigger</option>

                  <option value="event-date">event date</option>
                  <option value="book-date">booked date</option>
                </select>
              </p>
            </div>
            <div class="discounts-item">
              <p>Action Type:</p>
              <select name="" id="" v-model="automation.action.type">
                <option value="email">Email</option>
                <!-- <option value="to-do">To-Do</option> -->
              </select>
              <div
                class="discounts-item"
                v-if="automation.action.type === 'email'"
              >
                <p>From:</p>
                <select v-model="automation.action.email.from" name="" id="">
                  <option
                    v-for="(email, index) in this.$store.state.businessSettings
                      .identity.emailAddresses"
                    :key="index"
                    :value="email"
                  >
                    {{ email }}
                  </option>
                </select>
                <p>Subject:</p>
                <input type="text" v-model="automation.action.email.subject" />
                <p>Content:</p>
                <div class="information-hover-container">
                  <img
                    :src="SVGs.InfoIconSVG"
                    alt=""
                    @click="toggleMergeTagInformation"
                  />
                  <information-hover
                    heading="Templating"
                    :body="mergeTagInformation"
                    v-if="mergeTagInformationOpen"
                  ></information-hover>
                </div>

                <textarea
                  type="text"
                  rows="10"
                  v-model="automation.action.email.content"
                />
                <p>
                  <input
                    type="checkbox"
                    v-model="automation.applyToExistingEvents"
                  />
                  Apply to existing events?
                </p>
                <button-standard-with-icon
                  text="Add Automation"
                  @click="addAutomation()"
                  class="form-button"
                />
              </div>
              <div
                class="discounts-item"
                v-if="automation.action.type === 'to-do'"
              >
                <p>Content:</p>
                <input type="text" v-model="automation.action.toDo.content" />
              </div>
            </div>
          </div>
        </div>
        <div class="discounts-section">
          <h5 v-if="!hasAutomations">
            No automations have been added yet! Add some!
          </h5>
          <div v-if="hasAutomations">
            <div
              class="discounts-item"
              style="border-bottom: 1px solid gray; margin-bottom: 10px"
              v-for="automation in this.$store.state.businessSettings
                .automations"
              :key="automation.id"
            >
              <h4>{{ automation.title }}</h4>

              <div class="discounts-display-section">
                <div class="discounts-item">
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
                    class="discounts-item"
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
                    class="discounts-item"
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
import SVGs from "../../../../../assets/SVGs/svgIndex.js";
export default {
  data() {
    return {
      SVGs,
      mergeTagInformationOpen: false,
      mergeTagInformation:
        "Use the following merge tags to personalize your emails to your contacts: First Name: {given_name} || Last Name: {family_name}. Be sure to include the brackets {}. Otherwise, the tag will not be replaced.",
      timeframes: [undefined, "days", "weeks", "months"],
      directions: [undefined, "before", "after"],
      contactTypes: [
        undefined,
        "client",
        "employee",
        "organizer",
        "vendor",
        "venue",
      ],

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
    toggleMergeTagInformation() {
      this.mergeTagInformationOpen = !this.mergeTagInformationOpen;
    },
    addAutomation() {
      if (this.automation.action.type === "email") {
        this.automation.action.email.replyTo === this.$store.state.user.email;
        this.automation.id = "automation" + Date.now();
      }
      this.$store.commit("adminConfigAddAutomation", this.automation);
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
  components: { InformationHover },
};
</script>

<style scoped>
section {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}

.config-section {
  height: auto;
}

#configuration-navigation {
  width: 20%;
  height: 100%;
}
#body {
  width: 80%;
  height: 100%;
  overflow: scroll;
}

#branding-preferences-wrapper {
  display: flex;
  flex-direction: row;
}

.branding-preferences-item {
  display: flex;
  flex-direction: column;
  width: 20%;
}

.business-information-wrapper,
.service-wrapper,
.package-wrapper,
.add-on-wrapper,
.discounts-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-height: 100%;
  overflow-y: scroll;
  margin-top: 10px;
}

.business-information-section,
.service-section,
.package-section,
.add-on-section,
.discounts-section {
  width: 50%;
}

.business-information-item,
.service-item,
.package-item,
.add-on-item,
.discounts-item {
  display: flex;
  flex-direction: column;
  justify-content: left;
  margin-left: 10px;
}

.business-information-item > p,
.service-item > p,
.service-section > h5,
.package-item > p,
.package-section > h5,
.add-on-item > p,
.add-on-section > h5,
.discounts-item > p,
.discounts-section > h5 {
  text-align: left;
}

.business-information-item > input,
.service-item > input,
.service-item > select,
.package-item > input,
.package-item > select,
.package-item > label,
.add-on-item > select,
.add-on-item > label,
.add-on-item > input,
.discounts-item > select,
.discounts-item > label,
.discounts-item > input,
.form-button {
  width: 50%;
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

.information-hover-container > img {
  width: 14px;
}

:disabled {
  opacity: 0.5;
}

.floating-button {
  position: fixed;
  bottom: 25px;
  right: 25px;
  background-color: var();
}
</style>