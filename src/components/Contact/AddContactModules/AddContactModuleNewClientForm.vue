<template>
  <div class="form-body">
    <h5>Pronoun/ Prefix:</h5>
    <select name="Preferred Pronoun" v-model.trim.lazy="client.pronoun">
      <option value="Mr.">Mr.</option>
      <option value="Mrs.">Mrs.</option>
      <option value="Ms.">Ms.</option>
      <option value="Other">Other (please prefix first name)</option>
    </select>
    <h5>First Name:</h5>
    <input
      type="text"
      placeholder="First Name"
      v-model.trim.lazy="client.firstName"
    />
    <h5>Last Name:</h5>
    <input
      type="text"
      placeholder="Last Name"
      v-model.trim.lazy="client.lastName"
    />
    <h5>Phone Number:</h5>
    <input
      type="tel"
      placeholder="(123)456-7890"
      v-model.trim.lazy="client.phoneNumber"
    />
    <h5>Email Address:</h5>
    <input
      type="email"
      placeholder="Email Address"
      v-model.trim.lazy="client.emailAddress"
    />
    <h5>Associated Event:</h5>
    <input
      type="text"
      placeholder="Search For Event"
      v-model.trim.lazy="associatedEventSearch"
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
          d="M13.928,7.128a6.8,6.8,0,1,1-6.8-6.8A6.8,6.8,0,0,1,13.928,7.128Zm-7.587,3.6,5.045-5.045a.439.439,0,0,0,0-.62l-.62-.62a.439.439,0,0,0-.62,0L6.031,8.557,4.11,6.636a.439.439,0,0,0-.62,0l-.62.62a.439.439,0,0,0,0,.62l2.852,2.852A.439.439,0,0,0,6.342,10.729Z"
          transform="translate(-0.328 -0.328)"
          fill="#fff"
        />
      </svg>
    </template>
  </button-long-with-icon>
</template>

<script>
import ButtonLongWithIcon from "../../UI/ButtonLongWithIcon.vue";
export default {
  data() {
    return {
      client: {
        pronoun: undefined,
        firstName: undefined,
        lastName: undefined,
        phoneNumber: undefined,
        emailAddress: undefined,
      },
      associatedEvent: undefined,
    };
  },
  methods: {
    submitContact() {
      console.log(this.client);
      this.$store.dispatch("addClient", this.client);
      this.client = {
        pronoun: undefined,
        firstName: undefined,
        lastName: undefined,
        phoneNumber: undefined,
        emailAddress: undefined,
      };
      this.associatedEvent = undefined;
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

h5 {
  text-align: left;
  text-transform: uppercase;
  margin-bottom: 10px;
}
</style>