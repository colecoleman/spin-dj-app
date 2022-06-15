<template>
  <div class="contact-carousel-contact-item">
    <list-item-style-wrapper hoverable="true" :title="contact.role">
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
import ListItemStyleWrapper from "../SharedComponentsUI/ListItemStyleWrapper.vue";
import PictureAndName from "../SharedComponentsUI/ListComponents/ContactProfilePictureAndName.vue";
import PhoneAndEmail from "../SharedComponentsUI/ListComponents/ContactEmailAndPhoneNumber.vue";
import RoundIconButton from "../SharedComponentsUI/RoundIconButton.vue";

export default {
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
.contact-carousel-contact-item {
  position: relative;
}
</style>
