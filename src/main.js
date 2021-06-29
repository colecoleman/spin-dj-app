import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import BaseCard from "./components/UI/BaseCard.vue";
import TheHeader from "./components/Header/TheHeader.vue";
import store from './store/index.js';
import dayjs from "dayjs";
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas'
import vueApexCharts from 'vue3-apexcharts';
import maplibregl from "maplibre-gl";
import Amplify from "@aws-amplify/core";


const weekday = require("dayjs/plugin/weekday");
const weekOfYear = require("dayjs/plugin/weekOfYear");

dayjs.extend(weekday);
dayjs.extend(weekOfYear);



createApp(App)
  .use(router)
  .use(store)
  .use(dayjs)
  .use(vueApexCharts)
  .use(jsPDF)
  .use(maplibregl)
  .use(Amplify)
  .use(html2canvas)
  .mount("#app");


App.component("base-card", BaseCard);
App.component("the-header", TheHeader);
