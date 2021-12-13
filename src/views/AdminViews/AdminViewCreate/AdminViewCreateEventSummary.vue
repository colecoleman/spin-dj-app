<template>
  <div id="sidebar-wrapper">
    <base-card>
      <template v-slot:title>Summary</template>
      <template v-slot:content>
        <div class="summary-inner-wrapper" v-if="event">
          <div class="column-flex">
            <div class="row-flex">
              <div class="title-and-indented-text">
                <h5>Date:</h5>
                <p class="indented-text">
                  {{ event.data.date ? formatDate(event.data.date) : "" }}
                </p>
              </div>
              <div class="title-and-indented-text">
                <h5>Time:</h5>
                <p class="indented-text">
                  {{
                    event.data.startTime ? formatTime(event.data.startTime) : ""
                  }}
                  -
                  {{ event.data.endTime ? formatTime(event.data.endTime) : "" }}
                </p>
              </div>
            </div>
            <div class="title-and-indented-text">
              <h5>Location(s):</h5>
              <div class="row-flex" v-if="locations.length > 0">
                <div
                  class="row-flex"
                  v-for="(location, index) in locations"
                  :key="index"
                >
                  <div>
                    <p class="indented-text">{{ location.name }},</p>
                    <p class="indented-text">
                      {{ location.address.streetAddress1 }},
                    </p>
                    <p class="indented-text" v-if="location.streetAddress2">
                      {{ location.address.streetAddress2 }},
                    </p>
                    <p class="indented-text" v-if="location.streetAddress2">
                      {{ location.address.cityStateZip }}
                    </p>
                  </div>
                  <img :src="xIconSVG" alt="" @click="removeLocation(index)" />
                </div>
              </div>
              <div class="row-flex">
                <div v-if="fields.location.name">
                  <p class="indented-text">{{ fields.location.name }},</p>
                  <p class="indented-text">
                    {{ fields.location.address.streetAddress1 }}
                  </p>
                  <p
                    class="indented-text"
                    v-if="fields.location.streetAddress2"
                  >
                    {{ fields.location.address.streetAddress2 }}
                  </p>
                  <p
                    class="indented-text"
                    v-if="fields.location.streetAddress2"
                  >
                    {{ fields.location.address.cityStateZip }}
                  </p>
                </div>
              </div>
            </div>
            <div class="title-and-indented-text">
              <h5>Client(s):</h5>
              <div class="row-flex" v-if="clients.length > 0">
                <p
                  class="indented-text"
                  v-for="(client, index) in clients"
                  :key="index"
                >
                  {{ client.given_name }} {{ client.family_name }},<br />
                  {{ client.email }},<br />
                  {{ formatPhoneNumber(client.phoneNumber) }}
                </p>
                <img
                  v-if="clients.length > 0"
                  :src="xIconSVG"
                  alt=""
                  @click="removeClient(index)"
                />
              </div>
              <p
                class="indented-text"
                v-if="
                  fields.client.given_name &&
                  fields.client.family_name &&
                  fields.client.email &&
                  formatPhoneNumber(fields.client.phoneNumber)
                "
              >
                {{ fields.client.given_name }}
                {{ fields.client.family_name }},<br />
                {{ fields.client.email }},<br />
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
                    ? formatPrice(balanceOutstanding(event.invoice, event.data))
                    : formatPrice(0)
                }}</b>
              </p>
            </div>
          </div>
        </div>
        <button-standard-with-icon
          text="Create Event"
          @click="startCreate()"
        ></button-standard-with-icon>
      </template>
    </base-card>
  </div>
</template>

<script>
import helpers from "../../../helpers.js";

