<template>
  <div class="form-body">
    <h5>Business Name:</h5>
    <input
      type="text"
      placeholder="Business Name"
      v-model.trim.lazy="organizer.businessName"
    />
    <h5>Pronoun/ Prefix:</h5>
    <select name="Preferred Pronoun" v-model.trim.lazy="organizer.pronoun">
      <option value="Mr.">Mr.</option>
      <option value="Mrs.">Mrs.</option>
      <option value="Ms.">Ms.</option>
      <option value="Other">Other (please prefix first name)</option>
    </select>
    <h5 :class="errors.given_name ? 'danger' : ''">First Name:</h5>
    <input
      type="text"
      placeholder="First Name"
      v-model.trim.lazy="organizer.given_name"
    />
    <h5 :class="errors.family_name ? 'danger' : ''">Last Name:</h5>
    <input
      type="text"
      placeholder="Last Name"
      v-model.trim.lazy="organizer.family_name"
    />
    <h5 :class="errors.phoneNumber ? 'danger' : ''">Phone Number:</h5>
    <input
      type="tel"
      placeholder="(123)456-7890"
      v-model.trim.lazy="organizer.phoneNumber"
    />
    <h5 :class="errors.username ? 'danger' : ''">Email Address:</h5>
    <input
      type="email"
      placeholder="Email Address"
      v-model.trim.lazy="organizer.username"
    />
    <div class="row-flex">
      <input
        type="checkbox"
        value="organizer.sendInvitation"
        v-model="organizer.sendInvitation"
      />
      <h5>Send Invitation?</h5>
    </div>
  </div>
  <button-long-with-icon text="Submit" @click="submitContact">
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
      organizer: {
        sendInvitation: true,
        role: "organizer",
        businessName: null,
        pronoun: null,
        given_name: null,
        family_name: null,
        phoneNumber: null,
        username: null,
      },
      errors: {
        given_name: false,
        family_name: false,
        phoneNumber: false,
        username: false,
      },
      associatedEvent: null,
    };
  },
  methods: {
    submitContact() {
      this.checkEmptyFields();
      if (!this.errors.phoneNumber) {
        this.validatePhoneNumber(this.organizer.phoneNumber);
      }
      if (!this.errors.username) {
        this.validateusername(this.organizer.username);
      }
      if (Object.values(this.errors).every((item) => item === false)) {
        this.$store.dispatch("addContact", this.organizer);
        console.log(this.organizer);
        this.organizer = {
          sendInvitation: true,
          businessName: null,
          pronoun: null,
          given_name: null,
          family_name: null,
          phoneNumber: null,
          username: null,
        };
        this.associatedEvent = null;
      } else {
        return;
      }
    },
    checkEmptyFields() {
      let organizer = this.organizer;
      this.errors = {
        given_name: false,
        family_name: false,
        phoneNumber: false,
        username: false,
      };
      if (!organizer.given_name) {
        this.errors.given_name = true;
      }
      if (!organizer.family_name) {
        this.errors.family_name = true;
      }
      if (!organizer.username) {
        this.errors.username = true;
      }
      if (!organizer.phoneNumber) {
        this.errors.phoneNumber = true;
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