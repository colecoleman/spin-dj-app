<template>
  <section>
    <popup-modal v-if="deleteContactOpen">
      <template v-slot:window>
        <div class="container">
          <h3 class="popup-heading">
            Are you sure you want to delete
            {{ contact.given_name + " " + contact.family_name }}?
          </h3>
          <div class="button-container">
            <button-standard-with-icon
              class="black-outline"
              text="Yes, I'm Sure"
              @click="confirmDeleteContact()"
            ></button-standard-with-icon>
            <button-standard-with-icon
              class="black-outline"
              text="No, go back."
              @click="cancelDeleteContact()"
            ></button-standard-with-icon>
          </div>
        </div>
      </template>
    </popup-modal>
    <popup-email-composition
      v-if="composeEmailOpen"
      :contact="contact"
      :category="category"
      @cancel-send-email="composeEmailOpen = false"
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
        ></button-with-drop-down-selections>
      </div>
    </div>
    <div class="contact-wrapper" v-if="category === 'locations'">
      <div class="name-and-photo">
        <img
          :src="
            contact.profilePicture
              ? contact.profilePicture
              : defaultLocationPicture
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
        ></button-with-drop-down-selections>
      </div>
    </div>
  </section>
</template>

<script>
import defaultProfilePicture from "../../../assets/default-profile-picture.svg";
import defaultLocationPicture from "../../../assets/SVGs/location-circle-icon.svg";
import ButtonWithDropDownSelections from "../../../SharedComponents/SharedComponentsUI/ButtonWithDropDownSelections.vue";
import ButtonStandardWithIcon from "../../../SharedComponents/SharedComponentsUI/ButtonStandardWithIcon.vue";
import PopupEmailComposition from "../../../SharedComponents/SharedComponentsPopupUtilities/PopupEmailComposition.vue";
import PopupModal from "../../../SharedComponents/SharedComponentsUI/PopupModal.vue";
import eyeIcon from "../../../assets/SVGs/eye-icon.svg";
import emailIcon from "../../../assets/SVGs/email.svg";
import trashCan from "../../../assets/SVGs/trash-can.svg";
import helpers from "../../../helpers.js";

export default {
  data() {
    return {
      defaultProfilePicture,
      defaultLocationPicture,
      actionsClicked: false,
      composeEmailOpen: false,
      deleteContactOpen: false,
      actions: [
        {
          title: "View",
          danger: false,
          action: this.viewContact,
          icon: eyeIcon,
        },
        {
          title: "Email",
          danger: false,
          action: this.emailContact,
          icon: emailIcon,
        },

        {
          title: "Delete",
          danger: true,
          action: this.deleteContact,
          icon: trashCan,
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

    emailContact() {
      this.composeEmailOpen = true;
      console.log(this.$store.state.businessSettings);
    },
    cancelSendEmail() {
      this.composeEmailOpen = false;
    },

    deleteContact() {
      this.deleteContactOpen = true;
    },
    async confirmDeleteContact() {
      if (this.contact.associatedEvents) {
        this.contact.associatedEvents.forEach((event) => {
          let eventObject;
          this.$store.dispatch("adminGetEvent", event).then(
            (res) => {
              eventObject = res.data.Item;
              console.log(eventObject);
              let index = eventObject.contacts.indexOf(this.contact.userId);
              let payload = {
                eventId: eventObject.userId,
                variable: "contacts",
                value: index,
                operation: "removeFromList",
              };

              console.log(payload);
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
      this.deleteContactOpen = false;
    },
    cancelDeleteContact() {
      this.deleteContactOpen = false;
    },
  },
  props: ["contact", "category"],
  components: {
    ButtonWithDropDownSelections,
    PopupEmailComposition,
    PopupModal,
    ButtonStandardWithIcon,
  },
  created() {
    console.log(this.category);
  },
};
</script>

<style scoped>
section {
}

.contact-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  height: 100px;
  max-height: 100px;
}

.name {
  display: flex;
  flex-direction: column;
  width: calc(100% - 60px);
}

img {
  height: 50px;
  width: 50px;
  margin-right: 10px;
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
  margin-top: 20px;
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

.name-and-photo h5 span {
  font-weight: bold;
}
.email-and-phone p {
  margin: 3px;
  font-weight: normal;
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.popup-heading,
.popup-text {
  color: black;
}

.popup-text {
  width: 80%;
  margin: 10px;
  text-align: left;
}

#from-email,
#to-email,
#email-message {
  width: 80%;
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

.black-outline {
  border-color: black;
  border-radius: 5px;
}
</style>