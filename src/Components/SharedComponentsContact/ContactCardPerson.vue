<template>
  <base-card
    :svg="icon"
    :title="
      contact ? contact.given_name + ' ' + contact.family_name : 'Contact'
    "
    actionIcon="edit-pen"
    :loading="loading"
    @action-one-clicked="toggleEditCard"
  >
    <template v-slot:content v-if="contact">
      <div id="wrapper" v-if="!loading">
        <profile-picture
          class="profile-picture"
          contact="person"
          :profilePicture="contact.profilePicture"
        />
        <div id="contact-information">
          <p class="contact-contact-information">
            {{ formatPhoneNumber(contact.phoneNumber) }}
          </p>
          <p class="contact-contact-information email" @click="emailContact()">
            {{ contact.email }}
          </p>
        </div>
      </div>
    </template>
  </base-card>
</template>

<script>
import ProfilePicture from "../../assets/ProfilePicture.vue";
import { formatPhoneNumber } from "../../helpers.js";

export default {
  data() {
    return {
      editCardOpen: false,
    };
  },
  methods: {
    formatPhoneNumber,
    toggleEditCard() {
      this.$emit("open-edit-card");
    },
    emailContact() {
      this.$emit("email-contact");
    },
  },
  emits: ["email-contact", "open-edit-card"],
  props: ["contact", "icon", "loading"],
  components: { ProfilePicture },
};
</script>

<style scoped>
#wrapper {
  height: 100%;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  justify-content: left;
  align-items: center;
}

.contact-contact-information {
  margin: 2px;
}

.email {
  cursor: pointer;
  text-decoration: underline;
}

#contact-information {
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}

.profile-picture {
  min-width: 40px;
  max-width: 40px;
  height: 40px;
  margin-right: 10px;
}
</style>