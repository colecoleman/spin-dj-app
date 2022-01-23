<template>
  <two-button-dialog-modal
    v-if="removeContactOpen"
    @select-button-one="removeContact"
    @select-button-two="toggleRemoveContact"
    @close-modal="toggleRemoveContact"
  ></two-button-dialog-modal>
  <base-card
    :icon="SVGs.GroupPeopleSVG"
    title="Event Contacts"
    :actionIcon="SVGs.PlusSignSVG"
    @actionOneClicked="toggleAddContactOpen"
  >
    <template v-slot:content>
      <div id="contact-carousel-top-wrapper" v-if="!addContactOpen">
        <img
          @click="scrollToPreviousElement()"
          :src="SVGs.LeftArrowSVG"
          alt=""
        />

        <div id="contact-carousel-wrapper">
          <event-page-contact-carousel-item
            v-for="(contact, index) in contacts"
            :key="contact.id"
            :contact="contact"
            :id="`${index + '-card'}`"
            @initiate-remove-contact="initiateRemoveContact(contact, index)"
          ></event-page-contact-carousel-item>
        </div>
        <img @click="scrollToNextElement()" :src="SVGs.RightArrowSVG" alt="" />
      </div>
      <div class="add-contact-wrapper" v-if="addContactOpen">
        <div class="form-input">
          <p>Name:</p>
          <div id="contact-search-parent" class="dropdown-parent">
            <input
              type="text"
              v-model="clientSearchField"
              @keydown="toggleClientDropdown"
              placeholder="Start typing to assign existing contact, or add a new one."
            />
            <div
              class="dropdown"
              v-if="clientDropdownOpen && contactSearchResults.length > 0"
            >
              <div
                class="dropdown-item"
                v-for="contact in contactSearchResults"
                :key="contact.userId"
                :value="contact.given_name + ' ' + contact.family_name"
                @click="selectContact(contact)"
              >
                <p class="location-name">
                  {{ contact.given_name + " " + contact.family_name }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </base-card>
</template>

<script>
import EventPageContactCarouselItem from "./EventPageContactCarouselItem.vue";
import SVGs from "../../../assets/SVGs/svgIndex.js";
import TwoButtonDialogModal from "../../SharedComponentsUI/TwoButtonDialogModal.vue";

export default {
  data() {
    return {
      SVGs,
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
        let term = this.clientSearchField;
        let contacts = this.$store.state.contacts;
        let contactsArray = [
          ...contacts.clients,
          ...contacts.vendors,
          ...contacts.organizers,
          ...contacts.vendors,
        ];
        return contactsArray.filter(
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
      console.log(index);
      this.contactRemoveIndex = index;
      this.contactToBeRemoved = contact;
      this.toggleRemoveContact();
    },
    async selectContact(contact) {
      this.locationDropdownOpen = false;
      let chosenContact = {
        id: contact.userId,
        role: contact.role,
      };
      let eventParameters = {
        eventId: this.event.userId,
        operation: "addToList",
        variable: "contacts",
        value: chosenContact,
      };
      let contactParameters = {
        clientId: contact.userId,
        variable: "associatedEvents",
        value: this.event.userId,
        operation: "addToList",
      };
      await this.$store.dispatch("editEvent", eventParameters);
      await this.$store.dispatch("editContact", contactParameters);
      this.toggleAddContactOpen();
    },
    async removeContact() {
      let eventParameters = {
        eventId: this.event.userId,
        operation: "removeFromList",
        variable: "contacts",
        value: this.contactRemoveIndex,
      };
      let eventIndex = this.contactToBeRemoved.associatedEvents.indexOf(
        this.event.userId
      );
      let contactParameters = {
        clientId: this.contactToBeRemoved.userId,
        operation: "removeFromList",
        variable: "associatedEvents",
        value: eventIndex,
      };
      await this.$store.dispatch("editEvent", eventParameters);
      await this.$store.dispatch("editContact", contactParameters);
      this.toggleRemoveContact();
    },
  },
  props: ["contacts", "event"],
  components: { EventPageContactCarouselItem, TwoButtonDialogModal },
};
</script>

<style scoped>
#contact-carousel-top-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
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

img {
  height: 15px;
  width: 15px;
}

.form-input {
  width: 100%;
}

.dropdown-parent {
  width: 100%;
}

.dropdown-parent > input {
  width: 80%;
}
</style>
