<template>
  <div id="sidebar-wrapper">
    <base-card title="Summary">
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
                    ? formatPrice(balanceOutstanding(event.invoice, event.data))
                    : formatPrice(0)
                }}</b>
              </p>
            </div>
          </div>
        </div>
        <button-standard-with-icon text="Create Event" @click="startCreate()" />
      </template>
    </base-card>
  </div>
</template>

<script>
import { formatPrice } from "../../../../helpers.js";
import SVGs from "../../../../assets/SVGs/svgIndex.js";
export default {
  data() {
    return {
      eventId: undefined,
      eventContacts: [],
      eventLocations: [],
      SVGs,
    };
  },
  methods: {
    formatPrice,
    // formatTime: helpers.formatTime,
    // formatDate: helpers.formatDate,
    // formatPhoneNumber: helpers.formatPhoneNumber,
    // productTotal: helpers.productTotal,
    // subtotal: helpers.subtotal,
    // total: helpers.total,
    // balanceOutstanding: helpers.balanceOutstanding,
    // calculateEventTime: helpers.calculateEventTime,

    // createLocation() {
    //   return new Promise((resolve, reject) => {
    //     this.$store
    //       .dispatch("addLocation", this.fields.location)
    //       .then((res) => {
    //         this.eventLocations.push(res.data.userId);
    //         resolve(res);
    //       })
    //       .catch((e) => {
    //         this.$store.commit("addStatus", {
    //           type: "error",
    //           note: "Error adding location. Try again on the contact page, and then assign to the event!",
    //         });
    //         reject(e);
    //       });
    //   });
    // },
    // removeLocation(index) {
    //   this.$emit("removeLocation", index);
    // },
    // createUser() {
    //   return new Promise((resolve, reject) => {
    //     this.$store
    //       .dispatch("addContact", this.fields.client)
    //       .then((res) => {
    //         this.eventContacts.push({ role: res.role, id: res.userId });
    //         resolve(res);
    //       })
    //       .catch((e) => {
    //         this.$store.commit("addStatus", {
    //           type: "error",
    //           note: "Error adding client. Try adding on contact page, and assigning to event.",
    //         });
    //         reject(e);
    //       });
    //   });
    // },
    // createEvent() {
    //   let dbEvent = Object.assign({}, this.event);
    //   if (this.fields.client.userId) {
    //     this.eventContacts.push({
    //       role: "client",
    //       id: this.fields.client.userId,
    //     });
    //   }
    //   if (this.fields.location.userId) {
    //     this.eventLocations.push(this.fields.location.userId);
    //   }
    //   dbEvent.contacts = [...this.eventContacts];
    //   dbEvent.locations = [...this.eventLocations];
    //   dbEvent.contracts = this.contracts.map((x) => ({
    //     id: x,
    //     signerName: null,
    //     signerDate: null,
    //     signerUUID: null,
    //     status: "pending",
    //   }));
    //   console.log(dbEvent);
    //   return new Promise((resolve, reject) => {
    //     this.$store
    //       .dispatch("addEvent", dbEvent)
    //       .then((res) => {
    //         this.eventId = res.data.userId;
    //         this.$store.commit("addStatus", {
    //           type: "success",
    //           note: "Event Added Successfully",
    //         });
    //         resolve(res);
    //       })
    //       .catch((e) => {
    //         this.$store.commit("addStatus", {
    //           type: "error",
    //           note: "Problem adding event. Try again in a few, or reach out to support.",
    //         });
    //         reject(e);
    //       });
    //   });
    // },
    // addEventToUser() {
    //   if (this.eventContacts.length > 0) {
    //     let promises = this.eventContacts.map((x) => {
    //       let payload = {
    //         clientId: x.id,
    //         variable: "associatedEvents",
    //         value: this.eventId,
    //         operation: "addToList",
    //       };

    //       return new Promise((resolve, reject) => {
    //         this.$store
    //           .dispatch("editContact", payload)
    //           .then((res) => {
    //             resolve(res);
    //           })
    //           .catch((e) => {
    //             this.$store.commit("addStatus", {
    //               type: "error",
    //               note: "Error in adding event to contact. Add on the event page.",
    //             });
    //             reject(e);
    //           });
    //       });
    //     });
    //     return Promise.all(promises);
    //   }
    // },
    // addEventToLocation() {
    //   let promises = this.eventLocations.map((x) => {
    //     let payload = {
    //       locationId: x,
    //       variable: "associatedEvents",
    //       value: this.eventId,
    //       operation: "addToList",
    //     };
    //     return new Promise((resolve, reject) => {
    //       this.$store
    //         .dispatch("editLocation", payload)
    //         .then((res) => {
    //           resolve(res);
    //         })
    //         .catch((e) => {
    //           this.$store.commit("addStatus", {
    //             type: "error",
    //             note: "Error adding event to location. Add on the event page.",
    //           });
    //           reject(e);
    //         });
    //     });
    //   });
    //   return Promise.all(promises);
    // },
    // async startCreate() {
    //   if (this.fields.date && this.fields.endTime && this.fields.startTime) {
    //     if (
    //       (this.fields.location.name ||
    //         this.fields.location.address.streetAddress1 ||
    //         this.fields.location.address.streetAddress2 ||
    //         this.fields.location.address.cityStateZip) &&
    //       !this.fields.location.userId
    //     ) {
    //       await this.createLocation();
    //     }
    //     if (
    //       Object.values(this.fields.client).every((v) => v !== null) &&
    //       !this.fields.client.userId
    //     ) {
    //       await this.createUser();
    //     }
    //     await this.createEvent();
    //     await this.addEventToUser();
    //     await this.addEventToLocation();
    //     this.$router.push("/admin/events/" + this.eventId);
    //   }
    // },
    // //
  },
  props: ["event", "fields", "contracts"],
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
