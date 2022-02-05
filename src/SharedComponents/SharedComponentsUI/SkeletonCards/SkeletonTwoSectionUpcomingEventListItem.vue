<template>
  <div class="single-event-item">
    <div class="event-location-identifier">
      <div class="venue-name">
        <h4 class="skeleton"></h4>
      </div>
      <div class="venue-address">
        <p class="skeleton"></p>
        <p class="skeleton"></p>
      </div>
    </div>
    <div class="event-metadata-identifier">
      <div class="date-and-time-identifier">
        <p class="skeleton"></p>
        <p class="skeleton"></p>
      </div>
      <div class="event-invoice-metadata">
        <p class="skeleton"></p>
      </div>
    </div>
  </div>
</template>
<style scoped>
.event-location-identifier,
.event-metadata-identifier {
  display: flex;
}

.client-event-identifier img {
  height: 40px;
  width: 40px;
  margin: 10px;
}
.client-name {
  display: flex;
  flex-direction: column;
  text-align: left;
  text-transform: uppercase;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.event-location-identifier {
  flex-direction: column;
  justify-content: center;
}

.venue-name {
  overflow: hidden;
  text-overflow: ellipsis;
}

h5 {
  font-weight: 300;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-transform: capitalize;
}

h5 span {
  font-weight: 600;
}

.event-metadata-identifier {
  flex-direction: column;
  font-size: 10pt;
  justify-content: right;
  justify-items: right;
}

.skeleton {
  background-color: var(--textColor);
  margin: 3px;
  width: 100px;
}

.venue-name > .skeleton {
  height: 16px;
}

.venue-address > .skeleton {
  height: 10px;
}

.date-and-time-identifier .event-invoice-metadata {
  height: 10px;
}

.single-event-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--cardOutline);
  cursor: pointer;
}

.event-location-identifier {
  font-size: 10pt;
  flex-direction: column;
  justify-content: center;
}

.event-metadata-identifier {
  flex-direction: column;
  font-size: 10pt;
  text-align: right;
}

.skeleton {
  background-color: var(--textColor);
  margin: 3px;
  width: 100px;
}

.venue-name > .skeleton {
  height: 16px;
  margin: 0px;
}

.venue-address > .skeleton {
  height: 10px;
  margin: 10px 0px;
}

.date-and-time-identifier > .skeleton,
.event-invoice-metadata > .skeleton {
  height: 10px;
  margin: 10px 0px;
}
</style>