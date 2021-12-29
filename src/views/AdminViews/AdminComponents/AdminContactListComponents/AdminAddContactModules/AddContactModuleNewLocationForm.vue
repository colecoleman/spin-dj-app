<template>
  <div class="form-body">
    <h4>Venue:</h4>
    <h5 :class="errors.name ? 'danger' : ''">Venue Name:</h5>
    <input
      type="text"
      placeholder="The Venue"
      v-model.trim.lazy="location.name"
    />
    <div class="indention">
      <h5>Address 1:</h5>
      <input
        type="text"
        placeholder="12345 Address St"
        v-model.trim.lazy="location.address.streetAddress"
      />
      <h5>City:</h5>
      <input
        type="text"
        placeholder="City"
        v-model.trim.lazy="location.address.city"
      />
      <h5>State/Province:</h5>
      <input
        type="text"
        placeholder="State/Province"
        v-model.trim.lazy="location.address.state"
      />
      <h5>Zip Code:</h5>
      <input
        type="text"
        placeholder="12345"
        v-model.trim.lazy="location.address.zipCode"
      />
    </div>
    <!-- <h4>Contact:</h4>
    <h5>Pronoun/ Prefix:</h5>
    <select
      name="Preferred Pronoun"
      v-model.trim.lazy="location.contact.pronoun"
    >
      <option value="Mr.">Mr.</option>
      <option value="Mrs.">Mrs.</option>
      <option value="Ms.">Ms.</option>
      <option value="Other">Other (please prefix first name)</option>
    </select>
    <h5 :class="errors.contact.given_name ? 'danger' : ''">First Name:</h5>
    <input
      type="text"
      placeholder="First Name"
      v-model.trim.lazy="location.contact.given_name"
    />
    <h5 :class="errors.contact.family_name ? 'danger' : ''">Last Name:</h5>
    <input
      type="text"
      placeholder="Last Name"
      v-model.trim.lazy="location.contact.family_name"
    />
    <h5 :class="errors.contact.phoneNumber ? 'danger' : ''">Phone Number:</h5>
    <input
      type="tel"
      placeholder="(123)456-7890"
      v-model.trim.lazy="location.contact.phoneNumber"
    />
    <h5 :class="errors.contact.emailAddress ? 'danger' : ''">Email Address:</h5>
    <input
      type="email"
      placeholder="Email Address"
      v-model.trim.lazy="location.contact.emailAddress"
    /> -->
  </div>
  <button-long-with-icon text="Submit and Invite" @click="submitContact">
    <template v-slot:icon>
      <img :src="circleCheckmark" alt="" />
    </template>
  </button-long-with-icon>
</template>

<script>
import ButtonLongWithIcon from "../../../../../SharedComponents/SharedComponentsUI/ButtonLongWithIcon.vue";
import circleCheckmark from "../../../../../assets/SVGs/circle-checkmark.svg";
export default {
  data() {
    return {
      circleCheckmark,
      location: {
        name: undefined,
        address: {
          streetAddress: undefined,
          city: undefined,
          state: undefined,
          zipCode: undefined,
        },
        // contact: {
        //   sendInvitation: false,
        //   role: "vendor",
        //   companyName: null,
        //   pronoun: null,
        //   given_name: null,
        //   family_name: null,
        //   phoneNumber: null,
        //   username: null,
        // },
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
      if (!this.errors.contact.phoneNumber) {
        console.log("lkkk");
        this.validatePhoneNumber(this.location.contact.phoneNumber);
      }
      if (!this.errors.contact.emailAddress) {
        console.log("ljjj");

        this.validateEmailAddress(this.location.contact.emailAddress);
      }
      if (
        Object.values(this.errors.contact).every((item) => item === false) &&
        this.location.name === false
      ) {
        this.$store.dispatch("addLocation", this.location);
        console.log(this.location);
        this.location = {
          name: undefined,
          address: {
            streetAddress: undefined,
            city: undefined,
            state: undefined,
            zipCode: undefined,
          },
          contact: {
            pronoun: undefined,
            given_name: undefined,
            family_name: undefined,
            phoneNumber: undefined,
            emailAddress: undefined,
          },
        };
      } else {
        return;
      }
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
      if (!location.contact.given_name) {
        this.errors.contact.given_name = true;
      }
      if (!location.contact.family_name) {
        this.errors.contact.family_name = true;
      }
      if (!location.contact.emailAddress) {
        this.errors.contact.emailAddress = true;
      }
      if (!location.contact.phoneNumber) {
        this.errors.contact.phoneNumber = true;
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
  components: { ButtonLongWithIcon },
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