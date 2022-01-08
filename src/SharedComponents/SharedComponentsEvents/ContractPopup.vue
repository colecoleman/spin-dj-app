<template>
  <full-page-popup v-if="!loading">
    <template v-slot:icon
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="10.75"
        height="22"
        viewBox="0 0 16.75 22"
      >
        <path
          id="Icon_awesome-file-contract"
          data-name="Icon awesome-file-contract"
          d="M9.188,5.578V0H.984A.982.982,0,0,0,0,.984V20.016A.982.982,0,0,0,.984,21H14.766a.982.982,0,0,0,.984-.984V6.563H10.172A.987.987,0,0,1,9.188,5.578ZM2.625,2.953a.328.328,0,0,1,.328-.328H6.234a.328.328,0,0,1,.328.328v.656a.328.328,0,0,1-.328.328H2.953a.328.328,0,0,1-.328-.328Zm0,2.625a.328.328,0,0,1,.328-.328H6.234a.328.328,0,0,1,.328.328v.656a.328.328,0,0,1-.328.328H2.953a.328.328,0,0,1-.328-.328ZM10.533,15.75h1.936a.656.656,0,0,1,0,1.313H10.533a1.763,1.763,0,0,1-1.585-.979.454.454,0,0,0-.417-.267.447.447,0,0,0-.411.254l-.315.629a.656.656,0,0,1-.587.363l-.047,0a.654.654,0,0,1-.575-.447l-.69-2.07-.435,1.308a1.771,1.771,0,0,1-1.682,1.211H3.281a.656.656,0,0,1,0-1.312h.508a.46.46,0,0,0,.436-.314l.746-2.241a.985.985,0,0,1,1.868,0L7.409,14.9a1.841,1.841,0,0,1,2.707.581A.468.468,0,0,0,10.533,15.75Zm4.93-11.443L11.447.287A.984.984,0,0,0,10.75,0H10.5V5.25h5.25V5A.981.981,0,0,0,15.463,4.307Z"
          transform="translate(0.5 0.5)"
          fill="currentColor"
        />
      </svg>
    </template>
    <template v-slot:title>Contract</template>
    <template v-slot:action1>
      <svg
        width="10.995"
        height="10.995"
        viewBox="0 0 17.995 17.995"
        @click="closePopup()"
      >
        <path
          d="M19.33,15.581h0l-5.459-5.459L19.33,4.663h0a.564.564,0,0,0,0-.8L16.751,1.289a.564.564,0,0,0-.8,0h0L10.5,6.748,5.038,1.289h0a.564.564,0,0,0-.8,0L1.664,3.868a.564.564,0,0,0,0,.8h0l5.459,5.459L1.664,15.581h0a.564.564,0,0,0,0,.8l2.579,2.579a.564.564,0,0,0,.8,0h0L10.5,13.5l5.459,5.459h0a.564.564,0,0,0,.8,0l2.579-2.579a.564.564,0,0,0,0-.8Z"
          transform="translate(-1.5 -1.125)"
          fill="currentColor"
        />
      </svg>
    </template>
    <template v-slot:content>
      <two-button-dialog-modal
        @select-button-one="confirmConsent"
        @select-button-two="declineConsent"
        @close-modal="declineConsent"
        modalBody="By clicking 'Yes', you're consenting to do business electronically. Alternatively, you can click 'No', print the contract, and mail it to us.`"
        v-if="eSignStep === 1"
      ></two-button-dialog-modal>
      <popup-modal
        @close-popup="closePaperSignInstructions"
        v-if="paperSignInstructionsOpen === true"
        title="Manual Contract Signing Instructions"
      >
        <template v-slot:window>
          <p>
            Please print the contract on the following page, sign it on the
            bottom of the page with your printed name and the date of signing.
            Please mail it to us at:
            {{ businessAddress }}. <br />
            We will confirm the event as soon as we receive the contract!
          </p>
          <h5>Thank you!</h5>
        </template>
      </popup-modal>
      <div id="contract-popup-content-wrapper">
        <div id="contract-popup-left-menu">
          <div class="heading-container">
            <div v-if="contracts.length > 0">
              <img
                :src="contractScroller != 0 ? SVGs.LeftArrowSVG : ''"
                @click="contractScroller != 0 ? previousContract : ''"
              />
              <h3>{{ contract.contractName }}</h3>
              <img
                :src="
                  contractScroller != contractQuantity ? SVGs.RightArrowSVG : ''
                "
                @click="
                  contractScroller != contractQuantity ? nextContract : ''
                "
              />
            </div>
            <div v-if="contracts.length === 0">
              <h4>No contracts assigned to this event (yet).</h4>
              <h4>Check back soon!</h4>
            </div>
          </div>
          <button-standard-with-icon
            text="Print"
            @click="printContract('contract-popup-document-view')"
          >
          </button-standard-with-icon>
          <button-standard-with-icon
            text="Save"
            @click="saveContract('contract-popup-document-view')"
          >
          </button-standard-with-icon>
        </div>
        <div id="contract-document-view-wrapper">
          <div
            v-if="contracts.length > 0"
            id="contract-document-scroll-container"
            @scroll="checkScroll"
          >
            <contract-popup-document-view
              :contract="contract"
            ></contract-popup-document-view>
            <!-- <div v-if="scrolledToBottom === false" class="scroll-notifier">
              <h5>Scroll To Bottom to Continue</h5>
            </div> -->
          </div>
          <div v-if="contracts.length === 0"></div>
        </div>
        <div id="contract-popup-right-column">
          <div
            v-if="contract.status === 'pending' && eSignStep === 0"
            id="right-column-sign-button-container"
          >
            <h4>This Contract Isn't Signed Yet</h4>
            <button-standard-with-icon
              :text="'Start Signing'"
              @click="initiateESign"
            ></button-standard-with-icon>
          </div>
          <div v-if="eSignStep === 2">
            <h5>Please Type Your Legal Name:</h5>
            <input
              type="text"
              v-model="eSignName"
              placeholder="Your Legal Name"
            />
            <div class="row-flex">
              <p>
                I agree and consent to do business electronically. <br />
                I understand that this agreement is legally binding.
              </p>
              <input type="checkbox" v-model="consentCheckBoxConfirm" />
            </div>
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
        </div>
      </div>
    </template>
  </full-page-popup>
