<template>
  <div class="edit-card-wrapper">
    <base-card :actionIcon="XIconSVG" @action-one-clicked="closeEditCard()">
      <template v-slot:title>Edit Contact</template>
      <template v-slot:action1></template>
      <template v-slot:content>
        <div class="edit-card-inner-wrapper">
          <select v-model="fieldToEdit">
            <option value='{"value": "given_name", "inputType": "text"}'>
              First
            </option>
            <option value='{"value": "family_name", "inputType": "text"}'>
              Last Name
            </option>
            <option value='{"value": "profilePicture", "inputType": "file"}'>
              Profile Picture
            </option>
            <option value='{"value": "pronoun", "inputType": "text"}'>
              Pronoun
            </option>
            <option value='{"value": "phoneNumber", "inputType": "tel"}'>
              Phone Number
            </option>
            <option value='{"value": "email", "inputType": "email"}'>
              Email Address
            </option>
          </select>
          <div v-if="fieldToEdit != 'undefined'">
            <!-- <h5>Current Value:</h5>
            <p>{{ contact[JSON.parse(fieldToEdit).value] }}</p> -->
            <input
              :type="JSON.parse(fieldToEdit).inputType"
              v-model="fields[JSON.parse(fieldToEdit).value]"
              :placeholder="contact[JSON.parse(fieldToEdit).value]"
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
import XIconSVG from "../../assets/SVGs/x-icon.svg";

export default {
  data() {
    return {
      fieldToEdit: undefined,
      fields: {
        given_name: undefined,
        family_name: undefined,
        pronoun: undefined,
        phoneNumber: undefined,
        email: undefined,
        profilePicture: undefined,
      },
      XIconSVG,
    };
  },
  methods: {
    closeEditCard() {
      this.$emit("closeEditCard");
      console.log("closed");
    },
    saveField() {
      console.log(this.fields[JSON.parse(this.fieldToEdit).value]);
      let payload = {
        clientId: this.contact.userId,
        variable: JSON.parse(this.fieldToEdit).value,
        value: this.fields[JSON.parse(this.fieldToEdit).value],
      };
      console.log(payload);
      // this.$store.dispatch("editContact", payload).then((res) => {
      //   console.log(res);
      // });
    },
  },
  props: ["contact"],
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