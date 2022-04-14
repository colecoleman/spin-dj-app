<template>
  <base-card title="Services">
    <template v-slot:content>
      <div class="service-wrapper">
        <div class="service-section">
          <h5 class="bold">Add New Service:</h5>
          <div class="service-item">
            <input-with-title
              type="text"
              title="Service Name"
              :inputValue="input.name"
              @input="fieldInput(input, 'name', $event)"
            />
          </div>
          <div class="service-item">
            <p>Photo:</p>
            <input
              type="file"
              id="hidden-file-button-service"
              @change="onFileChange"
              style="display: none"
            />
            <button-standard-with-icon
              :text="photoFile ? photoFile.name : 'Choose File'"
              @click="chooseFile()"
              class="form-button"
            />
          </div>
          <div class="service-item">
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
          <div class="service-item">
            <p>Standard Contract Included:</p>
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
          <div class="service-item">
            <p>Service Details:</p>
            <input-with-title
              type="number"
              title="Employees Required:"
              :inputValue="input.employeesRequired"
              @input="fieldInput(input, 'employeesRequired', $event)"
            />
          </div>

          <div class="service-item">
            <input-with-title
              title="Price Option:"
              type="select"
              :options="priceOptions"
              :inputValue="input.priceOption"
              @input="fieldInput(input, 'priceOption', $event)"
            />
          </div>
          <div class="service-item" v-if="input.priceOption === 'Hourly'">
            <div class="service-item">
              <input-with-title
                type="number"
                title="Minimum # Hours:"
                :inputValue="input.pricing.baseTime"
                @input="fieldInput(input.pricing, 'baseTime', $event)"
              />
            </div>
            <div class="service-item">
              <input-with-title
                type="number"
                :title="`Base Rate (${input.pricing.baseTime}
                Hours)`"
                :inputValue="input.pricing.baseRate"
                @input="fieldInput(input.pricing, 'baseRate', $event)"
              />
            </div>
            <div class="service-item">
              <input-with-title
                type="number"
                title="Additional Hourly:"
                :inputValue="input.pricing.addHourly"
                @input="fieldInput(input.pricing, 'addHourly', $event)"
              />
            </div>
            <button-standard-with-icon
              text="Add Service"
              @click="addService()"
              class="form-button"
            />
          </div>
          <div class="service-item" v-if="input.priceOption == 'Flat'">
            <div class="service-item">
              <input-with-title
                type="number"
                title="Flat Rate:"
                :inputValue="input.pricing.baseRate"
                @input="fieldInput(input.pricing, 'baseRate', $event)"
              />
            </div>
            <div class="service-item">
              <button-standard-with-icon
                text="Add Service"
                @click="addService()"
                class="form-button"
              />
            </div>
          </div>
        </div>
        <div class="service-section">
          <h5 v-if="!services">No services have been added yet! Add some!</h5>
          <div class="service-conditional-wrapper" v-if="services">
            <h5 v-if="!services.length">
              No services have been added yet! Add some!
            </h5>
            <div
              class="service-item"
              style="border-bottom: 1px solid gray; margin-bottom: 10px"
              v-for="(service, index) in services"
              :key="service.id"
            >
              <h4>
                {{ service.name }}

                <vue-svg
                  svg="x-icon"
                  :customStyle="svgStyling"
                  @clicked="deleteService(index)"
                />
                <vue-svg
                  svg="edit-pen"
                  :customStyle="svgStyling"
                  @clicked="editService(service, index)"
                />
              </h4>
              <div class="service-display-section">
                <div class="service-item" v-if="service.photo">
                  <p>Photo: {{ service.photo.name }}</p>
                </div>
              </div>

              <div class="service-display-section">
                <div class="service-item" v-if="service.priceOption === 'Flat'">
                  <p>
                    <b>Flat Rate:</b>
                    {{ formatPrice(service.pricing.baseRate) }}
                  </p>
                </div>
                <div
                  class="service-item"
                  v-if="service.priceOption === 'Hourly'"
                >
                  <p><b>Base Time: </b>{{ service.pricing.baseTime }}</p>
                  <p>
                    <b>Base Rate: </b
                    >{{ formatPrice(service.pricing.baseRate) }}
                  </p>
                  <p>
                    <b>Additional Hourly: </b
                    >{{ formatPrice(service.pricing.addHourly) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </base-card>
</template>

<script>
import { mapGetters } from "vuex";
import VueSvg from "../../../../../assets/VueSvg.vue";
import InputWithBinarySelection from "../../../../../SharedComponents/SharedComponentsUI/ElementLibrary/InputWithBinarySelection.vue";
import { formatPrice } from "../../../../../helpers.js";
import _cloneDeep from "lodash/cloneDeep";
import InputWithTitle from "../../../../../SharedComponents/SharedComponentsUI/ElementLibrary/InputWithTitle.vue";

// import { Storage } from "aws-amplify";

export default {
  data() {
    return {
      // services: [],
      editIndex: undefined,
      photoFile: undefined,
      svgStyling:
        "height: 10px; width: 10px; margin: 0px 5px; cursor: pointer;",
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
    };
  },
  computed: {
    ...mapGetters(["services", "forms", "contracts"]),
  },
  methods: {
    formatPrice,
    fieldInput(object, property, value) {
      if (object) {
        object[property] = value;
      } else {
        this[property] = value;
      }
    },
    async addService() {
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
    toggleFormFromService(form, serviceIndex) {
      let services = this.services;
      let array;
      if (serviceIndex) {
        array = services[serviceIndex].forms;
      } else {
        array = this.input.forms;
      }
      let index = array.indexOf(form);
      if (index > -1) {
        array.splice(index, 1);
      } else {
        array.push(form);
      }
    },
    toggleContractFromService(contract, serviceIndex) {
      let services = this.services;
      let array;
      if (serviceIndex) {
        array = services[serviceIndex].contracts;
      } else {
        array = this.input.contracts;
      }
      let index = array.indexOf(contract);
      if (index > -1) {
        array.splice(index, 1);
      } else {
        array.push(contract);
      }
    },
    deleteService(index) {
      this.$store.commit("adminConfigDeleteService", index);
    },
    editService(service, index) {
      this.input = { ...this.input, ...service };
      this.editIndex = index;
      this.input.pricing = {
        baseTime: this.input.pricing.baseTime,
        baseRate: this.input.pricing.baseRate / 100,
        addHourly: this.input.pricing.addHourly / 100,
      };
    },
    chooseFile() {
      document.getElementById("hidden-file-button-service").click();
    },
    async onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.photoFile = files[0];
    },
  },
  components: { InputWithTitle, InputWithBinarySelection, VueSvg },
};
</script>

<style scoped>
@media screen {
  p {
    font-size: 9pt;
  }

  .service-wrapper {
    display: flex;
    flex-direction: column-reverse;
    flex-wrap: wrap;
    max-height: 100%;
    overflow-y: scroll;
    padding: 10px;
  }

  .service-conditional-wrapper {
    max-height: 300px;
    height: fit-content;
    overflow: scroll;
  }

  .service-section {
    width: 100%;
  }

  .service-item {
    display: flex;
    flex-direction: column;
    justify-content: left;
    margin-left: 10px;
  }

  .service-item > p,
  .service-section > h5 {
    text-align: left;
  }
  .service-item > input,
  .service-item > select,
  .service-item > label,
  .button-standard-with-icon {
    width: 90%;
    align-self: left;
    justify-self: left;
  }

  .bubble-wrapper {
    display: flex;
    flex-wrap: wrap;
  }

  .button-standard-with-icon {
    margin-top: 10px;
  }

  @media (min-width: 850px) {
    .service-wrapper {
      flex-direction: row;
    }
    .service-conditional-wrapper {
      max-height: 100%;
      height: fit-content;
      overflow: scroll;
    }
    .service-section {
      width: 50%;
    }

    .service-item > input,
    .service-item > select,
    .service-item > label,
    .button-standard-with-icon {
      width: 50%;
    }
  }
}
</style>