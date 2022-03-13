<template>
  <backdrop @click="closePopup" class="no-print" />
  <mobile-close-button @click="closePopup" />
  <section class="no-print">
    <two-button-dialog-modal
      class="no-print"
      @select-button-one="confirmConsent"
      @select-button-two="declineConsent"
      @close-modal="declineConsent"
      modalBody="By clicking 'Yes', you're consenting to do business electronically. Alternatively, you can click 'No', print the contract, and mail it to us.`"
      v-if="eSignStep === 1"
    />
    <popup-modal
      class="no-print"
      @close-popup="closePaperSignInstructions"
      title="Manual Contract Signing Instructions"
      v-if="paperSignInstructionsOpen === true"
    >
      <template v-slot:window>
        <p>
          Please print the contract on the following page, sign it on the bottom
          of the page with your printed name and the date of signing. Please
          mail it to us at:
          {{ businessAddress }}. <br />
          We will confirm the event as soon as we receive the contract!
        </p>
        <h5>Thank you!</h5>
      </template>
    </popup-modal>
    <div class="navigation-wrapper no-print">
      <base-card title="Contracts" :subtitle="contract.contractName">
        <template v-slot:content>
          <div id="contract-popup-left-menu">
            <div class="heading-container">
              <div v-if="contracts.length > 0">
                <vue-svg
                  v-if="contractScroller != 0"
                  svg="left-arrow"
                  @click="previousContract"
                />
                <vue-svg
                  v-if="contractScroller != contractQuantity"
                  svg="right-arrow"
                  @click="nextContract"
                />
              </div>
              <div v-if="contracts.length === 0">
                <h4>No contracts assigned to this event (yet).</h4>
                <h4>Check back soon!</h4>
              </div>
            </div>
            <div
              v-if="contract.status === 'pending' && eSignStep === 0"
              id="right-column-sign-button-container"
            >
              <h4 v-if="role !== 'admin'">This Contract Isn't Signed Yet</h4>
              <h4 v-if="role === 'admin'">
                The client hasn't signed the contract yet.
              </h4>
              <button-standard-with-icon
                v-if="displaySignButton"
                :text="role == 'admin' ? 'Sign as Admin' : 'Start Signing'"
                @click="initiateESign"
              />
            </div>

            <div v-if="eSignStep === 2">
              <input-with-title
                type="text"
                title="Please Type Your Legal Name"
                placeholder="Your Legal Name"
                :inputValue="eSignName"
                @input="fieldInput(undefined, 'eSignName', $event)"
              />
              <div class="row-flex">
                <p>
                  I agree and consent to do business electronically. <br />
                  I understand that this agreement is legally binding.
                </p>
                <input type="checkbox" v-model="consentCheckBoxConfirm" />
              </div>
              <p class="error" v-if="consentCheckBoxConfirmError">
                Check that the checkbox above is checked!
              </p>
              <button-standard-with-icon
                text="Submit and Sign"
                @click="submitESignature"
              ></button-standard-with-icon>
            </div>
            <div v-if="contract.status === 'signed'">
              <div class="contract-item">
                <p>Signed By:</p>
                <h5>{{ contract.signerName }}</h5>
              </div>
              <div class="contract-item">
                <p>Signed On:</p>
                <h5>{{ formatDate(contract.signerDate) }}</h5>
              </div>
              <div class="contract-item">
                <p>UUID:</p>
                <h5>{{ contract.signerUUID }}</h5>
              </div>
            </div>
            <div v-if="contract.admin">
              <div v-if="contract.admin.status === 'signed'">
                <div class="contract-item" v-if="contract.admin">
                  <p>Signed By Admin:</p>
                  <h5>{{ contract.admin.signerName }}</h5>
                </div>
                <div class="contract-item">
                  <p>Admin Signed On:</p>
                  <h5>{{ formatDate(contract.admin.signerDate) }}</h5>
                </div>
                <div class="contract-item">
                  <p>Admin UUID:</p>
                  <h5>{{ contract.admin.signerUUID }}</h5>
                </div>
              </div>
            </div>
            <div class="button-wrapper">
              <button-standard-with-icon
                text="Save / Print"
                @click="saveContract('contract-popup-document-view')"
              />
            </div>
          </div>
        </template>
      </base-card>
    </div>
    <div
      v-if="contracts.length > 0"
      id="contract-document-scroll-container"
      @scroll="checkScroll"
    >
      <contract-popup-document-view
        :contract="contract"
        :contacts="contacts"
        :event="event"
        :locations="locations"
      />
    </div>
  </section>
  <section id="print-format">
    <contract-popup-document-view
      :contract="contract"
      :event="event"
      :contacts="contacts"
      :locations="locations"
    />
  </section>
