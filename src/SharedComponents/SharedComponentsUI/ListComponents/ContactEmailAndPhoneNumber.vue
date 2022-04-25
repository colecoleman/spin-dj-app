<template>
  <div>
    <p>{{ phoneNumber }}</p>
    <p>{{ contact.email }}</p>
  </div>
</template>
<script>
import { formatPhoneNumber } from "../../../helpers.js";
export default {
  data() {
    return {};
  },
  computed: {
    phoneNumber() {
      return formatPhoneNumber(this.contact.phoneNumber);
    },
  },
  created() {},
  components: {},
  props: ["contact"],
};
</script>
<style scoped>
div {
  overflow: hidden;
}
p {
  /* margin: 3px; */
  font-size: 0.6em;
  font-weight: normal;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 5px;
}
</style>