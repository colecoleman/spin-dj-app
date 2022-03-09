<template>
  <div class="form-body">
    <input-with-title
      type="text"
      title="Company Name:"
      placeholder="Company Name"
      :error="errors.companyName"
      :inputValue="vendor.companyName"
      @input="fieldInput(vendor, 'companyName', $event)"
    />
    <input-with-title
      title="Pronoun/Prefix"
      type="select"
      :options="pronouns"
      :inputValue="vendor.pronoun"
      @input="fieldInput(vendor, 'pronoun', $event)"
    />
    <input-with-title
      type="text"
      title="First Name:"
      placeholder="First Name"
      :error="errors.given_name"
      :inputValue="vendor.given_name"
      @input="fieldInput(vendor, 'given_name', $event)"
    />
    <input-with-title
      type="text"
      title="Last Name:"
      placeholder="Last Name"
      :error="errors.family_name"
      :inputValue="vendor.family_name"
      @input="fieldInput(vendor, 'family_name', $event)"
    />
    <input-with-title
      type="tel"
      title="Phone Number:"
      placeholder="Phone Number"
      :error="errors.phoneNumber"
      :inputValue="vendor.phoneNumber"
      @input="fieldInput(vendor, 'phoneNumber', $event)"
    />
    <input-with-title
      type="email"
      title="Email Address:"
      placeholder="Email Address"
      :error="errors.username"
      :inputValue="vendor.username"
      @input="fieldInput(vendor, 'username', $event)"
    />

    <input-with-title
      title="Vendor Category"
      type="select"
      :error="errors.vendorCategory"
      :options="categories"
      :inputValue="vendor.vendorCategory"
      @input="fieldInput(vendor, 'vendorCategory', $event)"
    />
    <div class="row-flex">
      <input
        type="checkbox"
        value="vendor.sendInvitation"
        v-model="vendor.sendInvitation"
      />
      <h5>Send Invitation?</h5>
    </div>
  </div>
  <button-standard-with-icon
    text="Submit"
    @click="submitContact"
    svg="circle-checkmark"
  />
</template>

<script>
import InputWithTitle from "../../../../../SharedComponents/SharedComponentsUI/ElementLibrary/InputWithTitle.vue";
export default {
  data() {
    return {
      pronouns: ["Mr.", "Mrs.", "Ms.", "Other (please prefix first name)"],
      categories: [
        "Photographer",
        "Videographer",
        "Planner",
        "HMUA",
        "Officiant",
        "Caterer",
        "Baker",
        "Decor/Florist",
        "Photo Booth",
        "Bar Services",
        "DJ",
      ],
      vendor: {
        sendInvitation: false,
        role: "vendor",
        companyName: null,
        pronoun: null,
        given_name: null,
        family_name: null,
        phoneNumber: null,
        username: null,
        vendorCategory: null,
      },
      errors: {
        companyName: null,
        pronoun: null,
        given_name: null,
        family_name: null,
        phoneNumber: null,
        username: null,
        vendorCategory: null,
      },
      associatedEvent: null,
    };
  },
  methods: {
    fieldInput(object, property, value) {
      if (object) {
        object[property] = value;
      } else {
        this[property] = value;
      }
    },
    submitContact() {
      this.checkEmptyFields();
      if (!this.errors.phoneNumber) {
        this.validatePhoneNumber(this.vendor.phoneNumber);
      }
      if (!this.errors.username) {
        this.validateusername(this.vendor.username);
      }
      if (Object.values(this.errors).every((item) => item === false)) {
        this.$store.dispatch("addContact", this.vendor);
        this.vendor = {
          sendInvitation: false,
          role: "vendor",
          companyName: null,
          pronoun: null,
          given_name: null,
          family_name: null,
          phoneNumber: null,
          username: null,
          vendorCategory: null,
        };
        this.associatedEvent = null;
      } else {
        return;
      }
    },
    checkEmptyFields() {
      let vendor = this.vendor;
      this.errors = {
        given_name: false,
        family_name: false,
        phoneNumber: false,
        username: false,
        vendorCategory: false,
      };

      if (!vendor.given_name) {
        this.errors.given_name = true;
      }
      if (!vendor.family_name) {
        this.errors.family_name = true;
      }
      if (!vendor.username) {
        this.errors.username = true;
      }
      if (!vendor.phoneNumber) {
        this.errors.phoneNumber = true;
      }
      if (!vendor.vendorCategory) {
        this.errors.vendorCategory = true;
      }
    },
    validatePhoneNumber(num) {
      return num.replace(/[^\d/+]/g, "");
    },
    validateusername(add) {
      var re = /\S+@\S+\.\S+/;
      this.errors.username = !re.test(add);
    },
  },
  components: { InputWithTitle },
};
</script>

<style scoped>
.form-body {
  width: 100%;
  height: calc(100% - 56px);
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

input,
select {
  border-radius: 5px;
  padding: 5px 8px;
  margin: 5px;
  width: calc(100% - 24px);
}

.danger {
  color: red;
}

h5 {
  text-align: left;
  text-transform: uppercase;
}


.row-flex {
  display: flex;
  flex-direction: row;
  margin-top: 20px;
}

.row-flex > input {
  width: 20px;
}
</style>