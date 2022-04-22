<template>
  <two-button-dialog-modal
    v-if="removeContactOpen"
    @select-button-one="removeContact"
    @select-button-two="toggleRemoveContact"
    @close-modal="toggleRemoveContact"
  />
  <base-card
    svg="group-people"
    title="Event Contacts"
    :actionIcon="userRole === 'admin' ? 'plus-sign' : ''"
    @actionOneClicked="toggleAddContactOpen"
  >
    <template v-slot:content>
      <div id="contact-carousel-top-wrapper" v-if="!addContactOpen">
        <div id="contact-carousel-wrapper">
          <event-page-contact-carousel-item
            v-for="(contact, index) in contacts"
            :key="contact.id"
            :contact="contact"
            :id="`${index + '-card'}`"
            @initiate-remove-contact="initiateRemoveContact(contact, index)"
          />
        </div>
      </div>
      <div class="add-contact-wrapper" v-if="addContactOpen">
        <div class="form-input">
          <input-with-title-with-dropdown
            title="Search"
            placeholder="Start typing..."
            :dropdownSelections="contactSearchResults"
            :dropdownDisplay="['given_name', 'family_name']"
            :inputValue="clientSearchField"
            @input="searchForClient($event)"
            @dropdown-selected="selectContact($event)"
          />
        </div>
      </div>
    </template>
  </base-card>
</template>

<script>
import EventPageContactCarouselItem from "./EventPageContactCarouselItem.vue";
import InputWithTitleWithDropdown from "../../SharedComponentsUI/ElementLibrary/InputWithTitleWithDropdown.vue";
import TwoButtonDialogModal from "../../SharedComponentsUI/TwoButtonDialogModal.vue";

export default {
  data() {
    return {
      addContactOpen: false,
      clientDropdownOpen: false,
      clientSearchField: undefined,
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
      if (this.clientSearchField) {
        if (this.$store.state.contacts.length < 5) {
          this.$store.dispatch("getAdminUsers");
        }
        let term = this.clientSearchField;
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
    toggleClientDropdown() {
      this.clientDropdownOpen = !this.clientDropdownOpen;
    },
    toggleAddContactOpen() {
      this.addContactOpen = !this.addContactOpen;
    },
    searchForClient(val) {
      this.clientSearchField = val;
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
        key: { userId: contact.userId, tenantId: contact.tenantId },
        role: contact.role,
      };
      let eventKey = {
        key: { userId: this.event.userId, tenantId: this.event.tenantId },
        role: contact.role,
      };
      let eventParameters = {
        eventKey: { userId: this.event.userId, tenantId: this.event.tenantId },
        operation: "addToList",
        variable: "contacts",
        value: contactKey,
      };
      let contactParameters = {
        contactKey: contactKey.key,
        variable: "associatedEvents",
        value: eventKey,
        operation: "addToList",
      };
      await this.$store.dispatch("editContact", contactParameters);
      await this.$store.dispatch("editEvent", eventParameters);
      this.toggleAddContactOpen();
    },
    async removeContact() {
      let contact = this.contactToBeRemoved;
      let contactKey = {
        key: { userId: contact.userId, tenantId: contact.tenantId },
        role: contact.role,
      };
      let eventKey = {
        key: { userId: this.event.userId, tenantId: this.event.tenantId },
        role: contact.role,
      };
      let eventParameters = {
        eventKey: { userId: this.event.userId, tenantId: this.event.tenantId },
        operation: "removeFromList",
        variable: "contacts",
        value: this.contactRemoveIndex,
      };
      let contactParameters = {
        contactKey: contactKey.key,
        variable: "associatedEvents",
        value: eventKey,
      };
      await this.$store.dispatch("removeEventFromContact", contactParameters);
      await this.$store.dispatch("editEvent", eventParameters);
    },
  },
  props: ["contacts", "event"],
  components: {
    EventPageContactCarouselItem,
    TwoButtonDialogModal,
    InputWithTitleWithDropdown,
  },
};
</script>

<style scoped>
#contact-carousel-top-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--textColor);
  height: 100%;
}

#contact-carousel-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  height: 100%;
  overflow: scroll;
  /* white-space: nowrap; */
}

.form-input {
  width: 100%;
  display: flex;
  justify-content: center;
}

.dropdown-parent {
  width: 100%;
}

.dropdown-parent > input {
  width: 80%;
}
</style>
