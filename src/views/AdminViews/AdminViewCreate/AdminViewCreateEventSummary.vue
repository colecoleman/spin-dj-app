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
                <p
                  class="indented-text"
                  v-for="(location, index) in locations"
                  :key="index"
                >
                  {{ location.name }},<br />
                  {{ location.streetAddress1 }},<br />
                  {{
                    location.streetAdress2 ? location.streetAddress2 : ""
                  }},<br />
                  {{ location.cityStateZip }}
                </p>
                <img :src="XIcon" alt="" @click="removeLocation(index)" />
              </div>
              <p class="indented-text">
                {{ fields.location.name ? fields.location.name + "," : ""
                }}<br />
                {{
                  fields.location.streetAddress1
                    ? fields.location.streetAddress1 + ","
                    : ""
                }}<br />
                {{
                  fields.location.streetAddress2
                    ? fields.location.streetAddress2 + ","
                    : ""
                }}<br />
                {{
                  fields.location.cityStateZip
                    ? fields.location.cityStateZip + ","
                    : ""
                }}
              </p>
            </div>
            <div class="title-and-indented-text">
              <h5>Client(s):</h5>
              <div class="row-flex" v-if="clients.length > 0">
                <p
                  class="indented-text"
                  v-for="(client, index) in clients"
                  :key="index"
                >
                  {{ client.givenName }} {{ client.familyName }},<br />
                  {{ client.emailAddress }},<br />
                  {{ client.phoneNumber }}
                </p>
                <img
                  v-if="clients.length > 0"
                  :src="XIcon"
                  alt=""
                  @click="removeClient(index)"
                />
              </div>
              <p
                class="indented-text"
                v-if="
                  fields.client.givenName &&
                  fields.client.familyName &&
                  fields.client.emailAddress &&
                  fields.client.phoneNumber
                "
              >
                {{ fields.client.givenName }}
                {{ fields.client.familyName }},<br />
                {{ fields.client.emailAddress }},<br />
                {{ fields.client.phoneNumber }}
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
          @click="createEvent()"
        ></button-standard-with-icon>
      </template>
    </base-card>
  </div>
</template>

<script>
import helpers from "../../../helpers.js";
import ButtonStandardWithIcon from "../../../SharedComponents/SharedComponentsUI/ButtonStandardWithIcon.vue";
export default {
  data() {
    return {
      eventId: undefined,
      clientId: undefined,
      locationId: undefined,
    };
  },
  methods: {
    formatPrice: helpers.formatPrice,
    formatTime: helpers.formatTime,
    formatDate: helpers.formatDate,
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
        this.$store
          .dispatch("addLocation", this.fields.location)
          .then((res) => {
            this.$store.commit("addSuccess", "Location Added Successfully");
            this.locationId = res.data.userId;
            this.createUser();
          })
          .catch((e) => {
            this.$store.dispatch("addError", e);
          });
      }
    },
    createUser() {
      if (!Object.values(this.fields.client).every((v) => v == null)) {
        let client = this.fields.client;
        client.associatedEvents.push(this.eventId);
        this.$store
          .dispatch("addContact", client)
          .then((res) => {
            this.clientId = res.userId;
            this.$store.commit("addSuccess", "Client Added Successfully");
            this.addEventToDB();
          })
          .catch((e) => {
            this.$store.dispatch("addError", e);
          });
      }
    },
    addEventToDB() {
      this.$store
        .dispatch("addEvent", this.event)
        .then((res) => {
          this.eventId = res.data.userId;
          this.$store.commit("addSuccess", "Event Added Successfully");
          this.addUserToEvent();
        })
        .catch((e) => {
          this.$store.dispatch("addError", e);
        });
    },

    addUserToEvent() {
      if (this.clientId) {
        let payload = {
          eventId: this.eventId,
          variable: "contacts",
          value: this.clientId,
          operation: "addToList",
        };
        this.$store
          .dispatch("editEvent", payload)
          .then((res) => {
            console.log(res);
            this.$store.commit("addSuccess", "Client Added To Event");
            this.addEventToUser();
          })
          .catch((e) => {
            this.$store.dispatch("addError", e);
          });
      }
    },
    addEventToUser() {
      if (this.clientId) {
        let payload = {
          clientId: this.clientId,
          variable: "associatedEvents",
          value: this.eventId,
          operation: "addToList",
        };
        this.$store
          .dispatch("editContact", payload)
          .then((res) => {
            console.log(res);
            this.$store.commit("addSuccess", "Event Added To Contact");
            this.addLocationToEvent();
          })
          .catch((e) => {
            this.$store.dispatch("addError", e);
          });
      }
    },
    addLocationToEvent() {
      if (this.locationId) {
        let payload = {
          eventId: this.eventId,
          variable: "locations",
          value: this.locationId,
          operation: 'addToList'
        };
        this.$store
          .dispatch("editEvent", payload)
          .then(() => {
            this.$store.commit("addSuccess", "Location Added To Event");
            this.$router.push("/admin/events/" + this.eventId);
          })
          .catch((e) => {
            this.$store.dispatch("addError", e);
          });
      }
    },
    async createEvent() {
      this.eventId = undefined;
      this.locationId = undefined;
      this.clientId = undefined;
      this.createLocation();
    },
    //
  },
  created() {
    console.log(this.event);
  },
  components: { ButtonStandardWithIcon },
  props: ["event", "locations", "fields", "clients"],
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