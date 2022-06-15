<template>
  <base-card
    svg="group-people"
    title="Contacts"
    :searchIcon="userRole === 'admin'"
    :searchResults="contactSearchResults"
    :inputValue="contactSearchField"
    :searchResultFormat="['given_name', 'family_name']"
    @search-input="searchForContact($event)"
    @select-search-result="selectContact"
    @search-blurred="searchBlurred"
  >
    <template v-slot:content>
      <two-button-dialog-modal
        v-if="removeContactOpen"
        @select-button-one="removeContact"
        @select-button-two="toggleRemoveContact"
        @close-modal="toggleRemoveContact"
      />

      <div id="contact-carousel-wrapper">
        <contact-list-item
          v-for="(contact, index) in contacts"
          :key="index"
          :contact="contact"
          @initiate-remove-contact="initiateRemoveContact(contact, index)"
        />
      </div>
    </template>
  </base-card>
</template>

<script>
import ContactListItem from "./ContactListItem.vue";
import TwoButtonDialogModal from "../SharedComponentsUI/TwoButtonDialogModal.vue";

export default {
  data() {
    return {
      clientDropdownOpen: false,
      contactSearchField: undefined,
      selectedClient: undefined,
      removeContactOpen: false,
      contactRemoveIndex: undefined,
      contactToBeRemoved: undefined,
    };
  },
  computed: {
    userRole() {
      return this.$store.getters.userRole;
    },
    contactSearchResults() {
      if (this.contactSearchField) {
        if (this.$store.state.contacts.length < 5) {
          this.$store.dispatch("getAdminUsers");
        }
        console.log(this.contactSearchField);
        let term = this.contactSearchField;
        let contacts = this.$store.state.contacts.filter((x) => {
          return x.role !== "location";
        });
        return contacts.filter(
          (x) =>
            x.family_name.toLowerCase().includes(term.toLowerCase()) ||
            x.given_name.toLowerCase().includes(term.toLowerCase())
        );
      } else {
        return [];
      }
    },
  },
  methods: {
    searchForContact(val) {
      this.contactSearchField = val;
    },
    toggleRemoveContact() {
      this.removeContactOpen = !this.removeContactOpen;
    },
    initiateRemoveContact(contact, index) {
      this.contactRemoveIndex = index;
      this.contactToBeRemoved = contact;
      this.toggleRemoveContact();
    },
    async selectContact(contact) {
      let contactKey = {
        userId: contact.userId,
        tenantId: contact.tenantId,
      };
      let locationParameters = {
        contactKey: {
          userId: this.location.userId,
          tenantId: this.location.tenantId,
        },
        operation: "addToList",
        variable: "contacts",
        value: contactKey,
      };
      await this.$store.dispatch("editContact", locationParameters);
    },
    async removeContact() {
      let locationKey = {
        userId: this.location.userId,
        tenantId: this.location.tenantId,
      };
      let locationParameters = {
        contactKey: locationKey,
        operation: "removeFromList",
        variable: "associatedEvents",
        value: this.contactRemoveIndex,
      };
      await this.$store.dispatch("editContact", locationParameters);
    },
    searchBlurred() {
      this.contactSearchField = undefined;
    },
  },
  props: ["contacts", "location"],
  components: {
    ContactListItem,
    TwoButtonDialogModal,
  },
};
</script>

<style scoped>
#contact-carousel-wrapper {
  height: 100%;
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  color: var(--textColor);
}
</style>
