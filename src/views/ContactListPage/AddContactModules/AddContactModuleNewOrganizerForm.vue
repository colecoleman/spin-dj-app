<template>
  <div class="form-body">
    <h5>Pronoun/ Prefix:</h5>
    <select name="Preferred Pronoun" v-model.trim.lazy="organizer.pronoun">
      <option value="Mr.">Mr.</option>
      <option value="Mrs.">Mrs.</option>
      <option value="Ms.">Ms.</option>
      <option value="Other">Other (please prefix first name)</option>
    </select>
    <h5 :class="errors.firstName ? 'danger' : ''">First Name:</h5>
    <input
      type="text"
      placeholder="First Name"
      v-model.trim.lazy="organizer.firstName"
    />
    <h5 :class="errors.lastName ? 'danger' : ''">Last Name:</h5>
    <input
      type="text"
      placeholder="Last Name"
      v-model.trim.lazy="organizer.lastName"
    />
    <h5 :class="errors.phoneNumber ? 'danger' : ''">Phone Number:</h5>
    <input
      type="tel"
      placeholder="(123)456-7890"
      v-model.trim.lazy="organizer.phoneNumber"
    />
    <h5 :class="errors.emailAddress ? 'danger' : ''">Email Address:</h5>
    <input
      type="email"
      placeholder="Email Address"
      v-model.trim.lazy="organizer.emailAddress"
    />
  </div>
  <button-long-with-icon text="Submit and Invite" @click="submitContact">
    <template v-slot:icon>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="13.6"
        height="13.6"
        viewBox="0 0 13.6 13.6"
      >
        <path
          id="Icon_awesome-check-circle"
          data-name="Icon awesome-check-circle"
          d="M13.928,7.128a6.8,6.8,0,1,1-6.8-6.8A6.8,6.8,0,0,1,13.928,7.128Zm-7.587,3.6,5.045-5.045a.439.439,0,0,0,0-.62l-.62-.62a.439.439,0,0,0-.62,0L6.031,8.557,4.11,6.636a.439.439,0,0,0-.62,0l-.62.62a.439.439,0,0,0,0,.62l2.852,2.852A.439.439,0,0,0,6.342,10.729Z"
          transform="translate(-0.328 -0.328)"
          fill="#fff"
        />
      </svg>
    </template>
  </button-long-with-icon>
</template>

<script>
import ButtonLongWithIcon from "../../../components/UI/ButtonLongWithIcon.vue";

export default {
  data() {
    return {
      organizer: {
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
      associatedEvent: undefined,
    };
  },
  methods: {
    submitContact() {
      this.checkEmptyFields();
      if (!this.errors.phoneNumber) {
        this.validatePhoneNumber(this.organizer.phoneNumber);
      }
      if (!this.errors.emailAddress) {
        this.validateEmailAddress(this.organizer.emailAddress);
      }
      if (Object.values(this.errors).every((item) => item === false)) {
        this.$store.dispatch("addOrganizer", this.organizer);
        console.log(this.organizer);
        this.organizer = {
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
      let organizer = this.organizer;
      this.errors = {
        firstName: false,
        lastName: false,
        phoneNumber: false,
        emailAddress: false,
      };
      if (!organizer.firstName) {
        this.errors.firstName = true;
      }
      if (!organizer.lastName) {
        this.errors.lastName = true;
      }
      if (!organizer.emailAddress) {
        this.errors.emailAddress = true;
      }
      if (!organizer.phoneNumber) {
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
  border: 1px solid white;
  border-radius: 5px;
  padding: 5px 8px;
  margin: 5px;
  font-family: Montserrat, sans-serif;
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
</style>