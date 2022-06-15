import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index.js";
import maplibregl from "maplibre-gl";
import BaseCard from "./Components/SharedComponentsUI/BaseCard.vue";
import ButtonStandardWithIcon from "./Components/SharedComponentsUI/ButtonStandardWithIcon.vue";
import { Amplify, Storage, Auth } from "aws-amplify";
import AmplifyVue from "@aws-amplify/ui-vue";
import awsconfig from "./aws-exports";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  applyPolyfills,
  defineCustomElements
} from "@aws-amplify/ui-components/loader";
Amplify.configure(awsconfig);

applyPolyfills().then(() => {
  defineCustomElements(window);
});
import "@aws-amplify/ui-vue/styles.css";

Amplify.configure(awsconfig);
applyPolyfills().then(() => {
  defineCustomElements(window);
});

createApp(App)
  .component("base-card", BaseCard)
  .component("button-standard-with-icon", ButtonStandardWithIcon)
  .use(router)
  .use(store)
  .use(maplibregl)
  .use(Storage)
  .use(Auth)
  .use(Amplify)
  .use(AmplifyVue)
  .mount("#app");
