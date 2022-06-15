<template>
  <div class="event-date-time-balance">
    <p>{{ formatDate(event.data.date) }}</p>
    <p>
      {{ formatTime(event.data.startTime) }} -
      {{ formatTime(event.data.endTime) }}
    </p>
    <p v-if="userRole === 'admin' || userRole === 'client'">
      {{ outstandingBalance }}
      Outstanding
    </p>
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
p {
  font-size: 8px;
  margin: 7px;
}

.event-date-time-balance {
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media screen and (min-width: 475px) {
  p {
    font-size: 9px;
    margin: 5px;
  }
}
@media screen and (min-width: 550px) {
  p {
    font-size: 10px;
  }
}
@media screen and (min-width: 650px) {
  p {
    font-size: 10px;
  }
}
@media screen and (min-width: 1200px) {
  p {
    /* font-size: 13px; */
    margin: 5px;
  }
}
</style>
