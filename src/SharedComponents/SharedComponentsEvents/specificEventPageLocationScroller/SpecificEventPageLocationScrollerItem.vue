<template>
  <div id="specific-event-page-location-scroll-item-wrapper">
    <div
      :class="loading ? 'loading-background map-box' : 'map-box'"
      id="map"
    ></div>

    <div class="address" v-if="location.address">
      <p>{{ location.address.streetAddress1 }}</p>
      <p v-if="location.address.streetAddress2">
        {{ location.address.streetAddress2 }}
      </p>
      <p>{{ location.address.cityStateZip }}</p>
    </div>
    <p class="delete" @click="initiateDeleteLocation()">REMOVE</p>
  </div>
</template>

<script>
import { Auth, Signer } from "aws-amplify";
import maplibregl from "maplibre-gl";
import Location from "aws-sdk/clients/location";
import awsconfig from "../../../aws-exports";
import { formatTime } from "../../../helpers.js";

export default {
  data: function () {
    return {
      loading: true,
      client: null,
      mapInstance: null,
      mapName: "SpinSampleDisplay",
      credentials: null,
    };
  },
  computed: {
    place() {
      if (this.location.address) {
        return `${this.location.address.address1}, ${this.location.address.cityStateZip}`;
      } else {
        return "Unknown Location";
      }
    },
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
        region: "us-east-1",
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
      this.loading = false;
    },
    formatTime,
    initiateDeleteLocation() {
      this.$emit("initiateDeleteLocation");
    },
  },
  props: ["location", "index"],
  emits: ["initiateDeleteLocation"],
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
  z-index: 2;
}

.delete {
  font-weight: 600;
  text-align: right;
  width: 100%;
  cursor: pointer;
  position: absolute;
  bottom: 5px;
  right: 5px;
}

p {
  /* margin: 5px; */
}

.address > h4 {
  font-weight: 400;
}
input {
  z-index: 2;
}

.loading-background {
  background: var(--foregroundColor);
  background: linear-gradient(
    90deg,
    var(--foregroundColor) -50%,
    var(--foregroundColor) 45%,
    var(--backgroundColor) 50%,
    var(--foregroundColor) 55%,
    var(--foregroundColor) 150%
  );
  background-size: 300%;
  -webkit-animation-name: shimmer;
  -moz-animation-name: shimmer;
  animation-name: shimmer;
  -webkit-animation-duration: 2.5s;
  -moz-animation-duration: 2.5s;
  animation-duration: 2.5s;
  -webkit-animation-iteration-count: infinite;
  -moz-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  animation-direction: normal;
}

@keyframes shimmer {
  0% {
    background-position: top right;
  }
  100% {
    background-position: top left;
  }
}

@-moz-keyframes shimmer {
  0% {
    background-position: top left;
  }
  100% {
    background-position: top right;
  }
}
</style>
