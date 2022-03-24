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

export default {
  data() {
    return {
      eventId: undefined,
      eventContacts: [],
      eventLocations: [],
    };
  },
  methods: {
    formatPrice,
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

:disabled {
  opacity: 0.25;
}
</style>
