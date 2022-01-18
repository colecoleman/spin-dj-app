import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index.js";
import dayjs from "dayjs";
import jsPDF from "jspdf";
import maplibregl from "maplibre-gl";
import BaseCard from "./SharedComponents/SharedComponentsUI/BaseCard.vue";
import ButtonStandardWithIcon from "./SharedComponents/SharedComponentsUI/ButtonStandardWithIcon.vue";
import { Amplify, Storage, Auth } from "aws-amplify";
import AmplifyVue from "@aws-amplify/ui-vue";
import awsconfig from "./aws-exports";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  applyPolyfills,
  defineCustomElements,
} from "@aws-amplify/ui-components/loader";
import "@aws-amplify/ui-vue/styles.css";

Amplify.configure(awsconfig);
applyPolyfills().then(() => {
  defineCustomElements(window);
});

const weekday = require("dayjs/plugin/weekday");
const weekOfYear = require("dayjs/plugin/weekOfYear");
dayjs.extend(weekday);
dayjs.extend(weekOfYear);

createApp(App)
  .component("base-card", BaseCard)
  .component("button-standard-with-icon", ButtonStandardWithIcon)
  .use(router)
  .use(store)
  .use(dayjs)
  .use(jsPDF)
  .use(maplibregl)
  .use(Storage)
  .use(Auth)
  .use(Amplify)
  .use(AmplifyVue)
  .mount("#app");
