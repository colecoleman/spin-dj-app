<template>
  <Transition>
    <component
      v-if="activeComponent"
      :is="activeComponent"
      @close="closeComponent"
    />
  </Transition>
  <div id="config-wrapper">
    <item-tile
      v-for="(cat, key, index) in configCategories"
      :key="index"
      class="config-tile"
      @click="activateCategory(cat.component)"
    >
      <p>{{ key }}</p>
      <div class="tile-svg" v-html="cat.svg"></div>
    </item-tile>
  </div>
</template>

<script>
import ItemTile from "../../Components/SharedComponentsUI/ItemTile.vue";
import AdminViewConfigIdentity from "../../Components/AdminComponents/AdminConfigComponents/AdminConfigCards/AdminViewConfigIdentity.vue";
import AdminViewConfigNavigationItems from "../../Components/AdminComponents/AdminConfigComponents/AdminViewConfigNavigationItems.vue";
import AdminViewConfigPackages from "../../Components/AdminComponents/AdminConfigComponents/AdminConfigCards/AdminViewConfigPackages.vue";
import AdminViewConfigServices from "../../Components/AdminComponents/AdminConfigComponents/AdminConfigCards/AdminViewConfigServices.vue";
import AdminViewConfigForms from "../../Components/AdminComponents/AdminConfigComponents/AdminConfigCards/AdminViewConfigForms/AdminViewConfigForms.vue";
import AdminViewConfigAddOns from "../../Components/AdminComponents/AdminConfigComponents/AdminConfigCards/AdminViewConfigAddOns.vue";
import AdminViewConfigAutomations from "../../Components/AdminComponents/AdminConfigComponents/AdminConfigCards/AdminViewConfigAutomations.vue";
import AdminViewConfigContracts from "../../Components/AdminComponents/AdminConfigComponents/AdminConfigCards/AdminViewConfigContracts.vue";
import AdminViewConfigDiscounts from "../../Components/AdminComponents/AdminConfigComponents/AdminConfigCards/AdminViewConfigDiscounts.vue";
import AdminViewConfigPayments from "../../Components/AdminComponents/AdminConfigComponents/AdminConfigCards/AdminViewConfigPayments.vue";
import AdminViewConfigCalendar from "../../Components/AdminComponents/AdminConfigComponents/AdminConfigCards/AdminViewConfigCalendar.vue";
import AdminUpdateSubscription from "../../Components/AdminComponents/AdminConfigComponents/AdminConfigCards/AdminUpdateSubscription.vue";

