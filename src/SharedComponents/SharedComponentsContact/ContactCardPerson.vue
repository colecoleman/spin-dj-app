<template>
  <base-card
    :icon="icon"
    :title="
      contact ? contact.given_name + ' ' + contact.family_name : 'Contact'
    "
    :actionIcon="editPen"
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
        <img
          :src="
            contact.profilePicture
              ? contact.profilePicture
              : defaultProfilePicture
          "
          alt=""
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
import defaultProfilePicture from "../../assets/default-profile-picture.svg";
import editPen from "../../assets/SVGs/edit-pen.svg";
import helpers from "../../helpers.js";

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
    emailContact() {
      this.$emit("email-contact");
    },
  },
  emits: ["email-contact"],
  props: ["contact", "icon", "loading"],
  components: { ContactInformationEdit },
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