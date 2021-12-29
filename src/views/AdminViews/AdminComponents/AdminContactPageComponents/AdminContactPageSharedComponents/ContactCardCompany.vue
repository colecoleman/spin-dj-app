<template>
  <base-card
    :icon="icon"
    :actionIcon="editPen"
    :loading="contact ? false : true"
    @action-one-clicked="toggleEditCard()"
  >
    <template v-slot:title>{{
      contact ? contact.businessName : "Contact"
    }}</template>
    <template v-slot:dropdownContainer>
      <contact-information-edit-company
        v-if="editCardOpen"
        :contact="contact"
        @close-edit-card="toggleEditCard()"
      ></contact-information-edit-company>
    </template>
    <template v-slot:content>
      <div id="wrapper" v-if="contact">
        <div id="business-name-and-category">
          <h5 v-if="contact.businessCategory" id="vendor-category">
            {{ contact.businessCategory }}
          </h5>
          <h5 v-if="!contact.businessCategory" id="vendor-category">
            Uncategorized
          </h5>
        </div>
      </div>
    </template>
  </base-card>
</template>

<script>
import defaultProfilePicture from "../../../../../assets/default-profile-picture.svg";
import ContactInformationEditCompany from "./ContactInformationEditCompany.vue";
import editPen from "../../../../../assets/SVGs/edit-pen.svg";
import helpers from "../../../../../helpers.js";
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
  components: { ContactInformationEditCompany },
  props: ["contact", "icon"],
};
</script>

<style scoped>
#wrapper {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.contact-contact-information {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: left;
  font-size: 10pt;
  margin: 2px;
}

h5 {
  text-transform: uppercase;
  margin: 5px;
  font-size: 8pt;
}
</style>