</template>

<script>
import Backdrop from "../../SharedComponents/SharedComponentsUI/Backdrop.vue";
import { Auth } from "aws-amplify";

import PopupModal from "../SharedComponentsUI/PopupModal.vue";
import TwoButtonDialogModal from "../SharedComponentsUI/TwoButtonDialogModal.vue";
import ContractPopupDocumentView from "./ContractPopupDocumentView.vue";
import MobileCloseButton from "../SharedComponentsUI/MobileCloseButton.vue";
import InputWithTitle from "../SharedComponentsUI/ElementLibrary/InputWithTitle.vue";
import VueSvg from "../../assets/VueSvg.vue";
import { formatDate } from "../../helpers.js";

export default {
  data() {
    return {
      loading: true,

      role: undefined,
      contractScroller: 0,
      scrolledToBottom: false,
      eSignEnabled: false,
      eSignStep: 0,
      eSignName: undefined,
      paperSignInstructionsOpen: false,
      consentCheckBoxConfirm: false,
      consentCheckBoxConfirmError: false,
    };
  },
  computed: {
    businessAddress() {
      let addressObject =
        this.$store.state.businessSettings.identity.businessAddress;
      return `${addressObject.streetAddress1}, ${
        addressObject.streetAddress2 ? addressObject.streetAddress2 + ", " : ""
      } ${addressObject.cityStateZip}`;
    },
    contractQuantity() {
      return this.contracts.length - 1;
    },
    displaySignButton() {
      if (this.role === "admin" && this.contract.admin) {
        if (this.role === "admin" && this.contract.admin.status === "signed") {
          return false;
        } else {
          return true;
        }
      } else if (this.role !== "admin" && this.contract.status === "signed") {
        return false;
      } else {
        return true;
      }
    },
    contract() {
      let contract = this.$store.state.businessSettings.contracts.find(
        (x) => x.id === this.contracts[this.contractScroller].id
      );
      return { ...contract, ...this.contracts[this.contractScroller] };
    },
  },
  methods: {
    fieldInput(object, property, value) {
      if (object) {
        object[property] = value;
      } else {
        this[property] = value;
      }
    },
    closePopup() {
      this.$emit("closePopup");
    },
    nextContract() {
      this.contractScroller++;
    },
    previousContract() {
      this.contractScroller--;
    },
    saveContract() {
      window.print();
    },
    checkScroll(el) {
      if (
        el.srcElement.offsetHeight + el.srcElement.scrollTop >=
        el.srcElement.scrollHeight
      ) {
        this.scrolledToBottom = true;
      } else {
        this.scrolledToBottom = false;
      }
    },
    initiateESign() {
      this.eSignStep++;
    },
    confirmConsent() {
      this.eSignStep++;
    },
    declineConsent() {
      this.eSignStep = 0;
      this.openPaperSignInstructions();
    },
    openPaperSignInstructions() {
      this.paperSignInstructionsOpen = true;
    },
    closePaperSignInstructions() {
      this.paperSignInstructionsOpen = false;
    },
    async submitESignature() {
      let item = [...this.contracts];
      item[this.contractScroller] = this.contract;
      let payload;
      if (this.role === "admin") {
        this.submittingSignature = true;
        let adminObject = {
          signerName: this.eSignName,
          signerDate: new Date(),
          signerUUID: this.$store.state.user.userId,
          status: "signed",
        };
        this.contract.admin = adminObject;
        item[this.contractScroller] = this.contract;
        payload = {
          variable: "contracts",
          value: item,
          eventId: this.eventId,
        };
        this.$store.dispatch("editEvent", payload).then((res) => {
          console.log(res);
        });
      } else {
        if (this.consentCheckBoxConfirm) {
          this.consentCheckBoxConfirmError = false;
          this.submittingSignature = true;
          this.contract.signerName = this.eSignName;
          this.contract.signerDate = new Date();
          this.contract.signerUUID = this.$store.state.user.userId;
          this.contract.status = "signed";
          item[this.contractScroller] = this.contract;
          payload = {
            eventId: this.eventId,
            contracts: item,
          };
          await this.$store.dispatch("clientSignContract", payload);
          this.submittingSignature = false;
          this.eSignStep = 0;
        } else {
          this.consentCheckBoxConfirmError = true;
        }
      }
    },
    formatDate,
  },
  components: {
    Backdrop,
    ContractPopupDocumentView,
    TwoButtonDialogModal,
    PopupModal,
    MobileCloseButton,
    InputWithTitle,
    VueSvg,
  },
  async created() {
    await Auth.currentAuthenticatedUser().then((res) => {
      this.role = res.attributes["custom:role"];
    });
    if (!this.contract.admin) {
      this.contract.admin = {
        status: undefined,
        signerName: undefined,
        signerDate: undefined,
        signerUUID: undefined,
      };
    }
    // this.loading = true;

    this.loading = false;
  },
  emits: ["close-popup"],
  props: ["contracts", "contacts", "eventId", "event", "locations"],
};
</script>

