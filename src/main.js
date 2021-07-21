import { createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import store from './store/index.js';
import dayjs from "dayjs";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'
import vueApexCharts from 'vue3-apexcharts';
import maplibregl from "maplibre-gl";
import Amplify from "@aws-amplify/core";
import BaseCard from './SharedComponents/SharedComponentsUI/BaseCard.vue';


const weekday = require("dayjs/plugin/weekday");
const weekOfYear = require("dayjs/plugin/weekOfYear");

dayjs.extend(weekday);
dayjs.extend(weekOfYear);



createApp(App)
  .component('base-card', BaseCard)
  .use(router)
  .use(store)
  .use(dayjs)
  .use(vueApexCharts)
  .use(jsPDF)
  .use(maplibregl)
  .use(Amplify)
  .use(html2canvas)
  .mount("#app");


