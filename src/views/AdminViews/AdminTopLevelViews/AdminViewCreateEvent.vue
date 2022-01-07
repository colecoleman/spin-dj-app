<template>
  <section id="event-creation-wrapper" v-if="loaded">
    <div id="form-wrapper">
      <div class="event-creation-card">
        <base-card>
          <template v-slot:title>Event Details</template>
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
        <base-card>
          <template v-slot:title>Product</template>
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
                      :disabled="productAssigned(product)"
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
        <base-card>
          <template v-slot:title>Select Form(s):</template>
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
                <p>
                  <i>Default forms from event products will appear here.</i>
                </p>
                <div
                  class="checkboxes"
                  v-for="(form, index) in suggestedForms"
                  :key="index"
                >
                  <input type="checkbox" @change="toggleFormFromEvent(form)" />
                  <p>{{ form.name }}</p>
                </div>
              </div>
              <div class="form-input">
                <p>All Forms:</p>
                <div
                  class="checkboxes"
                  v-for="(form, index) in forms"
                  :key="index"
                >
                  <input type="checkbox" @change="toggleFormFromEvent(form)" />
                  <p>{{ form.name }}</p>
                </div>
              </div>
            </div>
          </template>
        </base-card>
      </div>
      <div class="event-creation-card">
        <base-card>
          <template v-slot:title>Location</template>
          <template v-slot:action1
            ><div class="options-container">
              <h4 @click="locationOptionsOpen = !locationOptionsOpen">
                Options
              </h4>
              <floating-menu-with-list-items
                v-if="locationOptionsOpen"
                :actions="locationOptions"
                @actionClicked="selectLocationView"
              ></floating-menu-with-list-items></div
          ></template>
          <template v-slot:content>
            <div
              class="row-flex section-inner-wrapper"
              v-if="locationView === 'newLocation'"
            >
              <div class="form-input">
                <p>Location Name:</p>
                <input type="text" v-model.lazy="fields.location.name" />
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
              <!-- <button-standard-with-icon
                text="Add Another Location"
                class="align-center"
                @click="addLocation()"
              ></button-standard-with-icon> -->
            </div>
            <div
              class="column-flex section-inner-wrapper"
              v-if="locationView === 'existingLocation'"
            >
              <div class="form-input">
                <p>Search for Location:</p>
                <input
                  type="text"
                  v-model="fields.locationSearch"
                  placeholder="Start Typing To Search"
                />
              </div>
              <div
                class="location-item"
                v-for="location in searchLocations"
                :key="location.userId"
              >
                <img
                  :src="
                    location.profilePicture
                      ? location.profilePicture
                      : SVGs.LocationMarkerSVG
                  "
                  alt=""
                />
                <h5>{{ location.name }}</h5>

                <div class="refer-button-wrapper">
                  <button-standard-with-icon
                    :text="selectedLocation == location ? 'Confirm' : 'Add'"
                    @click="selectLocation(location)"
                  ></button-standard-with-icon>
                </div>
              </div>
              <h5
                v-if="searchLocations.length <= 0 && fields.locationSearch"
                @click="selectLocationView('newLocation')"
              >
                No Locations Found. Add New Location!
              </h5>
            </div>
          </template>
        </base-card>
      </div>
      <div class="event-creation-card">
        <base-card>
          <template v-slot:title>Client</template>
          <template v-slot:action1
            ><div class="options-container">
              <h4 @click="clientOptionsOpen = !clientOptionsOpen">Options</h4>
              <floating-menu-with-list-items
                v-if="clientOptionsOpen"
                :actions="clientOptions"
                @actionClicked="selectClientView"
              ></floating-menu-with-list-items></div
          ></template>
          <template v-slot:content>
            <div
              class="row-flex section-inner-wrapper"
              v-if="clientView === 'newClient'"
            >
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
                  <input type="text" v-model.lazy="fields.client.given_name" />
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
            <div class="column-flex" v-if="clientView === 'existingClient'">
              <div class="form-input">
                <p>Search For Client:</p>
                <input
                  type="text"
                  v-model="fields.clientSearch"
                  placeholder="Start Typing To Search"
                />
              </div>
              <div
                class="location-item"
                v-for="client in clientSearchResults"
                :key="client.userId"
              >
                <img
                  :src="
                    client.profilePicture
                      ? client.profilePicture
                      : defaultProfilePicture
                  "
                  alt=""
                />
                <h5>{{ client.given_name }} {{ client.family_name }}</h5>

                <div class="refer-button-wrapper">
                  <button-standard-with-icon
                    :text="selectedClient == client ? 'Confirm' : 'Add'"
                    @click="selectClient(client)"
                  ></button-standard-with-icon>
                </div>
              </div>
              <h5
                v-if="clientSearchResults.length <= 0 && fields.clientSearch"
                @click="selectClientView('newClient')"
              >
                No Clients Found. Add New Client!
              </h5>
            </div>
          </template>
        </base-card>
      </div>
    </div>
    <admin-view-create-event-summary
      @remove-location="removeLocation"
      :event="event"
      :locations="locations"
      :fields="fields"
      :clients="clients"
      :contracts="contracts"
    ></admin-view-create-event-summary>
  </section>
