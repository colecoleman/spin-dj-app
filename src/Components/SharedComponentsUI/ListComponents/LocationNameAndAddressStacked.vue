<template>
  <div class="location-identifier">
    <h4 class="venue-name" v-if="location.name">
      {{ location.name }}
    </h4>
    <skeleton class="venue-name" v-if="!location.name" />
    <location-address :location="location" />
  </div>
</template>
<script>
import Skeleton from "../SkeletonCards/SkeletonText.vue";

import LocationAddress from "./LocationAddress.vue";
export default {
  components: { LocationAddress, Skeleton },
  props: ["location"],
};
</script>
<style scoped>
@media screen and (min-width: 320px) {
  .location-identifier {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .venue-name {
    white-space: nowrap;
    max-width: 100%;
    font-size: 8pt;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

@media screen and (min-width: 550px) {
  .venue-name {
    font-size: 8pt;
  }
}

@media screen and (min-width: 1200px) {
  .venue-name {
    font-size: 9pt;
  }
}
</style>
