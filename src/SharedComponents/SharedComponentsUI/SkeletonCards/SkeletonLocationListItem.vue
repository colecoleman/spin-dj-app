<template>
  <div class="skeleton-location-identifier">
    <div class="venue-name skeleton"></div>
    <div class="venue-address skeleton"></div>
    <div class="venue-address skeleton"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {},
  created() {},
  components: {},
  props: [],
};
</script>
<style scoped>
.skeleton {
  background-color: var(--textColor);
  width: 100px;
  height: 9px;
  border-radius: 3px;
}

.skeleton-location-identifier {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.venue-address {
  height: 10px;
  margin: 5px 0px;
}

.venue-name {
  height: 12px;
  margin: 5px 0px;
}
</style>