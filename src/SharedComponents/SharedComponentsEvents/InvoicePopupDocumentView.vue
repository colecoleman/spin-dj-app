<template>
  <div id="invoice-popup-document-view" class="page">
    <div id="heading">
      <img :src="logo" alt="Logo" />
      <div id="heading-copy">
        <h4>{{ businessInfo.businessName }}</h4>
        <p>{{ businessInfo.businessAddress.streetAddress1 }}</p>
        <p v-if="businessInfo.businessAddress.streetAddress2">
          {{ businessInfo.businessAddress.streetAddress2 }}
        </p>
        <p>{{ businessInfo.businessAddress.address2 }}</p>
        <p>{{ formatPhoneNumber(businessInfo.businessPhoneNumber) }}</p>
        <p>{{ businessInfo.businessEmailAddress }}</p>
      </div>
    </div>
    <div id="invoice-information">
      <div class="invoice-information-half">
        <div class="invoice-item">
          <h5>Prepared For:</h5>
          <p>
            <span>{{ client.given_name }} {{ client.family_name }}</span>
          </p>
          <p>{{ formatPhoneNumber(client.phoneNumber) }}</p>
          <p>{{ client.emailAddress }}</p>
        </div>
        <div class="invoice-item">
          <h5>Invoice Number:</h5>
          <p>
            <span>{{ event.userId }}</span>
          </p>
        </div>
        <div class="invoice-item">
          <h5>Invoice Date:</h5>
          <p>
            <span>{{ bookDate }}</span>
          </p>
        </div>
      </div>
      <div class="invoice-information-half">
        <div class="invoice-item">
          <h5>Event Date:</h5>
          <p>
            <span>{{ formattedDate(event.data.date) }}</span>
          </p>
        </div>
        <div class="invoice-item">
          <h5>Final Payment Due:</h5>
          <p>
            <span>{{
              formattedDate(
                finalDueDate(event.data, this.$store.state.businessSettings)
              )
            }}</span>
            <!-- <span>{{ formattedDate(invoice.data.finalPaymentDue) }}</span> -->
          </p>
        </div>
      </div>
    </div>
    <table>
      <tr>
        <th>Description:</th>
        <th>Quantity:</th>
        <th>Unit Price:</th>
        <th>Cost:</th>
      </tr>
      <tr v-for="item in invoice.products" :key="item.name">
        <td>{{ item.name }}</td>
        <td>1</td>
        <td>{{ formatPrice(productTotal(item, event.data)) }}</td>
        <td>{{ formatPrice(productTotal(item, event.data)) }}</td>
      </tr>
      <tr class="divider">
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <th>Subtotal:</th>
        <th></th>
        <th></th>
        <th>{{ formatPrice(subtotal(event.invoice, event.data)) }}</th>
      </tr>
      <tr>
        <th>Adjustments:</th>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr v-for="item in invoice.adjustments" :key="item.id">
        <td>{{ item.name }}:</td>
        <td></td>
        <td></td>
        <td v-if="item.type === 'percentage'">- {{ item.amount * 100 }}%</td>
      </tr>
      <tr>
        <th>Invoice Total:</th>
        <th></th>
        <th></th>
        <th>{{ formatPrice(total(event.invoice, event.data)) }}</th>
      </tr>
      <tr>
        <th>Payments:</th>
        <th></th>
        <th></th>
        <th></th>
      </tr>
      <tr v-for="item in invoice.payments" :key="item.referenceNumber">
        <td>{{ item.name }}:</td>
        <td></td>
        <td></td>
        <td>-{{ formatPrice(item.amount) }}</td>
      </tr>
      <tr>
        <th>Balance Outstanding:</th>
        <th></th>
        <th></th>
        <th>
          {{ formatPrice(balanceOutstanding(event.invoice, event.data)) }}
        </th>
      </tr>
      <tr class="divider">
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </table>
    <h4>Thank you for choosing {{ businessInfo.businessName }}!</h4>
  </div>
</template>

<script>
import logo from "../../assets/company-logo.svg";
import helpers from "../../helpers.js";

export default {
  data() {
    return {
      logo,
    };
  },
  computed: {
    businessInfo() {
      return this.$store.state.businessSettings.identity;
    },
    bookDate() {
      let ms = this.event.userId.replace("event", "");
      let date = new Date(parseInt(ms));
      return date.toLocaleDateString("lookup", {
        day: "numeric",
        year: "numeric",
        month: "long",
      });
    },
  },
  methods: {
    productTotal: helpers.productTotal,
    formatPhoneNumber: helpers.formatPhoneNumber,
    formattedDate: helpers.formatDate,
    formatPrice: helpers.formatPrice,
    subtotal: helpers.subtotal,
    total: helpers.total,
    balanceOutstanding: helpers.balanceOutstanding,
    finalDueDate: helpers.finalPaymentDueDate,
  },
  props: ["event", "client", "invoice"],
};
</script>

<style scoped>
#invoice-popup-document-view {
  background-color: white;
  width: 147mm;
  min-height: 207.9mm;
  height: fit-content;
  padding-bottom: 20px;
}

h1,
h2,
h3,
h4,
h5,
p {
  /* color: black; */
}

#heading {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  justify-items: flex-end;
  align-items: center;
  align-content: center;
  padding: 20px;
}

#heading-copy {
  text-align: left;
}

#heading-copy > * {
  margin: 0;
}

#invoice-information {
  display: flex;
  flex-direction: row;
}

.invoice-information-half {
  text-align: left;
  width: 50%;
  margin: 0 40px;
}

.invoice-item {
  margin: 10px;
}

.invoice-item > p {
  margin-left: 20px;
}

.invoice-item > p > span {
  font-weight: 600;
}

img {
  object-fit: contain;
  width: 50px;
  padding: 10px;
  border-right: 1px solid black;
  margin-right: 10px;
}

table {
  width: 90%;
  margin: 5%;
  color: black;
  border-collapse: collapse;
  font-size: 10px;
  text-align: left;
}

th,
td {
  padding: 5px;
  border: 1px solid black;
}

.divider {
  background-color: black;
  height: 2px;
}
</style>