<template>
  <base-card
    svg="info"
    :actionIcon="userRole === 'admin' ? 'edit-pen' : ''"
    :loading="loading"
    :title="formatDate(event.data.date)"
    :subtitle="`${formatTime(event.data.startTime)} - ${formatTime(
      event.data.endTime
    )}`"
    @action-one-clicked="toggleEditCard"
  >
    <template v-slot:dropdownContainer>
      <event-information-edit
        v-if="editCardOpen"
        :event="event"
        @edit-event="editEvent"
        @close-edit-card="toggleEditCard"
      />
    </template>
  </base-card>
</template>

<script>
import { formatDate, formatTime, subtotal } from "../../helpers.js";
import EventInformationEdit from "./EventInformationEdit.vue";
import { Auth } from "aws-amplify";

export default {
  data() {
    return {
      editCardOpen: false,
      userRole: undefined,
    };
  },
  methods: {
    formatDate,
    formatTime,
    subtotal,
    toggleEditCard() {
      this.editCardOpen = !this.editCardOpen;
    },
    editEvent(payload) {
      this.$emit("editEvent", payload);
    },
  },
  props: ["client", "event"],
  async created() {
    let user = await Auth.currentAuthenticatedUser();
    this.userRole = user.attributes["custom:role"];
  },
  components: { EventInformationEdit },
};
</script>
