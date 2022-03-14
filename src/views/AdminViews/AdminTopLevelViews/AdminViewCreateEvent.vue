<template>
  <section id="event-creation-wrapper" v-if="loaded">
    <div id="form-wrapper">
      <div class="event-creation-card">
        <base-card title="Date and Time">
          <template v-slot:content>
            <div class="form-section-wrapper">
              <div class="event-date">
                <input-with-title
                  title="Event Title (Optional):"
                  type="text"
                  :inputValue="event.title"
                  @input="fieldInput(event, 'title', $event)"
                />

                <input-with-title
                  title="Event Date:"
                  type="date"
                  :inputValue="fields.data.date"
                  @input="fieldInput(fields.data, 'date', $event)"
                />
                <p class="disclaimer">
                  * if using Safari or IE without a date picker, enter date in
                  'YYYY-MM-DD' format
                </p>
              </div>
              <div class="event-times">
                <div class="time-inputs">
                  <input-with-title
                    title="Start"
                    type="select"
                    :inputValue="fields.data.startTime.hours"
                    :options="hours"
                    @input="fieldInput(fields.data.startTime, 'hours', $event)"
                  />
                  <input-with-title
                    type="select"
                    :inputValue="fields.data.startTime.minutes"
                    :options="minutes"
                    @input="
                      fieldInput(fields.data.startTime, 'minutes', $event)
                    "
                  />
                  <input-with-title
                    type="select"
                    :inputValue="fields.data.startTime.period"
                    :options="periods"
                    @input="fieldInput(fields.data.startTime, 'period', $event)"
                  />
                </div>

                <div class="time-inputs">
                  <input-with-title
                    title="End"
                    type="select"
                    :inputValue="fields.data.endTime.hours"
                    :options="hours"
                    @input="fieldInput(fields.data.endTime, 'hours', $event)"
                  />
                  <input-with-title
                    type="select"
                    :inputValue="fields.data.endTime.minutes"
                    :options="minutes"
                    @input="fieldInput(fields.data.endTime, 'minutes', $event)"
                  />
                  <input-with-title
                    type="select"
                    :inputValue="fields.data.endTime.period"
                    :options="periods"
                    @input="fieldInput(fields.data.endTime, 'period', $event)"
                  />
                </div>
              </div>
            </div>
          </template>
        </base-card>
      </div>
      <div class="event-creation-card">
        <base-card title="Invoice">
          <template v-slot:content>
            <div>
              <p class="subheading">Select Product(s):</p>
              <div class="bubble-container">
                <input-with-binary-selections
                  v-for="(product, index) in businessProducts.packages"
                  :key="index"
                  title="Package"
                  :item="product.name"
                  :checked="
                    checkForEventPresence(event.invoice.products, product)
                  "
                  @clicked="
                    toggleItemFromEvent(event.invoice.products, product)
                  "
                />
                <input-with-binary-selections
                  v-for="(product, index) in businessProducts.services"
                  :key="index"
                  title="Service"
                  :item="product.name"
                  :checked="
                    checkForEventPresence(event.invoice.products, product)
                  "
                  @clicked="
                    toggleItemFromEvent(event.invoice.products, product)
                  "
                />

                <binary-input-with-number-modifier
                  v-for="(product, index) in businessProducts.addOns"
                  :key="index"
                  title="Add-On"
                  :item="product.name"
                  :defaultValue="product.pricing.minUnits"
                  @number-change="changeAddOnQuantity($event, product)"
                  :checked="
                    checkForEventPresence(event.invoice.products, product)
                  "
                  @clicked="
                    toggleItemFromEvent(event.invoice.products, product)
                  "
                />
              </div>
              <p class="subheading">Select Adjustment(s):</p>
              <div class="bubble-container">
                <input-with-binary-selections
                  v-for="(adjustment, index) in adjustments"
                  :key="index"
                  :item="adjustment.name"
                  :checked="
                    checkForEventPresence(event.invoice.adjustments, adjustment)
                  "
                  @clicked="
                    toggleItemFromEvent(event.invoice.adjustments, adjustment)
                  "
                />
              </div>

              <p class="subheading">Enter Manual Payment:</p>
              <div class="manual-payment-field">
                <input-with-title
                  title="Payment Name"
                  :inputValue="fields.payment.name"
                  type="text"
                  @input="fieldInput(fields.payment, 'name', $event)"
                />
                <input-with-title
                  title="Amount"
                  type="number"
                  :inputValue="fields.payment.amount"
                  @input="fieldInput(fields.payment, 'amount', $event)"
                  @blur="assignPaymentToEvent()"
                />
              </div>
            </div>
          </template>
        </base-card>
      </div>
      <div class="event-creation-card">
        <base-card title="Select Form(s):">
          <template v-slot:content>
            <div class="forms-wrapper">
              <div class="form-input">
                <p class="subheading">Suggested Form(s):</p>

                <input-with-binary-selections
                  item="Attach all default forms?"
                  :checked="checkDefaultForms()"
                  @clicked="toggleAllDefaultForms()"
                  :disabled="event.invoice.products.length > 0 ? false : true"
                />

                <p
                  class="detail"
                  v-for="(form, index) in suggestedForms"
                  :key="index"
                >
                  - {{ form.name }}
                </p>
              </div>
              <div class="form-input">
                <p class="subheading">All Forms:</p>
                <div class="bubble-container">
                  <input-with-binary-selections
                    v-for="(form, index) in forms"
                    :key="index"
                    :item="form.name"
                    :checked="checkForEventPresence(event.forms, form)"
                    @clicked="toggleItemFromEvent(event.forms, form)"
                  />
                </div>
              </div>
            </div>
          </template>
        </base-card>
      </div>
      <div class="event-creation-card">
        <base-card title="Location">
          <template v-slot:content>
            <div class="form-section-wrapper">
              <div class="form-details">
                <div class="dropdown-parent">
                  <input-with-title-with-dropdown
                    type="text"
                    title="Location Name:"
                    placeholder="Start typing to find past location or add a new one."
                    :inputValue="fields.location.name"
                    :dropdownSelections="searchLocations"
                    :dropdownDisplay="['name']"
                    @input="fieldInput(fields.location, 'name', $event)"
                    @dropdownSelected="selectLocation"
                  />
                </div>
              </div>
              <div class="form-details">
                <input-with-title
                  title="Street Address 1:"
                  type="text"
                  :inputValue="fields.location.address.streetAddress1"
                  @input="
                    fieldInput(
                      fields.location.address,
                      'streetAddress1',
                      $event
                    )
                  "
                />
                <input-with-title
                  title="Street Address 2:"
                  type="text"
                  :inputValue="fields.location.address.streetAddress2"
                  @input="
                    fieldInput(
                      fields.location.address,
                      'streetAddress2',
                      $event
                    )
                  "
                />
                <input-with-title
                  title="City, State/Province, Zip Code:"
                  type="text"
                  :inputValue="fields.location.address.cityStateZip"
                  @input="
                    fieldInput(fields.location.address, 'cityStateZip', $event)
                  "
                />
              </div>
            </div>
          </template>
        </base-card>
      </div>
      <div class="event-creation-card">
        <base-card title="Client">
          <template v-slot:content>
            <div class="form-section-wrapper">
              <div class="form-details">
                <input-with-title
                  title="Pronoun / Prefix"
                  type="select"
                  :options="pronouns"
                  :inputValue="fields.client.pronoun"
                  @input="fieldInput(fields.client, 'pronoun', $event)"
                />

                <div class="dropdown-parent">
                  <input-with-title-with-dropdown
                    title="First Name:"
                    type="text"
                    :inputValue="fields.client.given_name"
                    :dropdownSelections="clientSearchResults"
                    :dropdownDisplay="['given_name', 'family_name']"
                    @input="fieldInput(fields.client, 'given_name', $event)"
                    @dropdownSelected="selectClient"
                    placeholder="Start typing to assign existing client, or add a new one."
                  />
                </div>

                <input-with-title
                  title="Last Name:"
                  type="text"
                  :inputValue="fields.client.family_name"
                  @input="fieldInput(fields.client, 'family_name', $event)"
                />
              </div>
              <div class="form-details">
                <input-with-title
                  title="Email Address:"
                  type="text"
                  :inputValue="fields.client.username"
                  @input="fieldInput(fields.client, 'username', $event)"
                />

                <input-with-title
                  title="Phone Number:"
                  type="tel"
                  :inputValue="fields.client.phoneNumber"
                  @input="fieldInput(fields.client, 'phoneNumber', $event)"
                />

                <div class="form-input row-flex">
                  <input-with-binary-selections
                    :item="
                      fields.client.sendInvitation
                        ? `Inviting Client`
                        : `Not Sending Invitation`
                    "
                    :checked="fields.client.sendInvitation"
                    @clicked="
                      fields.client.sendInvitation =
                        !fields.client.sendInvitation
                    "
                  />
                </div>
              </div>
            </div>
          </template>
        </base-card>
      </div>
    </div>
    <div id="sidebar-wrapper">
      <base-card title="Summary">
        <template v-slot:content>
          <div id="summary-inner-wrapper">
            <div id="summary-body">
              <div class="title-and-indented-text">
                <h5 class="subheading">Date and Time:</h5>
                <p class="detail">
                  {{ fields.data.date ? formatDate(eventDate) : "" }}
                </p>
                <p class="detail" v-if="fields.data.date">
                  {{ formatTime(eventStartTime) }}
                  -
                  {{ eventEndTime ? formatTime(eventEndTime) : "" }}
                </p>
              </div>
              <div class="title-and-indented-text">
                <h5 class="subheading">Location(s):</h5>

                <div class="row-flex">
                  <div v-if="fields.location.name">
                    <p class="detail">{{ fields.location.name }},</p>
                    <p class="detail">
                      {{ fields.location.address.streetAddress1 }}
                    </p>
                    <p
                      class="detail"
                      v-if="fields.location.address.streetAddress2"
                    >
                      {{ fields.location.address.streetAddress2 }}
                    </p>
                    <p
                      class="detail"
                      v-if="fields.location.address.cityStateZip"
                    >
                      {{ fields.location.address.cityStateZip }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="title-and-indented-text">
                <h5 class="subheading">Client(s):</h5>

                <p
                  class="detail"
                  v-if="fields.client.given_name && fields.client.family_name"
                >
                  {{ fields.client.given_name }}
                  {{ fields.client.family_name }}
                </p>
                <p class="detail" v-if="fields.client.username">
                  {{ fields.client.username }}
                </p>
                <p class="detail" v-if="fields.client.phoneNumber">
                  {{ formatPhoneNumber(fields.client.phoneNumber) }}
                </p>
              </div>
              <div class="title-and-right-aligned-text">
                <h5 class="subheading">Invoice Details:</h5>
                <div
                  class="invoice-item"
                  v-for="(product, index) in event.invoice.products"
                  :key="index"
                >
                  <!-- <p>{{ event }}</p> -->
                  <p>{{ product.name }}</p>
                  <p class="invoice-item-price">
                    <b>{{ formatPrice(productTotal(product, event.data)) }}</b>
                  </p>
                </div>
                <div class="invoice-item">
                  <p>Subtotal:</p>
                  <p class="invoice-item-price">
                    <b>{{
                      formatPrice(subtotal(event.invoice, event.data))
                    }}</b>
                  </p>
                </div>
                <div
                  class="invoice-item"
                  v-for="(adjustment, index) in event.invoice.adjustments"
                  :key="index"
                >
                  <p>
                    {{ adjustment.name }}
                  </p>
                  <p class="invoice-item-price">
                    <b>{{ adjustment.display }}</b>
                  </p>
                </div>
                <div class="invoice-item">
                  <p>Total:</p>
                  <p class="invoice-item-price">
                    <b>{{ formatPrice(total(event.invoice, event.data)) }}</b>
                  </p>
                </div>
                <div class="invoice-item">
                  <p>Payments Collected:</p>
                  <p class="invoice-item-price">
                    <b>{{
                      event.invoice.payments[0]
                        ? formatPrice(event.invoice.payments[0].amount)
                        : formatPrice(0)
                    }}</b>
                  </p>
                </div>
                <div class="invoice-item">
                  <p>Balance Outstanding:</p>
                  <p class="invoice-item-price">
                    <b>{{
                      event.invoice
                        ? formatPrice(
                            balanceOutstanding(event.invoice, event.data)
                          )
                        : formatPrice(0)
                    }}</b>
                  </p>
                </div>
              </div>
            </div>
            <button-standard-with-icon
              id="submit-button"
              :text="eventCreating ? 'Creating Event...' : 'Create Event'"
              @click="eventCreating ? '' : startCreate()"
            />
          </div>
        </template>
      </base-card>
    </div>
  </section>
</template>

<script>
import InputWithTitle from "../../../SharedComponents/SharedComponentsUI/ElementLibrary/InputWithTitle.vue";
import InputWithBinarySelections from "../../../SharedComponents/SharedComponentsUI/ElementLibrary/InputWithBinarySelection.vue";
import InputWithTitleWithDropdown from "../../../SharedComponents/SharedComponentsUI/ElementLibrary/InputWithTitleWithDropdown.vue";
import BinaryInputWithNumberModifier from "../../../SharedComponents/SharedComponentsUI/ElementLibrary/BinaryInputWithNumberModifier.vue";
import {
  formatTime,
  formatPrice,
  formatDate,
  formatPhoneNumber,
  productTotal,
  subtotal,
  total,
  balanceOutstanding,
  calculateEventTime,
} from "../../../helpers.js";

export default {
  data() {
    return {
      hours: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      minutes: ["00", "15", "30", "45"],
      periods: ["AM", "PM"],
      pronouns: ["Mr.", "Mrs.", "Ms.", "Other (please prefix first name)"],
      eventId: undefined,
      eventContacts: [],
      eventLocations: [],
      loaded: false,
      locationDropdownOpen: false,
      clientDropdownOpen: false,
      fields: {
        data: {
          date: undefined,
          startTime: {
            hours: "6",
            minutes: "00",
            period: "PM",
          },
          endTime: {
            hours: "10",
            minutes: "00",
            period: "PM",
          },
        },
        startTime: null,
        endTime: null,
        locationSearch: null,
        location: {
          name: undefined,
          address: {
            streetAddress1: undefined,
            streetAddress2: undefined,
            cityStateZip: undefined,
          },
        },
        adjustment: {
          name: null,
          amount: null,
          type: null,
        },
        payment: {
          name: null,
          amount: null,
        },
        clientSearch: null,
        client: {
          sendInvitation: true,
          associatedEvents: [],
          pronoun: undefined,
          role: "client",
          given_name: null,
          family_name: null,
          phoneNumber: null,
          username: null,
        },
      },

      event: {
        eventId: "event" + new Date().getTime(),
        title: undefined,
        forms: [],
        contracts: [],
        contacts: [],
        locations: [],
        data: {
          date: null,
          startTime: null,
          endTime: null,
        },
        invoice: {
          adjustments: [],
          payments: [],
          products: [],
        },
      },
      eventCreating: false,
    };
  },
  methods: {
    fieldInput(object, property, value) {
      if (object) {
        object[property] = value;
      } else {
        this[property] = value;
      }
    },
    formatPrice,
    openLocationDropdown() {
      this.locationDropdownOpen = true;
    },
    openClientDropdown() {
      this.clientDropdownOpen = true;
    },
    selectLocation(location) {
      this.locationDropdownOpen = false;
      Object.assign(this.fields.location, location);
      return;
    },
    selectClient(client) {
      this.clientDropdownOpen = false;
      Object.assign(this.fields.client, client);
      return;
    },
    checkDefaultForms() {
      let array = this.suggestedForms.map((x) => {
        let index = this.event.forms.indexOf(x);
        console.log(index);
        if (index > -1) {
          return true;
        } else {
          return false;
        }
      });
      if (array.includes(false)) {
        return false;
      } else if (array.length === 0) {
        return false;
      } else {
        return true;
      }
    },

    checkForEventPresence(array, item) {
      let index = array.indexOf(item);
      if (index > -1) {
        return true;
      } else {
        return false;
      }
    },
    toggleItemFromEvent(array, item) {
      console.log(this.event);
      let index = array.indexOf(item);
      if (index > -1) {
        array.splice(index, 1);
      } else {
        array.push(item);
      }
    },
    toggleProductFromEvent(product) {
      let array = this.event.invoice.products;
      let index = array.indexOf(product);
      if (index > -1) {
        array.splice(index, 1);
      } else {
        array.push(product);
      }
    },
    productAssigned(product) {
      let array = this.event.invoice.products;
      return array.indexOf(product);
    },
    changeAddOnQuantity(e, product) {
      let array = this.event.invoice.products;
      let index = this.productAssigned(product);
      if (index > -1) {
        array[index].pricing.units = e;
      } else {
        return;
      }
    },
    toggleFormFromEvent(form) {
      let array = this.event.forms;
      let index = array.indexOf(form);
      if (index > -1) {
        array.splice(index, 1);
      } else {
        array.push(form);
      }
    },
    toggleAllDefaultForms() {
      if (this.event.forms.length === 0) {
        this.event.forms = [...this.suggestedForms];
        return;
      }
      if (this.event.forms.length > 0) {
        this.suggestedForms.forEach((form) => {
          this.toggleFormFromEvent(form);
        });
        return;
      }
    },

    removeLocation(index) {
      this.locations.splice(index, 1);
    },

    toggleAdjustmentToEvent(adj, custom) {
      let adjustment;
      console.log(custom);
      if (custom) {
        adjustment = {
          amount:
            adj.type === "percentage" ? adj.amount * 0.01 : adj.amount * 100,
          name: adj.name,
          type: adj.type,
          display:
            adj.type === "percentage" ? `${adj.amount}%` : `$${adj.amount}`,
        };
      } else {
        adjustment = adj;
      }
      console.log(adjustment);
      let array = this.event.invoice.adjustments;
      let index = array.indexOf(adj);
      if (index > -1) {
        array.splice(index, 1);
      } else {
        array.push(adjustment);
      }
    },
    assignPaymentToEvent() {
      let payment = {
        name: this.fields.payment.name,
        amount: this.fields.payment.amount * 100,
      };
      this.event.invoice.payments[0] = payment;
    },
    // from create event summary

    formatTime,
    formatDate,
    formatPhoneNumber,
    productTotal,
    subtotal,
    total,
    balanceOutstanding,
    calculateEventTime,

    createLocation() {
      return new Promise((resolve, reject) => {
        this.$store
          .dispatch("addLocation", this.fields.location)
          .then((res) => {
            this.eventLocations.push(res.data.userId);
            resolve(res);
          })
          .catch((e) => {
            this.$store.commit("addStatus", {
              type: "error",
              note: "Error adding location. Try again on the contact page, and then assign to the event!",
            });
            reject(e);
          });
      });
    },
    // removeLocation(index) {
    //   this.$emit("removeLocation", index);
    // },
    createUser() {
      return new Promise((resolve, reject) => {
        this.$store
          .dispatch("addContact", this.fields.client)
          .then((res) => {
            this.eventContacts.push({ role: res.role, id: res.userId });
            resolve(res);
          })
          .catch((e) => {
            this.$store.commit("addStatus", {
              type: "error",
              note: "Error adding client. Try adding on contact page, and assigning to event.",
            });
            reject(e);
          });
      });
    },
    createEvent() {
      let dbEvent = Object.assign({}, this.event);
      if (this.fields.client.userId) {
        this.eventContacts.push({
          role: "client",
          id: this.fields.client.userId,
        });
      }
      if (this.fields.location.userId) {
        this.eventLocations.push(this.fields.location.userId);
      }
      dbEvent.contacts = [...this.eventContacts];
      dbEvent.locations = [...this.eventLocations];
      dbEvent.contracts = this.contracts.map((x) => ({
        id: x,
        signerName: null,
        signerDate: null,
        signerUUID: null,
        status: "pending",
      }));
      return new Promise((resolve, reject) => {
        this.$store
          .dispatch("addEvent", dbEvent)
          .then((res) => {
            this.eventId = res.data.userId;
            this.$store.commit("addStatus", {
              type: "success",
              note: "Event Added Successfully",
            });
            resolve(res);
          })
          .catch((e) => {
            this.$store.commit("addStatus", {
              type: "error",
              note: "Problem adding event. Try again in a few, or reach out to support.",
            });
            reject(e);
          });
      });
    },
    addEventToUser() {
      if (this.eventContacts.length > 0) {
        let promises = this.eventContacts.map((x) => {
          let payload = {
            clientId: x.id,
            variable: "associatedEvents",
            value: this.eventId,
            operation: "addToList",
          };

          return new Promise((resolve, reject) => {
            this.$store
              .dispatch("editContact", payload)
              .then((res) => {
                resolve(res);
              })
              .catch((e) => {
                this.$store.commit("addStatus", {
                  type: "error",
                  note: "Error in adding event to contact. Add on the event page.",
                });
                reject(e);
              });
          });
        });
        return Promise.all(promises);
      }
    },
    addEventToLocation() {
      let promises = this.eventLocations.map((x) => {
        let payload = {
          locationId: x,
          variable: "associatedEvents",
          value: this.eventId,
          operation: "addToList",
        };
        return new Promise((resolve, reject) => {
          this.$store
            .dispatch("editLocation", payload)
            .then((res) => {
              resolve(res);
            })
            .catch((e) => {
              this.$store.commit("addStatus", {
                type: "error",
                note: "Error adding event to location. Add on the event page.",
              });
              reject(e);
            });
        });
      });
      return Promise.all(promises);
    },
    async startCreate() {
      this.eventCreating = true;
      console.log(this.event);
      if (
        this.event.data.date &&
        this.event.data.endTime &&
        this.event.data.startTime
      ) {
        console.log("were in");
        if (
          (this.fields.location.name ||
            this.fields.location.address.streetAddress1 ||
            this.fields.location.address.streetAddress2 ||
            this.fields.location.address.cityStateZip) &&
          !this.fields.location.userId
        ) {
          await this.createLocation();
        }
        if (
          this.fields.client.given_name &&
          this.fields.client.family_name &&
          this.fields.client.username &&
          !this.fields.client.userId
        ) {
          await this.createUser();
        }
        await this.createEvent();
        await this.addEventToUser();
        await this.addEventToLocation();
        this.$router.push("/admin/events/" + this.eventId);
      }
    },
    convertThreeInputDropdownToDate(time, date, eventField) {
      if (date && time) {
        let newDate = new Date(date + " " + `${time.hours}:${time.minutes}`);
        console.log(time);
        if (time.period === "PM" && time.hours != "12") {
          newDate.setHours(newDate.getHours() + 12);
        } else if (time.hours == "12" && time.period === "AM") {
          newDate.setHours(0);
        }

        if (eventField === "endTime") {
          if (this.eventStartTime > newDate) {
            newDate.setDate(newDate.getDate() + 1);
            console.log(newDate);
          }
        }
        this.event.data[eventField] = newDate;
        return newDate;
      }
    },
    assignDateToEvent(date) {
      this.event.data.date = date;
    },
    //
  },
  computed: {
    eventDate() {
      if (this.fields.data.date) {
        this.assignDateToEvent(
          new Date(this.fields.data.date.replace(/-/g, "/").replace(/T.+/, ""))
        );
        return this.fields.data.date.replace(/-/g, "/").replace(/T.+/, "");
      } else {
        return new Date();
      }
    },

    eventStartTime() {
      return this.convertThreeInputDropdownToDate(
        this.fields.data.startTime,
        this.eventDate,
        "startTime"
      );
    },
    eventEndTime() {
      return this.convertThreeInputDropdownToDate(
        this.fields.data.endTime,
        this.eventDate,
        "endTime"
      );
    },
    clientSearchResults() {
      let clients = this.$store.getters.clients;
      if (
        clients.find((x) => {
          return (
            x.given_name == this.fields.client.given_name &&
            x.family_name == this.fields.client.family_name &&
            x.phoneNumber == this.fields.client.phoneNumber &&
            x.username == this.fields.client.username
          );
        })
      ) {
        return [];
      } else if (this.fields.client.given_name) {
        let term = this.fields.client.given_name.toLowerCase();
        return clients.filter((x) => {
          let clientFullName =
            x.given_name.toLowerCase() + " " + x.family_name.toLowerCase();
          if (clientFullName.includes(term)) {
            return true;
          } else {
            return false;
          }
        });
      } else {
        return [];
      }
    },
    forms() {
      return this.$store.state.businessSettings.product.forms.forms;
    },
    suggestedForms() {
      return this.forms.filter((form) => {
        let suggestedFormsIds = [];
        this.event.invoice.products.map((x) => {
          if (x.forms) {
            suggestedFormsIds = [...suggestedFormsIds, ...x.forms];
          }
        });
        return suggestedFormsIds.includes(form.id);
      });
    },
    contracts() {
      let item = this.$store.state.businessSettings.contracts.filter(
        (contract) => {
          let contracts = [];
          this.event.invoice.products.map((x) => {
            if (x.contracts) {
              contracts = [...contracts, ...x.contracts];
            }
          });
          return contracts.includes(contract.id);
        }
      );
      return item.map((x) => x.id);
    },
    businessProducts() {
      let array = [];
      let packages = this.$store.state.businessSettings.product.packages.map(
        (x) => ({ ...x, type: "Package" })
      );
      let services = this.$store.state.businessSettings.product.services.map(
        (x) => ({ ...x, type: "Service" })
      );
      let addOns = this.$store.state.businessSettings.product.addOns.map(
        (x) => ({ ...x, type: "Add-On" })
      );
      array = {
        packages: packages,
        services: services,
        addOns: addOns,
      };
      return array;
    },
    adjustments() {
      let discounts = this.$store.state.businessSettings.product.discounts;
      for (let x = 0; x < discounts.length; x++) {
        if (discounts[x].type === "dollar") {
          discounts[x].display = this.formatPrice(discounts[x].amount);
        }
        if (discounts[x].type === "percentage") {
          discounts[x].display = `${discounts[x].amount * 100}%`;
        }
      }
      return discounts;
    },
    searchLocations() {
      if (this.fields.location.name) {
        let locations = this.$store.getters.locations;
        let term = this.fields.location.name.toLowerCase();
        return locations.filter(
          (x) =>
            x.name.toLowerCase().includes(term) && x.name.toLowerCase() !== term
        );
      } else {
        return [];
      }
    },
  },
  async created() {
    await this.$store.dispatch("getAdminUsers");
    this.loaded = true;
  },
  components: {
    InputWithTitle,
    InputWithBinarySelections,
    InputWithTitleWithDropdown,
    BinaryInputWithNumberModifier,
  },
};
</script>

<style scoped>
@media screen {
  #event-creation-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }
  #form-wrapper {
    overflow-y: visible;
  }
  .event-creation-card {
    padding-bottom: 10px;
  }
  .form-details {
    height: fit-content;
    width: 350px;
    min-height: 60px;
  }

  .event-date {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .event-date .text,
  .event-date .date {
    width: 350px;
  }

  .event-times {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .time-inputs {
    display: flex;
    flex-direction: column;
  }

  .time-inputs .select {
    width: 350px;
  }

  .subheading {
    text-align: left;
    font-weight: 600;
    text-transform: uppercase;
  }

  .bubble-container {
    display: flex;
    flex-wrap: wrap;
  }

  .manual-payment-field {
    display: flex;
    flex-wrap: wrap;
  }

  .form-section-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    height: fit-content;
    padding: 10px;
    /* height: 300px; */
  }

  .forms-wrapper {
    padding: 10px;
  }

  .dropdown-parent {
    position: relative;
    min-height: 60px;
  }

  #sidebar-wrapper {
    padding-bottom: 60px;
  }

  #summary-inner-wrapper {
    height: 100%;
    overflow: scroll;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 1fr 60px;
  }

  #summary-body {
    display: flex;
    flex-direction: column;
  }

  .detail {
    text-align: left;
    margin-left: 10px;
  }

  .invoice-item {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .invoice-item-price {
    margin-left: 10px;
  }

  #submit-button {
    grid-row: 2/ 3;
  }

  @media (min-width: 850px) {
    #event-creation-wrapper {
      display: grid;
      grid-template-rows: 100%;
      grid-template-columns: 1fr 300px;
      gap: 10px;
    }
    #form-wrapper {
      grid-row: 1;
      grid-column: 1/2;
      overflow-y: scroll;
    }

    .event-date {
      display: unset;
    }

    .event-date .text,
    .event-date .date {
      width: unset;
    }

    .event-times {
      display: flex;
      flex-direction: column;
      width: unset;
    }

    .time-inputs {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }

    .time-inputs .select {
      width: unset;
    }

    #sidebar-wrapper {
      grid-row: 1;
      grid-column: 2/3;
      padding: 0;
    }
  }
}
</style>