export default {
  data() {
    return {
      logo: undefined,
      saving: false,
      activeComponent: undefined,
      configCategories: {
        Identity: {
          display: "Identity",
          component: "AdminViewConfigIdentity",
          svg: `<svg xmlns="http://www.w3.org/2000/svg" width="36.001" height="36"  viewBox="0 0 36.001 36"><path id="Icon_awesome-paint-brush" data-name="Icon awesome-paint-brush" fill="currentColor" d="M11.744,21.75A7.116,7.116,0,0,0,4.91,26.834a1.073,1.073,0,0,1-1.026.7C3.1,27.536.688,25.59,0,25.121,0,30.911,2.667,36,9,36c5.334,0,9-3.078,9-8.451a6.092,6.092,0,0,0-.068-.642L11.744,21.75ZM32.2,0a4.294,4.294,0,0,0-2.827,1.157C15,14,13.5,14.3,13.5,18.077a6.509,6.509,0,0,0,.614,2.721L18.6,24.537a6.47,6.47,0,0,0,1.574.213c4.367,0,6.9-3.2,14.847-18.032A7.235,7.235,0,0,0,36,3.484,3.661,3.661,0,0,0,32.2,0Z" transform="translate(0.001)"/></svg>`,
        },
        Packages: {
          display: "Packages",
          component: "AdminViewConfigPackages",
          svg: `<svg xmlns="http://www.w3.org/2000/svg" width="30.289" height="33.164" viewBox="0 0 30.289 33.164"><g id="Icon_feather-package" data-name="Icon feather-package" transform="translate(-2.855 -1.456)"><path id="Path_224" data-name="Path 224" d="M24.75,14.1,11.25,6.315" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/><path id="Path_225" data-name="Path 225" d="M31.5,24V12A3,3,0,0,0,30,9.4l-10.5-6a3,3,0,0,0-3,0L6,9.4A3,3,0,0,0,4.5,12V24A3,3,0,0,0,6,26.595l10.5,6a3,3,0,0,0,3,0l10.5-6A3,3,0,0,0,31.5,24Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/><path id="Path_226" data-name="Path 226" d="M4.905,10.44,18,18.015,31.095,10.44" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/><path id="Path_227" data-name="Path 227" d="M18,33.12V18" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/></g></svg>`,
        },
        Services: {
          display: "Services",
          component: "AdminViewConfigServices",
          svg: `<svg xmlns="http://www.w3.org/2000/svg" width="29.25" height="29.25" viewBox="0 0 29.25 29.25"><g id="Icon_ionic-ios-disc" data-name="Icon ionic-ios-disc" transform="translate(-3.375 -3.375)"><path id="Path_228" data-name="Path 228" d="M18,11.658a6.346,6.346,0,1,0,6.349,6.349A6.347,6.347,0,0,0,18,11.658Zm0,9.183A2.841,2.841,0,1,1,20.841,18,2.842,2.842,0,0,1,18,20.841Z"/><path id="Path_229" data-name="Path 229" d="M18,3.375A14.625,14.625,0,1,0,32.625,18,14.623,14.623,0,0,0,18,3.375Zm0,22.641A8.016,8.016,0,1,1,26.016,18,8.017,8.017,0,0,1,18,26.016Z"/></g></svg>`,
        },
        "Add-Ons": {
          display: "Add-Ons",
          component: "AdminViewConfigAddOns",
          svg: `<svg xmlns="http://www.w3.org/2000/svg" width="40.5" height="36" viewBox="0 0 40.5 36"><path id="Subtraction_1" data-name="Subtraction 1" d="M39.375,36H23.625A1.126,1.126,0,0,1,22.5,34.875V26.654a8.935,8.935,0,0,0,6.4-6.4h.347V27l2.25-1.5L33.75,27V20.25h5.625A1.126,1.126,0,0,1,40.5,21.375v13.5A1.126,1.126,0,0,1,39.375,36Zm-22.5,0H1.125A1.126,1.126,0,0,1,0,34.875v-13.5A1.126,1.126,0,0,1,1.125,20.25H6.75V27L9,25.5,11.25,27V20.25H11.6a8.935,8.935,0,0,0,6.4,6.4v8.221A1.126,1.126,0,0,1,16.875,36Zm-5.21-20.5h0a1.127,1.127,0,0,1-.414-.872V1.125A1.126,1.126,0,0,1,12.375,0H18V6.75l2.25-1.5,2.25,1.5V0h5.625A1.126,1.126,0,0,1,29.25,1.125v13.5a1.122,1.122,0,0,1-.415.871,9.017,9.017,0,0,0-3.174-4.611,8.942,8.942,0,0,0-10.822,0A9.006,9.006,0,0,0,11.666,15.5Z"/><g id="Icon_feather-plus-circle" data-name="Icon feather-plus-circle" transform="translate(9.75 7.5)"><path id="Path_232" data-name="Path 232" d="M18,10.5A7.5,7.5,0,1,1,10.5,3,7.5,7.5,0,0,1,18,10.5Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><path id="Path_233" data-name="Path 233" d="M18,12v6" transform="translate(-7.5 -4.5)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/><path id="Path_234" data-name="Path 234" d="M12,18h6" transform="translate(-4.5 -7.5)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/></g></svg>`,
        },
        Discounts: {
          display: "Discounts",
          component: "AdminViewConfigDiscounts",
          svg: `<svg xmlns="http://www.w3.org/2000/svg" width="45" height="27" viewBox="0 0 45 27"><path id="Subtraction_2" data-name="Subtraction 2" d="M42.75,27H2.25A2.253,2.253,0,0,1,0,24.75V2.25A2.253,2.253,0,0,1,2.25,0h40.5A2.253,2.253,0,0,1,45,2.25v22.5A2.253,2.253,0,0,1,42.75,27Zm-1.125-7.875a4.505,4.505,0,0,0-4.5,4.5h4.5Zm-38.25,0v4.5h4.5a4.506,4.506,0,0,0-4.5-4.5ZM26.5,7.189a1.388,1.388,0,0,0-.851.662l-7.381,10.54c-.339.484-.453.991-.255,1.13l.36.252a.208.208,0,0,0,.123.036,1.392,1.392,0,0,0,.852-.662l7.38-10.54c.339-.484.453-.991.255-1.13l-.36-.252A.21.21,0,0,0,26.5,7.189Zm-2.278,8.694a.44.44,0,0,0-.44.439v.44a.44.44,0,0,0,.44.439H29.5a.44.44,0,0,0,.439-.439v-.44a.44.44,0,0,0-.439-.439ZM15.5,9.545a.44.44,0,0,0-.439.439v.44a.44.44,0,0,0,.439.439h1.978v1.978a.441.441,0,0,0,.44.44h.439a.441.441,0,0,0,.44-.44V10.864h1.978a.44.44,0,0,0,.44-.439v-.44a.44.44,0,0,0-.44-.439H18.8V7.566a.44.44,0,0,0-.44-.439h-.439a.44.44,0,0,0-.44.439V9.545Zm21.623-6.17a4.505,4.505,0,0,0,4.5,4.5v-4.5Zm-33.75,0v4.5a4.506,4.506,0,0,0,4.5-4.5Z"/></svg>`,
        },
        Forms: {
          display: "Forms",
          component: "AdminViewConfigForms",
          svg: `<svg xmlns="http://www.w3.org/2000/svg" width="40.5" height="27" viewBox="0 0 40.5 27"><path id="Icon_awesome-newspaper" data-name="Icon awesome-newspaper" d="M38.813,4.5H6.188A1.687,1.687,0,0,0,4.5,6.188V6.75H1.688A1.687,1.687,0,0,0,0,8.438V27.563A3.937,3.937,0,0,0,3.938,31.5H37.125A3.375,3.375,0,0,0,40.5,28.125V6.188A1.687,1.687,0,0,0,38.813,4.5ZM3.938,28.125a.563.563,0,0,1-.562-.562V10.125H4.5V27.563A.563.563,0,0,1,3.938,28.125ZM20.531,27H9.844A.844.844,0,0,1,9,26.156v-.562a.844.844,0,0,1,.844-.844H20.531a.844.844,0,0,1,.844.844v.563A.844.844,0,0,1,20.531,27Zm14.625,0H24.469a.844.844,0,0,1-.844-.844v-.562a.844.844,0,0,1,.844-.844H35.156a.844.844,0,0,1,.844.844v.563A.844.844,0,0,1,35.156,27ZM20.531,20.25H9.844A.844.844,0,0,1,9,19.406v-.562A.844.844,0,0,1,9.844,18H20.531a.844.844,0,0,1,.844.844v.563A.844.844,0,0,1,20.531,20.25Zm14.625,0H24.469a.844.844,0,0,1-.844-.844v-.562A.844.844,0,0,1,24.469,18H35.156a.844.844,0,0,1,.844.844v.563A.844.844,0,0,1,35.156,20.25Zm0-6.75H9.844A.844.844,0,0,1,9,12.656V9.844A.844.844,0,0,1,9.844,9H35.156A.844.844,0,0,1,36,9.844v2.813A.844.844,0,0,1,35.156,13.5Z" transform="translate(0 -4.5)"/></svg>`,
        },
        Contracts: {
          display: "Contracts",
          component: "AdminViewConfigContracts",
          svg: `<svg xmlns="http://www.w3.org/2000/svg" width="27" height="36" viewBox="0 0 27 36"><path id="Icon_awesome-file-contract" data-name="Icon awesome-file-contract" d="M15.75,9.563V0H1.688A1.683,1.683,0,0,0,0,1.688V34.313A1.683,1.683,0,0,0,1.688,36H25.313A1.683,1.683,0,0,0,27,34.313V11.25H17.438A1.692,1.692,0,0,1,15.75,9.563ZM4.5,5.063A.562.562,0,0,1,5.063,4.5h5.625a.562.562,0,0,1,.563.563V6.188a.562.562,0,0,1-.562.563H5.063A.562.562,0,0,1,4.5,6.188Zm0,4.5A.562.562,0,0,1,5.063,9h5.625a.562.562,0,0,1,.563.563v1.125a.562.562,0,0,1-.562.563H5.063a.562.562,0,0,1-.562-.562ZM18.057,27h3.318a1.125,1.125,0,0,1,0,2.25H18.057a3.023,3.023,0,0,1-2.717-1.678.779.779,0,0,0-.715-.458.767.767,0,0,0-.7.435l-.539,1.079a1.124,1.124,0,0,1-1.006.622c-.027,0-.053,0-.08,0a1.121,1.121,0,0,1-.986-.766l-1.183-3.548-.746,2.242A3.036,3.036,0,0,1,6.5,29.25H5.625a1.125,1.125,0,0,1,0-2.25H6.5a.788.788,0,0,0,.748-.539L8.523,22.62a1.688,1.688,0,0,1,3.2,0l.976,2.928a3.155,3.155,0,0,1,4.641,1A.8.8,0,0,0,18.057,27ZM26.508,7.383,19.624.492A1.686,1.686,0,0,0,18.429,0H18V9h9V8.571A1.682,1.682,0,0,0,26.508,7.383Z"/></svg>`,
        },
        Automations: {
          display: "Automations",
          component: "AdminViewConfigAutomations",
          svg: `<svg xmlns="http://www.w3.org/2000/svg" width="28.269" height="38.87" viewBox="0 0 28.269 38.87"><path id="Icon_material-autorenew" data-name="Icon material-autorenew" d="M20.135,10.334v5.3L27.2,8.567,20.135,1.5V6.8A14.11,14.11,0,0,0,8.191,28.462l2.58-2.58a10.372,10.372,0,0,1-1.237-4.947A10.609,10.609,0,0,1,20.135,10.334Zm11.944,3.074-2.58,2.58a10.583,10.583,0,0,1-9.364,15.548v-5.3L13.067,33.3l7.067,7.067v-5.3A14.11,14.11,0,0,0,32.078,13.408Z" transform="translate(-6 -1.5)"/><text id="A" transform="translate(14.135 25.436)" font-size="15" font-family="Roboto-Medium, Roboto" font-weight="500"><tspan x="-4.991" y="0">A</tspan></text></svg>`,
        },
        Payments: {
          display: "Payments",
          component: "AdminViewConfigPayments",
          svg: `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="24" viewBox="0 0 30 24"><path id="Icon_material-payment" data-name="Icon material-payment" d="M30,6H6A2.977,2.977,0,0,0,3.015,9L3,27a2.99,2.99,0,0,0,3,3H30a2.99,2.99,0,0,0,3-3V9A2.99,2.99,0,0,0,30,6Zm0,21H6V18H30Zm0-15H6V9H30Z" transform="translate(-3 -6)"/></svg>`,
        },
        Calendar: {
          display: "Calendar",
          component: "AdminViewConfigCalendar",
          svg: `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="33" viewBox="0 0 30 33"><g id="Icon_feather-calendar" data-name="Icon feather-calendar" transform="translate(-3 -1.5)"><path id="Path_235" data-name="Path 235" d="M7.5,6h21a3,3,0,0,1,3,3V30a3,3,0,0,1-3,3H7.5a3,3,0,0,1-3-3V9a3,3,0,0,1,3-3Z" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/><path id="Path_236" data-name="Path 236" d="M24,3V9" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/><path id="Path_237" data-name="Path 237" d="M12,3V9" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/><path id="Path_238" data-name="Path 238" d="M4.5,15h27" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/></g></svg>`,
        },
        Subscription: {
          component: "AdminUpdateSubscription",
          svg: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 77.359 159.277"><g id="Group_2" data-name="Group 2" transform="translate(-0.002 0)"><g id="Group_1" data-name="Group 1"><path id="Path_5" data-name="Path 5" d="M672.99,656.086h0a32.939,32.939,0,0,1-1.207-46.567l57.076-60.111h0a32.939,32.939,0,0,1,1.206,46.567Z" transform="translate(-661.757 -549.408)"/><path id="Path_6" data-name="Path 6" d="M672.363,689.981h0a32.939,32.939,0,0,1-1.206-46.567L728.23,583.3h0a32.937,32.937,0,0,1,1.207,46.567l-57.074,60.111Z" transform="translate(-662.103 -530.704)"/></g></g></svg>`,
        },
      },
    };
  },
  methods: {
    async newLogoSelected(logo) {
      this.logo = logo;
    },
    activateCategory(cat) {
      this.activeComponent = cat;
    },
    closeComponent() {
      this.activeComponent = undefined;
    },
  },
  created() {
    console.log(this.$store.state.businessSettings);
  },
  computed: {
    navigationItems() {
      return Object.keys(this.configCategories);
    },
  },
  components: {
    ItemTile,
    AdminViewConfigNavigationItems,
    AdminViewConfigIdentity,
    AdminViewConfigPackages,
    AdminViewConfigServices,
    AdminViewConfigAddOns,
    AdminViewConfigForms,
    AdminViewConfigAutomations,
    AdminViewConfigContracts,
    AdminViewConfigDiscounts,
    AdminViewConfigPayments,
    AdminViewConfigCalendar,
    AdminUpdateSubscription,
  },
};
</script>

<style scoped>
#config-wrapper {
  display: grid;
  padding: 30px 10px;
  grid-template-columns: repeat(auto-fit, minmax(130px, max-content));
  justify-content: center;
  grid-gap: 20px;
}

.config-tile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}

p {
  font-size: 10pt;
  font-weight: 600;
  text-transform: uppercase;
}
.tile-svg {
  max-height: 60%;
  width: 40%;
}
@media screen and (min-width: 800px) {
  #config-wrapper {
    display: grid;
    padding: 40px;
    grid-template-columns: repeat(auto-fit, minmax(130px, max-content));
    justify-content: center;
    grid-gap: 80px;
  }

  .config-tile {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
  }

  p {
    font-size: 10pt;
    font-weight: 600;
    text-transform: uppercase;
  }
}
</style>
