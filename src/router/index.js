import { createRouter, createWebHistory } from "vue-router";
import EventManager from '../views/DashboardViews/EventManager.vue';

import ManagerTab from '../navigationItems/ManagerNavigation.vue';
import ConfigTab from '../navigationItems/ConfigNavigation.vue';
import ContactsList from '../views/ContactListPage/ContactsList.vue'
import SpecificContactPageClient from '../views/SpecificContactPage/SpecificClientPage/SpecificContactPageClient.vue';
import SpecificContactPageProspect from '../views/SpecificContactPage/SpecificContactPageProspect.vue';
import SpecificContactPageEmployee from '../views/SpecificContactPage/SpecificContactPageEmployee.vue';
import SpecificContactPageVendor from '../views/SpecificContactPage/SpecificContactPageVendor.vue';
import SpecificContactPageLocation from '../views/SpecificContactPage/SpecificContactPageLocation.vue';
import SpecificContactPageOrganizer from '../views/SpecificContactPage/SpecificContactPageOrganizer.vue';
import SpecificEventPage from '../views/SpecificEventPage/SpecificEventPage.vue';
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

const routes = [
  { 
    path: '/',
    name: "dash",
    component: EventManager
  }, 
  {
  path: '/contacts/',
  name: 'contacts',
  component: ContactsList,
  },
  {
    path: '/contacts/clients/:id',
    name: 'specificContactPageClient',
    component: SpecificContactPageClient
  },
  {
    path: '/contacts/prospects/:id',
    name: 'specificContactPageProspect',
    component: SpecificContactPageProspect
  },
  {
    path: '/contacts/vendors/:id',
    name: 'specificContactPageVendor',
    component: SpecificContactPageVendor
  },
  {
    path: '/contacts/employees/:id',
    name: 'specificContactPageEmployee',
    component: SpecificContactPageEmployee
  },
  {
    path: '/contacts/locations/:id',
    name: 'specificContactPageLocation',
    component: SpecificContactPageLocation
  },
  {
    path: '/contacts/organizers/:id',
    name: 'specificContactPageOrganizer',
    component: SpecificContactPageOrganizer
  },      
  {
    path: '/events/:id',
    name: 'specificEventPage',
    component: SpecificEventPage
  },
  { path: '/config',
    name: 'config',
    components: {navigation: ConfigTab, main: UserSettingsPackages }},
  { path: '/manager',
    name: 'managernav',
    component: { navigation: ManagerTab }},
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
