<template>
  <div class="edit-card-wrapper">
    <base-card
      :actionIcon="XIconSVG"
      @action-one-clicked="closeEditCard()"
      title="Edit Contact"
    >
      <template v-slot:action1></template>
      <template v-slot:content>
        <div class="edit-card-inner-wrapper">
          <select v-model="fieldToEdit">
            <!-- <option value="undefined" disabled="true">
              Select Field To Edit
            </option> -->
            <option value='{"value": "name", "inputType": "text"}'>Name</option>
            <option value='{"value": "streetAddress1", "inputType": "text"}'>
              Street Address 1
            </option>
            <option value='{"value": "streetAddress2", "inputType": "text"}'>
              Street Address 2
            </option>
            <option value='{"value": "cityStateZip", "inputType": "text"}'>
              City, State, Zip Code
            </option>
          </select>
          <div v-if="fieldToEdit != 'undefined'">
            <!-- <h5>Current Value:</h5>
            <p>{{ location[JSON.parse(fieldToEdit).value] }}</p> -->
            <input
              :type="JSON.parse(fieldToEdit).inputType"
              v-model="fields[JSON.parse(fieldToEdit).value]"
              :placeholder="location[JSON.parse(fieldToEdit).value]"
            />
            <div class="button-wrapper">
              <button-standard-with-icon
                text="Save"
                @click="saveField()"
              ></button-standard-with-icon>
            </div>
          </div>
        </div>
      </template>
    </base-card>
  </div>
</template>

<script>
import XIconSVG from "../../../../../assets/SVGs/x-icon.svg";

export default {
  data() {
    return {
      fieldToEdit: "undefined",
      fields: {
        name: undefined,
        streetAddress1: undefined,
        streetAddress2: undefined,
        cityStateZip: undefined,
      },
      XIconSVG,
    };
  },
  methods: {
    closeEditCard() {
      this.$emit("closeEditCard");
    },
    saveField() {
      if (
        JSON.parse(this.fieldToEdit).value === "streetAddress1" ||
        JSON.parse(this.fieldToEdit).value === "streetAddress2" ||
        JSON.parse(this.fieldToEdit).value === "cityStateZip"
      ) {
        let address = this.location.address;
        address[JSON.parse(this.fieldToEdit).value] =
          this.fields[JSON.parse(this.fieldToEdit).value];
        let payload = {
          locationId: this.location.userId,
          variable: "address",
          value: address,
        };
        this.$store.dispatch("editLocation", payload);
        return;
      } else {
        let payload = {
          locationId: this.location.userId,
          variable: JSON.parse(this.fieldToEdit).value,
          value: this.fields[JSON.parse(this.fieldToEdit).value],
        };
        this.$store.dispatch("editLocation", payload);
      }
    },
  },
  props: ["location"],
};
</script>

<style scoped>
.edit-card-wrapper {
  position: absolute;
  right: -50px;
  top: -100%;
  z-index: 2;
  width: 300px;
}

.button-wrapper {
  padding: 10px;
}
input {
  margin: 10px;
}
</style>