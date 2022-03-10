<template>
  <base-card
    :svg="icon"
    :title="
      contact ? contact.given_name + ' ' + contact.family_name : 'Contact'
    "
    actionIcon="edit-pen"
    :loading="loading"
    @action-one-clicked="toggleEditCard"
  >
    <template v-slot:dropdownContainer>
      <contact-information-edit
        v-if="editCardOpen"
        :contact="contact"
        @close-edit-card="toggleEditCard"
    /></template>
    <template v-slot:content v-if="contact">
      <div id="wrapper" v-if="!loading">
        <profile-picture
          contact="person"
          :customStyle="profilePictureStyling"
          :profilePicture="contact.profilePicture"
        />
        <div id="contact-information">
          <p class="contact-contact-information">
            {{ formatPhoneNumber(contact.phoneNumber) }}
          </p>
          <p class="contact-contact-information email" @click="emailContact()">
            {{ contact.email }}
          </p>
        </div>
      </div>
    </template>
  </base-card>
</template>

<script>
import ContactInformationEdit from "../SharedComponentsContact/ContactInformationEdit.vue";
import ProfilePicture from "../../assets/ProfilePicture.vue";
import { formatPhoneNumber } from "../../helpers.js";

export default {
  data() {
    return {
      profilePictureStyling: "width: 55px; height: 55px; margin-right: 10px;",
      editCardOpen: false,
    };
  },
  methods: {
    formatPhoneNumber,
    toggleEditCard() {
      this.editCardOpen = !this.editCardOpen;
    },
    emailContact() {
      this.$emit("email-contact");
    },
  },
  emits: ["email-contact"],
  props: ["contact", "icon", "loading"],
  components: { ContactInformationEdit, ProfilePicture },
};
</script>

<style scoped>
#wrapper {
  height: 100%;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  justify-content: left;
  align-items: center;
}

img {
  width: 55px;
  height: 55px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;
}

.contact-contact-information {
  margin: 2px;
}

.email {
  cursor: pointer;
  text-decoration: underline;
}

#contact-information {
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}
</style>