<template>
  <list-item-style-wrapper :hoverable="true">
    <contact-profile-picture-and-name :contact="contact" />
    <h5 v-if="contact.role">{{ contact.role.toUpperCase() }}</h5>
  </list-item-style-wrapper>
</template>
<script>
import ContactProfilePictureAndName from "../../SharedComponentsUI/ListComponents/ContactProfilePictureAndName.vue";
import ListItemStyleWrapper from "../../SharedComponentsUI/ListItemStyleWrapper.vue";

export default {
  data() {
    return {};
  },
  computed: {},
  methods: {},
  created() {},
  components: {
    ListItemStyleWrapper,
    ContactProfilePictureAndName,
  },
  props: ["contact"],
};
</script>
