<template>
  <base-card
    actionIcon="x-icon"
    @action-one-clicked="closeSingleDayView"
    :title="displayableDate"
  >
    <template v-slot:content>
      <div id="single-day-scroll-container">
        <single-day-view-item
          v-for="event in eventsOnDay"
          :key="event.id"
          :event="event"
          @click="navigateToEventPage(event.userId)"
        />
      </div>
    </template>
  </base-card>
</template>


<script>
import BaseCard from "../../SharedComponentsUI/BaseCard.vue";
import SingleDayViewItem from "../SingleDayView/SingleDayViewItem.vue";

export default {
  methods: {
    navigateToEventPage(id) {
      this.$router.push("/admin/events/" + id);
    },
    closeSingleDayView() {
      this.$emit("closeSingleDayView");
    },
  },
  computed: {
    displayableDate() {
      return this.date.toLocaleDateString("lookup", {
        weekday: "long",
        month: "long",
        year: "numeric",
        day: "numeric",
      });
    },
    eventsOnDay() {
      return this.events.filter((event) => {
        return (
          new Date(event.data.date).getTime() == new Date(this.date).getTime()
        );
      });
    },
  },
  props: ["date", "events"],
  components: { SingleDayViewItem, BaseCard },
};
</script>

<style scoped>
#single-day-view-wrapper {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

h5 {
  margin: 10px;
}

#single-day-scroll-container {
  /* height: 100%; */
  overflow: scroll;
}
</style>