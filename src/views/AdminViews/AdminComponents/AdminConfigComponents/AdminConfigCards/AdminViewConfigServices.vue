<template>
  <base-card title="Services">
    <template v-slot:content>
      <div class="service-wrapper">
        <div class="service-section">
          <h5 class="bold">Add New Service:</h5>
          <div class="service-item">
            <p>Service Name:</p>

            <input type="text" v-model.trim="input.name" />
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
            <div
              class="service-item row-flex"
              v-for="form in forms"
              :key="form.id"
            >
              <p>
                <input
                  type="checkbox"
                  :id="'service-form-' + form.id"
                  class="checkbox"
                  @change="toggleFormFromService(form.id)"
                  :name="form.name"
                />{{ form.name }}
              </p>
            </div>
          </div>
          <div class="service-item">
            <p>Standard Contract Included:</p>
            <div
              class="service-item row-flex"
              v-for="contract in contracts"
              :key="contract.id"
            >
              <p>
                <input
                  type="checkbox"
                  :id="'service-contract-' + contract.id"
                  class="checkbox"
                  @change="toggleContractFromService(contract.id)"
                  :name="contract.contractName"
                />{{ contract.contractName }}
              </p>
            </div>
          </div>
          <div class="service-item">
            <p>Employees Required</p>
            <input type="number" v-model.number="input.employeesRequired" />
          </div>

          <div class="service-item">
            <p>Price Option:</p>
            <select name="price-option" id="" v-model="input.priceOption">
              <option disabled value="">Select a price option:</option>
              <option>Hourly</option>
              <option>Flat</option>
            </select>
          </div>
          <div class="service-item" v-if="input.priceOption === 'Hourly'">
            <div class="service-item">
              <p>Minimum # Hours:</p>
              <input type="number" v-model.number="input.pricing.baseTime" />
            </div>
            <div class="service-item">
              <p>
                Base Rate ({{ input.pricing.baseTime }}
                Hours)
              </p>
              <input v-model.number="input.pricing.baseRate" />
            </div>
            <div class="service-item">
              <p>Additional Hourly:</p>
              <input v-model.number="input.pricing.addHourly" />
            </div>
            <button-standard-with-icon
              text="Add Service"
              @click="addService()"
              class="form-button"
            />
          </div>
          <div class="service-item" v-if="input.priceOption == 'Flat'">
            <div class="service-item">
              <p>Flat Rate:</p>
              <input type="number" v-model.number="input.pricing.baseRate" />
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
                <img
                  :src="SVGs.XIconSVG"
                  class="x-icon"
                  @click="deleteService(index)"
                />
                <img
                  :src="SVGs.EditPenSVG"
                  class="x-icon"
                  @click="editService(service, index)"
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
import SVGs from "../../../../../assets/SVGs/svgIndex";
import { formatPrice } from "../../../../../helpers.js";
import _cloneDeep from "lodash/cloneDeep";

// import { Storage } from "aws-amplify";

export default {
  data() {
    return {
      SVGs,
      // services: [],
      editIndex: undefined,
      photoFile: undefined,
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
    services() {
      return this.$store.state.businessSettings.product.services;
    },
    forms() {
      return this.$store.state.businessSettings.product.forms.forms;
    },
    contracts() {
      return this.$store.state.businessSettings.contracts;
    },
  },
  methods: {
    formatPrice,
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
      document
        .querySelectorAll("input[type=checkbox")
        .forEach((el) => (el.checked = false));
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
      console.log(this.input);
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
      service.forms.forEach((form) => {
        document.getElementById("service-form-" + form).checked = true;
      });
      service.contracts.forEach((contracts) => {
        document.getElementById("service-contract-" + contracts).checked = true;
      });
      console.log(this.input);
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
    margin-top: 10px;
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

  .button-standard-with-icon {
    margin-top: 10px;
  }

  img {
    height: 10px;
    width: 10px;
    margin: 0px 5px;
    cursor: pointer;
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