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
  max-width: 100%;
}
p {
  /* margin: 3px; */
  font-size: 8px;
  max-width: 100%;
  font-weight: normal;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 5px;
}

.skeleton {
  width: 50%;
}

@media screen and (min-width: 411px) {
}
@media screen and (min-width: 475px) {
  p {
    font-size: 9px;
  }
}
@media screen and (min-width: 550px) {
  p {
    font-size: 10px;
  }
}
@media screen and (min-width: 650px) {
  p {
    font-size: 10px;
  }
}
@media screen and (min-width: 1200px) {
  /* p {
    font-size: 13px;
  } */
}
</style>
