<template>
  <list-item-style-wrapper hoverable="true">
    <contact-profile-picture-and-name
      class="client-event-identifier"
      v-if="matchedClient"
      :contact="matchedClient"
    />
    <event-date-time-balance class="event-metadata-identifier" :event="event" />
  </list-item-style-wrapper>
</template>

<script>
import ContactProfilePictureAndName from "../../../../../SharedComponents/SharedComponentsUI/ListComponents/ContactProfilePictureAndName.vue";
import EventDateTimeBalance from "../../../../../SharedComponents/SharedComponentsUI/ListComponents/EventDateTimeBalance.vue";
import ListItemStyleWrapper from "../../../../../SharedComponents/SharedComponentsUI/ListItemStyleWrapper.vue";

export default {
  data() {
    return {
      matchedClient: undefined,
    };
  },
  methods: {},
  async mounted() {
    this.loading = true;
    let contactId = this.event.contacts[0].key
      ? this.event.contacts[0].key.userId
      : this.event.contacts[0].id;
    await this.$store.dispatch("getUser", contactId).then((res) => {
      this.matchedClient = res;
    });
    this.loading = false;
  },
  props: ["event"],
  components: {
    ContactProfilePictureAndName,
    EventDateTimeBalance,
    ListItemStyleWrapper,
  },
};
</script>

<style scoped>
.event-metadata-identifier >>> * {
  text-align: right;
}
</style>