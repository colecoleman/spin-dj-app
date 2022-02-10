<template>
  <section id="event-creation-wrapper" v-if="loaded">
    <div id="form-wrapper">
      <div class="event-creation-card">
        <base-card title="Event Details">
          <template v-slot:content>
            <div class="row-flex section-inner-wrapper">
              <div class="event-date">
                <div class="form-input">
                  <p>Event Title (Optional):</p>
                  <input type="text" v-model="event.title" />
                </div>
                <div class="form-input">
                  <p>Event Date:</p>
                  <input type="date" v-model.lazy="fields.data.date" />

                  <p class="disclaimer">
                    * if using Safari or IE without a date picker, enter date in
                    'YYYY-MM-DD' format
                  </p>
                </div>
              </div>
              <div class="event-times row-flex">
                <div class="form-input">
                  <p>Start Time:</p>

                  <div class="time-inputs">
                    <select v-model="fields.data.startTime.hours">
                      <option
                        v-for="(item, index) in 12"
                        :key="item"
                        :value="index + 1"
                      >
                        {{ index + 1 }}
                      </option>
                    </select>
                    <select v-model="fields.data.startTime.minutes">
                      <option
                        v-for="(item, index) in ['00', '15', '30', '45']"
                        :key="index"
                        :value="item"
                      >
                        {{ item }}
                      </option>
                    </select>
                    <select v-model="fields.data.startTime.period">
                      <option
                        v-for="(item, index) in ['PM', 'AM']"
                        :key="index"
                        :value="item"
                      >
                        {{ item }}
                      </option>
                    </select>
                  </div>
                </div>
                <!-- <p>--</p> -->
                <div class="form-input">
                  <p>End Time:</p>
                  <!-- <input
                    type="time"
                    v-model.lazy="fields.endTime"
                    @blur="assignEndTimeToEvent(fields.endTime)"
                  /> -->
                  <div class="time-inputs">
                    <select v-model="fields.data.endTime.hours">
                      <option
                        v-for="(item, index) in 12"
                        :key="item"
                        :value="index + 1"
                      >
                        {{ index + 1 }}
                      </option>
                    </select>
                    <select v-model="fields.data.endTime.minutes">
                      <option
                        v-for="(item, index) in ['00', '15', '30', '45']"
                        :key="index"
                        :value="item"
                      >
                        {{ item }}
                      </option>
                    </select>
                    <select v-model="fields.data.endTime.period">
                      <option
                        v-for="(item, index) in ['PM', 'AM']"
                        :key="index"
                        :value="item"
                      >
                        {{ item }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </base-card>
      </div>
      <div class="event-creation-card">
        <base-card title="Product">
          <template v-slot:content>
            <div class="row-flex section-inner-wrapper">
              <div class="form-input">
                <p><b>Select Product(s):</b></p>
                <div
                  class="checkboxes"
                  v-for="(product, index) in businessProducts"
                  :key="index"
                >
                  <div v-if="product.type != 'Add-On'" class="checkboxes">
                    <input
                      type="checkbox"
                      @change="toggleProductFromEvent(product)"
                    />
                    <p>{{ product.name }}</p>
                  </div>
                  <div v-if="product.type === 'Add-On'" class="checkboxes">
                    <input
                      type="checkbox"
                      @change="toggleProductFromEvent(product)"
                    />
                    <p>{{ product.name }} x</p>
                    <input
                      type="number"
                      :min="product.pricing.minUnits"
                      @change="changeAddOnQuantity($event, product)"
                      :disabled="!productAssigned(product)"
                      class="checkbox-add-on-units"
                    />
                  </div>
                </div>
              </div>
              <div class="form-input">
                <p>Select Adjustment(s):</p>
                <div
                  class="checkboxes"
                  v-for="(adjustment, index) in adjustments"
                  :key="index"
                  :value="adjustment.name"
                >
                  <input
                    type="checkbox"
                    @change="toggleAdjustmentToEvent(adjustment)"
                    :id="adjustment.id"
                  />
                  <p>{{ adjustment.name }}</p>
                </div>
              </div>
              <div class="form-input">
                <p>Enter Manual Payment:</p>
                <div class="row-flex">
                  <input
                    type="text"
                    v-model.lazy="fields.payment.name"
                    placeholder="Payment Name"
                  />
                  <input
                    type="number"
                    class="less-width"
                    v-model.lazy="fields.payment.amount"
                    @blur="assignPaymentToEvent()"
                    placeholder="Amount"
                  />
                </div>
                <!-- <p>Enter Manual Adjustment:</p>
                <div class="row-flex">
                  <input
                    type="checkbox"
                    id="input-checkbox"
                    @change="toggleAdjustmentToEvent(fields.adjustment, true)"
                  />
                  <input
                    type="text"
                    v-model.lazy="fields.adjustment.name"
                    placeholder="Name"
                  />
                  <div class="unified-field row-flex">
                    <select v-model="fields.adjustment.type">
                      <option
                        v-for="(item, index) in [
                          { sign: '%', type: 'percentage' },
                          { sign: '$', type: 'dollar' },
                        ]"
                        :key="index"
                        :value="item.type"
                      >
                        {{ item.sign }}
                      </option>
                    </select>
                    <input
                      type="number"
                      class="less-width"
                      v-model.lazy="fields.adjustment.amount"
                      placeholder="Amount"
                    />
                  </div>
                </div> -->
              </div>
            </div>
          </template>
        </base-card>
      </div>
      <div class="event-creation-card">
        <base-card title="Select Form(s):">
          <template v-slot:content>
            <div class="row-flex section-inner-wrapper">
              <div class="form-input">
                <p>Suggested Form(s):</p>
                <div class="checkboxes">
                  <input
                    :disabled="event.invoice.products.length > 0 ? false : true"
                    type="checkbox"
                    @change="toggleAllDefaultForms()"
                  />
                  <p>Attach All Default Forms For Chosen Product(s)</p>
                </div>
                <div
                  class="form-name"
                  v-for="(form, index) in suggestedForms"
                  :key="index"
                >
                  <p>- {{ form.name }}</p>
                </div>
              </div>
              <div class="form-input">
                <p>All Forms:</p>
                <div
                  class="checkboxes"
                  v-for="(form, index) in forms"
                  :key="index"
                >
                  <input
                    type="checkbox"
                    @change="toggleFormFromEvent(form)"
                    :id="form.id"
                  />
                  <p>{{ form.name }}</p>
                </div>
              </div>
            </div>
          </template>
        </base-card>
      </div>
      <div class="event-creation-card">
        <base-card title="Location">
          <template v-slot:content>
            <div class="row-flex section-inner-wrapper">
              <div class="form-input">
                <p>Location Name:</p>
                <div class="dropdown-parent">
                  <input
                    type="text"
                    v-model="fields.location.name"
                    @keydown="openLocationDropdown"
                    placeholder="Start typing to find past location or add a new one."
                  />
                  <div
                    class="dropdown"
                    v-if="locationDropdownOpen && searchLocations.length > 0"
                  >
                    <div
                      class="dropdown-item"
                      v-for="location in searchLocations"
                      :key="location.userId"
                      :value="location.name"
                      @click="selectLocation(location)"
                    >
                      <p class="location-name">{{ location.name }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="column-flex">
                <div class="form-input">
                  <p>Street Address 1:</p>
                  <input
                    type="text"
                    v-model.lazy="fields.location.address.streetAddress1"
                  />
                </div>
                <div class="form-input">
                  <p>Street Address 2:</p>
                  <input
                    type="text"
                    v-model.lazy="fields.location.address.streetAddress2"
                  />
                </div>
                <div class="form-input">
                  <p>City, State/Province, Zip Code:</p>
                  <input
                    type="text"
                    v-model.lazy="fields.location.address.cityStateZip"
                  />
                </div>
              </div>
            </div>
          </template>
        </base-card>
      </div>
      <div class="event-creation-card">
        <base-card title="Client">
          <template v-slot:content>
            <div class="row-flex section-inner-wrapper">
              <div class="column-flex">
                <div class="form-input">
                  <p>Pronoun/ Prefix:</p>
                  <select
                    name="Preferred Pronoun"
                    v-model.trim.lazy="fields.client.pronoun"
                  >
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Other">
                      Other (please prefix first name)
                    </option>
                  </select>
                </div>
                <div class="form-input">
                  <p>First Name:</p>
                  <div id="client-search-parent" class="dropdown-parent">
                    <input
                      type="text"
                      v-model="fields.client.given_name"
                      @keydown="openClientDropdown"
                      placeholder="Start typing to assign existing client, or add a new one."
                    />
                    <div
                      class="dropdown"
                      v-if="
                        clientDropdownOpen && clientSearchResults.length > 0
                      "
                    >
                      <div
                        class="dropdown-item"
                        v-for="client in clientSearchResults"
                        :key="client.userId"
                        :value="client.given_name + ' ' + client.family_name"
                        @click="selectClient(client)"
                      >
                        <p class="location-name">
                          {{ client.given_name + " " + client.family_name }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-input">
                  <p>Last Name:</p>
                  <input type="text" v-model.lazy="fields.client.family_name" />
                </div>
              </div>
              <div class="column-flex">
                <div class="form-input">
                  <p>Email Address:</p>
                  <input type="email" v-model.lazy="fields.client.username" />
                </div>
                <div class="form-input">
                  <p>Phone Number:</p>
                  <input type="text" v-model.lazy="fields.client.phoneNumber" />
                </div>
                <div class="form-input row-flex">
                  <p>
                    <input
                      type="checkbox"
                      style="width: 10px"
                      v-model="fields.client.sendInvitation"
                    />
                    Send Invitation?
                  </p>
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
          <div class="summary-inner-wrapper" v-if="event">
            <div class="column-flex">
              <div class="row-flex">
                <div class="title-and-indented-text">
                  <h5>Date:</h5>
                  <p class="indented-text">
                    {{ fields.data.date ? formatDate(eventDate) : "" }}
                  </p>
                </div>
                <div class="title-and-indented-text">
                  <h5>Time:</h5>
                  <p class="indented-text">
                    <!-- {{
                      event.data.startTime
                        ? formatTime(event.data.startTime)
                        : ""
                    }} -->
                    {{ formatTime(eventStartTime) }}
                    -
                    {{ eventEndTime ? formatTime(eventEndTime) : "" }}
                  </p>
                </div>
              </div>
              <div class="title-and-indented-text">
                <h5>Location(s):</h5>

                <div class="row-flex">
                  <div v-if="fields.location.name">
                    <p class="indented-text">{{ fields.location.name }},</p>
                    <p class="indented-text">
                      {{ fields.location.address.streetAddress1 }}
                    </p>
                    <p
                      class="indented-text"
                      v-if="fields.location.address.streetAddress2"
                    >
                      {{ fields.location.address.streetAddress2 }}
                    </p>
                    <p
                      class="indented-text"
                      v-if="fields.location.address.cityStateZip"
                    >
                      {{ fields.location.address.cityStateZip }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="title-and-indented-text">
                <h5>Client(s):</h5>

                <p
                  class="indented-text"
                  v-if="
                    fields.client.given_name &&
                    fields.client.family_name &&
                    fields.client.username &&
                    fields.client.phoneNumber
                  "
                >
                  {{ fields.client.given_name }}
                  {{ fields.client.family_name }},<br />
                  {{ fields.client.username }},<br />
                  {{ formatPhoneNumber(fields.client.phoneNumber) }}
                </p>
              </div>
            </div>
            <div class="title-and-right-aligned-text">
              <h5>Invoice Details:</h5>
              <div
                class="indented-text row-flex product"
                v-for="(product, index) in event.invoice.products"
                :key="index"
              >
                <!-- <p>{{ event }}</p> -->
                <p class="product">{{ product.name }}</p>
                <p class="right-aligned-text">
                  <b>{{ formatPrice(productTotal(product, event.data)) }}</b>
                </p>
              </div>
              <div class="indented-text row-flex">
                <p>Subtotal:</p>
                <p class="right-aligned-text">
                  <b>{{ formatPrice(subtotal(event.invoice, event.data)) }}</b>
                </p>
              </div>
              <div
                class="indented-text row-flex"
                v-for="(adjustment, index) in event.invoice.adjustments"
                :key="index"
              >
                <p>
                  {{ adjustment.name }}
                </p>
                <p class="right-aligned-text">
                  <b>{{ adjustment.display }}</b>
                </p>
              </div>
              <div class="indented-text row-flex">
                <p>Total:</p>
                <p class="right-aligned-text">
                  <b>{{ formatPrice(total(event.invoice, event.data)) }}</b>
                </p>
              </div>
              <div class="indented-text row-flex">
                <p>Payments Collected:</p>
                <p class="right-aligned-text">
                  <b>{{
                    event.invoice.payments[0]
                      ? formatPrice(event.invoice.payments[0].amount)
                      : "$" + 0
                  }}</b>
                </p>
              </div>
              <div class="indented-text row-flex">
                <p>Balance Outstanding:</p>
                <p class="right-aligned-text">
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
            text="Create Event"
            @click="startCreate()"
          />
        </template>
      </base-card>
    </div>
  </section>
</template>

<script>
import SVGs from "../../../assets/SVGs/svgIndex.js";
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
      eventId: undefined,
      eventContacts: [],
      eventLocations: [],
      // from event summary
      SVGs,
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
    };
  },
  methods: {
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
        array[index].pricing.units = e.target.value;
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
      this.suggestedForms.forEach((f) => {
        document.getElementById(f.id).checked = true;
      });
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
      console.log(dbEvent);
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
      if (this.fields.client.given_name) {
        let term = this.fields.client.given_name;
        return this.$store.state.contacts.clients.filter(
          (x) =>
            x.family_name.toLowerCase().includes(term.toLowerCase()) ||
            x.given_name.toLowerCase().includes(term.toLowerCase())
        );
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

      array = [...packages, ...services, ...addOns];
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
        let term = this.fields.location.name.toLowerCase();
        return this.$store.state.contacts.locations.filter(
          (x) =>
            x.name.toLowerCase().includes(term) ||
            x.address.cityStateZip.toLowerCase().includes(term) ||
            x.address.streetAddress1.toLowerCase().includes(term)
        );
      }
      return [];
    },
  },
  async created() {
    await this.$store.dispatch("getLocations");
    await this.$store.dispatch("getAdminUsers");
    this.loaded = true;
  },
};
</script>

