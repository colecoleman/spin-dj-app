<template>
  <base-card>
    <template v-slot:title>Packages</template>
    <template v-slot:content>
      <div class="package-wrapper" v-if="businessSettings">
        <div class="package-section">
          <h5 class="bold">Add New Package:</h5>
          <div class="package-item">
            <p>Package Name:</p>
            <input type="text" v-model.trim="input.packages.name" />
          </div>
          <div class="package-item">
            <p>Photo:</p>
            <input
              type="file"
              id="hidden-file-button"
              @change="onFileChange"
              style="display: none"
            />
            <button-standard-with-icon
              text="Choose File"
              @click="chooseFile()"
              class="form-button"
            />
          </div>
          <div class="package-item">
            <p>Services Included:</p>
            <div
              class="package-item row-flex"
              v-for="service in businessSettings.product.services"
              :key="service.name"
            >
              <p>
                <input
                  type="checkbox"
                  class="checkbox"
                  :id="service.name"
                  @change="toggleServiceFromPackage(service.name)"
                  :name="service.name"
                />{{ service.name }}
              </p>
            </div>
          </div>
          <div class="package-item">
            <p>Standard Forms Included:</p>
            <div
              class="package-item row-flex"
              v-for="form in businessSettings.product.forms"
              :key="form.id"
            >
              <p>
                <input
                  type="checkbox"
                  :id="form.id"
                  class="checkbox"
                  @change="toggleFormFromPackage(form.id)"
                  :name="form.name"
                />{{ form.name }}
              </p>
            </div>
          </div>
          <div class="package-item">
            <p>Standard Contract Included:</p>
            <div
              class="package-item row-flex"
              v-for="contract in businessSettings.contracts"
              :key="contract.id"
            >
              <p>
                <input
                  type="checkbox"
                  :id="contract.id"
                  class="checkbox"
                  @change="toggleContractFromPackage(contract.id)"
                  :name="contract.contractName"
                />{{ contract.contractName }}
              </p>
            </div>
          </div>

          <div class="package-item">
            <p>Price Option:</p>
            <select
              name="price-option"
              id=""
              v-model="input.packages.priceOption"
            >
              <option disabled value="">Select a price option:</option>
              <option>Hourly</option>
              <option>Flat</option>
            </select>
          </div>
          <div
            class="package-item"
            v-if="input.packages.priceOption === 'Hourly'"
          >
            <div class="package-item">
              <p>Minimum # Hours:</p>
              <input
                type="number"
                v-model.number="input.packages.pricing.baseTime"
              />
            </div>
            <div class="package-item">
              <p>
                Base Rate ({{ input.packages.pricing.baseTime }}
                Hours)
              </p>
              <input v-model.number="input.packages.pricing.baseRate" />
            </div>
            <div class="package-item">
              <p>Additional Hourly:</p>
              <input v-model.number="input.packages.pricing.addHourly" />
            </div>
            <button-standard-with-icon
              text="Add Package"
              @click="addPackage()"
              class="form-button"
            />
          </div>
          <div class="package-item" v-if="input.packages.priceOption == 'Flat'">
            <div class="package-item">
              <p>Flat Rate:</p>
              <input
                type="number"
                v-model.number="input.packages.pricing.baseRate"
              />
            </div>
            <div class="package-item">
              <button-standard-with-icon
                text="Add package"
                @click="addPackage()"
                class="form-button"
              />
            </div>
          </div>
        </div>
        <div class="package-section">
          <h5 v-if="!businessSettings.product.packages">
            No packages have been added yet! Add some!
          </h5>
          <div
            class="package-conditional-wrapper"
            v-if="businessSettings.product.packages"
          >
            <h5 v-if="!businessSettings.product.packages.length">
              No packages have been added yet! Add some!
            </h5>
            <div
              class="package-item"
              style="border-bottom: 1px solid gray; margin-bottom: 10px"
              v-for="(packag, index) in packages"
              :key="packag.id"
            >
              <h4>
                {{ packag.name }}
                <img
                  :src="SVGs.XIconSVG"
                  class="x-icon"
                  @click="deletePackage(index)"
                />
                <img
                  :src="SVGs.EditPenSVG"
                  class="x-icon"
                  @click="editPackage(packag, index)"
                />
              </h4>
              <div class="package-display-section">
                <div class="package-item" v-if="packag.photo">
                  <p>Photo: {{ packag.photo.name }}</p>
                </div>
              </div>

              <div class="package-display-section">
                <div class="package-item" v-if="packag.priceOption === 'Flat'">
                  <p>
                    <b>Flat Rate:</b>
                    {{ formatPrice(packag.pricing.baseRate) }}
                  </p>
                </div>
                <div
                  class="package-item"
                  v-if="packag.priceOption === 'Hourly'"
                >
                  <p><b>Base Time: </b>{{ packag.pricing.baseTime }}</p>
                  <p>
                    <b>Base Rate: </b>{{ formatPrice(packag.pricing.baseRate) }}
                  </p>
                  <p>
                    <b>Additional Hourly: </b
                    >{{ formatPrice(packag.pricing.addHourly) }}
                  </p>
                </div>
                <div class="package-item" v-if="packag.forms">
                  <p>
                    <b>Included Forms: </b
                    ><span v-for="form in packag.forms" :key="form">
                      {{ findForm(form, index) }}</span
                    >
                  </p>
                </div>
                <div class="package-item" v-if="packag.contracts">
                  <p>
                    <b>Included Contracts: </b
                    ><span v-for="contract in packag.contracts" :key="contract">
                      {{ findContract(contract, index) }}</span
                    >
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
import helpers from "../../../../../helpers.js";

