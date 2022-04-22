<template>
  <div class="location-identifier">
    <h4 class="venue-name" v-if="location.name">
      {{ location.name }}
    </h4>
    <location-address :location="location" v-if="location.address" />
  </div>
</template>
<script>
import LocationAddress from "./LocationAddress.vue";
export default {
  data() {
    return {};
  },
  methods: {},
  created() {},
  components: { LocationAddress },
  props: ["location"],
};
</script>
<style scoped>
@media screen and (min-width: 320px) {
  .location-identifier {
    font-size: 10pt;
    flex-direction: column;
    justify-content: center;
  }

  .venue-name,
  h4 {
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 12px;
  }

  .venue-name {
    font-size: 9px;
  }
}
@media screen and (min-width: 411px) {
  .venue-name {
    font-size: 0.7em;
  }

  .location-address * {
    font-size: 0.7em;
  }
}
@media screen and (min-width: 475px) {
  .venue-name {
    font-size: 0.8em;
  }

  .location-address * {
    font-size: 0.8em;
    margin: 3px;
  }
}
@media screen and (min-width: 550px) {
  .venue-name {
    font-size: 0.9em;
  }

  .location-address * {
    font-size: 0.8em;
    margin: 3px;
  }
}

@media screen and (min-width: 650px) {
  .venue-name {
    font-size: 1em;
  }

  .location-address * {
    font-size: 0.9em;
    margin: 3px;
  }
}

@media screen and (min-width: 800px) {
  .venue-name {
    font-size: 0.9em;
  }
  .location-address * {
    font-size: 0.8em;
    margin: 3px;
  }
}
</style>