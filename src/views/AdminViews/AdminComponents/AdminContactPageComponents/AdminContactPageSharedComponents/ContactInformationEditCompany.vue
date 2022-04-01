<template>
  <div class="edit-card-wrapper">
    <base-card
      actionIcon="x-icon"
      @action-one-clicked="closeEditCard()"
      title="Edit Contact"
    >
      <template v-slot:content>
        <div class="edit-card-inner-wrapper">
          <select v-model="fieldToEdit">
            <!-- <option value="undefined" disabled="true">
              Select Field To Edit
            </option> -->
            <option value='{"value": "given_name", "inputType": "text"}'>
              First Name
            </option>
            <option value='{"value": "family_name", "inputType": "text"}'>
              Last Name
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
            <option value='{"value": "businessName", "inputType": "email"}'>
              Business Name
            </option>
            <option
              value='{"value": "businessCategory", "inputType": "select"}'
            >
              Vendor Category
            </option>
          </select>
          <div v-if="fieldToEdit != 'undefined'">
            <!-- <h5>Current Value:</h5>
            <p>{{ contact[JSON.parse(fieldToEdit).value] }}</p> -->
            <input
              v-if="JSON.parse(fieldToEdit).value != 'businessCategory'"
              :type="JSON.parse(fieldToEdit).inputType"
              v-model="fields[JSON.parse(fieldToEdit).value]"
              :placeholder="contact[JSON.parse(fieldToEdit).value]"
            />
            <select
              v-model="fields.businessCategory"
              v-if="JSON.parse(fieldToEdit).value == 'businessCategory'"
            >
              <option
                v-for="(option, index) in businessCategory"
                :key="index"
                :value="option"
              >
                {{ option }}
              </option>
            </select>
            <div class="button-wrapper">
              <button-standard-with-icon text="Save" @click="saveField()" />
            </div>
          </div>
        </div>
      </template>
    </base-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fieldToEdit: "undefined",
      fields: {
        given_name: undefined,
        family_name: undefined,
        pronoun: undefined,
        phoneNumber: undefined,
        email: undefined,
        businessName: undefined,
        businessCategory: undefined,
      },
      businessCategory: [
        "DJ",
        "Photographer",
        "Videographer",
        "HMUA",
        "Caterer",
        "Venue",
        "Planner",
        "Coordinator",
        "Florist",
        "Musician",
      ],
    };
  },
  methods: {
    closeEditCard() {
      this.$emit("closeEditCard");
    },
    saveField() {
      let payload = {
        contactKey: {
          tenantId: this.contact.tenantId,
          userId: this.contact.userId,
        },
        variable: JSON.parse(this.fieldToEdit).value,
        value: this.fields[JSON.parse(this.fieldToEdit).value],
      };
      this.$store.dispatch("editContact", payload).then(() => {
        this.$emit("closeEditCard");
      });
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
input,
select {
  margin: 10px;
}
</style>