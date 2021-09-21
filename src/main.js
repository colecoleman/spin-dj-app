import { createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import store from './store/index.js';
import dayjs from "dayjs";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'
import vueApexCharts from 'vue3-apexcharts';
import maplibregl from "maplibre-gl";
import BaseCard from './SharedComponents/SharedComponentsUI/BaseCard.vue';
import Amplify from "aws-amplify";
// import Location from 'aws-sdk/clients/location';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

import 'maplibre-gl/dist/maplibre-gl.css'

// const createClient = async () => {
//     const credentials = await Auth.currentCredentials();
//     const client = new Location({
//         credentials,
//         region: awsconfig.aws_project_region,
//    });
//    return client;
// }
// console.log(createClient)

// const identityPoolId = 'us-east-2:a62d04ff-5884-44f9-847d-fdc319aba576';
// const mapName = 'SampleMap';
// const credentials = new AWS.CognitoIdentityCredentials({IdentityPoolId: identityPoolId})

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


