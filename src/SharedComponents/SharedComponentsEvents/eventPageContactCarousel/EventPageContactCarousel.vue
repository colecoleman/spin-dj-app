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
    actionIcon="plus-sign"
    @actionOneClicked="toggleAddContactOpen"
  >
    <template v-slot:content>
      <div id="contact-carousel-top-wrapper" v-if="!addContactOpen">
        <vue-svg svg="left-arrow" @clicked="scrollToPreviousElement" />
        <div id="contact-carousel-wrapper">
          <event-page-contact-carousel-item
            v-for="(contact, index) in contacts"
            :key="contact.id"
            :contact="contact"
            :id="`${index + '-card'}`"
            @initiate-remove-contact="initiateRemoveContact(contact, index)"
          />
        </div>
        <vue-svg svg="right-arrow" @clicked="scrollToNextElement" />
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
import VueSvg from "../../../assets/VueSvg.vue";
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
    scrollToNextElement() {
      let container = document.getElementById("contact-carousel-wrapper");
      let sLeft = container.scrollLeft;
      let containerWidth = container.getBoundingClientRect().width;
      let childWidth = containerWidth / 2;
      let currentObjectIndex = Math.round(sLeft / childWidth);
      let scrollToObjectIndex = currentObjectIndex + 2;
      if (scrollToObjectIndex > this.contacts.length - 1) {
        document.getElementById("0-card").scrollIntoView({
          behavior: "smooth",
        });
      } else {
        document.getElementById(scrollToObjectIndex + "-card").scrollIntoView({
          behavior: "smooth",
        });
      }
    },
    scrollToPreviousElement() {
      let container = document.getElementById("contact-carousel-wrapper");
      let sLeft = container.scrollLeft;
      let containerWidth = container.getBoundingClientRect().width;
      let childWidth = containerWidth / 2;
      let currentObjectIndex = Math.round(sLeft / childWidth);
      let scrollToObjectIndex = currentObjectIndex - 1;
      if (currentObjectIndex === 0) {
        document
          .getElementById(this.contacts.length - 1 + "-card")
          .scrollIntoView({
            behavior: "smooth",
          });
      } else {
        document.getElementById(scrollToObjectIndex + "-card").scrollIntoView({
          behavior: "smooth",
        });
      }
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
    VueSvg,
    InputWithTitleWithDropdown,
  },
};
</script>

<style scoped>
#contact-carousel-top-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  color: var(--textColor);
}

#contact-carousel-wrapper {
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 100%;
  height: 90%;
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
