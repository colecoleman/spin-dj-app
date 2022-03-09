<template>
  <div class="form-body">
    <input-with-title
      title="Business Name:"
      type="text"
      placeholder="Business Name"
      :inputValue="organizer.businessName"
      @input="fieldInput(organizer, 'businessName', $event)"
    />
    <input-with-title
      title="Pronoun / Prefix"
      type="select"
      :options="pronouns"
      :inputValue="organizer.pronoun"
      @input="fieldInput(organizer, 'pronoun', $event)"
    />

    <input-with-title
      title="First Name:"
      type="text"
      placeholder="First Name"
      :error="errors.given_name"
      :inputValue="organizer.given_name"
      @input="fieldInput(organizer, 'given_name', $event)"
    />
    <input-with-title
      title="Last Name:"
      type="text"
      placeholder="Last Name"
      :error="errors.family_name"
      :inputValue="organizer.family_name"
      @input="fieldInput(organizer, 'family_name', $event)"
    />
    <input-with-title
      title="Phone Number:"
      type="tel"
      :error="errors.phoneNumber"
      placeholder="Phone Number"
      :inputValue="organizer.phoneNumber"
      @input="fieldInput(organizer, 'phoneNumber', $event)"
    />
    <input-with-title
      title="Email Address:"
      type="email"
      placeholder="Email Address"
      :error="errors.username"
      :inputValue="organizer.username"
      @input="fieldInput(organizer, 'username', $event)"
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
        this.validatePhoneNumber(this.organizer.phoneNumber);
      }
      if (!this.errors.username) {
        this.validateusername(this.organizer.username);
      }
      if (Object.values(this.errors).every((item) => item === false)) {
        this.$store.dispatch("addContact", this.organizer);
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
  components: {
    InputWithTitle,
  },
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