// import XIcon from "../../../assets/SVGs/x-icon.svg";
import { xIconSVG } from "../../../assets/SVGs/svgIndex.js";
export default {
  data() {
    return {
      eventId: undefined,
      clientId: [],
      locationId: [],
      xIconSVG,
    };
  },
  methods: {
    formatPrice: helpers.formatPrice,
    formatTime: helpers.formatTime,
    formatDate: helpers.formatDate,
    formatPhoneNumber: helpers.formatPhoneNumber,
    productTotal: helpers.productTotal,
    subtotal: helpers.subtotal,
    total: helpers.total,
    balanceOutstanding: helpers.balanceOutstanding,
    calculateEventTime: helpers.calculateEventTime,

    createLocation() {
      if (
        this.fields.location.name ||
        this.fields.location.address.streetAddress1 ||
        this.fields.location.address.streetAddress2 ||
        this.fields.location.address.cityStateZip
      ) {
        console.log("addingLocation");
        this.$store
          .dispatch("addLocation", this.fields.location)
          .then((res) => {
            this.$store.commit("addSuccess", "Location Added Successfully");
            this.locationId.push(res.data.userId);
          })
          .catch((e) => {
            this.$store.dispatch("addError", e);
          });
      }
    },
    removeLocation(index) {
      this.$emit("removeLocation", index);
    },
    createUser() {
      if (Object.values(this.fields.client).every((v) => v !== null)) {
        console.log("creatingClient");
        let client = this.fields.client;
        client.associatedEvents.push(this.eventId);
        this.$store
          .dispatch("addContact", client)
          .then((res) => {
            this.clientId.push(res.userId);
            this.$store.commit("addSuccess", "Client Added Successfully");
          })
          .catch((e) => {
            this.$store.dispatch("addError", e);
          });
      }
    },
    createEvent() {
      let dbEvent = Object.assign(this.event);
      dbEvent.contacts = this.clientId;
      dbEvent.locations = this.locationId;
      dbEvent.contracts = this.contracts.map((x) => ({
        id: x,
        signerName: null,
        signerDate: null,
        signerUUID: null,
        status: 'pending',
      }));
      console.log(dbEvent);
      this.$store
        .dispatch("addEvent", dbEvent)
        .then((res) => {
          console.log(res);
          this.eventId = res.data.userId;
          console.log(this.eventId);
          this.$store.commit("addSuccess", "Event Added Successfully");
          this.editContactAndLocation();
        })
        .catch((e) => {
          this.$store.dispatch("addError", e);
        });
    },
    editContactAndLocation() {
      this.addEventToUser();
      this.addEventToLocation();
    },
    // addUserToEvent() {
    //   if (this.clientId.length > 0) {
    //     let payload = {
    //       eventId: this.eventId,
    //       variable: "contacts",
    //       value: this.clientId,
    //       // operation: "addToList",
    //     };
    //     this.$store
    //       .dispatch("editEvent", payload)
    //       .then((res) => {
    //         console.log(res);
    //         this.$store.commit("addSuccess", "Client Added To Event");
    //       })
    //       .catch((e) => {
    //         this.$store.dispatch("addError", e);
    //       });
    //     this.addEventToUser();
    //   }
    // },
    addEventToUser() {
      let eventId = this.eventId;
      if (this.clientId.length > 0) {
        console.log(this.clientId);
        this.clientId.forEach((client) => {
          let payload = {
            clientId: client,
            variable: "associatedEvents",
            value: eventId,
            operation: "addToList",
          };
          console.log(payload);
          this.$store
            .dispatch("editContact", payload)
            .then((res) => {
              console.log(res);
              this.$store.commit("addSuccess", "Event Added To Contact");
            })
            .catch((e) => {
              this.$store.dispatch("addError", e);
            });
        });
      }
    },
    // addLocationToEvent() {
    //   if (this.locationId.length > 0) {
    //     this.locationId.forEach((location) => {
    //       let payload = {
    //         eventId: this.eventId,
    //         variable: "locations",
    //         value: location,
    //         operation: "addToList",
    //       };
    //       this.$store
    //         .dispatch("editEvent", payload)
    //         .then(() => {
    //           this.$store.commit("addSuccess", "Location Added To Event");
    //           this.$router.push("/admin/events/" + this.eventId);
    //         })
    //         .catch((e) => {
    //           this.$store.dispatch("addError", e);
    //         });
    //     });
    //   }
    // },
    addEventToLocation() {
      let eventId = this.eventId;
      if (this.locationId.length > 0) {
        console.log(this.locationId);
        console.log(eventId);
        this.locationId.forEach((location) => {
          let payload = {
            locationId: location,
            variable: "associatedEvents",
            value: eventId,
            operation: "addToList",
          };
          console.log(payload);
          this.$store
            .dispatch("editLocation", payload)
            .then((res) => {
              console.log(res);
              this.$store.commit("addSuccess", "Event Added To Contact");
            })
            .catch((e) => {
              this.$store.dispatch("addError", e);
            });
        });
      }
    },
    async startCreate() {
      // this.eventId = undefined;
      this.locationId = this.locations.map((x) => x.userId);
      this.clientId = this.clients.map((x) => x.userId);
      console.log(this.locationId);
      console.log(this.clientId);
      await this.createLocation();
      await this.createUser();
      await this.createEvent();
      // console.log(this.eventId);
      // await this.addEventToUser();
      // await this.addEventToLocation();
      console.log(this.event);
      console.log(this.locations);
      console.log(this.clients);
      console.log(this.fields);
    },
    //
  },
  props: ["event", "locations", "fields", "clients", "contracts"],
};
</script>

<style scoped>
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
  width: 30%;
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