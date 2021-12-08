import { createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import store from './store/index.js';
import dayjs from "dayjs";
import jsPDF from 'jspdf';
import maplibregl from "maplibre-gl";
import BaseCard from './SharedComponents/SharedComponentsUI/BaseCard.vue';
import Amplify from "aws-amplify";
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

import 'maplibre-gl/dist/maplibre-gl.css'

const weekday = require("dayjs/plugin/weekday");
const weekOfYear = require("dayjs/plugin/weekOfYear");

dayjs.extend(weekday);
dayjs.extend(weekOfYear);



createApp(App)
  .component('base-card', BaseCard)
  .use(router)
  .use(store)
  .use(dayjs)
  .use(jsPDF)
  .use(maplibregl)
  .use(Amplify)
  // .use(html2canvas)
  .mount("#app");


