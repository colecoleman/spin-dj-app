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
            class="contracts-item"
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
              <p>{{ contract.contractBody }}</p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </base-card>
</template>

<script>
import SVGs from "../../../../../assets/SVGs/svgIndex.js";

export default {
  data() {
    return {
      SVGs,
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
};
</script>

<style scoped>
section {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}

.config-section {
  height: auto;
}

#configuration-navigation {
  width: 20%;
  height: 100%;
}
#body {
  width: 80%;
  height: 100%;
  overflow: scroll;
}

#branding-preferences-wrapper {
  display: flex;
  flex-direction: row;
}

.branding-preferences-item {
  display: flex;
  flex-direction: column;
  width: 20%;
}

.business-information-wrapper,
.service-wrapper,
.package-wrapper,
.add-on-wrapper,
.contracts-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-height: 100%;
  overflow-y: scroll;
  margin-top: 10px;
}

.business-information-section,
.service-section,
.package-section,
.add-on-section,
.contracts-section {
  width: 50%;
}

.business-information-item,
.service-item,
.package-item,
.add-on-item,
.contracts-item {
  display: flex;
  flex-direction: column;
  justify-content: left;
  margin-left: 10px;
}

.business-information-item > p,
.service-item > p,
.service-section > h5,
.package-item > p,
.package-section > h5,
.add-on-item > p,
.add-on-section > h5,
.contracts-item > p,
.contracts-section > h5 {
  text-align: left;
}

.business-information-item > input,
.service-item > input,
.service-item > select,
.package-item > input,
.package-item > select,
.package-item > label,
.add-on-item > select,
.add-on-item > label,
.add-on-item > input,
.contracts-item > select,
.contracts-item > label,
.contracts-item > input,
.form-button {
  width: 50%;
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

.x-icon {
  height: 10px;
  width: 10px;
  margin: 0px 5px;
}
</style>