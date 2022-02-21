<template>
  <base-card title="Contracts">
    <template v-slot:content>
      <div class="contracts-wrapper">
        <div class="contracts-section">
          <h5 class="bold">Add New Contract:</h5>
          <div class="contracts-item">
            <p>Contract Name:</p>
            <input type="text" v-model.trim="contract.contractName" />
            <p>Contract Body:</p>
            <div class="information-hover-container">
              <img
                :src="SVGs.InfoIconSVG"
                alt=""
                @click="toggleMergeTagInformation"
              />
              <information-hover
                heading="Templating"
                :body="mergeTagInformation"
                v-if="mergeTagInformationOpenl"
              ></information-hover>
            </div>
            <p v-html="mergeTagInformation" v-if="mergeTagInformationOpen"></p>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              v-model="contract.contractBody"
            ></textarea>
          </div>
          <button-standard-with-icon
            text="Add Contract"
            @click="addContract()"
            class="form-button"
          />
        </div>
        <div class="contracts-section">
          <h5 v-if="!contracts || contracts.length < 0">
            No contracts have been added yet! Add some!
          </h5>
          <div
            class="contracts-item contracts-conditional-wrapper"
            style="border-bottom: 1px solid gray; margin-bottom: 10px"
            v-for="(contract, index) in contracts"
            :key="contract.id"
          >
            <h4>
              {{ contract.contractName
              }}<img
                :src="SVGs.XIconSVG"
                class="x-icon"
                @click="deleteContract(index)"
              />
              <img
                :src="SVGs.EditPenSVG"
                class="x-icon"
                @click="editContract(contract, index)"
              />
            </h4>
            <div class="window-box">
              <p v-html="contract.contractBody"></p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </base-card>
</template>

<script>
import SVGs from "../../../../../assets/SVGs/svgIndex.js";
import InformationHover from "../../../../../SharedComponents/SharedComponentsUI/InformationHover.vue";

export default {
  data() {
    return {
      SVGs,
      mergeTagInformationOpen: false,
      mergeTagInformation:
        "Use the following merge tags to personalize your emails to your contacts: <br/><b><br/>Signer First Name: {given_name}<br/> Signer Last Name: {family_name}<br/> Event Start Time: {event-start-time}<br/> Event End Time: {event-end-time}<br/> Event Length: {event-length}<br/> Event Date: {event-date}<br/> Invoice Total: {invoice-total}<br/> Invoice Subtotal: {invoice-subtotal}<br/> Invoice Adjustments: {invoice-adjustments}<br/> Invoice Final Payment Due: {invoice-final-payment-due}<br/> Invoice Deposit Amount: {invoice-deposit-amount}<br/> Client List: {client-list}<br/> Location List: {location-list}<br/> Business Name: {business-name}<br/> </b><br/>Be sure to include the brackets {}. Otherwise, the tag will not be replaced.",
      contract: {
        contractName: undefined,
        contractBody: undefined,
        id: "contract" + new Date().getTime(),
      },
      editIndex: undefined,
    };
  },
  computed: {
    contracts() {
      return this.$store.state.businessSettings.contracts;
    },
  },
  methods: {
    toggleMergeTagInformation() {
      this.mergeTagInformationOpen = !this.mergeTagInformationOpen;
    },
    addContract() {
      if (this.editIndex != undefined) {
        let payload = {
          index: this.editIndex,
          contract: this.contract,
        };
        this.$store.commit("adminConfigEditContract", payload);
      } else {
        this.$store.commit("adminConfigAddContract", this.contract);
      }
      this.contract = {
        contractName: undefined,
        contractBody: undefined,
        id: "contract" + new Date().getTime(),
      };
    },
    editContract(contract, index) {
      this.editIndex = index;
      this.contract = { ...contract };
    },
    deleteContract(index) {
      this.$store.commit("adminConfigDeleteContract", index);
    },
  },
  components: { InformationHover },
};
</script>

<style scoped>
@media screen {
  p {
    font-size: 9pt;
  }

  .contracts-wrapper {
    display: flex;
    flex-direction: column-reverse;
    flex-wrap: wrap;
    max-height: 100%;
    overflow-y: scroll;
    margin-top: 10px;
  }

  .contracts-section {
    width: 100%;
  }

  .contracts-item {
    display: flex;
    flex-direction: column;
    justify-content: left;
    margin-left: 10px;
  }

  .contracts-item > p,
  .contracts-section > h5 {
    text-align: left;
  }

  .contracts-conditional-wrapper {
    max-height: 300px;
    height: fit-content;
    overflow: scroll;
  }

  .contracts-item > select,
  .contracts-item > label,
  .contracts-item > input,
  .form-button {
    width: 90%;
    align-self: left;
    justify-self: left;
  }

  .inline-input-with-button {
    display: flex;
    flex-direction: row;
    height: 30px;
  }

  .window-box {
    max-height: 100px;
    overflow: scroll;
    margin: 5px;
  }

  .inline-input-with-button > input {
    margin-right: 5px;
  }
  .information-hover-container {
    position: relative;
    width: fit-content;
    height: 20px;
    justify-self: right;
    align-self: right;
    z-index: 8;
  }

  .information-hover-container > img {
    position: absolute;
    width: 14px;
    top: 0;
    z-index: 10;
  }

  img {
    height: 10px;
    width: 10px;
    margin: 0px 5px;
    cursor: pointer;
  }
  @media (min-width: 850px) {
    .contracts-wrapper {
      flex-direction: row;
    }

    .contracts-section {
      width: 50%;
    }
    .contracts-conditional-wrapper {
      max-height: 100%;
    }

    .contracts-item > select,
    .contracts-item > label,
    .contracts-item > input,
    .form-button {
      width: 50%;
    }
  }
}
</style>