</template>

<script>
import SVGs from "../../../assets/SVGs/svgIndex.js";
import helpers from "../../../helpers.js";
import AdminViewCreateEventSummary from "../AdminComponents/AdminCreateComponents/AdminViewCreateEventSummary.vue";

import FloatingMenuWithListItems from "../../../SharedComponents/SharedComponentsUI/FloatingMenuWithListItems.vue";

export default {
  data() {
    return {
      SVGs,
      loaded: false,
      locations: [],
      clients: [],
      locationView: "existingLocation",
      selectedLocation: undefined,
      selectedClient: undefined,
      locationOptionsOpen: false,
      locationOptions: [
        {
          title: "Existing Location",
          logic: "existingLocation",
        },
        {
          title: "New Location",
          logic: "newLocation",
        },
      ],
      clientView: "newClient",
      clientOptionsOpen: false,
      clientOptions: [
        {
          title: "Existing Client",
          logic: "existingClient",
        },
        {
          title: "New Client",
          logic: "newClient",
        },
      ],

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
          pronoun: null,
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
      products: [],
    };
  },
  methods: {
    formatDate: helpers.formatDate,
    formatTime: helpers.formatTime,
    formatPrice: helpers.formatPrice,
    selectLocationView(action) {
      this.locationView = action;
      this.locationOptionsOpen = false;
    },
    selectLocation(location) {
      if (this.selectedLocation === location) {
        this.locations.push(location);
        this.selectedLocation = undefined;
        return;
      }
      if (this.selectedLocation !== location) {
        this.selectedLocation = location;
        return;
      }
    },
    selectClientView(action) {
      this.clientView = action;
      this.clientOptionsOpen = false;
    },
    selectClient(client) {
      if (this.selectedClient === client) {
        this.clients.push(client);
        this.selectedClient = undefined;
        return;
      }
      if (this.selectedClient !== client) {
        this.selectedClient = client;
        return;
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
      let index = array.indexOf(product);
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
    addLocation() {
      this.location.push(this.fields.location);
      this.fields.location = {
        name: null,
        streetAddress1: null,
        streetAddress2: null,
        cityStateZip: null,
      };
    },
    removeLocation(index) {
      this.locations.splice(index, 1);
    },
    addLocationToEvent(location) {
      this.event.locations.push(location.id);
    },

    addClient() {
      this.clients.push(this.fields.client);
      this.fields.client = {
        sendInvitation: true,
        pronoun: null,
        role: "client",
        given_name: null,
        family_name: null,
        phoneNumber: null,
        username: null,
      };
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
      if (this.fields.clientSearch) {
        let term = this.fields.clientSearch;
        return this.$store.state.contacts.clients.filter(
          (x) =>
            x.family_name.toLowerCase().includes(term.toLowerCase()) ||
            x.given_name.toLowerCase().includes(term.toLowerCase())
        );
      } else {
        return this.$store.state.contacts.clients;
      }
    },
    forms() {
      return this.$store.state.businessSettings.product.forms;
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
      let locations = this.$store.state.contacts.locations;
      if (this.fields.locationSearch) {
        locations = locations.filter(
          (x) =>
            x.name
              .toLowerCase()
              .includes(this.fields.locationSearch.toLowerCase()) ||
            x.address.cityStateZip
              .toLowerCase()
              .includes(this.fields.locationSearch.toLowerCase()) ||
            x.address.streetAddress1
              .toLowerCase()
              .includes(this.fields.locationSearch.toLowerCase())
        );
      }
      return locations;
    },
  },
  components: {
    AdminViewCreateEventSummary,
    FloatingMenuWithListItems,
  },
  async created() {
    // await this.$store.dispatch("setBusinessSettings");
    await this.$store.dispatch("getLocations");
    await this.$store.dispatch("getAdminUsers");
    this.loaded = true;
  },
};
</script>

<style scoped>
#event-creation-wrapper {
  width: 100%;
  display: flex;
  flex-direction: row;
}
#form-wrapper {
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 100%;
  overflow-y: scroll;
}

.event-creation-card {
  min-height: 300px;
  max-height: 300px;
}
.section-inner-wrapper {
  height: 100%;
  overflow-y: scroll;
}

.location-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50%;
  align-self: center;
}

.location-item > h5 {
  text-align: right;
}

.location-item > img {
  height: 20px;
}

.row-flex {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-start;
}

.row-flex div {
  width: 80%;
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

.align-center {
  align-self: center;
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

#sidebar-wrapper {
  width: 30%;
}

.summary-inner-wrapper {
  height: 100%;
  overflow: scroll;
}

.title-and-right-aligned-text h5,
.title-and-right-aligned-text p,
.title-and-indented-text h5 {
  text-align: left;
}

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