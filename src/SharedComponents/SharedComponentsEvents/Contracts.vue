<template>
  <document-view-with-toolbar
    @close="close"
    @submit-e-signature="submitESignature"
    @submit-admin-e-signature="submitAdminESignature"
    @toggle-add-on-item-from-included="toggleContractFromIncluded"
    @left-arrow-clicked="previousContract"
    @right-arrow-clicked="nextContract"
    :icons="icons"
    :normalESignProcessing="normalESignProcessing"
    :adminESignProcessing="adminESignProcessing"
    :addOnItems="businessSettings.contracts"
    :includedItems="contracts"
    addOnItemTitle="contractName"
  >
    <template v-slot:document>
      <h4>{{ contract.contractName ? contract.contractName : "Contract" }}</h4>
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
      <p v-if="contract.status !== 'signed'" class="disclaimer">
        Click on the <round-icon-button svg="signature" /> icon on the top of
        the page to sign the contract!
      </p>
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
import RoundIconButton from "../SharedComponentsUI/RoundIconButton.vue";
import DocumentViewWithToolbar from "../SharedComponentsUI/DocumentViewWithToolbar.vue";
export default {
  data() {
    return {
      contractNumber: 0,
      normalESignProcessing: false,
      adminESignProcessing: false,
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
      console.log(this.role);
      if (this.role == "admin") {
        if (this.contract) {
          console.log(this.contract);
          if (this.contract.admin) {
            if (this.contract.admin.status !== "signed") {
              array.push("admin-signature");
            }
          }
          if (this.contract.status !== "signed") {
            array.push("checked-signature");
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
      return this.$store.getters.userRole;
    },
    businessSettings() {
      return this.$store.state.businessSettings;
    },
    businessName() {
      return this.$store.getters.businessName;
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
    eventTitle() {
      return this.event.title;
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
        finalPaymentDueDate(
          this.event.data,
          this.$store.getters.finalPaymentSettings
        )
      );
    },
    invoiceDepositAmount() {
      if (this.businessSettings.payments.deposit) {
        if (this.$store.getters.depositType === "percentage") {
          return formatPrice(
            this.$store.getters.depositAmount *
              0.01 *
              total(this.event.invoice, this.event.data)
          );
        } else {
          return formatPrice(this.$store.getters.depositAmount * 100);
        }
      } else {
        return formatPrice(this.$store.getters.depositAmount * 100);
      }
    },
    contactStrings() {
      let string = "";
      let contactsArr = [];
      if (this.contacts) {
        console.log(this.contacts);
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
      this.normalESignProcessing = true;
      let item = { ...this.contract };
      item = { ...item, ...signature };
      let index = this.contracts.findIndex((x) => {
        return x.id === this.contract.id;
      });
      this.contracts[index] = item;
      let payload = {
        eventKey: { userId: this.event.userId, tenantId: this.event.tenantId },
        variable: "contracts",
        value: this.contracts,
      };
      await this.$store.dispatch("editEvent", payload);
      this.normalESignProcessing = false;
      this.close();
    },
    async submitAdminESignature(signature) {
      this.adminESignProcessing = true;
      let item = { ...this.contract };
      item.admin = { ...signature };
      let index = this.contracts.findIndex((x) => {
        return x.id === this.contract.id;
      });
      this.contracts[index] = item;
      let payload = {
        eventKey: { userId: this.event.userId, tenantId: this.event.tenantId },
        variable: "contracts",
        value: this.contracts,
      };
      await this.$store.dispatch("editEvent", payload);
      this.adminESignProcessing = false;
      this.close();
    },
    async toggleContractFromIncluded(item) {
      let contracts = [...this.event.contracts];
      let index = this.event.contracts.findIndex((x) => {
        return x.id === item.id;
      });
      if (index > -1) {
        contracts.splice(index, 1);
      } else {
        contracts.push(item);
      }
      let payload = {
        eventKey: { userId: this.event.userId, tenantId: this.event.tenantId },
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
        .replace(/{event-date}/g, this.eventDate)
        .replace(/{event-title}/g, this.eventTitle);
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
  components: { DocumentViewWithToolbar, RoundIconButton },
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
      }
    }
  },
};
</script>

<style scoped>
h1,
h2,
h3,
h4,
h5,
p {
  color: black;
}

.disclaimer {
  display: flex;
  align-items: center;
  justify-content: center;
}
.signatures {
  display: flex;
  justify-content: space-evenly;
}

/* .contract-data {
  width: 50%;
} */
@media screen {
  @media (min-width: 320px) {
    #contract-copy {
      /* margin: 10px 20px; */
    }
  }
}
</style>
