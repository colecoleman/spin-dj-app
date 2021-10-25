<template>
  <div id="sidebar-wrapper">
    <base-card>
      <template v-slot:title>Summary</template>
      <template v-slot:content>
        <div class="summary-inner-wrapper">
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
              <p class="product">{{ product.name }}</p>
              <p class="right-aligned-text">
                <b>{{ formatPrice(productTotal(product)) }}</b>
              </p>
            </div>
            <div class="indented-text row-flex">
              <p>Subtotal:</p>
              <p class="right-aligned-text">
                <b>{{ formatPrice(subtotal()) }}</b>
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
                <b>{{ formatPrice(total()) }}</b>
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
                <b>{{ formatPrice(balanceOutstanding()) }}</b>
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
    };
  },
  methods: {
    formatPrice: helpers.formatPrice,
    formatTime: helpers.formatTime,
    formatDate: helpers.formatDate,
    subtotal() {
      let subtotal = 0;
      for (let x = 0; x < this.event.invoice.products.length; x++) {
        subtotal += this.productTotal(this.event.invoice.products[x]);
      }
      return subtotal;
    },
    total() {
      let subtotal = this.subtotal();
      for (let x = 0; x < this.event.invoice.adjustments.length; x++) {
        if (this.event.invoice.adjustments[x].type === "percentage") {
          subtotal -=
            subtotal * this.event.invoice.adjustments[x].amount * 0.01;
        }
        if (this.event.invoice.adjustments[x].type === "dollar") {
          subtotal = subtotal - this.event.invoice.adjustments[x].amount;
        }
      }
      return subtotal;
    },
    balanceOutstanding() {
      let total = this.total();
      if (this.fields.payment.amount) {
        total -= this.event.invoice.payments[0].amount;
      }
      return total;
    },
    async createEvent() {
      await this.$store
        .dispatch("addEvent", this.event)
        .then((res) => {
          this.eventId = res.data.userId;
        })
        .catch((e) => console.log(e));
      this.createUser();
    },
    async createUser() {
      if (!Object.values(this.fields.client).every((v) => v == null)) {
        let client = this.fields.client;
        client.associatedEvents.push(this.eventId);
        await this.$store
          .dispatch("addContact", client)
          .then((res) => {
            this.clientId = res.userId;
          })
          .catch((e) => console.log(e));
      }
      this.addUserToEvent();
    },
    async addUserToEvent() {
      let payload = {
        eventId: this.eventId,
        variable: "contacts",
        value: this.clientId,
      };
      await this.$store
        .dispatch("editEvent", payload)
        .then((res) => {
          console.log(res);
        })
        .catch((e) => console.log(e));
    },
    calculateEventTime() {
      return Math.abs(this.event.data.startTime - this.event.data.endTime);
    },
    productTotal(product) {
      if (product.type === "Package" || product.type === "Service") {
        let hours = this.calculateEventTime() / (60 * 60 * 1000);
        let overage = hours - product.pricing.baseTime;
        return product.pricing.baseRate + product.pricing.addHourly * overage;
      }
      if (product.type === "Add-On") {
        console.log(this.calculateEventTime() / (60 * 60 * 1000));
      }
    },
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