<template>
  <base-card>
    <template v-slot:title>Services</template>
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
          <div class="service-empty-wrapper" v-if="services">
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
import SVGs from "../../../../assets/SVGs/svgIndex";
import helpers from "../../../../helpers.js";

export default {
  data() {
    return {
      SVGs,
      // services: [],
      editIndex: undefined,
      input: {
        id: "service" + new Date().getTime(),
        name: undefined,
        pricing: {
          baseTime: undefined,
          baseRate: undefined,
          addHourly: undefined,
        },
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
  },
  methods: {
    formatPrice: helpers.formatPrice,
    addService() {
      let service = this.input;
      service.pricing.baseRate *= 100;
      service.pricing.addHourly *= 100;
      if (this.editIndex != undefined) {
        let payload = {
          index: this.editIndex,
          service: service,
        };
        this.$store.commit("adminConfigEditService", payload);
        // this.services[this.editIndex] = service;
      } else {
        // this.services.push(service);
        this.$store.commit("adminConfigAddService", service);
      }
      this.input = {
        name: undefined,
        pricing: {
          baseTime: undefined,
          baseRate: undefined,
          addHourly: undefined,
        },
        priceOption: undefined,
        photo: undefined,
        equipmentNeeded: [],
        employeesRequired: undefined,
      };
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
      // service.contracts.forEach((contracts) => {
      //   document.getElementById(contracts).checked = true;
      // });
    },
    chooseFile() {
      document.getElementById("hidden-file-button").click();
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.inputs.services.photo = files[0];
      console.log(files);
      console.log(this.inputs.services.photo);
    },
  },
};
</script>

<style scoped>
.service-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-height: 100%;
  overflow-y: scroll;
  margin-top: 10px;
}

.service-section {
  width: 50%;
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