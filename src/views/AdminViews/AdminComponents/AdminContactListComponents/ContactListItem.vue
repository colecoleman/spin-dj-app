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
    <div class="contact-wrapper" v-if="category !== 'locations'">
      <div class="name-and-photo">
        <profile-picture
          contact="person"
          :profilePicture="contact.profilePicture"
          :customStyle="svgStyling"
        />
        <div class="name" @click="viewContact()">
          <h5 v-if="contact.businessName" class="business-name">
            <span>{{ contact.businessName }}</span>
          </h5>
          <h5 id="client-name">
            {{ contact.given_name }} <br />
            <span> {{ contact.family_name }}</span>
          </h5>
        </div>
      </div>
      <div class="email-and-phone">
        <p>{{ formatPhoneNumber(contact.phoneNumber) }}</p>
        <p>{{ contact.email }}</p>
      </div>
      <div class="button-wrapper">
        <round-icon-button svg="email" @click="emailContact()" />
        <round-icon-button svg="trash-can" @click="initiateDeleteContact()" />
      </div>
    </div>
    <div class="contact-wrapper" v-if="category === 'locations'">
      <div class="name-and-photo">
        <profile-picture contact="location" :customStyle="svgStyling" />
        <div class="name" @click="viewContact()">
          <h5 id="client-name">
            <span> {{ contact.name }}</span>
          </h5>
        </div>
      </div>
      <div class="location-address">
        <p>{{ contact.address.streetAddress1 }}</p>
        <p>{{ contact.address.cityStateZip }}</p>
      </div>
      <div class="button-wrapper">
        <round-icon-button svg="trash-can" @click="initiateDeleteContact()" />
      </div>
    </div>
  </div>
</template>

<script>
import ProfilePicture from "../../../../assets/ProfilePicture.vue";
import RoundIconButton from "../../../../SharedComponents/SharedComponentsUI/RoundIconButton.vue";
import TwoButtonDialogModal from "../../../../SharedComponents/SharedComponentsUI/TwoButtonDialogModal.vue";
import PopupEmailComposition from "../../../../SharedComponents/SharedComponentsPopupUtilities/PopupEmailComposition.vue";
import { formatPhoneNumber } from "../../../../helpers.js";

export default {
  data() {
    return {
      svgStyling: "width: 31px; height: 30px; padding: 10px;",
      actionsClicked: false,
      popupOpen: null,
      actions: [
        {
          title: "View",
          danger: false,
          action: this.viewContact,
          icon: "eye",
        },
        {
          title: "email",
          danger: false,
          parameter: "email",
          icon: "email",
        },

        {
          title: "delete",
          danger: true,
          parameter: "delete",
          icon: "trash-can",
        },
      ],
    };
  },
  methods: {
    viewContact() {
      this.$router.push(`contacts/${this.category}/${this.contact.userId}`);
    },
    formatPhoneNumber,
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
    PopupEmailComposition,
    RoundIconButton,
    TwoButtonDialogModal,
    ProfilePicture,
  },
};
</script>

<style scoped>
@media screen {
  .contact-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    width: 100%;
    border: 1px solid var(--cardOutline);
    border-radius: 10px;
    filter: drop-shadow(0px 1px 0px var(--cardOutline));
    background-color: var(--foregroundColor);
    box-sizing: border-box;
    margin-bottom: 5px;
    cursor: pointer;
    /* max-height: 100px; */
  }

  .name {
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    /* width: calc(100% - 60px); */
  }

  .name-and-photo,
  .email-and-phone {
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

  .name-and-photo {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .name-and-photo h5 {
    font-size: 0.75em;
    font-weight: normal;
    text-transform: uppercase;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  h5 {
    margin: 1px;
  }

  span {
    font-weight: bold;
  }
  .email-and-phone p {
    /* margin: 3px; */
    font-size: 0.6em;
    font-weight: normal;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 5px;
  }

  @media (min-width: 700px) {
    .button-wrapper {
      width: 25%;
      /* position: relative; */
    }

    .name-and-photo {
      text-align: left;
    }

    h5 {
      margin: 2px;
    }
  }
}
</style>