<style scoped>
#event-creation-wrapper {
  display: grid;
  height: 100%;
  grid-template-columns: 1fr 250px;
  grid-template-rows: 1fr;
  gap: 10px;
}
#form-wrapper {
  grid-row: 1;
  grid-column: 1 / 2;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: scroll;
}

.event-creation-card {
  max-height: 300px;
  margin-bottom: 10px;
}
.section-inner-wrapper {
  height: 100%;
  overflow-y: scroll;
}

.row-flex {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-start;
}

.form-name > p {
  margin-left: 20px;
  text-align: left;
}

.row-flex div {
  width: 80%;
}

.dropdown-parent {
  width: 100%;
  position: relative;
}

#client-search-parent {
  width: 100%;
}

.dropdown-parent > input {
  z-index: 2;
  position: relative;
}

.dropdown {
  z-index: 1;
  top: calc(100% - 10px);
  left: 3px;
  position: absolute;
  margin-left: 9%;
  border: 1px solid var(--textColor);
  background-color: var(--foregroundColor);
  max-height: 100px;
  overflow-x: scroll;
  width: 100%;
}

.column-flex {
  display: flex;
  flex-direction: column;
}

.form-input > p {
  text-align: left;
  font-size: 8pt;
}

.form-input > .row-flex {
  margin-left: 20px;
}