</template>


<script>
import SVGs from "../../assets/SVGs/svgIndex.js";
import FullPagePopup from "../SharedComponentsUI/FullPagePopup.vue";
import PopupModal from "../SharedComponentsUI/PopupModal.vue";
import TwoButtonDialogModal from "../SharedComponentsUI/TwoButtonDialogModal.vue";
import ContractPopupDocumentView from "./ContractPopupDocumentView.vue";

import helpers from "../../helpers.js";

export default {
  data() {
    return {
      loading: true,
      SVGs,
      contractScroller: 0,
      scrolledToBottom: false,
      eSignEnabled: false,
      eSignStep: 0,
      eSignName: undefined,
      paperSignInstructionsOpen: false,
      consentCheckBoxConfirm: false,
    };
  },
  computed: {
    businessAddress() {
      let addressObject =
        this.$store.state.businessSettings.identity.businessAddress;
      return `${addressObject.streetAddress1}, ${
        addressObject.streetAddress2 ? addressObject.streetAddress2 + ", " : ""
      } ${addressObject.address2}`;
    },
    contractQuantity() {
      return this.contracts.length - 1;
    },
    contract() {
      let contract = this.$store.state.businessSettings.contracts.find(
        (x) => x.id === this.contracts[this.contractScroller].id
      );
      return { ...contract, ...this.contracts[this.contractScroller] };
    },
  },
  methods: {
    closePopup() {
      this.$emit("closePopup");
    },
    nextContract() {
      this.contractScroller++;
    },
    previousContract() {
      this.contractScroller--;
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
    submitESignature() {
      this.contract.signerName = this.eSignName;
      this.contract.signerDate = new Date();
      this.contract.signerUUID = this.$store.state.user.userId;
      this.contract.status = "signed";
      let item = [...this.contracts];
      item[this.contractScroller] = this.contract;
      let payload = {
        eventId: this.eventId,
        contracts: item,
      };
      this.$store.dispatch("clientSignContract", payload);
    },
    saveContact: helpers.saveElement,
    printContract: helpers.printElement,
    formatDate: helpers.formatDate,
  },
  components: {
    FullPagePopup,
    ContractPopupDocumentView,
    TwoButtonDialogModal,
    PopupModal,
  },
  async created() {
    // this.loading = true;

    this.loading = false;
  },
  props: ["contracts", "eventId"],
};
</script>

<style scoped>
#contract-popup-content-wrapper {
  display: flex;
  flex-direction: row;
  min-height: 100%;
  height: 100%;
}

#contract-popup-left-menu,
#contract-popup-right-column {
  width: 20%;
  /* padding: 15px; */
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
}

#contract-popup-right-column {
  justify-content: center;
}

#right-column-sign-button-container {
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.heading-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

#contract-document-view-wrapper {
  /* flex: 3; */
  position: relative;
  overflow: scroll;
  width: fit-content;
  height: 100%;
  outline: 1px solid var(--cardOutline);
  /* height: 100%; */
  width: fit-content;
  margin: 10px;
}
/* 
.scroll-notifier {
  height: 60px;
  width: 100%;
  position: absolute;
  bottom: 0px;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.5)
  );
} */

.contract-item {
  /* width: 100%; */
  /* display: flex; */
  flex-direction: row;
  /* align-items: center; */
}

.contract-item > h5 {
  /* width: 50%; */
  font-weight: 600;
  text-align: left;
}

.contract-item > p {
  /* width: 50%; */
  text-align: left;
  /* margin-left: 20px; */
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
</style>