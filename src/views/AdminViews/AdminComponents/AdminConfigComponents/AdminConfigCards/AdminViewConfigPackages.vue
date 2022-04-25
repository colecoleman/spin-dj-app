<template>
  <base-card title="Packages">
    <template v-slot:content>
      <div class="package-wrapper" v-if="businessSettings">
        <div class="package-section">
          <h5 class="bold">Add New Package:</h5>
          <input-with-title
            title="Package Name:"
            type="text"
            :inputValue="input.packages.name"
            @input="fieldInput(input.packages, 'name', $event)"
          />
          <p>Photo:</p>
          <input
            type="file"
            id="hidden-file-button-package"
            @change="onFileChange"
            style="display: none"
          />
          <button-standard-with-icon
            :text="photoFile ? photoFile.name : 'Choose File'"
            @click="chooseFile()"
            class="form-button"
          />
          <p>Services Included:</p>
          <div class="bubble-wrapper">
            <input-with-binary-selection
              v-for="service in services"
              :key="service.name"
              :item="service.name"
              :checked="
                checkForPackagePresence(input.packages.serviceIds, service.name)
              "
              @clicked="
                toggleItemFromPackage(input.packages.serviceIds, service.name)
              "
            />
          </div>
          <p>Standard Forms Included:</p>
          <div class="bubble-wrapper">
            <input-with-binary-selection
              v-for="form in forms"
              :key="form.id"
              :item="form.name"
              :checked="checkForPackagePresence(input.packages.forms, form.id)"
              @clicked="toggleItemFromPackage(input.packages.forms, form.id)"
            />
          </div>
          <p>Standard Contract(s) Included:</p>
          <div class="bubble-wrapper">
            <input-with-binary-selection
              v-for="contract in businessSettings.contracts"
              :key="contract.id"
              :item="contract.contractName"
              :checked="
                checkForPackagePresence(input.packages.contracts, contract.id)
              "
              @clicked="
                toggleItemFromPackage(input.packages.contracts, contract.id)
              "
            />
          </div>
          <p>Package Details:</p>

          <input-with-title
            title="Price Option:"
            type="select"
            :inputValue="input.packages.priceOption"
            :options="priceOptions"
            @input="fieldInput(input.packages, 'priceOption', $event)"
          />

          <div v-if="input.packages.priceOption === 'Hourly'">
            <input-with-title
              type="number"
              title="Minimum # Hours:"
              :inputValue="input.packages.pricing.baseTime"
              @input="fieldInput(input.packages.pricing, 'baseTime', $event)"
            />
            <input-with-title
              type="number"
              :title="`Base Rate (${input.packages.pricing.baseTime}) Hours:`"
              :inputValue="input.packages.pricing.baseRate"
              @input="fieldInput(input.packages.pricing, 'baseRate', $event)"
            />
            <input-with-title
              type="number"
              title="Additional Hourly:"
              :inputValue="input.packages.pricing.addHourly"
              @input="fieldInput(input.packages.pricing, 'addHourly', $event)"
            />
            <button-standard-with-icon
              text="Add Package"
              @click="addPackage()"
              class="form-button"
            />
          </div>
          <div v-if="input.packages.priceOption == 'Flat'">
            <input-with-title
              type="number"
              title="Flat Rate"
              :inputValue="input.packages.pricing.baseRate"
              @input="fieldInput(input.packages.pricing, 'baseRate', $event)"
            />
            <button-standard-with-icon
              text="Add package"
              @click="addPackage()"
              class="form-button"
            />
          </div>
        </div>
        <div class="package-section">
          <h5 v-if="!packages">No packages have been added yet! Add some!</h5>
          <div class="package-conditional-wrapper" v-if="packages">
            <h5 v-if="!packages.length">
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

                <vue-svg
                  svg="x-icon"
                  :customStyle="svgStyling"
                  @clicked="deletePackage(index)"
                />

                <vue-svg
                  svg="edit-pen"
                  :customStyle="svgStyling"
                  @clicked="editPackage(packag, index)"
                />
                <vue-svg svg="" />
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
                      {{ findForm(form, packag) }},
                    </span>
                  </p>
                </div>
                <div class="package-item" v-if="packag.contracts">
                  <p>
                    <b>Included Contracts: </b
                    ><span v-for="contract in packag.contracts" :key="contract">
                      {{ findContract(contract, packag) }}</span
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
import { mapGetters } from "vuex";
import VueSvg from "../../../../../assets/VueSvg.vue";
import InputWithBinarySelection from "../../../../../SharedComponents/SharedComponentsUI/ElementLibrary/InputWithBinarySelection.vue";
import { formatPrice } from "../../../../../helpers.js";
import InputWithTitle from "../../../../../SharedComponents/SharedComponentsUI/ElementLibrary/InputWithTitle.vue";
import _cloneDeep from "lodash/cloneDeep";

export default {
  data() {
    return {
      svgStyling:
        "height: 10px; width: 10px; margin: 0px 5px; cursor: pointer;",
      editIndex: undefined,
      photoFile: undefined,
      priceOptions: ["Hourly", "Flat"],
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
    ...mapGetters(["packages", "services", "forms", "contracts"]),
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
    chooseFile() {
      document.getElementById("hidden-file-button-package").click();
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.photoFile = files[0];
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
      let item = _cloneDeep(this.input.packages);
      if (this.photoFile) {
        await this.$store.dispatch("addPhoto", this.photoFile).then((res) => {
          this.input.packages.photo = res;
          this.photoFile = undefined;
        });
      }
      item.pricing.baseRate *= 100;
      if (item.pricing.addHourly) {
        item.pricing.addHourly *= 100;
      }

      if (this.editIndex != undefined) {
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
    },
  },
  components: { InputWithTitle, InputWithBinarySelection, VueSvg },
  created() {
    if ("product" in this.$store.state.businessSettings) {
      this.businessSettings = this.$store.state.businessSettings;
    }
  },
};
</script>

<style scoped>
@media screen {
  p {
    font-size: 9pt;
  }

  .package-wrapper {
    display: flex;
    flex-direction: column-reverse;
    flex-wrap: wrap;
    max-height: 100%;
    overflow-y: scroll;
    padding: 10px;
  }

  .package-conditional-wrapper {
    max-height: 300px;
    height: fit-content;
    overflow: scroll;
  }

  .package-section {
    width: 100%;
  }

  .bubble-wrapper {
    display: flex;
    flex-wrap: wrap;
  }

  p,
  .package-section > h5 {
    text-align: left;
  }
  .package-item > input,
  .package-item > select,
  .package-item > label,
  .button-standard-with-icon {
    width: 90%;
    align-self: left;
    justify-self: left;
  }

  .button-standard-with-icon {
    margin-top: 10px;
  }

  @media (min-width: 850px) {
    .package-wrapper {
      flex-direction: row;
    }
    .package-conditional-wrapper {
      max-height: 100%;
      height: fit-content;
      overflow: scroll;
    }
    .package-section {
      width: 50%;
    }

    .package-item > input,
    .package-item > select,
    .package-item > label,
    .button-standard-with-icon {
      width: 50%;
    }
  }
}
</style>