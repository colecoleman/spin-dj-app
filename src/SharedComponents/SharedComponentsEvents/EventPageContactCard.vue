<template>
  <base-card
    :icon="SVGs.InfoIconSVG"
    :actionIcon="SVGs.EditPenSVG"
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
        @close-edit-card="toggleEditCard"
      ></event-information-edit>
    </template>
    <template v-slot:content>
      <div id="date">
        <h5></h5>
      </div>
    </template>
  </base-card>
</template>

<script>
import infoIconSvg from "../../assets/SVGs/info-icon.svg";
import SVGs from "../../assets/SVGs/svgIndex.js";
import helpers from "../../helpers.js";
import EventInformationEdit from "./EventInformationEdit.vue";

export default {
  data() {
    return {
      SVGs,
      infoIconSvg,
      editCardOpen: false,
    };
  },

  computed: {
    clientFullName() {
      return this.client.given_name + " " + this.client.family_name;
    },
    possessive() {
      if (this.clientFullName.slice(-1) == "s") {
        return `'`;
      } else {
        return `'s`;
      }
    },
  },
  methods: {
    formatDate: helpers.formatDate,
    formatTime: helpers.formatTime,
    subtotal: helpers.subtotal,
    total: helpers.total,
    balanceOutstanding: helpers.balanceOutstanding,
    formatPrice: helpers.formatPrice,
    toggleEditCard() {
      this.editCardOpen = !this.editCardOpen;
    },
  },
  props: ["client", "event"],
  components: { EventInformationEdit },
};
</script>

<style scoped>
</style>