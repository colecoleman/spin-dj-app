<template>
  <base-card>
    <template v-slot:title>Packages</template>
    <template v-slot:content>
      <div class="package-wrapper">
        <div class="package-section">
          <h5 class="bold">Add New package:</h5>
          <div class="package-item">
            <p>Package Name:</p>
            <input type="text" v-model.trim="input.packages.packageName" />
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
              v-for="service in this.$store.state.businessSettings.product
                .services"
              :key="service.serviceName"
            >
              <p>
                <input
                  type="checkbox"
                  :id="service.serviceName"
                  @change="toggleServiceFromPackage(service.serviceName)"
                  :name="service.serviceName"
                />{{ service.serviceName }}
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
              v-for="packag in businessSettings.product.packages"
              :key="packag.id"
            >
              <h4>{{ packag.packageName }}</h4>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </base-card>
</template>

<script>
import helpers from "../../../../helpers.js";
import ButtonStandardWithIcon from "../../../../SharedComponents/SharedComponentsUI/ButtonStandardWithIcon.vue";
export default {
  data() {
    return {
      packages: undefined,
      input: {
        packages: {
          packageName: undefined,
          priceOption: undefined,
          pricing: {
            baseTime: undefined,
            baseRate: undefined,
            addHourly: undefined,
          },
          serviceIds: [],
          employeesRequired: undefined,
          photo: undefined,
        },
      },
    };
  },
  methods: {
    formatPrice: helpers.formatPrice,
    chooseFile() {
      document.getElementById("hidden-file-button").click();
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.input.services.photo = files[0];
      console.log(files);
      console.log(this.input.services.photo);
    },
    submitEventType() {
      console.log(this.input.eventTypesInput);
      console.log(this.businessSettings.product.eventTypes);
      this.businessSettings.product.eventTypes.push(this.input.eventTypesInput);
    },

    toggleServiceFromPackage(service) {
      let array = this.input.packages.serviceIds;
      let index = array.indexOf(service);
      if (index > -1) {
        array.splice(index, 1);
      } else {
        array.push(service);
      }
    },
    addPackage() {
      let item = this.input.packages;
      item.baseRate *= 100;
      if (item.addHourly) {
        item.addHourly *= 100;
      }
      this.$store.dispatch("adminConfigAddPackage", item);
      this.input.packages = {
        packageName: undefined,
        priceOption: undefined,
        pricing: {
          baseTime: undefined,
          baseRate: undefined,
          addHourly: undefined,
        },
        serviceIds: [],
        employeesRequired: undefined,
        photo: undefined,
      };
    },
  },
  created() {
    this.businessSettings = this.$store.state.businessSettings;
  },

  components: {
    ButtonStandardWithIcon,
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

.bold {
  font-weight: 600;
  margin-top: 20px;
}
</style>