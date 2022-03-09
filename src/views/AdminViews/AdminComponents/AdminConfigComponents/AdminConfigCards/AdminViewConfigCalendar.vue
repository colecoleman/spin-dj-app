df
<template>
  <two-button-dialog-modal
    v-if="dialogModal"
    :modalBody="dialogModalData[dialogModal].body"
    @select-button-one="dialogModalData[dialogModal].confirmButton"
    @select-button-two="dialogModalData[dialogModal].cancelButton"
    @close-modal="closeDialogModal"
  />
  <base-card title="Calendar">
    <template v-slot:content>
      <div id="wrapper">
        <div class="business-information-wrapper">
          <div class="business-information-section">
            <div class="business-information-item">
              <p class="bold">To Subscribe To Your Company Calendar:</p>
              <p class="bold calendar" id="calendar-link" @click="copy()">
                {{ apiCalendarLink }}
              </p>
              <p class="context" v-if="!copied">Click to copy!</p>
              <p class="context" v-if="copied">Copied!</p>
              <p class="error" v-if="copyError">
                Failed to copy. Manually copy and paste!
              </p>
              <p class="context">
                Copy and paste the above link into the url field of your
                calendar provider's "Add Subscribed Calendar".
              </p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </base-card>
</template>

<script>
import TwoButtonDialogModal from "../../../../../SharedComponents/SharedComponentsUI/TwoButtonDialogModal.vue";

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
    async copy() {
      this.copied = false;
      this.copyError = false;
      await navigator.clipboard.writeText(this.apiCalendarLink);
      this.copied = true;
    },
  },
  components: { TwoButtonDialogModal },
};
</script>

<style scoped>
@media screen {
  p {
    font-size: 9pt;
  }

  .business-information-wrapper {
    display: flex;
    flex-direction: column-reverse;
    flex-wrap: wrap;
    max-height: 100%;
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

  .context {
    margin: 2px;
    text-align: right;
    font-style: italic;
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
