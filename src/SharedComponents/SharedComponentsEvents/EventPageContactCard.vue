<template>
  <base-card
    :icon="SVGs.InfoIconSVG"
    :actionIcon="userRole === 'admin' ? SVGs.EditPenSVG : ''"
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
      ></event-information-edit>
    </template>
  </base-card>
</template>

<script>
import infoIconSvg from "../../assets/SVGs/info-icon.svg";
import SVGs from "../../assets/SVGs/svgIndex.js";
import helpers from "../../helpers.js";
import EventInformationEdit from "./EventInformationEdit.vue";
import { Auth } from "aws-amplify";

export default {
  data() {
    return {
      SVGs,
      infoIconSvg,
      editCardOpen: false,
      userRole: undefined,
    };
  },
  methods: {
    formatDate: helpers.formatDate,
    formatTime: helpers.formatTime,
    subtotal: helpers.subtotal,
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

<style scoped>
</style>