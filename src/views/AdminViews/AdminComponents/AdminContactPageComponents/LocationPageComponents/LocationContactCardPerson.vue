<template>
  <base-card :icon="icon" title="Contact">
    <template v-slot:action1></template>
    <template v-slot:content>
      <div id="wrapper">
        <div id="contact-card-upper-div" v-if="contact">
          <img
            :src="
              contact.profilePicture
                ? contact.profilePicture
                : defaultProfilePicture
            "
            alt=""
          />
          <div id="contact-information">
            <h4 id="first-name">{{ contact.given_name }}</h4>
            <h4 id="last-name">{{ contact.family_name }}</h4>
            <p class="contact-contact-information">
              {{ formatPhoneNumber(contact.phoneNumber) }}
            </p>
            <p class="contact-contact-information">
              {{ contact.email }}
            </p>
          </div>
        </div>

        <h5
          @click="toggleContactAssignment()"
          v-if="!contactAssignmentOpen && !contact"
        >
          No contact found. Click here to add one!
        </h5>
        <div class="contact-assignment-wrapper" v-if="contactAssignmentOpen">
          <div class="body">
            <input
              id="vendor-search"
              type="text"
              v-model="searchTerm"
              placeholder="Start Typing To Search..."
              @keyup="searchForVendors()"
            />
            <div class="window">
              <div
                class="vendor-item"
                v-for="vendor in vendors"
                :key="vendor.userId"
              >
                <div class="detail-wrapper">
                  <img
                    :src="
                      vendor.profilePicture
                        ? vendor.profilePicture
                        : defaultProfilePicture
                    "
                    alt=""
                  />
                  <h5>{{ vendor.given_name }} {{ vendor.family_name }}</h5>
                </div>
                <div class="refer-button-wrapper">
                  <button-standard-with-icon
                    :text="selectedVendor == vendor ? 'Confirm' : 'Add'"
                    @click="selectVendor(vendor)"
                  ></button-standard-with-icon>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </base-card>
</template>

<script>
import defaultProfilePicture from "../../../../../assets/default-profile-picture.svg";

import helpers from "../../../../../helpers.js";
export default {
  data() {
    return {
      defaultProfilePicture,
      contactAssignmentOpen: false,
      searchTerm: undefined,
      selectedVendor: undefined,
    };
  },
  computed: {
    vendors() {
      let vendors = this.$store.state.contacts.vendors;
      if (this.searchTerm) {
        vendors = vendors.filter(
          (x) =>
            x.given_name
              .toLowerCase()
              .includes(this.searchTerm.toLowerCase()) ||
            x.family_name.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      }
      return vendors;
    },
  },
  methods: {
    formatPhoneNumber: helpers.formatPhoneNumber,
    selectVendor(vendor) {
      if (this.selectedVendor === vendor) {
        this.addContact();
        this.selectedVendor = undefined;
        return;
      }
      if (this.selectedVendor !== vendor) {
        this.selectedVendor = vendor;
        return;
      }
    },
    toggleContactAssignment() {
      this.contactAssignmentOpen = !this.contactAssignmentOpen;
    },
    addContact() {
      let payload = {
        locationId: this.location.userId,
        variable: "contacts",
        value: this.selectedVendor.userId,
        operation: "addToList",
      };
      this.$store.dispatch("editLocation", payload);
    },
  },
  props: ["contact", "icon", "location"],
  created() {
    this.$store.dispatch("getAdminUsers");
  },
};
</script>

<style scoped>
#wrapper {
  display: flex;
  flex-direction: column;
}

img {
  width: 55px;
  padding: 10px;
}

#first-name {
  font-weight: normal;
}

#last-name {
  padding-bottom: 10px;
}

.contact-contact-information {
  font-size: 10pt;
  margin: 2px;
}

#contact-card-upper-div {
  position: relative;
  display: flex;
  flex-direction: row;
  padding: 10px;
}

#contact-information {
  text-align: left;
}

#contact-card-lower-div {
  display: flex;
  flex-direction: row;
  margin: 10px 0;
}

.contact-card-lower-div-half {
  width: 50%;
  justify-content: center;
  justify-items: center;
  align-content: center;
  align-items: center;
}

.indented-item {
  text-align: left;
  margin: 25px 4px;
}

.indented {
  text-align: right;
}

h5 {
  text-transform: uppercase;
  margin: 5px;
  font-size: 8pt;
}

input {
  width: 80%;
  margin: 0;
}

input:focus {
  outline: none;
}

.body {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-items: center; */
  justify-content: center;
}

#client-search,
#message {
  border: 1px solid rgba(0, 0, 0, 0.2);
  width: 80%;
  /* height: 30px; */
}

#client-search {
  text-align: center;
  margin: 20px;
}

#message {
  height: 200px;
  padding: 15px;
  text-align: left;
}

.vendor-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 60px;
}

.detail-wrapper {
  display: flex;
  flex-direction: row;
  width: 70%;
  align-items: center;
  justify-content: space-between;
}

.page-two {
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;
  justify-items: center;
}

img {
  height: 40px;
  width: 40px;
  margin: 5px;
}

.window {
  height: 100px;
  width: 100%;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
}

.button-div {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
</style>