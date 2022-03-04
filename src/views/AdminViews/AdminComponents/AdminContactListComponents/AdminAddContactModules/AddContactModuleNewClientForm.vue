<template>
  <div class="form-body">
    <input-with-title
      title="Pronoun / Prefix"
      type="select"
      :options="pronouns"
      :inputValue="client.pronoun"
      @input="fieldInput(client, 'pronoun', $event)"
    />
    <input-with-title
      type="text"
      title="First Name:"
      placeholder="First Name"
      :error="errors.given_name"
      :inputValue="client.given_name"
      @input="fieldInput(client, 'given_name', $event)"
    />
    <input-with-title
      type="text"
      title="Last Name:"
      placeholder="Last Name"
      :error="errors.family_name"
      :inputValue="client.family_name"
      @input="fieldInput(client, 'family_name', $event)"
    />
    <input-with-title
      type="tel"
      title="Phone Number:"
      placeholder="(123)456-7890"
      :error="errors.phoneNumber"
      :inputValue="client.phoneNumber"
      @input="fieldInput(client, 'phoneNumber', $event)"
    />
    <input-with-title
      type="email"
      title="Email Address:"
      placeholder="Email Address"
      :error="errors.username"
      :inputValue="client.username"
      @input="fieldInput(client, 'username', $event)"
    />
    <!-- <h5>Associated Event:</h5>
    <input
      type="text"
      placeholder="Search For Event"
      v-model.trim.lazy="associatedEventSearch"
    /> -->
    <div class="row-flex">
      <input
        type="checkbox"
        value="client.sendInvitation"
        v-model="client.sendInvitation"
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
      client: {
        sendInvitation: true,
        role: "client",
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
        this.client.phoneNumber = this.validatePhoneNumber(
          this.client.phoneNumber
        );
      }
      if (!this.errors.username) {
        this.validateusername(this.client.username);
      }
      if (Object.values(this.errors).every((item) => item === false)) {
        this.$store.dispatch("addContact", this.client);
        this.client = {
          sendInvitation: true,
          role: "client",
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
      let client = this.client;
      this.errors = {
        given_name: false,
        family_name: false,
        phoneNumber: false,
        username: false,
      };
      if (!client.given_name) {
        this.errors.given_name = true;
      }
      if (!client.family_name) {
        this.errors.family_name = true;
      }
      if (!client.username) {
        this.errors.username = true;
      }
      // if (!client.phoneNumber) {
      //   this.errors.phoneNumber = true;
      // }
    },
    validatePhoneNumber(num) {
      if (num) {
        return num.replace(/[^\d/+]/g, "");
      }
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
  /* margin-top: 20px; */
}

.row-flex > input {
  width: 20px;
}
</style>
