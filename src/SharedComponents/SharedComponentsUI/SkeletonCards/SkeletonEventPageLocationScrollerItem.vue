<template>
  <div id="specific-event-page-location-scroll-item-wrapper">
    <div class="skeleton" id="map"></div>
    <div class="address">
      <p class="skeleton"></p>
      <p class="skeleton"></p>
    </div>
  </div>
</template>

<style scoped>
#map {
  border-radius: 10px;
  width: 80%;
  height: 75px;
  margin: 10px;
  min-height: 50%;
}

.skeleton {
  background-color: var(--textColor);
}

p.skeleton {
  height: 9pt;
  width: 100px;
}
</style>
