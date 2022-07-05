<template>
  <layout
    :addButtonText="addButtonText"
    :processing="processing"
    :products="contracts"
    productNameProperty="contractName"
    :saveButtonEnabled="contractReadyToBeSubmitted"
    @clear-form="clearForm"
    @close="close"
    @delete-button-clicked="deleteContract"
    @edit-button-clicked="editContract"
    @save-button-clicked="addContract"
  >
    <template v-slot:form>
      <div class="contracts-section contracts-item">
        <input-with-title
          type="text"
          title="Contract Name:"
          placeholder="Legal Sounding Name"
          :inputValue="contract.contractName"
          @input="fieldInput(contract, 'contractName', $event)"
        />
        <round-icon-button svg="info" @click="toggleMergeTagInformation" />
        <p v-html="mergeTagInformation" v-if="mergeTagInformationOpen"></p>
        <input-with-title
          id="contract-body"
          placeholder="Put your best sounding stuff here"
          type="textarea"
          title="Contract Body"
          :inputValue="contract.contractBody"
          @input="fieldInput(contract, 'contractBody', $event)"
        />
      </div>
    </template>
  </layout>
</template>

<script>
import RoundIconButton from "../../../SharedComponentsUI/RoundIconButton.vue";
import InputWithTitle from "../../../SharedComponentsUI/ElementLibrary/InputWithTitle.vue";
import Layout from "../AdminConfigUIComponents/AdminConfigLayoutTileAndForm.vue";

export default {
  data() {
    return {
      addButtonText: "Add New Contract",
      processing: false,
      mergeTagInformationOpen: false,
      mergeTagInformation:
        "Use the following merge tags to personalize your emails to your contacts: <br/><b><br/>Signer First Name: {given_name}<br/> Signer Last Name: {family_name}<br/> Event Start Time: {event-start-time}<br/> Event End Time: {event-end-time}<br/> Event Length: {event-length}<br/> Event Date: {event-date}<br/> Event Title: {event-title}<br/> Invoice Total: {invoice-total}<br/> Invoice Subtotal: {invoice-subtotal}<br/> Invoice Adjustments: {invoice-adjustments}<br/> Invoice Final Payment Due: {invoice-final-payment-due}<br/> Invoice Deposit Amount: {invoice-deposit-amount}<br/> Client List: {client-list}<br/> Location List: {location-list}<br/> Business Name: {business-name}<br/> </b><br/>Be sure to include the brackets {}. Otherwise, the tag will not be replaced.",
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
      return this.$store.getters.contracts;
    },
    contractReadyToBeSubmitted() {
      return this.contract.contractName && this.contract.contractBody;
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    clearForm() {
      this.contract = {
        contractName: undefined,
        contractBody: undefined,
        id: "contract" + new Date().getTime(),
      };
      this.editIndex = undefined;
    },
    fieldInput(object, property, value) {
      if (object) {
        object[property] = value;
      } else {
        this[property] = value;
      }
    },

    toggleMergeTagInformation() {
      this.mergeTagInformationOpen = !this.mergeTagInformationOpen;
    },
    async addContract() {
      this.processing = true;
      if (this.editIndex != undefined) {
        let payload = {
          index: this.editIndex,
          contract: this.contract,
        };
        await this.$store.commit("adminConfigEditContract", payload);
      } else {
        await this.$store.commit("adminConfigAddContract", this.contract);
      }
      await this.$store.dispatch("updateBusinessSettings");
      this.processing = false;
    },
    editContract(contract, index) {
      this.editIndex = index;
      let contractTemplate = {
        contractName: undefined,
        contractBody: undefined,
        id: "contract" + new Date().getTime(),
      };
      this.contract = { ...contractTemplate, ...contract };
    },
    async deleteContract(index) {
      await this.$store.commit("adminConfigDeleteContract", index);
      await this.$store.dispatch("updateBusinessSettings");
    },
  },
  emits: ["close"],
  components: {
    InputWithTitle,
    Layout,
    RoundIconButton,
  },
};
</script>

<style scoped>
@media screen {
  * {
    color: var(--textColor);
  }
  p {
    font-size: 9pt;
    text-align: left;
  }

  .contracts-section {
    width: calc(100% - 10px);
    height: calc(100% - 10px);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-wrap: wrap;
    padding: 5px;
    overflow: scroll;
  }

  .button-wrapper {
    display: flex;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 2;
  }
  .contracts-form-section {
    width: 100%;
    height: fit-content;
  }

  .bubble-wrapper {
    display: flex;
    flex-wrap: wrap;
  }

  #contract-body {
    height: 300px;
    width: 300px;
  }

  @media (min-width: 850px) {
    .contracts-section {
      width: 100%;
    }
  }
}
</style>