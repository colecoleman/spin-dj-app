<template>
  <div class="location-address" v-if="location.address">
    <p>{{ location.address.streetAddress1 }}</p>
    <p>{{ location.address.cityStateZip }}</p>
  </div>
  <div class="location-address" v-if="!location.address">
    <skeleton class="skeleton" />
    <skeleton class="skeleton" />
  </div>
</template>
<script>
import Skeleton from "../SkeletonCards/SkeletonText.vue";
export default {
  props: ["location"],
  components: { Skeleton },
};
</script>
<style scoped>
.location-address {
  overflow: hidden;
}
p {
  /* margin: 3px; */
  font-size: 7pt;
  font-weight: normal;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 5px;
}

.skeleton {
  width: 80px;
}
</style>
