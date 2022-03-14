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
import TwoButtonDialogModal from "../../../../../SharedComponents/SharedComponentsUI/TwoButtonDialogModal.vue";
export default {
  data() {
    return {};
  },
  methods: {
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
        category: this.contact.role,
        id: this.contact.userId,
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
