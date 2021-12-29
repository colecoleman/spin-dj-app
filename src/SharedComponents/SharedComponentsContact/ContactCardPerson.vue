<template>
  <base-card
    :icon="icon"
    :actionIcon="editPen"
    :loading="loading"
    @action-one-clicked="toggleEditCard()"
  >
    <template v-slot:title>{{
      contact ? contact.given_name + " " + contact.family_name : "Contact"
    }}</template>
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
  width: 60px;
  height: 60px;
  padding: 10px 10px 10px 0;
  object-fit: cover;
}

.contact-contact-information {
  font-size: 10pt;
  margin: 2px;
}

#contact-card-upper-div {
  position: relative;
  display: flex;
  flex-direction: row;
}

#contact-information {
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}
</style>