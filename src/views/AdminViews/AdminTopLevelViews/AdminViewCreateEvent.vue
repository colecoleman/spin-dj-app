<template>
  <section id="event-creation-wrapper" v-if="loaded">
    <div id="form-wrapper">
      <div class="event-creation-card">
        <base-card title="Event Details">
          <template v-slot:content>
            <div class="row-flex section-inner-wrapper">
              <div class="event-date">
                <div class="form-input">
                  <p>Event Date:</p>
                  <input
                    type="date"
                    v-model.lazy="fields.date"
                    @blur="assignDateToEvent(fields.date)"
                  />
                </div>
              </div>
              <div class="event-times row-flex">
                <div class="form-input">
                  <p>Start Time:</p>
                  <input
                    type="time"
                    v-model.lazy="fields.startTime"
                    @blur="assignStartTimeToEvent(fields.startTime)"
                  />
                </div>
                <!-- <p>--</p> -->
                <div class="form-input">
                  <p>End Time:</p>
                  <input
                    type="time"
                    v-model.lazy="fields.endTime"
                    @blur="assignEndTimeToEvent(fields.endTime)"
                  />
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
                <select name="" id="">
                  <option value="">Select an adjustment</option>
                  <option
                    v-for="(adjustment, index) in adjustments"
                    :key="index"
                    :value="adjustment.name"
                    @click="assignAdjustmentToEvent(adjustment)"
                  >
                    {{ adjustment.name }}: {{ adjustment.display }}
                    {{ adjustment.style }}
                  </option>
                </select>
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
    <admin-view-create-event-summary
      @remove-location="removeLocation"
      :event="event"
      :fields="fields"
      :contracts="contracts"
    ></admin-view-create-event-summary>
  </section>
</template>

<script>
import SVGs from "../../../assets/SVGs/svgIndex.js";
import helpers from "../../../helpers.js";
import AdminViewCreateEventSummary from "../AdminComponents/AdminCreateComponents/AdminViewCreateEventSummary.vue";

export default {
  data() {
    return {
      SVGs,
      loaded: false,
      locationDropdownOpen: false,
      clientDropdownOpen: false,
      fields: {
        date: null,
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
    formatPrice: helpers.formatPrice,
    openLocationDropdown() {
      this.locationDropdownOpen = true;
    },
    openClientDropdown() {
      this.clientDropdownOpen = true;
    },
    selectLocation(location) {
      console.log(location);
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
      console.log(product);
      console.log(this.event.invoice.products);
      let array = this.event.invoice.products;
      console.log(array.indexOf(product));
      return array.indexOf(product);
    },
    changeAddOnQuantity(e, product) {
      let array = this.event.invoice.products;
      let index = this.productAssigned(product);
      if (index > -1) {
        array[index].pricing.units = e.target.value;
        console.log(array[index]);
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

    assignAdjustmentToEvent(adj) {
      this.event.invoice.adjustments.push(adj);
    },
    assignPaymentToEvent() {
      let payment = {
        name: this.fields.payment.name,
        amount: this.fields.payment.amount * 100,
      };
      this.event.invoice.payments[0] = payment;
    },
    assignDateToEvent(date) {
      let array = date.split("-");
      this.event.data.date = new Date(array[0], array[1] - 1, array[2]);
    },
    assignStartTimeToEvent(time) {
      this.event.data.startTime = new Date(this.fields.date + " " + time);
    },
    assignEndTimeToEvent(time) {
      this.event.data.endTime = new Date(this.fields.date + " " + time);
      if (this.event.data.startTime > this.event.data.endTime) {
        this.event.data.endTime.setDate(this.event.data.endTime.getDate() + 1);
      }
    },
  },
  computed: {
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
  components: {
    AdminViewCreateEventSummary,
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
</style>