<template>
  <div class="form-body">
    <input-with-title
      title="Pronoun / Prefix"
      type="select"
      :options="pronouns"
      :inputValue="employee.pronoun"
      @input="fieldInput(employee, 'pronoun', $event)"
    />
    <input-with-title
      type="text"
      title="First Name:"
      placeholder="First Name"
      :error="errors.given_name"
      :inputValue="employee.given_name"
      @input="fieldInput(employee, 'given_name', $event)"
    />
    <input-with-title
      type="text"
      title="Last Name:"
      placeholder="Last Name"
      :error="errors.family_name"
      :inputValue="employee.family_name"
      @input="fieldInput(employee, 'family_name', $event)"
    />
    <input-with-title
      type="tel"
      title="Phone Number:"
      placeholder="(123)456-7890"
      :error="errors.phoneNumber"
      :inputValue="employee.phoneNumber"
      @input="fieldInput(employee, 'phoneNumber', $event)"
    />
    <input-with-title
      type="email"
      title="Email Address:"
      placeholder="Email Address"
      :error="errors.username"
      :inputValue="employee.username"
      @input="fieldInput(employee, 'username', $event)"
    />
    <div class="row-flex">
      <input
        type="checkbox"
        value="employee.sendInvitation"
        v-model="employee.sendInvitation"
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
      employee: {
        sendInvitation: true,
        role: "employee",
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
        this.validatePhoneNumber(this.employee.phoneNumber);
      }
      if (!this.errors.username) {
        this.validateEmailAddress(this.employee.username);
      }
      if (Object.values(this.errors).every((item) => item === false)) {
        this.$store.dispatch("addContact", this.employee);
        this.employee = {
          sendInvitation: true,
          role: "employee",
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
      let employee = this.employee;
      this.errors = {
        given_name: false,
        family_name: false,
        phoneNumber: false,
        username: false,
      };
      if (!employee.given_name) {
        this.errors.given_name = true;
      }
      if (!employee.family_name) {
        this.errors.family_name = true;
      }
      if (!employee.username) {
        this.errors.username = true;
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
      this.errors.username = !re.test(add);
    },
  },
  components: { InputWithTitle },
};
</script>

<style scoped>
.form-body {
  width: 100%;
  /* height: calc(100% - 50px); */
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
  margin-bottom: 10px;
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