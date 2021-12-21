<template>
  <base-card
    :icon="icon"
    :actionIcon="editPen"
    :loading="loading"
    @action-one-clicked="toggleEditCard()"
  >
    <template v-slot:title>Contact</template>
    <template v-slot:dropdownContainer>
      <contact-information-edit
        v-if="editCardOpen"
        :contact="contact"
        @close-edit-card="toggleEditCard()"
      ></contact-information-edit
    ></template>
    <template v-slot:content v-if="contact">
      <div id="wrapper" v-if="!loading">
        <div id="contact-card-upper-div">
          <img
            :src="
              contact.profilePicture
                ? contact.profilePicture
                : defaultProfilePicture
            "
            alt=""
          />
          <div id="contact-information">
            <h5 id="business-name" v-if="contact.businessName">
              {{ contact.businessName }}
            </h5>
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
      </div>
    </template>
  </base-card>
</template>

<script>
import ContactInformationEdit from "../../../../SharedComponents/SharedComponentsContact/ContactInformationEdit.vue";
import defaultProfilePicture from "../../../../assets/default-profile-picture.svg";
import editPen from "../../../../assets/SVGs/edit-pen.svg";
import helpers from "../../../../helpers.js";

export default {
  data() {
    return {
      defaultProfilePicture,
      editPen,
      editCardOpen: false,
    };
  },
  methods: {
    formatPhoneNumber: helpers.formatPhoneNumber,
    toggleEditCard() {
      this.editCardOpen = !this.editCardOpen;
    },
  },
  props: ["contact", "icon", "loading"],
  components: { ContactInformationEdit },
};
</script>

<style scoped>
#wrapper {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

img {
  width: 65px;
  height: 65px;
  padding: 10px 10px 10px 0;
  object-fit: cover;
  border-radius: 50%;
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
  /* margin: 5px; */
  font-size: 8pt;
}

input {
  background-color: black;
  color: white;
  border: none;
  border-bottom: 1px solid white;
  width: 80%;
  margin: 0;
  text-align: right;
}

input:focus {
  outline: none;
}
</style>