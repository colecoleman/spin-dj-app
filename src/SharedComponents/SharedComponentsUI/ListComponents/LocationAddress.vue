<template>
  <div class="location-address">
    <p v-if="location.address">{{ location.address.streetAddress1 }}</p>
    <skeleton v-if="!location.address" class="skeleton" />
    <skeleton v-if="!location.address" class="skeleton" />
    <p v-if="location.address">{{ location.address.cityStateZip }}</p>
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
