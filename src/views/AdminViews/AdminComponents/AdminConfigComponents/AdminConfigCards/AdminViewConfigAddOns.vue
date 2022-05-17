<template>
  <base-card title="Add-Ons">
    <template v-slot:content>
      <div class="add-on-wrapper">
        <div class="add-on-section">
          <h5 class="bold">Add New Add-On:</h5>
          <div class="add-on-item">
            <!-- <p>Add-On Name:</p>
            <input type="text" v-model.trim="addOn.name" /> -->
            <input-with-title
              type="text"
              title="Add-On Name:"
              :inputValue="addOn.name"
              @input="fieldInput(addOn, 'name', $event)"
            />
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
            <input-with-title
              title="Price Option:"
              type="select"
              :options="['Unit', 'Flat']"
              :inputValue="addOn.priceOption"
              @input="fieldInput(addOn, 'priceOption', $event)"
            />
          </div>
          <div class="add-on-item" v-if="addOn.priceOption === 'Unit'">
            <input-with-title
              title="Minimum # Units:"
              type="number"
              :inputValue="addOn.pricing.minUnits"
              @input="fieldInput(addOn.pricing, 'minUnits', $event)"
            />
            <input-with-title
              title="Unit Rate:"
              type="number"
              :inputValue="addOn.pricing.unitRate"
              @input="fieldInput(addOn.pricing, 'unitRate', $event)"
            />
            <button-standard-with-icon
              text="Add Add-On"
              @click="addAddOn()"
              class="form-button"
            />
          </div>
          <div class="add-on-item" v-if="addOn.priceOption == 'Flat'">
            <input-with-title
              title="Flat Rate:"
              type="number"
              :inputValue="addOn.pricing.unitRate"
              @input="fieldInput(addOn.pricing, 'unitRate', $event)"
            />

            <button-standard-with-icon
              text="Add Add-On"
              @click="addAddOn()"
              class="form-button"
            />
          </div>
        </div>
        <div class="add-on-section">
          <h5 v-if="!hasAddOns">You don't have any add-ons yet. Add One!</h5>
          <div v-if="hasAddOns" class="conditional-add-on-wrapper">
            <div
              class="add-on-item"
              style="border-bottom: 1px solid gray; margin-bottom: 10px"
              v-for="(addOn, index) in addOns"
              :key="addOn.name"
            >
              <h4>
                {{ addOn.name }}

                <vue-svg svg="x-icon" @click="deleteAddOn(index)" class="svg" />
                <vue-svg
                  svg="edit-pen"
                  @click="editAddOn(addOn, index)"
                  class="svg"
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
import VueSvg from "../../../../../assets/VueSvg.vue";
import InputWithTitle from "../../../../../SharedComponents/SharedComponentsUI/ElementLibrary/InputWithTitle.vue";
import { formatPrice } from "../../../../../helpers.js";

export default {
  data() {
    return {
      editIndex: undefined,
      addOn: {
        id: "addOn" + Date.now(),
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
    formatPrice,
    fieldInput(object, property, value) {
      if (object) {
        object[property] = value;
      } else {
        this[property] = value;
      }
    },
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
      return this.addOns.length > 0;
    },
    addOns() {
      return this.$store.getters.addOns;
    },
  },
  components: {
    VueSvg,
    InputWithTitle,
  },
};
</script>

<style scoped>
@media screen {
  p {
    font-size: 9pt;
  }
  .svg {
    height: 10px;
    width: 10px;
    margin: 10px;
    cursor: pointer;
  }
  .conditional-add-on-wrapper {
    max-height: 300px;
    height: fit-content;
    overflow: scroll;
  }
  .add-on-wrapper {
    display: flex;
    flex-direction: column-reverse;
    flex-wrap: wrap;
    max-height: 100%;
    overflow-y: scroll;
    padding: 10px;
  }
  .add-on-section {
    width: 100%;
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
    width: 90%;
    align-self: left;
    justify-self: left;
  }

  .button-standard-with-icon {
    margin-top: 10px;
  }

  @media (min-width: 850px) {
    p {
      font-size: 9pt;
    }

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
  }
}
</style>
