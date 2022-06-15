<template>
  <list-item-style-wrapper hoverable="true">
    <contact-profile-picture-and-name
      class="client-event-identifier"
      :contact="contact"
    />
    <event-date-time-balance class="event-metadata-identifier" :event="event" />
  </list-item-style-wrapper>
</template>

<script>
import ContactProfilePictureAndName from "../../../SharedComponentsUI/ListComponents/ContactProfilePictureAndName.vue";
import EventDateTimeBalance from "../../../SharedComponentsUI/ListComponents/EventDateTimeBalance.vue";
import ListItemStyleWrapper from "../../../SharedComponentsUI/ListItemStyleWrapper.vue";

export default {
  computed: {
    contact() {
      return this.event.contacts.find((x) => {
        return x.role === "client";
      });
    },
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