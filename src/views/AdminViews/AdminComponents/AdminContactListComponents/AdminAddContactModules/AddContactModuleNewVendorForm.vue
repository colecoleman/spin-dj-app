<template>
  <div class="form-body">
    <h5>Company Name:</h5>
    <input
      type="text"
      placeholder="Company Name"
      v-model.trim.lazy="vendor.companyName"
    />
    <h5>Pronoun/ Prefix:</h5>
    <select name="Preferred Pronoun" v-model.trim.lazy="vendor.pronoun">
      <option value="Mr.">Mr.</option>
      <option value="Mrs.">Mrs.</option>
      <option value="Ms.">Ms.</option>
      <option value="Other">Other (please prefix first name)</option>
    </select>
    <h5 :class="errors.given_name ? 'danger' : ''">First Name:</h5>
    <input
      type="text"
      placeholder="First Name"
      v-model.trim.lazy="vendor.given_name"
    />
    <h5 :class="errors.family_name ? 'danger' : ''">Last Name:</h5>
    <input
      type="text"
      placeholder="Last Name"
      v-model.trim.lazy="vendor.family_name"
    />
    <h5 :class="errors.phoneNumber ? 'danger' : ''">Phone Number:</h5>
    <input
      type="tel"
      placeholder="(123)456-7890"
      v-model.trim.lazy="vendor.phoneNumber"
    />
    <h5 :class="errors.username ? 'danger' : ''">Email Address:</h5>
    <input
      type="email"
      placeholder="Email Address"
      v-model.trim.lazy="vendor.username"
    />
    <h5 :class="errors.vendorCategory ? 'danger' : ''">Vendor Category:</h5>
    <select v-model="vendor.vendorCategory">
      <option value="Photographer">Photographer</option>
      <option value="Videographer">Videographer</option>
      <option value="Planner">Planner</option>
      <option value="HMUA">HMUA</option>
      <option value="Officiant">Officiant</option>
      <option value="Caterer">Caterer</option>
      <option value="Baker">Baker</option>
      <option value="Decor/Florist">Decor/Florist</option>
      <option value="Photo Booth">Photo Booth</option>
      <option value="Bar Services">Bar Services</option>
      <option value="DJ">DJ</option>
    </select>
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
    :icon="SVGs.CircleCheckmarkSVG"
  />
</template>

<script>
import SVGs from "../../../../../assets/SVGs/svgIndex.js";

export default {
  data() {
    return {
      SVGs,
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
};
</script>

<style scoped>
.form-body {
  width: 100%;
  height: 80%;
  overflow-y: scroll;
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
  margin-bottom: 10px;
}

img {
  height: 15px;
  width: 15px;
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