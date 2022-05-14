<template>
  <list-item-style-wrapper hoverable="true" @click="eventClicked(event)">
    <p class="title">{{ eventTitle }}</p>
    <p class="date">{{ eventDate }}</p>
    <p class="form-count">{{ formCount }}</p>
  </list-item-style-wrapper>
</template>
<script>
import { formatDate } from "../../../../helpers.js";
import ListItemStyleWrapper from "../../../../SharedComponents/SharedComponentsUI/ListItemStyleWrapper.vue";
export default {
  data() {
    return {};
  },
  methods: {
    eventClicked(event) {
      this.$emit("event-clicked", event);
    },
  },
  computed: {
    eventTitle() {
      return this.event.title ? this.event.title : "Event";
    },
    eventDate() {
      return formatDate(this.event.data.startTime);
    },
    formCount() {
      return `${this.event.forms.length} Forms`;
    },
  },
  components: { ListItemStyleWrapper },
  emits: ["event-clicked"],
  props: ["event"],
};
</script>
<style scoped>
p {
  width: 31%;
  font-weight: 500;
  overflow: hidden;
}

.title {
  text-align: left;
}

.form-count {
  text-align: right;
}
</style>