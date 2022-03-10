<template>
  <div class="contact-carousel-item-wrapper">
    <div id="contact-carousel-item-title-and-picture">
      <h4>{{ contact.role }}</h4>
      <profile-picture
        contact="person"
        :profilePicture="contact.profilePicture"
        @clicked="navigateToContactPage(contact)"
      />
    </div>
    <div
      id="contact-carousel-item-name"
      @click="navigateToContactPage(contact)"
    >
      <h5>{{ contact.given_name }}</h5>
      <h5>
        <span>{{ contact.family_name }}</span>
      </h5>
    </div>

    <div id="contact-carousel-item-contact-information">
      <p>{{ contact.phoneNumber }}</p>
      <p>{{ contact.email }}</p>
    </div>
    <p class="delete" @click="initiateRemoveContact">REMOVE</p>
  </div>
</template>

<script>
import ProfilePicture from "../../../assets/ProfilePicture.vue";
import { Auth } from "aws-amplify";
export default {
  data() {
    return {
      profilePictureStyling: "width: 55px; height: 55px; margin-right: 10px;",
    };
  },
  methods: {
    async navigateToContactPage(contact) {
      let user = await Auth.currentAuthenticatedUser();
      console.log(user.attributes["custom:role"]);
      let role = user.attributes["custom:role"];
      if (role === "admin") {
        this.$router.push(
          `/${role}/contacts/${contact.role}s/${contact.userId}`
        );
      }
    },
    initiateRemoveContact() {
      this.$emit("initiateRemoveContact");
    },
  },
  emits: ["initiateRemoveContact"],
  props: ["contact"],
  components: { ProfilePicture },
};
</script>

<style scoped>
@media screen and (min-width: 320px) {
  .contact-carousel-item-wrapper {
    width: 150px;
    /* height: 95%; */
    padding: 5%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }

  img {
    width: 40px;
    height: 40px;
    padding: 10px;
    object-fit: cover;
    border-radius: 50%;
  }

  h5 {
    font-weight: 300;
    margin: 2px;
    text-transform: uppercase;
  }

  h5 span {
    font-weight: 600;
  }

  p {
    font-size: 8pt;
    margin: 5px;
  }

  .delete {
    font-weight: 600;
    width: 100%;
    cursor: pointer;
  }
}
@media screen and (min-width: 700px) {
  img {
    padding: 5px;
  }
}
@media screen and (min-width: 800px) {
  img {
    width: 65px;
    height: 65px;
    padding: 10px;
  }
}
</style>
