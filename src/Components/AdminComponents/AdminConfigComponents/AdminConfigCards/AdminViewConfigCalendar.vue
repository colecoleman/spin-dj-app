
<template>
  <large-floating-card @close="close">
    <div id="wrapper">
      <p class="bold">To Subscribe To Your Company Calendar:</p>
      <p class="bold calendar" id="calendar-link" @click="copy">
        {{ apiCalendarLink }}
      </p>

      <p class="context">
        Copy and paste the above link into the url field of your calendar
        provider's "Add Subscribed Calendar".
      </p>
    </div></large-floating-card
  >
</template>

<script>
import LargeFloatingCard from "../../../SharedComponentsUI/FloatingCards/LargeFloatingCard.vue";
export default {
  data() {
    return {
      copied: false,
      copyError: false,
    };
  },
  computed: {
    apiCalendarLink() {
      return `https://api.spindj.io/calendar/${this.$store.state.user.tenantId}`;
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    copy() {
      this.copied = false;
      this.copyError = false;
      navigator.clipboard.writeText(this.apiCalendarLink);
      this.copied = true;
    },
  },
  emits: ["close"],
  components: { LargeFloatingCard },
};
</script>

<style scoped>
@media screen {
  p {
    font-size: 9pt;
    max-width: 300px;
    text-align: center;
  }

  #wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    max-height: 100%;
    height: 100%;
    overflow-y: scroll;
    padding: 10px;
  }

  .business-information-section {
    width: 100%;
  }

  .business-information-item {
    display: flex;
    flex-direction: column;
    justify-content: left;
    margin-left: 10px;
  }

  .business-information-item > p {
    text-align: left;
  }

  .row-flex {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .calendar {
    cursor: pointer;
  }
  @media (min-width: 850px) {
    .business-information-wrapper {
      flex-direction: row;
    }

    .business-information-section {
      width: 50%;
    }
  }
}
</style>
