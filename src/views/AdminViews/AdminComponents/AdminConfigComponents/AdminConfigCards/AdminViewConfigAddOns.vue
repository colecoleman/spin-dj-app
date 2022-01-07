<template>
  <base-card title="Add-Ons">
    <template v-slot:content>
      <div class="add-on-wrapper">
        <div class="add-on-section">
          <h5 class="bold">Add New Add-On:</h5>
          <div class="add-on-item">
            <p>Add-On Name:</p>
            <input type="text" v-model.trim="addOn.name" />
          </div>
          <div class="add-on-item">
            <p>Photo:</p>
            <input
              type="file"
              id="add-on-hidden-file-button"
              @change="onFileChange"
              style="display: none"
            />
            <button-standard-with-icon
              text="Choose File"
              @click="chooseFile()"
              class="form-button"
            />
          </div>
          <div class="add-on-item"></div>

          <div class="add-on-item">
            <p>Price Option:</p>
            <select name="price-option" id="" v-model="addOn.priceOption">
              <option disabled value="">Select a price option</option>
              <option>Unit</option>
              <option>Flat</option>
            </select>
          </div>
          <div class="add-on-item" v-if="addOn.priceOption === 'Unit'">
            <div class="add-on-item">
              <p>Minimum # Units:</p>
              <input type="number" v-model.number="addOn.pricing.minUnits" />
            </div>
            <div class="add-on-item">
              <p>Unit Rate:</p>
              <input v-model.number="addOn.pricing.unitRate" />
            </div>
            <button-standard-with-icon
              text="Add Add-On"
              @click="addAddOn()"
              class="form-button"
            />
          </div>
          <div class="add-on-item" v-if="addOn.priceOption == 'Flat'">
            <div class="add-on-item">
              <p>Flat Rate:</p>
              <input type="number" v-model.number="addOn.pricing.unitRate" />
            </div>
            <div class="add-on-item">
              <button-standard-with-icon
                text="Add Add-On"
                @click="addAddOn()"
                class="form-button"
              />
            </div>
          </div>
        </div>
        <div class="add-on-section">
          <h5 v-if="!hasAddOns">You don't have any add-ons yet. Add One!</h5>
          <div v-if="hasAddOns">
            <div
              class="add-on-item"
              style="border-bottom: 1px solid gray; margin-bottom: 10px"
              v-for="(addOn, index) in addOns"
              :key="addOn.name"
            >
              <h4>
                {{ addOn.name }}
                <img
                  :src="SVGs.XIconSVG"
                  class="x-icon"
                  @click="deleteAddOn(index)"
                />
                <img
                  :src="SVGs.EditPenSVG"
                  class="x-icon"
                  @click="editAddOn(addOn, index)"
                />
              </h4>
              <div class="add-on-display-section">
                <div class="add-on-item" v-if="addOn.photo">
                  <p>Photo: {{ addOn.photo.name }}</p>
                </div>
              </div>

              <div class="add-on-display-section">
                <div class="add-on-item" v-if="addOn.priceOption === 'Flat'">
                  <p>
                    <b>Flat Rate:</b>
                    {{ formatPrice(addOn.pricing.unitRate) }}
                  </p>
                </div>
                <div class="add-on-item" v-if="addOn.priceOption === 'Unit'">
                  <p>
                    <b>Unit Rate: </b>{{ formatPrice(addOn.pricing.unitRate) }}
                  </p>
                  <p><b>Minimum # Units: </b>{{ addOn.pricing.minUnits }}</p>
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
import SVGs from "../../../../../assets/SVGs/svgIndex.js";
import helpers from "../../../../../helpers.js";

export default {
  data() {
    return {
      SVGs,
      editIndex: undefined,
      addOn: {
        name: undefined,
        priceOption: undefined,
        pricing: {
          unitRate: undefined,
          minUnits: undefined,
        },
        photo: undefined,
        equipmentNeeded: undefined,
      },
    };
  },

  methods: {
    formatPrice: helpers.formatPrice,
    async addAddOn() {
      this.addOn.pricing.unitRate *= 100;
      if (this.photoFile) {
        await this.$store.dispatch("addPhoto", this.photoFile).then((res) => {
          this.input.photo = res;
        });
      }
      if (this.editIndex != undefined) {
        let payload = {
          index: this.editIndex,
          addOn: this.addOn,
        };
        this.$store.commit("adminConfigEditAddOn", payload);
      } else {
        this.$store.commit("adminConfigAddAddOn", this.addOn);
      }
      this.addOn = {
        name: undefined,
        priceOption: undefined,
        pricing: {
          unitRate: undefined,
          minUnits: undefined,
        },
        photo: undefined,
        equipmentNeeded: undefined,
      };
    },
    deleteAddOn(index) {
      this.$store.commit("adminConfigDeleteAddOn", index);
    },
    chooseFile() {
      document.getElementById("add-on-hidden-file-button").click();
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.photoFile = files[0];
    },
    editAddOn(addOn, index) {
      this.addOn = { ...this.addOn, ...addOn };
      this.editIndex = index;
      this.addOn.pricing = {
        minUnits: this.addOn.pricing.minUnits,
        unitRate: this.addOn.pricing.unitRate / 100,
      };
    },
  },
  computed: {
    hasAddOns() {
      if ("product" in this.$store.state.businessSettings) {
        if ("addOns" in this.$store.state.businessSettings.product) {
          if (this.$store.state.businessSettings.product.addOns.length > 0) {
            return true;
          }
        }
      }
      return false;
    },
    addOns() {
      return this.$store.state.businessSettings.product.addOns;
    },
  },
};
</script>

<style scoped>
.add-on-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-height: 100%;
  overflow-y: scroll;
  margin-top: 10px;
}
.add-on-section {
  width: 50%;
}

.add-on-item {
  display: flex;
  flex-direction: column;
  justify-content: left;
  margin-left: 10px;
}

.add-on-item > p,
.add-on-section > h5 {
  text-align: left;
}

.add-on-item > select,
.add-on-item > label,
.add-on-item > input,
.form-button {
  width: 50%;
  align-self: left;
  justify-self: left;
}

.button-standard-with-icon {
  margin-top: 10px;
}

.x-icon {
  height: 10px;
  width: 10px;
  margin: 0px 5px;
}
</style>