<template>
  <div id="contract-popup-document-view" class="page">
    <div id="heading"><h4>Contract</h4></div>
    <div id="contract-copy">
      <p v-if="contract" v-html="mergeTagReplace(contract.contractBody)"></p>
    </div>
    <div class="signatures" v-if="contract">
      <div class="contract-data">
        <h5>Signer Name:</h5>
        <p>{{ contract.signerName }}</p>
        <h5>Date Signed:</h5>
        <p>{{ contract.signerDate }}</p>
        <h5>Unique User ID:</h5>
        <p>{{ contract.signerUUID }}</p>
      </div>
      <div class="contract-data" v-if="contract.admin">
        <h5>Admin Signer Name:</h5>
        <p>{{ contract.admin.signerName }}</p>
        <h5>Admin Date Signed:</h5>
        <p>{{ contract.admin.signerDate }}</p>
        <h5>Admin Unique User ID:</h5>
        <p>{{ contract.admin.signerUUID }}</p>
      </div>
    </div>
    <h4>Thank you for choosing {{ businessName }}!</h4>
  </div>
</template>

<script>
import {
  formatDate,
  formatTime,
  finalPaymentDueDate,
  formatPrice,
  total,
  subtotal,
  calculateEventTime,
} from "../../helpers.js";
export default {
  data() {
    return {
      needsResign: false,
    };
  },
  computed: {
    businessSettings() {
      return this.$store.state.businessSettings;
    },
    businessName() {
      return this.$store.state.businessSettings.identity.businessName;
    },
    primaryContact() {
      return this.$store.state.user;
    },
    eventDate() {
      return formatDate(this.event.data.date);
    },
    eventLength() {
      return calculateEventTime(this.event.data) / (60 * 60 * 1000);
    },
    eventStartTime() {
      return formatTime(this.event.data.startTime);
    },
    eventEndTime() {
      return formatTime(this.event.data.endTime);
    },
    invoiceTotal() {
      return formatPrice(total(this.event.invoice, this.event.data));
    },
    invoiceSubtotal() {
      return formatPrice(subtotal(this.event.invoice, this.event.data));
    },
    invoiceAdjustments() {
      return formatPrice(this.invoiceTotal - this.invoiceSubtotal);
    },
    invoiceFinalPaymentDue() {
      return formatDate(
        finalPaymentDueDate(this.event.data, this.$store.state.businessSettings)
      );
    },
    invoiceDepositAmount() {
      if (this.businessSettings.payments.deposit) {
        if (this.businessSettings.payments.deposit.type === "percentage") {
          return formatPrice(
            this.businessSettings.payments.deposit.amount *
              0.01 *
              total(this.event.invoice, this.event.data)
          );
        } else {
          return formatPrice(
            this.businessSettings.payments.deposit.amount * 100
          );
        }
      } else {
        return formatPrice(this.businessSettings.payments.depositAmount * 100);
      }
    },
    contactStrings() {
      let string = "";
      let contactsArr = [];
      if (this.contacts) {
        if (this.contacts.length > 0) {
          contactsArr = [...this.contacts].filter((x) => {
            return x.role === "client";
          });
          contactsArr.forEach((contact, index) => {
            string =
              string +
              `${contact.given_name} ${contact.family_name}${
                index === contactsArr.length - 1 ? "" : ","
              }`;
          });
        }
      }
      return string;
    },
    locationStrings() {
      let string = "";
      if (this.locations.length > 0) {
        this.locations.forEach((location, index) => {
          string =
            string +
            `${location.name}, ${location.address.streetAddress1}, ${
              location.address.streetAddress2
                ? location.address.streetAddress2 + ","
                : ""
            } ${location.address.cityStateZip}${
              index === this.locations.length - 1 ? "" : ","
            }`;
        });
      }
      return string;
    },
  },
  methods: {
    replacePrimaryContact(string) {
      return string
        .replace(/{given_name}/g, this.primaryContact.given_name)
        .replace(/{family_name}/g, this.primaryContact.family_name);
    },

    replaceEventData(string) {
      return string
        .replace(/{event-start-time}/g, this.eventStartTime)
        .replace(/{event-end-time}/g, this.eventEndTime)
        .replace(/{event-length}/g, this.eventLength + " hours")
        .replace(/{event-date}/g, this.eventDate);
    },
    replaceInvoiceItems(string) {
      return string
        .replace(/{invoice-total}/g, this.invoiceTotal)
        .replace(/{invoice-subtotal}/g, this.invoiceSubtotal)
        .replace(/{invoice-adjustments}/g, this.invoiceAdjustments)
        .replace(/{invoice-final-payment-due}/g, this.invoiceFinalPaymentDue)
        .replace(/{invoice-deposit-amount}/g, this.invoiceDepositAmount);
    },
    replaceClientItems(string) {
      return string.replace(/{client-list}/g, this.contactStrings);
    },
    replaceLocationItems(string) {
      return string.replace(/{location-list}/g, this.locationStrings);
    },
    replaceBusinessInformation(string) {
      return string.replace(/{business-name}/g, this.businessName);
    },

    mergeTagReplace(string) {
      if (string) {
        return this.replacePrimaryContact(
          this.replaceEventData(
            this.replaceInvoiceItems(
              this.replaceClientItems(
                this.replaceLocationItems(
                  this.replaceBusinessInformation(string)
                )
              )
            )
          )
        );
      }
    },
  },
  props: ["contract", "contacts", "event", "locations"],
  created() {
    let contractIndex = this.event.contracts.findIndex((x) => {
      return x.id == this.contract.id;
    });
    if (this.event.contracts.length > 0) {
      if (
        this.event.contracts[contractIndex].contractBody !=
        this.contract.contractBody
      ) {
        this.needsResign = true;
        console.log(this.needsResign);
      }
    }
  },
};
</script>

<style scoped>
#contract-popup-document-view {
  background-color: white;
  aspect-ratio: 8.5/11;
  width: 100%;
  min-height: 100%;
  height: fit-content;
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
  justify-content: center;
  justify-items: flex-end;
  align-items: center;
  align-content: center;
  padding: 20px;
}

#contract-copy {
  margin: 10px 60px;
  height: fit-content;
}

.signatures {
  display: flex;
  width: 100%;
  justify-content: space-evenly;
}

.contract-data {
  width: 50%;
}
@media screen {
  @media (min-width: 320px) {
    #contract-popup-document-view {
      min-height: unset;
      min-width: unset;
      padding-bottom: 40px;
    }

    #contract-copy {
      margin: 10px 20px;
    }
  }
  @media (min-width: 850px) {
    #contract-popup-document-view {
      min-width: 500px;
    }
  }
}

@media print {
  p,
  h1,
  h2,
  h3,
  h4,
  h5 {
    font-family: Georgia, "Times New Roman", Times, serif;
  }
}
</style>
