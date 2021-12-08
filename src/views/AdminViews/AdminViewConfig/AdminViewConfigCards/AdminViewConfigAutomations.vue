<template>
  <base-card>
    <template v-slot:title>Automations</template>
    <template v-slot:content>
      <div class="discounts-wrapper">
        <div class="discounts-section">
          <h5 class="bold">Add New Automation:</h5>
          <div class="discounts-item">
            <p>Automation Name:</p>
            <input type="text" v-model.trim="automation.automationName" />
          </div>
          <div class="discounts-item">
            <p>Applicable Contact Type:</p>
            <select
              name="price-option"
              id=""
              v-model="automation.applicableContactType"
            >
              <option disabled value="">Select a price option</option>
              <option value="client">Client</option>
              <option value="employee">Employee</option>
              <option value="organizer">Organizer</option>
              <option value="vendor">Vendor</option>
              <option value="venue">Venue</option>
            </select>
          </div>
          <div class="discounts-item" v-if="automation.applicableContactType">
            <div class="discounts-item">
              <p>
                <input
                  type="checkbox"
                  @click="
                    automation.approvalRequired = !automation.approvalRequired
                  "
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
                    (automation.trigger.timeCategory = undefined),
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
                  v-model="automation.trigger.timeCategory"
                >
                  <option disabled value="">timeframe</option>

                  <option value="days">days</option>
                  <option value="weeks">weeks</option>
                  <option value="months">months</option>
                </select>
                <select
                  name=""
                  id=""
                  v-model="automation.trigger.direction"
                  :disabled="automation.trigger.immediate"
                >
                  <option value="before">before</option>
                  <option value="after">after</option>
                </select>
                <select
                  id=""
                  v-model="automation.trigger.trigger"
                  :disabled="automation.trigger.immediate"
                >
                  <option disabled value="">trigger</option>

                  <option value="event-date">event date</option>
                  <option value="book-date">booked date</option>
                </select>
              </p>
            </div>
            <div class="discounts-item">
              <p>Action Type:</p>
              <select name="" id="" v-model="automation.actionType.type">
                <option value="email">Email</option>
                <option value="to-do">To-Do</option>
              </select>
              <div
                class="discounts-item"
                v-if="automation.actionType.type === 'email'"
              >
                <p>From:</p>
                <select
                  v-model="automation.actionType.email.from"
                  name=""
                  id=""
                >
                  <option
                    v-for="(email, index) in this.$store.state.businessSettings
                      .identity.businessEmailAddresses"
                    :key="index"
                    :value="email.address"
                  >
                    {{ email.address }}
                  </option>
                </select>
                <p>Subject:</p>
                <input
                  type="text"
                  v-model="automation.actionType.email.subject"
                />
                <p>Content:</p>
                <textarea
                  type="text"
                  rows="10"
                  v-model="automation.actionType.email.content"
                />
                <button-standard-with-icon
                  text="Add Automation"
                  @click="addAutomation()"
                  class="form-button"
                />
              </div>
              <div
                class="discounts-item"
                v-if="automation.actionType.type === 'to-do'"
              >
                <p>Content:</p>
                <input
                  type="text"
                  v-model="automation.actionType.toDo.content"
                />
              </div>
            </div>
            <button-standard-with-icon
              text="Add Automation"
              @click="addAutomation()"
              class="form-button"
            />
          </div>
        </div>
        <div class="discounts-section">
          <h5 v-if="!this.$store.state.businessSettings.automations.length">
            No automations have been added yet! Add some!
          </h5>
          <div
            class="discounts-item"
            style="border-bottom: 1px solid gray; margin-bottom: 10px"
            v-for="automation in this.$store.state.businessSettings.automations"
            :key="automation.id"
          >
            <h4>{{ automation.automationName }}</h4>

            <div class="discounts-display-section">
              <div class="discounts-item">
                <p>
                  <b>Contact Type:</b>
                  {{ automation.automationName }}
                </p>
                <p>
                  <b>Trigger: </b>
                  {{
                    `${automation.trigger.distance} ${automation.trigger.timeCategory} ${automation.trigger.direction} ${automation.trigger.trigger}`
                  }}
                </p>
                <p>
                  <b>Approval Required:</b>
                  {{ automation.approvalRequired }}
                </p>
                <p>
                  <b>Automation Type:</b>
                  {{ automation.actionType.type }}
                </p>

                <div
                  class="discounts-item"
                  v-if="automation.actionType.type === 'email'"
                >
                  <p>
                    <b>From Email: </b>
                    {{ automation.actionType.email.from }}
                  </p>
                  <p>
                    <b>Subject: </b>
                    {{ automation.actionType.email.subject }}
                  </p>
                  <p>
                    <b>Content: </b>
                    {{ automation.actionType.email.content }}
                  </p>
                </div>
                <div
                  class="discounts-item"
                  v-if="automation.actionType.type === 'toDo'"
                >
                  <p>
                    <b>Content: </b>
                    {{ automation.actionType.toDo.content }}
                  </p>
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
export default {
  data() {
    return {
      automation: {
        automationName: undefined,
        applicablePackages: [],
        applicableContactType: undefined,
        approvalRequired: false,
        trigger: {
          timeCategory: undefined,
          distance: undefined,
          trigger: undefined,
          direction: undefined,
          immediate: false,
        },
        // work within aws to determine allowable triggers
        actionType: {
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
      },
    };
  },
  methods: {
    addAutomation() {
      this.$store.commit("adminConfigAddAutomation", this.automation);
      this.automation = {
        automationName: undefined,
        applicablePackages: [],
        applicableContactType: undefined,
        approvalRequired: false,
        trigger: {
          timeCategory: undefined,
          distance: undefined,
          direction: undefined,
          trigger: undefined,
        },
        // work within aws to determine allowable triggers
        actionType: {
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

.bold {
  font-weight: 600;
  margin-top: 20px;
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