<template>
  <div class="form-body">
    <h5>Pronoun/ Prefix:</h5>
    <select name="Preferred Pronoun" v-model.trim.lazy="employee.pronoun">
      <option value="Mr.">Mr.</option>
      <option value="Mrs.">Mrs.</option>
      <option value="Ms.">Ms.</option>
      <option value="Other">Other (please prefix first name)</option>
    </select>
    <h5 :class="errors.firstName ? 'danger' : ''">First Name:</h5>
    <input
      type="text"
      placeholder="First Name"
      v-model.trim.lazy="employee.firstName"
    />
    <h5 :class="errors.lastName ? 'danger' : ''">Last Name:</h5>
    <input
      type="text"
      placeholder="Last Name"
      v-model.trim.lazy="employee.lastName"
    />
    <h5 :class="errors.phoneNumber ? 'danger' : ''">Phone Number:</h5>
    <input
      type="tel"
      placeholder="(123)456-7890"
      v-model.trim.lazy="employee.phoneNumber"
    />
    <h5 :class="errors.emailAddress ? 'danger' : ''">Email Address:</h5>
    <input
      type="email"
      placeholder="Email Address"
      v-model.trim.lazy="employee.emailAddress"
    />
  </div>
  <button-long-with-icon text="Submit and Invite" @click="submitContact">
    <template v-slot:icon>
      <img :src="circleCheckmark" alt="" />
    </template>
  </button-long-with-icon>
</template>

<script>
import ButtonLongWithIcon from "../../../../SharedComponents/SharedComponentsUI/ButtonLongWithIcon.vue";
import circleCheckmark from "../../../../assets/SVGs/circle-checkmark.svg";
export default {
  data() {
    return {
      circleCheckmark,
      employee: {
        pronoun: undefined,
        firstName: undefined,
        lastName: undefined,
        phoneNumber: undefined,
        emailAddress: undefined,
      },
      errors: {
        firstName: false,
        lastName: false,
        phoneNumber: false,
        emailAddress: false,
      },
    };
  },
  methods: {
    submitContact() {
      this.checkEmptyFields();
      if (!this.errors.phoneNumber) {
        this.validatePhoneNumber(this.employee.phoneNumber);
      }
      if (!this.errors.emailAddress) {
        this.validateEmailAddress(this.employee.emailAddress);
      }
      if (Object.values(this.errors).every((item) => item === false)) {
        this.$store.dispatch("addEmployee", this.employee);
        console.log(this.employee);
        this.employee = {
          pronoun: undefined,
          firstName: undefined,
          lastName: undefined,
          phoneNumber: undefined,
          emailAddress: undefined,
        };
        this.associatedEvent = undefined;
      } else {
        return;
      }
    },
    checkEmptyFields() {
      let employee = this.employee;
      this.errors = {
        firstName: false,
        lastName: false,
        phoneNumber: false,
        emailAddress: false,
      };
      if (!employee.firstName) {
        this.errors.firstName = true;
      }
      if (!employee.lastName) {
        this.errors.lastName = true;
      }
      if (!employee.emailAddress) {
        this.errors.emailAddress = true;
      }
      if (!employee.phoneNumber) {
        this.errors.phoneNumber = true;
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
</style>