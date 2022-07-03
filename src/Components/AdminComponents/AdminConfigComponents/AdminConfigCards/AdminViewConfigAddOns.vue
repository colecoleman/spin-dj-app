<template>
  <layout
    :addButtonText="addButtonText"
    :figureDetails="buildDetails"
    :processing="processing"
    productNameProperty="name"
    productPhotoProperty="photo"
    :products="addOns"
    :saveButtonEnabled="addOnReadyToBeSubmitted"
    @clear-form="clearForm"
    @close="close"
    @delete-button-clicked="deleteAddOn"
    @edit-button-clicked="editAddOn"
    @save-button-clicked="addAddOn"
  >
    <template v-slot:form>
      <div class="add-on-section">
        <photo-and-title
          placeholder="Add-On Name"
          :image="addOn.photo"
          :title="addOn.name"
          @input="titleInput"
          @photo-chosen="photoChosen"
        />
        <div class="add-on-form-section">
          <p>Add-On Details:</p>
          <input-with-title
            title="Price Option:"
            type="select"
            :options="['Unit', 'Flat']"
            :inputValue="addOn.priceOption"
            @input="fieldInput(addOn, 'priceOption', $event)"
          />
          <div v-if="addOn.priceOption === 'Unit'">
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
          </div>
          <div v-if="addOn.priceOption == 'Flat'">
            <input-with-title
              title="Flat Rate:"
              type="number"
              :inputValue="addOn.pricing.unitRate"
              @input="fieldInput(addOn.pricing, 'unitRate', $event)"
            />
          </div>
        </div>
      </div>
    </template>
  </layout>
</template>

<script>
import Layout from "../AdminConfigUIComponents/AdminConfigLayoutTileAndForm.vue";
import InputWithTitle from "../../../SharedComponentsUI/ElementLibrary/InputWithTitle.vue";
import PhotoAndTitle from "../AdminConfigUIComponents/AdminConfigProductPhotoAndTitle.vue";
import { formatPrice } from "../../../../helpers";

export default {
  data() {
    return {
      processing: false,
      addButtonText: "Add New Add-On",
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
    titleInput(val) {
      this.addOn.name = val;
    },
    close() {
      this.$emit("close");
    },
    clearForm() {
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
      this.editIndex = undefined;
    },
    photoChosen(photo) {
      this.photoFile = photo;
      let reader = new FileReader();
      reader.onload = (event) => {
        this.addOn.photo = event.target.result;
      };
      reader.readAsDataURL(photo);
    },
    buildDetails(item) {
      if (item.priceOption === "Flat") {
        return [`Flat: ${formatPrice(item.pricing.unitRate)}`];
      }
      if (item.priceOption === "Unit") {
        return [
          `${formatPrice(item.pricing.unitRate)} / ea`,
          `${item.pricing.minUnits} min`,
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
    async addAddOn() {
      this.addOn.pricing.unitRate *= 100;
      if (this.photoFile) {
        await this.$store.dispatch("addPhoto", this.photoFile).then((res) => {
          this.addOn.photo = res;
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
      await this.$store.dispatch("updateBusinessSettings");
    },
    async deleteAddOn(index) {
      await this.$store.commit("adminConfigDeleteAddOn", index);
      await this.$store.dispatch("updateBusinessSettings");
    },

    editAddOn(addOn, index) {
      let addOnTemplate = {
        name: undefined,
        priceOption: undefined,
        pricing: {
          unitRate: undefined,
          minUnits: undefined,
        },
        photo: undefined,
        equipmentNeeded: undefined,
      };
      this.photoFile = undefined;
      this.addOn = { ...addOnTemplate, ...addOn };
      this.editIndex = index;
      this.addOn.pricing = {
        minUnits: this.addOn.pricing.minUnits,
        unitRate: this.addOn.pricing.unitRate / 100,
      };
    },
  },
  computed: {
    addOnReadyToBeSubmitted() {
      if (this.addOn.name) {
        if (this.addOn.priceOption === "Unit") {
          return this.addOn.pricing.unitRate && this.addOn.pricing.minUnits;
        } else if (this.addOn.priceOption === "Flat") {
          return this.addOn.pricing.unitRate;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    addOns() {
      return this.$store.getters.addOns;
    },
  },
  emits: ["close"],
  components: {
    InputWithTitle,
    Layout,
    PhotoAndTitle,
  },
};
</script>

<style scoped>
@media screen {
  .add-on-section {
    width: 100%;
    height: auto;
    overflow: scroll;
  }

  .add-on-form-section {
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
