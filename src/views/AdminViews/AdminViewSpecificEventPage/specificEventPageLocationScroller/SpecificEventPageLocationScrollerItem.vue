<template>
  <div id="specific-event-page-location-scroll-item-wrapper">
    <h4>{{ location.venueName }}</h4>
    <!-- <p>
      {{ formatTime(location.venueStartTime) }} -
      {{ formatTime(location.venueEndTime) }}
    </p> -->
    <div class="map-box" id="map">
      <!-- <VueMapboxMap
        v-if="mapInstance"
        :map="mapInstance"
        :lng="lng"
        :lat="lat"
      ></VueMapboxMap> -->
    </div>
    <div class="address">
      <h4>{{ location.address1 }}</h4>
      <h4>{{ location.address2 }}</h4>
    </div>
  </div>
</template>

<script>
import { Auth, Signer } from "aws-amplify";
// import VueMapboxMap from "@benchmark-urbanism/vue-mapbox-map";
import maplibregl from "maplibre-gl";
import Location from "aws-sdk/clients/location";
import awsconfig from "../../../../aws-exports";
import helpers from "../../../../helpers.js";

export default {
  data: function () {
    return {
      place: "5535 Hwy N, Cottleville, MO 63304",
      client: null,
      mapInstance: null,
      mapName: "SpinSampleDisplay",
      credentials: null,
    };
  },
  methods: {
    transformRequest(url, resourceType) {
      if (resourceType === "Style" && !url.includes("://")) {
        // resolve to an AWS URL
        url = `https://maps.geo.${awsconfig.aws_project_region}.amazonaws.com/maps/v0/maps/${url}/style-descriptor`;
      }
      if (url.includes("amazonaws.com")) {
        // only sign AWS requests (with the signature as part of the query string)
        return {
          url: Signer.signUrl(url, {
            access_key: this.credentials.accessKeyId,
            secret_key: this.credentials.secretAccessKey,
            session_token: this.credentials.sessionToken,
          }),
        };
      }
      // don't sign

      return { url };
    },
    createClient: async () => {
      const credentials = await Auth.currentCredentials();
      const client = new Location({
        credentials,
        region: "us-east-2",
      });
      return client;
    },
    search() {
      if (!this.place || this.place.length === 0) {
        return;
      }
      const params = {
        IndexName: "SpinDJApp",
        Text: this.place,
      };
      this.client.searchPlaceIndexForText(params, (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        if (data) {
          if (data.Results && data.Results.length > 0) {
            this.mapInstance = new maplibregl.Map({
              container: "map",
              style: this.mapName,
              center: [
                data.Results[0].Place.Geometry.Point[0],
                data.Results[0].Place.Geometry.Point[1],
              ],
              zoom: 12.5,
              scrollZoom: false,
              draggable: false,
              transformRequest: this.transformRequest,
            });
          }
        }
      });
    },
    formatTime: helpers.formatTime,
  },
  props: ["location"],
  components: {
    // VueMapboxMap,
  },
  beforeMount: async function () {
    this.client = await this.createClient();
    this.credentials = await Auth.currentCredentials();
    this.search();
  },
  beforeUnmount: function () {
    this.mapInstance = null;
    this.place = "";
    this.client = null;
  },
};
</script>

<style scoped>
#specific-event-page-location-scroll-item-wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.map-box {
  border: 1px solid white;
  border-radius: 10px;
  width: 80%;
  height: 75px;
  margin: 10px;
  min-height: 50%;
  z-index: 3;
}

p {
  margin: 5px;
}

.address > h4 {
  font-weight: 400;
}
input {
  z-index: 2;
}
</style>