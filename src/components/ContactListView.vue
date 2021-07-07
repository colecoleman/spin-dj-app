<template>
  <section>
    <popup-modal v-if="deleteContactOpen">
      <template v-slot:window>
        <div class="container">
          <h3 class="popup-heading">
            Are you sure you want to delete
            {{ contact.firstName + " " + contact.lastName }}?
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
    <popup-modal v-if="composeEmailOpen">
      <template v-slot:window>
        <h3 class="popup-heading">
          Send email to {{ contact.firstName }} {{ contact.lastName }}
        </h3>
        <h5 class="popup-text">From:</h5>
        <select
          name="from-email"
          id="from-email"
          v-model="emailFields.fromEmail"
        >
          <option
            :value="address.address"
            v-for="address in emailAddresses"
            :key="address.address"
          >
            {{ address.address }}
          </option>
        </select>
        <h5 class="popup-text">To:</h5>
        <input type="text" id="to-email" v-model="emailFields.toEmail" />
        <h5 class="popup-text">Message:</h5>
        <textarea
          name="email-message"
          id="email-message"
          cols="30"
          rows="10"
          placeholder="Start typing your message..."
          v-model="emailFields.emailMessage"
        ></textarea>
        <div class="button-container">
          <button-standard-with-icon
            class="black-outline"
            text="Cancel Email"
            @click="cancelSendEmail()"
          ></button-standard-with-icon>
          <button-standard-with-icon
            class="black-outline"
            text="Send Email"
            @click="confirmSendEmail()"
          ></button-standard-with-icon>
        </div>
      </template>
    </popup-modal>
    <div class="name-and-photo">
      <img
        :src="
          contact.profilePicture
            ? contact.profilePicture
            : defaultProfilePicture
        "
      />
      <div class="name">
        <h5 v-if="contact.businessName" class="business-name">
          <span>{{ contact.businessName }}</span>
        </h5>
        <h5 id="client-name" @click="viewContact()">
          {{ contact.firstName }} <br />
          <span> {{ contact.lastName }}</span>
        </h5>
      </div>
    </div>
    <div class="email-and-phone">
      <h5>{{ contact.phoneNumber }}</h5>
      <h5>{{ contact.emailAddress }}</h5>
    </div>
    <div class="button-wrapper">
      <button-with-drop-down-selections
        text="Actions"
        :actions="actions"
        :clicked="actionsClicked"
      ></button-with-drop-down-selections>
    </div>
  </section>
</template>

<script>
import defaultProfilePicture from "../assets/default-profile-picture.svg";
import ButtonWithDropDownSelections from "./UI/ButtonWithDropDownSelections.vue";
import ButtonStandardWithIcon from "./UI/ButtonStandardWithIcon.vue";
import PopupModal from "./UI/PopupModal.vue";

export default {
  data() {
    return {
      defaultProfilePicture,
      actionsClicked: false,
      composeEmailOpen: false,
      deleteContactOpen: false,
      emailFields: {
        fromEmail: this.emailAddresses,
        toEmail: this.contact.emailAddress,
        emailMessage: undefined,
      },
      actions: [
        {
          title: "View",
          danger: false,
          action: this.viewContact,
        },
        {
          title: "Email",
          danger: false,
          action: this.emailContact,
        },

        {
          title: "Delete",
          danger: true,
          action: this.deleteContact,
        },
      ],
    };
  },
  computed: {
    emailAddresses() {
      return this.$store.state.businessSettings.businessInfo
        .businessEmailAddresses;
    },
  },
  methods: {
    viewContact() {
      this.$router.push("/contacts/" + this.category + "/" + this.contact.id);
    },

    emailContact() {
      this.composeEmailOpen = true;
    },
    cancelSendEmail() {
      this.composeEmailOpen = false;
    },
    confirmSendEmail() {
      console.log(this.emailFields);
    },

    deleteContact() {
      this.deleteContactOpen = true;
    },
    confirmDeleteContact() {
      let category = this.category;
      let id = this.contact.id;
      this.$store.dispatch("deleteContact", { category, id });
      this.deleteContactOpen = false;
    },
    cancelDeleteContact() {
      this.deleteContactOpen = false;
    },
  },
  props: ["contact", "category"],
  components: {
    ButtonWithDropDownSelections,
    PopupModal,
    ButtonStandardWithIcon,
  },
};
</script>

<style scoped>
section {
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
.email-and-phone h5 {
  margin: 3px;
  font-weight: normal;
  text-align: right;
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