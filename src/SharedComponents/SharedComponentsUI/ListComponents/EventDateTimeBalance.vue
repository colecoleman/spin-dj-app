<template>
  <div class="event-date-time-balance">
    <div class="date-and-time-identifier">
      <p>{{ formatDate(event.data.date) }}</p>
      <p>
        {{ formatTime(event.data.startTime) }} -
        {{ formatTime(event.data.endTime) }}
      </p>
    </div>
    <div
      class="event-invoice-metadata"
      v-if="userRole === 'admin' || userRole === 'client'"
    >
      <p>
        {{ outstandingBalance }}
        Outstanding
      </p>
    </div>
  </div>
</template>
<script>
import {
  balanceOutstanding,
  formatPrice,
  formatDate,
  formatTime,
} from "../../../helpers.js";
export default {
  data() {
    return {};
  },
  computed: {
    userRole() {
      return this.$store.getters.userRole;
    },
    outstandingBalance() {
      return formatPrice(
        balanceOutstanding(this.event.invoice, this.event.data)
      );
    },
  },
  methods: {
    formatDate,
    formatTime,
    balanceOutstanding,
    formatPrice,
  },
  created() {},
  components: {},
  props: ["event"],
};
</script>
<style scoped>
</style>