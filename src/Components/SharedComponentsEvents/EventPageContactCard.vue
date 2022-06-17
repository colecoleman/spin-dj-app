<template>
  <base-card
    svg="info"
    :actionIcon="userRole === 'admin' ? 'edit-pen' : ''"
    :soloHeading="true"
    :title="formatDate(event.data.date)"
    :subtitle="`${formatTime(event.data.startTime)} - ${formatTime(
      event.data.endTime
    )}`"
    @action-one-clicked="toggleEditCard"
  >
  </base-card>
</template>

<script>
import { formatDate, formatTime, subtotal } from "../../helpers.js";

export default {
  computed: {
    userRole() {
      return this.$store.getters.userRole;
    },
  },
  methods: {
    formatDate,
    formatTime,
    subtotal,
    toggleEditCard() {
      this.$emit("edit-card-clicked");
    },
  },
  emits: ["edit-card-clicked"],
  props: ["client", "event"],
};
</script>