<style scoped>
@media screen {
  section {
    position: fixed;
    top: 20px;
    left: 20px;
    height: calc(100% - 20px);
    width: calc(100% - 40px);
    z-index: 8;
    filter: drop-shadow(0 0 20px rgba(0, 0, 0, 0.5));
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
  }
  #contract-popup-content-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    height: unset;
  }
  .navigation-wrapper {
    display: flex;
    margin-bottom: 10px;
  }
  #contract-popup-left-menu {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    /* height: 100%; */
  }

  #right-column-sign-button-container {
    /* height: 40%; */
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }

  .button-wrapper {
    width: 100%;
    height: fit-content;
  }

  .heading-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  #contract-document-view-wrapper {
    position: relative;
    overflow: visible;
    height: 100%;
    outline: 1px solid var(--cardOutline);
    width: fit-content;
    margin: 10px;
  }

  #contract-document-scroll-container {
    width: 100%;
    overflow: scroll;
  }

  .contract-item {
    flex-direction: row;
  }

  .contract-item > h5 {
    font-weight: 600;
    text-align: left;
  }

  .error {
    color: red;
    font-style: italic;
  }

  .contract-item > p {
    text-align: left;
  }

  .summary-item > h4 {
    width: 50%;
    text-align: left;
  }

  .row-flex {
    display: flex;
    flex-direction: row;
    text-align: right;
  }

  .row-flex > input {
    margin-left: 10px;
  }

  .disabled {
    opacity: 0.5;
  }
  #print-format {
    display: none;
  }
  @media (min-width: 850px) {
    section {
      flex-direction: row;
      height: calc(100% - 40px);
    }
    #contract-popup-content-wrapper {
      flex-direction: row;
      height: 100%;
    }
    .navigation-wrapper {
      display: unset;
      margin: 0 10px 0 0;
    }
  }
}

@media print {
  .no-print {
    display: none;
  }

  #print-format {
    overflow: visible;
    z-index: 3;
  }
}
</style>
