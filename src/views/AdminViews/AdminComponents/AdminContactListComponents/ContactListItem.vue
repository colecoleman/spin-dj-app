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
    <div class="contact-wrapper" v-if="category !== 'location'">
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
        <button-with-drop-down-selections
          text="Actions"
          :actions="actions"
          :clicked="actionsClicked"
          @button-clicked="togglePopup"
        />
      </div>
    </div>
    <div class="contact-wrapper" v-if="category === 'location'">
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
        <button-with-drop-down-selections
          text="Actions"
          :actions="actions"
          :clicked="actionsClicked"
          @button-clicked="togglePopup"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ProfilePicture from "../../../../assets/ProfilePicture.vue";
import ButtonWithDropDownSelections from "../../../../SharedComponents/SharedComponentsUI/ButtonWithDropDownSelections.vue";
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

        // {
        //   title: "delete",
        //   danger: true,
        //   parameter: "delete",
        //   icon: "trash-can",
        // },
      ],
    };
  },
  computed: {},
  methods: {
    viewContact() {
      this.$router.push(
        "contacts/" + this.category + "s/" + this.contact.userId
      );
    },
    formatPhoneNumber,
    togglePopup(str) {
      if (this.popupOpen !== null) {
        this.popupOpen = null;
      } else {
        this.popupOpen = str;
      }
    },
    async confirmDeleteContact() {
      if (this.contact.associatedEvents) {
        this.contact.associatedEvents.forEach((event) => {
          let eventObject;
          this.$store.dispatch("adminGetEvent", event).then(
            (res) => {
              eventObject = res;
              let index = eventObject.contacts.indexOf(this.contact.userId);
              let payload = {
                eventId: eventObject.userId,
                variable: "contacts",
                value: index,
                operation: "removeFromList",
              };
              this.$store.dispatch("editEvent", payload);
            },
            (error) => {
              console.log(error);
            }
          );
        });
      }
      let deletePayload = {
        category: this.category,
        id: this.contact.userId,
      };
      this.$store.dispatch("deleteUser", deletePayload);
      this.popupOpen = null;
    },
  },
  created() {
    console.log(this.category);
  },
  props: ["contact", "category"],
  components: {
    ButtonWithDropDownSelections,
    PopupEmailComposition,
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
    width: 99%;
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
    width: 30%;
    position: relative;
    display: flex;
    /* justify-content: center; */
    /* min-height: 50px; */
    height: 45px;
    /* align-items: center; */
    box-sizing: border-box;
    /* margin-top: 20px; */
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
      position: relative;
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