<template>
  <base-card svg="health-icon" title="Prospect Health">
    <template v-slot:content>
      <div id="prospect-health-wrapper">
        <div class="prospect-status-wrapper">
          <h4>Status:</h4>
          <div class="prospect-status-text">
            <h5>{{ prospect.status }}</h5>
          </div>
        </div>
        <div class="prospect-contact-wrapper">
          <h4>Last Contact:</h4>
          <!-- <h5>{{ formatDate(prospect.lastContact) }}</h5> -->
          <h4>Projected Value:</h4>
          <h5>
            <!-- ${{
              (prospect.eventDetails.projectedValue * 0.01).toLocaleString()
            }} -->
          </h5>
        </div>
      </div>
    </template>
  </base-card>
</template>

<script>
import { formatDate, formatTime } from "../../../../../helpers.js";

export default {
  methods: {
    formatDate,
    formatTime,
  },
  props: ["prospect"],
};
</script>

<style scoped>
.prospect-status-wrapper,
.prospect-contact-wrapper {
  text-align: left;
}

.prospect-status-text {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>