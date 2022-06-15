<template>
  <two-button-dialog-modal
    :modalBody="`Are you sure you want to delete
            ${contact.given_name} ${contact.family_name}?`"
    @select-button-one="confirmDeleteContact"
    @select-button-two="togglePopup"
    @close-modal="togglePopup"
  />
</template>

<script>
import TwoButtonDialogModal from "../../../SharedComponentsUI/TwoButtonDialogModal.vue";
export default {
  methods: {
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
    togglePopup() {
      this.$emit("togglePopup");
    },
  },
  created() {},
  components: {
    TwoButtonDialogModal,
  },
  props: ["contact"],
};
</script>
