<template>
  <div class="form-body">
    <input-with-title
      :error="errors.name"
      type="text"
      title="Venue Name"
      placeholder="The Venue"
      :inputValue="location.name"
      @input="fieldInput(location, 'name', $event)"
    />
    <div class="indention">
      <input-with-title
        type="text"
        title="Street Address 1:"
        placeholder="12345 Address St"
        :inputValue="location.address.streetAddress1"
        @input="fieldInput(location.address, 'streetAddress1', $event)"
      />
      <input-with-title
        type="text"
        title="Street Address 2 (optional):"
        placeholder="Apt 1234"
        :inputValue="location.address.streetAddress2"
        @input="fieldInput(location.address, 'streetAddress2', $event)"
      />
      <input-with-title
        type="text"
        title="City, State/Province, Zip Code:"
        placeholder="Anywhere, AZ, 12345"
        :inputValue="location.address.cityStateZip"
        @input="fieldInput(location.address, 'cityStateZip', $event)"
      />
    </div>
  </div>
  <button-standard-with-icon
    text="Submit"
    @click="submitContact"
    svg="circle-checkmark"
  />
</template>

<script>
import InputWithTitle from "../../../SharedComponentsUI/ElementLibrary/InputWithTitle.vue";
export default {
  data() {
    return {
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
    fieldInput(object, property, value) {
      if (object) {
        object[property] = value;
      } else {
        this[property] = value;
      }
    },
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
  components: { InputWithTitle },
};
</script>

<style scoped>
.form-body {
  width: 100%;
  height: calc(100% - 56px);
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
</style>