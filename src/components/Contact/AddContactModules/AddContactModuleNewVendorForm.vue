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
    <h5>First Name:</h5>
    <input
      type="text"
      placeholder="First Name"
      v-model.trim.lazy="vendor.firstName"
    />
    <h5>Last Name:</h5>
    <input
      type="text"
      placeholder="Last Name"
      v-model.trim.lazy="vendor.lastName"
    />
    <h5>Phone Number:</h5>
    <input
      type="tel"
      placeholder="(123)456-7890"
      v-model.trim.lazy="vendor.phoneNumber"
    />
    <h5>Email Address:</h5>
    <input
      type="email"
      placeholder="Email Address"
      v-model.trim.lazy="vendor.emailAddress"
    />
    <h5>Vendor Category:</h5>
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
      <option value="Bar Services ">Bar Services</option>
    </select>
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
import ButtonLongWithIcon from "../../UI/ButtonLongWithIcon.vue";
export default {
  data() {
    return {
      vendor: {
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
      console.log(this.vendor);
      this.$store.dispatch("addVendor", this.vendor);
      this.vendor = {
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