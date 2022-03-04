<template>
  <base-card
    :svg="icon"
    actionIcon="edit-pen"
    :loading="contact ? false : true"
    :title="contact ? contact.businessName : 'Contact'"
    @action-one-clicked="toggleEditCard()"
  >
    <template v-slot:dropdownContainer>
      <contact-information-edit-company
        v-if="editCardOpen"
        :contact="contact"
        @close-edit-card="toggleEditCard()"
      />
    </template>
    <template v-slot:content>
      <div id="wrapper" v-if="contact">
        <div id="business-name-and-category">
          <h5 v-if="contact.vendorCategory" id="vendor-category">
            {{ contact.vendorCategory }}
          </h5>
          <h5 v-if="!contact.vendorCategory" id="vendor-category">
            Uncategorized
          </h5>
        </div>
      </div>
    </template>
  </base-card>
</template>

<script>
import ContactInformationEditCompany from "./ContactInformationEditCompany.vue";
import { formatPhoneNumber } from "../../../../../helpers.js";
export default {
  data() {
    return {
      editCardOpen: false,
    };
  },
  methods: {
    formatPhoneNumber,
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