.event-times {
  align-content: center;
  align-items: flex-end;
}

.less-width {
  width: 40%;
}

.checkboxes {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: left;
  align-items: center;
}

.checkboxes > input {
  width: unset;
}

input[type="checkbox"] {
  width: unset;
}

.unified-field > input,
.unified-field > select {
  margin: 0px;
}

.checkboxes > .checkbox-add-on-units {
  width: 40px;
  height: 10px;
  outline: none;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid var(--textColor);
}

input {
  font-family: Lato, sans-serif;
  width: 80%;
  margin: 5px;
}

img {
  height: 10px;
  cursor: pointer;
}

:disabled {
  opacity: 0.25;
}

.disclaimer {
  font-style: italic;
  font-size: 6pt;
}

.row-flex {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.row-flex div {
  width: 80%;
}

.column-flex {
  display: flex;
  flex-direction: column;
}

#sidebar-wrapper {
  /* width: 100%; */
  grid-row: 1;
  grid-column: 2/3;
}

.summary-inner-wrapper {
  height: 100%;
  overflow-y: scroll;
}

.title-and-right-aligned-text h5,
.title-and-right-aligned-text p,
.title-and-indented-text h5,
.title-and-indented-text p {
  text-align: left;
}

.product {
  margin: 1px 0 1px 0;
}

#sidebar-wrapper p {
  margin-left: 20px;
  font-size: 8pt;
}

.indented-text {
  margin-left: 40px;
}

.right-aligned-text {
  text-align: right;
}

img {
  height: 10px;
}

:disabled {
  opacity: 0.25;
}
</style>
