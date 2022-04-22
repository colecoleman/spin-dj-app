<template>
  <div class="location-address">
    <p>{{ location.address.streetAddress1 }}</p>
    <p>{{ location.address.cityStateZip }}</p>
  </div>
</template>
<script>
export default {
  props: ["location"],
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