export default {
  data() {
    return {
      SVGs,
      editIndex: undefined,
      photoFile: undefined,
      input: {
        packages: {
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
      },
    };
  },
  computed: {
    packages() {
      return this.businessSettings.product.packages;
    },
  },
  methods: {
    formatPrice: helpers.formatPrice,
    chooseFile() {
      document.getElementById("hidden-file-button").click();
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.photoFile = files[0];
    },
    submitEventType() {
      this.businessSettings.product.eventTypes.push(this.input.eventTypesInput);
    },

    toggleServiceFromPackage(service) {
      let array = this.input.packages.serviceIds;
      let index = array.indexOf(service);
      if (index > -1) {
        array.splice(index, 1);
        console.log("here");
      } else {
        console.log("not here");
        array.push(service);
      }
    },
    toggleFormFromPackage(form, packageIndex) {
      let packages = this.businessSettings.product.packages;
      let array;
      if (packageIndex) {
        array = packages[packageIndex].forms;
      } else {
        array = this.input.packages.forms;
      }
      let index = array.indexOf(form);
      if (index > -1) {
        array.splice(index, 1);
      } else {
        array.push(form);
      }
    },
    toggleContractFromPackage(contract, packageIndex) {
      let packages = this.businessSettings.product.packages;
      let array;
      if (packageIndex) {
        array = packages[packageIndex].contracts;
      } else {
        array = this.input.packages.contracts;
      }
      let index = array.indexOf(contract);
      if (index > -1) {
        array.splice(index, 1);
      } else {
        array.push(contract);
      }
    },
    findForm(form, packageIndex) {
      // console.log(packageIndex);
      let item = this.businessSettings.product.forms.find((x) => x.id === form);
      if (!item) {
        this.toggleFormFromPackage(form, packageIndex);
      } else {
        return item.name;
      }
    },
    findContract(contract, packageIndex) {
      let item = this.businessSettings.contracts.find((x) => x.id === contract);
      if (!item) {
        this.toggleContractFromPackage(contract, packageIndex);
        return;
      } else {
        return item.contractName;
      }
    },
    async addPackage() {
      let item = this.input.packages;
      if (this.photoFile) {
        await this.$store.dispatch("addPhoto", this.photoFile).then((res) => {
          this.input.packages.photo = res;
          console.log(this.inputPhoto);
        });
      }
      item.pricing.baseRate *= 100;
      if (item.pricing.addHourly) {
        item.pricing.addHourly *= 100;
      }

      if (this.editIndex != undefined) {
        // this.businessSettings.products.packages[this.editIndex] = item;
        let payload = {
          index: this.editIndex,
          package: item,
        };
        this.$store.commit("adminConfigEditPackage", payload);
      } else {
        this.$store.commit("adminConfigAddPackage", item);
      }
      this.input.packages = {
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
      document
        .querySelectorAll("input[type=checkbox")
        .forEach((el) => (el.checked = false));
    },
    deletePackage(index) {
      this.$store.commit("adminConfigDeletePackage", index);
    },
    editPackage(packag, index) {
      this.input.packages = { ...this.input.packages, ...packag };
      this.editIndex = index;
      this.input.packages.pricing = {
        baseTime: this.input.packages.pricing.baseTime,
        baseRate: this.input.packages.pricing.baseRate / 100,
        addHourly: this.input.packages.pricing.addHourly / 100,
      };
      packag.forms.forEach((form) => {
        document.getElementById(form).checked = true;
      });
      packag.contracts.forEach((contracts) => {
        document.getElementById(contracts).checked = true;
      });
      packag.serviceIds.forEach((service) => {
        document.getElementById(service).checked = true;
      });
    },
  },
  created() {
    if ("product" in this.$store.state.businessSettings) {
      this.businessSettings = this.$store.state.businessSettings;
    }
  },
};
</script>

<style scoped>
.package-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-height: 100%;
  overflow-y: scroll;
  margin-top: 10px;
}

.package-section {
  width: 50%;
}

.package-item {
  display: flex;
  flex-direction: column;
  justify-content: left;
  margin-left: 10px;
}

.package-item > p,
.package-section > h5 {
  text-align: left;
}
.package-item > input,
.package-item > select,
.package-item > label,
.button-standard-with-icon {
  width: 50%;
  align-self: left;
  justify-self: left;
}

.button-standard-with-icon {
  margin-top: 10px;
}

.bold {
  font-weight: 600;
  margin-top: 20px;
}

.x-icon {
  height: 10px;
  width: 10px;
  margin: 0px 5px;
}
</style>