<template>
  <div>
    <two-button-dialog-modal
      v-if="popupOpen === 'delete'"
      :modalBody="`Are you sure you want to delete
            ${
              contact.given_name
                ? contact.given_name + ' ' + contact.family_name
                : contact.address
                ? contact.name
                : ''
            }`"
      @select-button-one="confirmDeleteContact"
      @select-button-two="togglePopup"
      @close-modal="togglePopup"
    />
    <popup-email-composition
      v-if="popupOpen === 'email'"
      :contact="contact"
      :category="category"
      @cancel-send-email="togglePopup"
      @close-window="togglePopup"
    />
    <list-item-style-wrapper hoverable="true">
      <contact
        class="contact-section"
        :contact="contact"
        @click="viewContact"
        v-if="category !== 'locations'"
      />
      <phone-and-email
        class="contact-section"
        :contact="contact"
        @click="viewContact"
        v-if="category !== 'locations'"
      />
      <location
        class="contact-section"
        :location="contact"
        @click="viewContact"
        v-if="category === 'locations'"
      />
      <location-address
        class="contact-section"
        :location="contact"
        @click="viewContact"
        v-if="category === 'locations'"
      />
      <div class="button-wrapper">
        <round-icon-button
          svg="email"
          @click="emailContact()"
          v-if="category !== 'locations'"
        />
        <round-icon-button svg="trash-can" @click="initiateDeleteContact()" />
      </div>
    </list-item-style-wrapper>
  </div>
</template>

<script>
import ListItemStyleWrapper from "../../../../SharedComponents/SharedComponentsUI/ListItemStyleWrapper.vue";
import Contact from "../../../../SharedComponents/SharedComponentsUI/ListComponents/ContactProfilePictureAndName.vue";
import Location from "../../../../SharedComponents/SharedComponentsUI/ListComponents/LocationProfilePictureAndName.vue";
import LocationAddress from "../../../../SharedComponents/SharedComponentsUI/ListComponents/LocationAddress.vue";
import PhoneAndEmail from "../../../../SharedComponents/SharedComponentsUI/ListComponents/ContactEmailAndPhoneNumber.vue";
import RoundIconButton from "../../../../SharedComponents/SharedComponentsUI/RoundIconButton.vue";
import TwoButtonDialogModal from "../../../../SharedComponents/SharedComponentsUI/TwoButtonDialogModal.vue";
import PopupEmailComposition from "../../../../SharedComponents/SharedComponentsPopupUtilities/PopupEmailComposition.vue";

export default {
  data() {
    return {
      actionsClicked: false,
      popupOpen: null,
    };
  },
  methods: {
    viewContact() {
      this.$router.push(`contacts/${this.category}/${this.contact.userId}`);
    },
    togglePopup(str) {
      if (this.popupOpen !== null) {
        this.popupOpen = null;
      } else {
        this.popupOpen = str;
      }
    },
    emailContact() {
      this.togglePopup("email");
    },
    initiateDeleteContact() {
      this.togglePopup("delete");
    },
    async confirmDeleteContact() {
      let deletePayload = {
        userKey: {
          userId: this.contact.userId,
          tenantId: this.contact.tenantId,
        },
        tenantId: this.$store.state.user.tenantId,
      };
      this.$store.dispatch("deleteUser", deletePayload);
      this.popupOpen = null;
    },
  },

  props: ["contact", "category"],
  components: {
    Contact,
    Location,
    LocationAddress,
    PopupEmailComposition,
    RoundIconButton,
    TwoButtonDialogModal,
    ListItemStyleWrapper,
    PhoneAndEmail,
  },
};
</script>

<style scoped>
@media screen {
  .contact-section {
    width: 30%;
    min-width: 30%;
    max-width: 30%;
    text-align: left;
    overflow: hidden;
  }
  .button-wrapper {
    width: auto;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 45px;
  }

  @media (min-width: 700px) {
    .button-wrapper {
      width: 25%;
    }
  }
}
</style>