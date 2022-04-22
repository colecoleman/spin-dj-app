<template>
  <div class="contact-carousel-item-wrapper">
    <h4>
      <span>{{ contact.role }}</span>
    </h4>
    <div class="contact-carousel-contact-item">
      <picture-and-name :contact="contact" @click="navigateToContactPage()" />

      <phone-and-email :contact="contact" @click="navigateToContactPage()" />
      <round-icon-button svg="x-icon" @click="initiateRemoveContact()" />
    </div>
  </div>
</template>

<script>
import PictureAndName from "../../SharedComponentsUI/ListComponents/ContactProfilePictureAndName.vue";
import PhoneAndEmail from "../../SharedComponentsUI/ListComponents/ContactEmailAndPhoneNumber.vue";
import RoundIconButton from "../../SharedComponentsUI/RoundIconButton.vue";

export default {
  data() {
    return {
      profilePictureStyling: "width: 55px; height: 55px; margin-right: 10px;",
    };
  },
  computed: {
    userRole() {
      return this.$store.getters.userRole;
    },
  },
  methods: {
    async navigateToContactPage() {
      if (this.userRole === "admin") {
        this.$router.push(
          `/${this.userRole}/contacts/${this.contact.role}s/${this.contact.userId}`
        );
      }
    },
    initiateRemoveContact() {
      this.$emit("initiateRemoveContact");
    },
  },
  emits: ["initiateRemoveContact"],
  props: ["contact"],
  components: { PictureAndName, PhoneAndEmail, RoundIconButton },
};
</script>

<style scoped>
@media screen and (min-width: 320px) {
  .contact-carousel-item-wrapper {
    width: calc(100% - 20px);
    box-sizing: border-box;
    padding: 5px;
    margin: 10px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    position: relative;
  }

  h4 {
    position: absolute;
    top: -3px;
    left: 15px;
    z-index: 3;
  }
  h4 span {
    background-color: var(--foregroundColor);
    padding: 4px;
  }

  .contact-carousel-contact-item {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: 1px solid var(--cardOutline);
    border-radius: 10px;
    filter: drop-shadow(0px 1px 1px var(--cardOutline));
    background-color: var(--foregroundColor);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
@media screen and (min-width: 700px) {
}
@media screen and (min-width: 800px) {
}
</style>
