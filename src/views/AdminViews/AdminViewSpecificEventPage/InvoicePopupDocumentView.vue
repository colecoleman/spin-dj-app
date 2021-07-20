<template>
  <div id="invoice-popup-document-view" class="page">
    <div id="heading">
      <img :src="logo" alt="Logo" />
      <div id="heading-copy">
        <h4>{{ businessInfo.businessName }}</h4>
        <p>{{ businessInfo.businessAddress.address1one }}</p>
        <p v-if="businessInfo.businessAddress.address1two">
          {{ businessInfo.businessAddress.address1two }}
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
            <span>{{ client.firstName }} {{ client.lastName }}</span>
          </p>
          <p>{{ formatPhoneNumber(client.phoneNumber) }}</p>
          <p>{{ client.emailAddress }}</p>
        </div>
        <div class="invoice-item">
          <h5>Invoice Number:</h5>
          <p>
            <span>{{ invoice.data.invoiceNumber }}</span>
          </p>
        </div>
        <div class="invoice-item">
          <h5>Invoice Date:</h5>
          <p>
            <span>{{ formattedDate(invoice.data.invoiceDate) }}</span>
          </p>
        </div>
      </div>
      <div class="invoice-information-half">
        <div class="invoice-item">
          <h5>Event Date:</h5>
          <p>
            <span>{{ formattedDate(invoice.data.eventDate) }}</span>
          </p>
        </div>
        <div class="invoice-item">
          <h5>Final Payment Due:</h5>
          <p>
            <span>{{ formattedDate(invoice.data.finalPaymentDue) }}</span>
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
      <tr v-for="item in invoice.packages" :key="item.id">
        <td>{{ item.name }}</td>
        <td>1</td>
        <td>{{ calculatePackagePrice(item, event) }}</td>
        <td>{{ calculatePackagePrice(item, event) }}</td>
      </tr>

      <tr v-for="item in invoice.addOns" :key="item.id">
        <td>{{ item.name }}</td>
        <td v-if="item.priceOption === 'unit'">{{ item.eventUnits }}</td>
        <td>{{ formatPrice(item.unitPrice) }}</td>
        <td>{{ calculateAddOnPrice(item, event) }}</td>
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
        <th>{{ formatPrice(event.subtotal) }}</th>
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
        <td>-{{ formatPrice(item.amount) }}</td>
      </tr>
      <tr>
        <th>Invoice Total:</th>
        <th></th>
        <th></th>
        <th>{{ formatPrice(event.total) }}</th>
      </tr>
      <tr>
        <th>Payments:</th>
        <th></th>
        <th></th>
        <th></th>
      </tr>
      <tr v-for="item in invoice.paymentsCollected" :key="item.referenceNumber">
        <td>{{ item.referenceNumber }}:</td>
        <td></td>
        <td></td>
        <td>-{{ formatPrice(item.amount) }}</td>
      </tr>
      <tr>
        <th>Balance Outstanding:</th>
        <th></th>
        <th></th>
        <th>{{ formatPrice(event.balanceOutstanding) }}</th>
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
import logo from "../../../assets/company-logo.svg";
import helpers from "../../../helpers.js";

export default {
  data() {
    return {
      logo,
    };
  },
  computed: {
    businessInfo() {
      return this.$store.state.businessSettings.businessInfo;
    },
  },
  methods: {
    calculatePackagePrice: helpers.calculatePackagePrice,
    calculateAddOnPrice: helpers.calculateAddOnPrice,
    formatPhoneNumber: helpers.formatPhoneNumber,
    formattedDate: helpers.formattedDate,
    formatPrice: helpers.formatPrice,
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
  color: black;
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