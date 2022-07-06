<template>
  <layout
    :addButtonText="addButtonText"
    :figureDetails="buildDetails"
    :processing="processing"
    productNameProperty="name"
    productPhotoProperty="photo"
    :products="packages"
    :saveButtonEnabled="packageReadyToBeSubmitted"
    @clear-form="clearForm"
    @close="close"
    @delete-button-clicked="deletePackage"
    @edit-button-clicked="editPackage"
    @save-button-clicked="addPackage"
  >
    <template v-slot:form>
      <div class="package-section">
        <photo-and-title
          placeholder="Package Name"
          :title="input.name"
          :image="input.photo"
          @input="titleInput"
          @photo-chosen="photoChosen"
        />
        <div class="package-form-section">
          <p>Services Included:</p>
          <div class="bubble-wrapper">
            <input-with-binary-selection
              v-for="service in services"
              :key="service.name"
              :item="service.name"
              :checked="checkForPackagePresence(input.serviceIds, service.name)"
              @clicked="toggleItemFromPackage(input.serviceIds, service.name)"
            />
          </div>
        </div>
        <div class="package-form-section">
          <p>Standard Forms Included:</p>
          <div class="bubble-wrapper">
            <input-with-binary-selection
              v-for="form in forms"
              :key="form.id"
              :item="form.name"
              :checked="checkForPackagePresence(input.forms, form.id)"
              @clicked="toggleItemFromPackage(input.forms, form.id)"
            />
          </div>
        </div>
        <div class="package-form-section">
          <p>Standard Contract(s) Included:</p>
          <div class="bubble-wrapper">
            <input-with-binary-selection
              v-for="contract in contracts"
              :key="contract.id"
              :item="contract.contractName"
              :checked="checkForPackagePresence(input.contracts, contract.id)"
              @clicked="toggleItemFromPackage(input.contracts, contract.id)"
            />
          </div>
        </div>
        <div class="package-form-section">
          <p>Package Details:</p>
          <input-with-title
            title="Price Option:"
            type="select"
            :inputValue="input.priceOption"
            :options="priceOptions"
            @input="fieldInput(input, 'priceOption', $event)"
          />

          <div v-if="input.priceOption === 'Hourly'">
            <input-with-title
              type="number"
              title="Minimum # Hours:"
              :inputValue="input.pricing.baseTime"
              @input="fieldInput(input.pricing, 'baseTime', $event)"
            />
            <input-with-title
              type="number"
              :title="`Base Rate (${input.pricing.baseTime}) Hours:`"
              :inputValue="input.pricing.baseRate"
              @input="fieldInput(input.pricing, 'baseRate', $event)"
            />
            <input-with-title
              type="number"
              title="Additional Hourly:"
              :inputValue="input.pricing.addHourly"
              @input="fieldInput(input.pricing, 'addHourly', $event)"
            />
          </div>
          <div v-if="input.priceOption == 'Flat'">
            <input-with-title
              type="number"
              title="Flat Rate"
              :inputValue="input.pricing.baseRate"
              @input="fieldInput(input.pricing, 'baseRate', $event)"
            />
          </div>
        </div>
      </div>
    </template>
  </layout>
</template>

<script>
import Layout from "../AdminConfigUIComponents/AdminConfigLayoutTileAndForm.vue";
import InputWithBinarySelection from "../../../SharedComponentsUI/ElementLibrary/InputWithBinarySelection.vue";
import InputWithTitle from "../../../SharedComponentsUI/ElementLibrary/InputWithTitle.vue";
import PhotoAndTitle from "../AdminConfigUIComponents/AdminConfigProductPhotoAndTitle.vue";
import _cloneDeep from "lodash/cloneDeep";
import { mapGetters } from "vuex";
import { formatPrice } from "../../../../helpers.js";

