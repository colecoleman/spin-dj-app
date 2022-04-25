<template>
  <div class="contact-carousel-contact-item">
    <h4 v-if="contact">
      <span>{{ contact.role }}</span>
    </h4>
    <list-item-style-wrapper hoverable="true">
      <picture-and-name :contact="contact" @click="navigateToContactPage()" />
      <phone-and-email :contact="contact" @click="navigateToContactPage()" />
      <round-icon-button
        v-if="userRole === 'admin'"
        svg="x-icon"
        @click="initiateRemoveContact()"
      />
    </list-item-style-wrapper>
  </div>
</template>

<script>
import ListItemStyleWrapper from "../../SharedComponentsUI/ListItemStyleWrapper.vue";
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
  components: {
    PictureAndName,
    PhoneAndEmail,
    RoundIconButton,
    ListItemStyleWrapper,
  },
};
</script>

<style scoped>
@media screen and (min-width: 320px) {
  h4 {
    position: absolute;
    top: 3px;
    left: 25px;
    z-index: 3;
  }
  h4 span {
    background-color: var(--foregroundColor);
    padding: 4px;
  }
  .contact-carousel-contact-item {
    position: relative;
  }
}
@media screen and (min-width: 700px) {
}
@media screen and (min-width: 800px) {
}
</style>
