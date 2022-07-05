<template>
  <layout
    :addButtonText="addButtonText"
    :figureDetails="buildDetails"
    :processing="processing"
    productNameProperty="name"
    productPhotoProperty="photo"
    :products="services"
    :saveButtonEnabled="serviceReadyToBeSubmitted"
    @clear-form="clearForm"
    @close="close"
    @delete-button-clicked="deleteService"
    @edit-button-clicked="editService"
    @save-button-clicked="addService"
  >
    <template v-slot:form>
      <div class="service-section">
        <photo-and-title
          placeholder="Service Name"
          :title="input.name"
          :image="input.photo"
          @input="titleInput"
          @photo-chosen="photoChosen"
        />
        <div class="service-form-section">
          <p>Standard Forms Included:</p>
          <div class="bubble-wrapper">
            <input-with-binary-selection
              v-for="form in forms"
              :key="form.id"
              :item="form.name"
              :checked="checkForServicePresence(input.forms, form.id)"
              @clicked="toggleItemFromService(input.forms, form.id)"
            />
          </div>
        </div>
        <div class="service-form-section">
          <p>Standard Contract(s) Included:</p>
          <div class="bubble-wrapper">
            <input-with-binary-selection
              v-for="contract in contracts"
              :key="contract.id"
              :item="contract.contractName"
              :checked="checkForServicePresence(input.contracts, contract.id)"
              @clicked="toggleItemFromService(input.contracts, contract.id)"
            />
          </div>
        </div>
        <div class="service-form-section">
          <p>Service Details:</p>
          <input-with-title
            type="number"
            title="Employees Required:"
            :inputValue="input.employeesRequired"
            @input="fieldInput(input, 'employeesRequired', $event)"
          />
        </div>

        <div class="service-form-section">
          <input-with-title
            title="Price Option:"
            type="select"
            :options="priceOptions"
            :inputValue="input.priceOption"
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
              :title="`Base Rate (${input.pricing.baseTime}
                Hours)`"
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
              title="Flat Rate:"
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
import { mapGetters } from "vuex";
import { formatPrice } from "../../../../helpers.js";
import _cloneDeep from "lodash/cloneDeep";
import InputWithBinarySelection from "../../../../Components/SharedComponentsUI/ElementLibrary/InputWithBinarySelection.vue";
import InputWithTitle from "../../../../Components/SharedComponentsUI/ElementLibrary/InputWithTitle.vue";
import PhotoAndTitle from "../AdminConfigUIComponents/AdminConfigProductPhotoAndTitle.vue";
import Layout from "../AdminConfigUIComponents/AdminConfigLayoutTileAndForm.vue";

export default {
  data() {
    return {
      addButtonText: "Add New Service",
      processing: false,
      priceOptions: ["Hourly", "Flat"],
      input: {
        id: "service" + new Date().getTime(),
        name: undefined,
        pricing: {
          baseTime: undefined,
          baseRate: undefined,
          addHourly: undefined,
        },
        forms: [],
        contracts: [],
        priceOption: undefined,
        photo: undefined,
        equipmentNeeded: [],
        employeesRequired: undefined,
      },
      editIndex: undefined,
      photoFile: undefined,
    };
  },
  computed: {
    ...mapGetters(["services", "forms", "contracts"]),
    serviceReadyToBeSubmitted() {
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
    close() {
      this.$emit("close");
    },
    clearForm() {
      this.input = {
        id: "service" + new Date().getTime(),
        name: undefined,
        pricing: {
          baseTime: undefined,
          baseRate: undefined,
          addHourly: undefined,
        },
        forms: [],
        contracts: [],
        priceOption: undefined,
        photo: undefined,
        equipmentNeeded: [],
        employeesRequired: undefined,
      };
      this.editIndex = undefined;
    },
    titleInput(val) {
      this.input.name = val;
    },
    photoChosen(file) {
      this.photoFile = file;
      let reader = new FileReader();
      reader.onload = (event) => {
        this.input.photo = event.target.result;
      };
      reader.readAsDataURL(file);
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
    fieldInput(object, property, value) {
      if (object) {
        object[property] = value;
      } else {
        this[property] = value;
      }
    },
    async addService() {
      this.processing = true;
      let service = _cloneDeep(this.input);
      if (this.photoFile) {
        await this.$store.dispatch("addPhoto", this.photoFile).then((res) => {
          service.photo = res;
          this.photoFile = undefined;
        });
      }
      service.pricing.baseRate *= 100;
      service.pricing.addHourly *= 100;
      if (this.editIndex != undefined) {
        let payload = {
          index: this.editIndex,
          service: service,
        };
        this.$store.commit("adminConfigEditService", payload);
      } else {
        this.$store.commit("adminConfigAddService", service);
      }
      await this.$store.dispatch("updateBusinessSettings");
      this.photoFile = undefined;
      this.processing = false;
    },
    checkForServicePresence(arr, item) {
      let index = arr.indexOf(item);
      if (index > -1) {
        return true;
      } else {
        return false;
      }
    },
    toggleItemFromService(array, item) {
      let index = array.indexOf(item);
      if (index > -1) {
        array.splice(index, 1);
      } else {
        array.push(item);
      }
    },
    async deleteService(index) {
      await this.$store.commit("adminConfigDeleteService", index);
      await this.$store.dispatch("updateBusinessSettings");
    },
    editService(service, index) {
      let inputTemplate = {
        id: "service" + new Date().getTime(),
        name: undefined,
        pricing: {
          baseTime: undefined,
          baseRate: undefined,
          addHourly: undefined,
        },
        forms: [],
        contracts: [],
        priceOption: undefined,
        photo: undefined,
        equipmentNeeded: [],
        employeesRequired: undefined,
      };
      this.input = { ...inputTemplate, ...service };
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
};
</script>

<style scoped>
@media screen {
  #service-config-wrapper {
    height: 100%;
  }

  .service-form-section {
    width: 100%;
  }
  p {
    text-align: left;
  }

  .service-section {
    width: calc(100% - 10px);
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 5px;
    overflow: scroll;
  }
  .bubble-wrapper {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>