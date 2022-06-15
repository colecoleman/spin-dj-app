<template>
  <div class="single-event-item">
    <div class="client-event-identifier">
      <skeleton-contact />
    </div>
    <div class="event-location-identifier">
      <skeleton-location />
    </div>
    <div class="event-metadata-identifier">
      <skeleton-event />
    </div>
  </div>
</template>
<script>
import SkeletonLocation from "./SkeletonLocationListItem.vue";
import SkeletonContact from "./SkeletonProfilePictureName.vue";
import SkeletonEvent from "./SkeletonUpcomingEventInformation.vue";
// import ProfilePicture from "../../../assets/ProfilePicture.vue";
export default {
  data() {
    return {
      svgStyling: "height: 30px; width: 30px; margin: 5px;",
    };
  },
  components: {
    // ProfilePicture,
    SkeletonLocation,
    SkeletonContact,
    SkeletonEvent,
  },
};
</script>
<style scoped>
.client-event-identifier,
.event-location-identifier,
.event-metadata-identifier {
  display: flex;
  height: 70px;
  max-width: 33%;
  width: 33%;
}
.single-event-item {
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--cardOutline);
  cursor: pointer;
}

.client-event-identifier {
  flex-direction: row;
  align-items: center;
}

.client-event-identifier img {
  height: 40px;
  margin: 10px;
}

.skeleton {
  background-color: var(--textColor);
  width: 100px;
  height: 9px;
  border-radius: 3px;
}

.event-location-identifier,
.date-and-time-identitfier {
  flex-direction: column;
  align-items: center;
}

.event-metadata-identifier {
  flex-direction: column;
  align-items: flex-end;
}

.client-name > .skeleton {
  width: 70px;
  height: 9pt;
  margin: 2px 0px;
}

.client-name {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

.venue-address {
  height: 10px;
  margin: 5px 0px;
}

.venue-name {
  height: 12px;
  margin: 5px 0px;
}

.date-and-time {
  margin: 5px 0px;
}
</style>