<template>
  <div>
    <two-button-dialog-modal
      v-if="popupOpen === 'delete'"
      :modalBody="`Are you sure you want to delete
            ${contact.given_name} ${contact.family_name}?`"
      @select-button-one="confirmDeleteContact"
      @select-button-two="togglePopup"
      @close-modal="togglePopup"
    ></two-button-dialog-modal>
    <popup-email-composition
      v-if="popupOpen === 'email'"
      :contact="contact"
      :category="category"
      @cancel-send-email="togglePopup"
      @close-window="togglePopup"
    ></popup-email-composition>
    <div class="contact-wrapper" v-if="category !== 'locations'">
      <div class="name-and-photo">
        <img
          :src="
            contact.profilePicture
              ? contact.profilePicture
              : defaultProfilePicture
          "
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
        ></button-with-drop-down-selections>
      </div>
    </div>
    <div class="contact-wrapper" v-if="category === 'locations'">
      <div class="name-and-photo">
        <img
          :src="
            contact.profilePicture
              ? contact.profilePicture
              : SVGs.LocationCircleIconSVG
          "
        />
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
        ></button-with-drop-down-selections>
      </div>
    </div>
  </div>
</template>

<script>
import defaultProfilePicture from "../../../../assets/default-profile-picture.svg";
import ButtonWithDropDownSelections from "../../../../SharedComponents/SharedComponentsUI/ButtonWithDropDownSelections.vue";
import TwoButtonDialogModal from "../../../../SharedComponents/SharedComponentsUI/TwoButtonDialogModal.vue";
import PopupEmailComposition from "../../../../SharedComponents/SharedComponentsPopupUtilities/PopupEmailComposition.vue";
import SVGs from "../../../../assets/SVGs/svgIndex.js";
import helpers from "../../../../helpers.js";

export default {
  data() {
    return {
      SVGs,
      defaultProfilePicture,
      actionsClicked: false,
      popupOpen: null,
      actions: [
        {
          title: "View",
          danger: false,
          action: this.viewContact,
          icon: SVGs.EyeIconSVG,
        },
        {
          title: "email",
          danger: false,
          parameter: "email",
          // action: this.togglePopup,
          icon: SVGs.EmailSVG,
        },

        {
          title: "delete",
          danger: true,
          // action: this.togglePopup,
          parameter: "delete",
          icon: SVGs.TrashCanSVG,
        },
      ],
    };
  },
  computed: {},
  methods: {
    viewContact() {
      this.$router.push(
        "contacts/" + this.category + "/" + this.contact.userId
      );
    },
    formatPhoneNumber: helpers.formatPhoneNumber,
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
              eventObject = res.data.Item;
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
  props: ["contact", "category"],
  components: {
    ButtonWithDropDownSelections,
    PopupEmailComposition,
    TwoButtonDialogModal,
  },
};
</script>

<style scoped>
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
  /* width: calc(100% - 60px); */
}

img {
  width: 65px;
  height: 65px;
  padding: 10px;
  object-fit: cover;
  border-radius: 50%;
}

.name-and-photo,
.email-and-phone {
  width: 33%;
  min-width: 33%;
  max-width: 33%;
}
.button-wrapper {
  width: 25%;
  position: relative;
  align-self: center;
  min-height: 60px;
  /* margin-top: 20px; */
}

.name-and-photo {
  display: flex;
  flex-direction: row;
  align-items: center;

  text-align: left;
}

.name-and-photo h5 {
  font-weight: normal;
  text-transform: uppercase;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

h5 {
  margin: 2px;
}

.name-and-photo h5 span {
  font-weight: bold;
}
.email-and-phone p {
  /* margin: 3px; */
  font-weight: normal;
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

#container {
  position: inherit;
  height: 100%;
  width: 100%;
  color: black;
}

.button-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  color: black;
}
</style>