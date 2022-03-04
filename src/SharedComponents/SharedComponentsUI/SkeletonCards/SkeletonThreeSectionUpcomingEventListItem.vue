<template>
  <div class="single-event-item">
    <div class="client-event-identifier">
      <profile-picture contact="person" :customStyle="svgStyling" />
      <div class="client-name">
        <h5 class="skeleton"></h5>
        <h5 class="skeleton"></h5>
      </div>
    </div>
    <div class="event-location-identifier">
      <h4 class="venue-name skeleton"></h4>
      <p class="venue-address skeleton"></p>
      <p class="venue-address skeleton"></p>
    </div>
    <div class="event-metadata-identifier">
      <p class="date-and-time skeleton"></p>
      <p class="date-and-time skeleton"></p>
      <p class="invoice-data skeleton"></p>
    </div>
  </div>
</template>
<script>

import ProfilePicture from "../../../assets/ProfilePicture.vue";
export default {
  data() {
    return {

      svgStyling: "height: 40px; margin: 10px;",
    };
  },
  components: { ProfilePicture },
};
</script>
<style scoped>
.client-event-identifier,
.event-location-identifier,
.event-metadata-identifier {
  display: flex;
  flex: 1;
}
.single-event-item {
  display: flex;
  width: 100%;
  min-height: 100px;
  height: 100px;
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