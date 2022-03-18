<template>
  <document-view-with-toolbar
    @close="close"
    @submit-e-signature="submitESignature"
    @submit-admin-e-signature="submitAdminESignature"
    @toggle-add-on-item-from-included="toggleContractFromIncluded"
    @left-arrow-clicked="previousContract"
    @right-arrow-clicked="nextContract"
    :icons="icons"
    :addOnItems="businessSettings.contracts"
    :includedItems="contracts"
    addOnItemTitle="contractName"
  >
    <template v-slot:document>
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
    </template>
  </document-view-with-toolbar>
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
import DocumentViewWithToolbar from "../SharedComponentsUI/DocumentViewWithToolbar.vue";
export default {
  data() {
    return {
      contractNumber: 0,
    };
  },
  computed: {
    contract() {
      return this.contracts[this.contractNumber];
    },
    contracts() {
      return this.event.contracts.map((x) => {
        return {
          ...this.businessSettings.contracts.find((c) => {
            return c.id === x.id;
          }),
          admin: {
            status: undefined,
            signerName: undefined,
            signerDate: undefined,
            signerUUID: undefined,
          },
          ...x,
        };
      });
    },
    icons() {
      let array = ["print"];
      if (this.role == "admin") {
        if (this.contract) {
          if (this.contract.admin) {
            if (this.contract.admin.status !== "signed") {
              array.push("admin-signature");
            }
            if (this.contract.status !== "signed") {
              array.push("checked-signature");
            }
          }
        }
        if (this.businessSettings.contracts.length > 1) {
          array.push("plus-sign");
        }
      }
      if (this.role === "client" || this.role === "organizer") {
        if (this.contract) {
          if (this.contract.status !== "signed") {
            array.push("signature");
          }
        }
      }
      if (this.contractNumber !== 0) {
        array.push("left-arrow");
      }
      if (
        this.contractNumber !== this.contracts.length - 1 &&
        this.contracts.length > 1
      ) {
        array.push("right-arrow");
      }

      return array;
    },
    role() {
      if (this.primaryContact.tenantId === this.primaryContact.userId) {
        return "admin";
      } else {
        return this.primaryContact.role;
      }
    },
    businessSettings() {
      return this.$store.state.businessSettings;
    },
    businessName() {
      return this.businessSettings.identity.businessName;
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
    close() {
      this.$emit("close");
    },
    async submitESignature(signature) {
      let item = { ...this.contract };
      item = { ...item, ...signature };
      let index = this.contracts.findIndex((x) => {
        return x.id === this.contract.id;
      });
      this.contracts[index] = item;
      let payload = {
        eventId: this.event.userId,
        variable: "contracts",
        value: this.contracts,
      };
      console.log(this.contracts);
      await this.$store.dispatch("editEvent", payload);
      console.log(this.event);
      this.close();
    },
    async submitAdminESignature(signature) {
      let item = { ...this.contract };
      item.admin = { ...signature };
      let index = this.contracts.findIndex((x) => {
        return x.id === this.contract.id;
      });
      this.contracts[index] = item;
      let payload = {
        eventId: this.event.userId,
        variable: "contracts",
        value: this.contracts,
      };
      await this.$store.dispatch("editEvent", payload);
      this.close();
    },
    async toggleContractFromIncluded(item) {
      let contracts = [...this.event.contracts];
      let index = this.event.contracts.findIndex((x) => {
        return x.id === item.id;
      });
      console.log(index);
      if (index > -1) {
        contracts.splice(index, 1);
      } else {
        contracts.push(item);
      }
      let payload = {
        eventId: this.event.userId,
        variable: "contracts",
        value: contracts,
      };
      await this.$store.dispatch("editEvent", payload);
      if (index === this.contractNumber && this.contracts.length > 0) {
        if (this.contractNumber === 0) {
          this.nextContract();
        } else {
          this.previousContract();
        }
      }
    },
    previousContract() {
      --this.contractNumber;
    },
    nextContract() {
      ++this.contractNumber;
    },
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
  components: { DocumentViewWithToolbar },
  emits: ["close"],
  props: ["contacts", "event", "locations"],
  watch: {
    event() {},
  },
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
  /* aspect-ratio: 8.5/11; */
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