export default {
  data() {
    return {
      editIndex: undefined,
      addButtonText: "Add New Package",
      processing: false,
      photoFile: undefined,
      priceOptions: ["Hourly", "Flat"],
      input: {
        id: "package" + new Date().getTime(),
        name: undefined,
        priceOption: undefined,
        pricing: {
          baseTime: undefined,
          baseRate: undefined,
          addHourly: undefined,
        },
        forms: [],
        contracts: [],
        serviceIds: [],
        employeesRequired: undefined,
        photo: undefined,
      },
    };
  },
  computed: {
    ...mapGetters(["packages", "services", "forms", "contracts"]),
    packageReadyToBeSubmitted() {
      if (this.input.name) {
        if (this.input.priceOption === "Hourly") {
          return (
            this.input.pricing.baseTime &&
            this.input.pricing.baseRate &&
            this.input.pricing.addHourly
          );
        } else if (this.input.priceOption === "Flat") {
          return this.input.pricing.baseRate;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
  },
  methods: {
    formatPrice,
    titleInput(val) {
      this.input.name = val;
    },
    clearForm() {
      this.input = {
        id: "package" + new Date().getTime(),
        name: undefined,
        priceOption: undefined,
        pricing: {
          baseTime: undefined,
          baseRate: undefined,
          addHourly: undefined,
        },
        forms: [],
        contracts: [],
        serviceIds: [],
        employeesRequired: undefined,
        photo: undefined,
      };
      this.editIndex = undefined;
    },
    buildDetails(item) {
      if (item.priceOption === "Flat") {
        return [`Flat: ${formatPrice(item.pricing.baseRate)}`];
      }
      if (item.priceOption === "Hourly") {
        return [
          `${item.pricing.baseTime} hours: ${formatPrice(
            item.pricing.baseRate
          )}`,
          `+ hours: ${formatPrice(item.pricing.addHourly)}`,
        ];
      }
    },
    close() {
      this.$emit("close");
    },
    photoChosen(file) {
      this.photoFile = file;
      let reader = new FileReader();
      reader.onload = (event) => {
        this.input.photo = event.target.result;
      };
      reader.readAsDataURL(file);
    },
    fieldInput(object, property, value) {
      if (object) {
        object[property] = value;
      } else {
        this[property] = value;
      }
    },

    checkForPackagePresence(arr, item) {
      let index = arr.indexOf(item);
      if (index > -1) {
        return true;
      } else {
        return false;
      }
    },
    toggleItemFromPackage(array, item) {
      let index = array.indexOf(item);
      if (index > -1) {
        array.splice(index, 1);
      } else {
        array.push(item);
      }
    },
    findForm(form, packag) {
      let item = this.$store.getters.forms.find((x) => x.id == form);
      if (!item) {
        this.toggleItemFromPackage(packag.forms, form);
      } else {
        return item.name;
      }
    },
    findContract(contract, packag) {
      let item = this.contracts.find((x) => x.id === contract);
      if (!item) {
        this.toggleItemFromPackage(packag.contracts, contract);
        return;
      } else {
        return item.contractName;
      }
    },
    async addPackage() {
      let item = _cloneDeep(this.input);
      if (this.photoFile) {
        await this.$store.dispatch("addPhoto", this.photoFile).then((res) => {
          this.input.photo = res;
          this.photoFile = undefined;
        });
      }
      item.pricing.baseRate *= 100;
      if (item.pricing.addHourly) {
        item.pricing.addHourly *= 100;
      }

      if (this.editIndex != undefined) {
        await this.$store.dispatch("editPackage", item);
      } else {
        await this.$store.dispatch("addPackage", item);
      }
    },
    async deletePackage(product) {
      await this.$store.dispatch("deletePackage", product.id);
    },
    editPackage(packag, index) {
      this.input = { ...this.input, ...packag };
      this.editIndex = index;
      this.input.pricing = {
        baseTime: this.input.pricing.baseTime,
        baseRate: this.input.pricing.baseRate / 100,
        addHourly: this.input.pricing.addHourly / 100,
      };
    },
  },
  emits: ["close"],
  components: {
    InputWithBinarySelection,
    InputWithTitle,
    Layout,
    PhotoAndTitle,
  },
  created() {
    console.log(this.$store.state.businessSettings);
  },
};
</script>

<style scoped>
@media screen {
  .package-section {
    display: flex;
    flex-wrap: wrap;
    overflow: scroll;
    width: 100%;
  }
  .package-form-section {
    width: 100%;
  }

  .bubble-wrapper {
    display: flex;
    flex-wrap: wrap;
  }

  p {
    text-align: left;
  }
}
</style>