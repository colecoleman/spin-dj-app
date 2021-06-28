import { createRouter, createWebHistory } from "vue-router";
import EventManager from '../views/EventManager.vue';
import SalesManager from '../views/SalesManager.vue';
import AddContact from '../views/AddAssets/AddContact.vue';
import AddEvent from '../views/AddAssets/AddEvent.vue';
import AddProposal from '../views/AddAssets/AddProposal.vue';
import AddVendor from '../views/AddAssets/AddVendor.vue';
import AddLocation from '../views/AddAssets/AddLocation.vue';
import ManagerTab from '../navigationItems/ManagerNavigation.vue';
import ContactTab from '../navigationItems/ContactNavigation.vue';
import ConfigTab from '../navigationItems/ConfigNavigation.vue';
import ContactsList from '../views/ContactsList.vue'
import ContactsTab from '../views/routingPages/ContactsTab.vue';
import SpecificContactPageClient from '../views/specificContactPage/SpecificContactPageClient.vue';
import SpecificContactPageProspect from '../views/specificContactPage/SpecificContactPageProspect.vue';
import SpecificContactPageEmployee from '../views/specificContactPage/SpecificContactPageEmployee.vue';
import SpecificContactPageVendor from '../views/specificContactPage/SpecificContactPageVendor.vue';
import SpecificContactPageLocation from '../views/specificContactPage/SpecificContactPageLocation.vue';
import SpecificContactPageOrganizer from '../views/specificContactPage/SpecificContactPageOrganizer.vue';
import EventsTab from '../views/routingPages/EventsTab.vue';
import SpecificEventPage from '../views/specificEventPage/SpecificEventPage.vue';
import UserSettingsPackages from '../components/userSettings/userSettingsPackages/UserSettingsPackages.vue';
import UserSettingsPackagesAddNew from '../components/userSettings/userSettingsPackages/UserSettingsPackagesAddNew.vue';
import UserSettingsPackagesEditExisting from '../components/userSettings/userSettingsPackages/UserSettingsPackagesEditExisting.vue';
import UserSettingsServices from "../components/userSettings/userSettingsServices/UserSettingsServices.vue";
import UserSettingsServicesAddNew from "../components/userSettings/userSettingsServices/UserSettingsServicesAddNew.vue";
import UserSettingsServicesEditExisting from "../components/userSettings/userSettingsServices/UserSettingsServicesEditExisting.vue";
import UserSettingsEquipment from "../components/userSettings/userSettingsEquipment/UserSettingsEquipment.vue";
import UserSettingsEquipmentAddNew from "../components/userSettings/userSettingsEquipment/UserSettingsEquipmentAddNew.vue";
import UserSettingsEquipmentEditExisting from '../components/userSettings/userSettingsEquipment/UserSettingsEquipmentEditExisting.vue';
import UserSettingsAddOns from "../components/userSettings/userSettingsAddOns/UserSettingsAddOns.vue";
import GeneralSettings from '../components/userSettings/GeneralSettings.vue';
import UserSettingsAddOnsAddNew from "../components/userSettings/userSettingsAddOns/UserSettingsAddOnsAddNew.vue";
import UserSettingsAddOnsEditExisting from "../components/userSettings/userSettingsAddOns/UserSettingsAddOnsEditExisting.vue";
import UserSettingsDataImport from "../components/userSettings/userSettingsDataImport/UserSettingsDataImport.vue";

// import EventSpecificPageAdminView from '../eventViews/eventViewsAdmin/EventSpecificPageAdminView.vue'


const routes = [
  { 
    path: '/',
    name: "dash",
    component: EventManager
  }, {
    path: '/sales',
    name: "sales",
    component: SalesManager
  }, { 
    path: '/contacts/',
    component: ContactsTab,
    children: [
      {
        path: '',
        component: ContactsList
      },
      {
        path: 'clients/:id',
        name: 'specificContactPageClient',
        component: SpecificContactPageClient
      },
      {
        path: 'prospects/:id',
        name: 'specificContactPageProspect',
        component: SpecificContactPageProspect
      },
      {
        path: 'vendors/:id',
        name: 'specificContactPageVendor',
        component: SpecificContactPageVendor
      },
      {
        path: 'employees/:id',
        name: 'specificContactPageEmployee',
        component: SpecificContactPageEmployee
      },
      {
        path: 'locations/:id',
        name: 'specificContactPageLocation',
        component: SpecificContactPageLocation
      },
      {
        path: 'organizers/:id',
        name: 'specificContactPageOrganizer',
        component: SpecificContactPageOrganizer
      },
    ]
  }, {
    path: '/events/',
    component: EventsTab,
    children: [
      {
        path: ':id',
        name: 'specificEventPage',
        component: SpecificEventPage
      }
    ]
  },
  
  { path: '/config',
    name: 'config',
    components: {navigation: ConfigTab, main: UserSettingsPackages }},
  { path: '/manager',
    name: 'managernav',
    component: { navigation: ManagerTab }},
  { path: '/addnewcontact', 
    name: "addNewContact",
    components: { navigation: ContactTab, main: AddContact}},
  { path: '/addnewevent', 
    name: "addNewEvent",
    components: { navigation: ContactTab, main: AddEvent}},
  { path: '/addnewproposal', 
    name: "addNewProposal",
    components: { navigation: ContactTab, main: AddProposal}},
  { path: '/addnewvendor', 
    name: "addNewVendor",
    components: { navigation: ContactTab, main: AddVendor}},
  { path: '/addnewlocation', 
    name: "addNewLocation",
    components: { navigation: ContactTab, main: AddLocation}},
    { path: '/packages',
      name: 'packages',
      components: {navigation: ConfigTab, main: UserSettingsPackages}},
    { path: '/addnewpackage',
      name: 'addnewpackage',
      components: {navigation: ConfigTab, main: UserSettingsPackagesAddNew}},
    { path: '/editpackage/:packageid',
      name: 'editpackage',
      components: {navigation: ConfigTab, main: UserSettingsPackagesEditExisting}},
    { path: '/services',
      name: 'services',
      components: {navigation: ConfigTab, main: UserSettingsServices}},
    { path: '/addnewservice',
      name: 'addnewservice',
      components: {navigation: ConfigTab, main: UserSettingsServicesAddNew}},
    { path: '/editservice/:serviceid',
      name: 'editservice',
      components: {navigation: ConfigTab, main: UserSettingsServicesEditExisting}},
    { path: '/equipment',
      name: 'equipment',
      components: {navigation: ConfigTab, main: UserSettingsEquipment}},
    { path: '/addnewequipment',
      name: 'addnewequipment',
      components: {navigation: ConfigTab, main: UserSettingsEquipmentAddNew}},
    { path: '/editequipment/:equipmentid',
      name: 'editequipment',
      components: {navigation: ConfigTab, main: UserSettingsEquipmentEditExisting}},
    { path: '/addons',
      name: 'addons',
      components: {navigation: ConfigTab, main: UserSettingsAddOns}},
    { path: '/addnewaddon',
      name: 'addnewaddon',
      components: {navigation: ConfigTab, main: UserSettingsAddOnsAddNew}},
    { path: '/editaddon/:addonid',
      name: 'editaddon',
      components: {navigation: ConfigTab, main: UserSettingsAddOnsEditExisting}},
    { path: '/dataimport',
      name: 'dataimport',
      components: {navigation: ConfigTab, main: UserSettingsDataImport}},
    {
      path: '/general/',
      name: "general",
      components: {
        navigation: ConfigTab, main: GeneralSettings
      }
    },

];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
      behavior: 'smooth'
      }
    }
  }
});

export default router;
