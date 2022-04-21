<script>
import { Auth, Signer } from "aws-amplify";
import maplibregl from "maplibre-gl";
import Location from "aws-sdk/clients/location";
import awsconfig from "../../aws-exports";

export default {
  data() {
    return {
      loading: true,
      client: null,
      mapInstance: null,
      mapName: "Spin",
      credentials: null,
    };
  },
  computed: {
    place() {
      if (this.address) {
        return `${this.address.streetAddress1}, ${this.address.cityStateZip}`;
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
    createClient() {
      let credentials = this.credentials;
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
        IndexName: "SpinDjAppHere",
        Text: this.place,
      };
      if (this.client) {
        this.client.searchPlaceIndexForText(params, (err, data) => {
          if (err) {
            return;
          }
          if (data) {
            console.log(data);
            if (data.Results && data.Results.length > 0) {
              this.mapInstance = new maplibregl.Map({
                container: this.containerId,
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
      }
    },
  },
  props: ["address", "index", "containerId"],
  beforeMount: async function () {
    this.credentials = await Auth.currentCredentials();
    this.client = await this.createClient();
    this.search();
  },
  beforeUnmount: function () {
    this.mapInstance = null;
    this.place = "";
    this.client = null;
  },
  watch: {
    address(oldAddress, newAddress) {
      if (oldAddress !== newAddress) {
        this.mapInstance = null;
        this.place = "";
        this.search();
      }
    },
  },
};
</script>
