<template>
  <div class="form-body">
    <h5 :class="errors.name ? 'danger' : ''">Venue Name:</h5>
    <input
      type="text"
      placeholder="The Venue"
      v-model.trim.lazy="location.name"
    />
    <div class="indention">
      <h5>Street Address 1:</h5>
      <input
        type="text"
        placeholder="12345 Address St"
        v-model.trim.lazy="location.address.streetAddress1"
      />
      <h5>Street Address 2: (optional)</h5>
      <input
        type="text"
        placeholder="Apt 1234"
        v-model.trim.lazy="location.address.streetAddress2"
      />
      <h5>City, State/Province, Zip Code:</h5>
      <input
        type="text"
        placeholder="Anywhere, AZ, 12345"
        v-model.trim.lazy="location.address.cityStateZip"
      />
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
      location: {
        name: undefined,
        address: {
          streetAddress1: undefined,
          streetAddress2: undefined,
          cityStateZip: undefined,
        },
      },
      errors: {
        name: false,
        contact: {
          given_name: false,
          family_name: false,
          phoneNumber: false,
          emailAddress: false,
        },
      },
    };
  },
  methods: {
    submitContact() {
      this.checkEmptyFields();
      // if (!this.errors.contact.phoneNumber) {
      //   this.validatePhoneNumber(this.location.contact.phoneNumber);
      // }
      // if (!this.errors.contact.emailAddress) {
      //   this.validateEmailAddress(this.location.contact.emailAddress);
      // }
      // if (
      //   Object.values(this.errors.contact).every((item) => item === false) &&
      //   this.location.name === false
      // ) {
      if (!this.errors.name) {
        this.$store.dispatch("addLocation", this.location);
        this.location = {
          name: undefined,
          address: {
            streetAddress1: undefined,
            streetAddress2: undefined,
            cityStateZip: undefined,
          },
        };
      }
      // } else {
      //   return;
      // }
    },
    checkEmptyFields() {
      let location = this.location;
      this.errors = {
        name: false,
        contact: {
          given_name: false,
          family_name: false,
          emailAddress: false,
          phoneNumber: false,
        },
      };
      if (!location.name) {
        this.errors.name = true;
      }
    },
    validatePhoneNumber(num) {
      return num.replace(/[^\d/+]/g, "");
    },
    validateEmailAddress(add) {
      var re = /\S+@\S+\.\S+/;
      this.errors.emailAddress = !re.test(add);
    },
  },
};
</script>

<style scoped>
.form-body {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

input,
select {
  border-radius: 5px;
  padding: 5px 8px;
  margin: 5px 0px;
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

h4 {
  margin: 10px;
}

img {
  height: 15px;
  width: 15px;
}
</style>