import { createRouter, createWebHistory } from "vue-router";
import EventManager from '../views/AdminViews/AdminViewDashboard/EventManager.vue';
import ContactsList from '../views/AdminViews/AdminViewContactList/ContactsList.vue'
import SpecificContactPageClient from '../views/AdminViews/AdminViewSpecificContactPage/SpecificClientPage/SpecificContactPageClient.vue';
import SpecificContactPageProspect from '../views/AdminViews/AdminViewSpecificContactPage/SpecificContactPageProspect.vue';
import SpecificContactPageEmployee from '../views/AdminViews/AdminViewSpecificContactPage/SpecificContactPageEmployee.vue';
import SpecificContactPageVendor from '../views/AdminViews/AdminViewSpecificContactPage/SpecificContactPageVendor.vue';
import SpecificContactPageLocation from '../views/AdminViews/AdminViewSpecificContactPage/SpecificContactPageLocation.vue';
import SpecificContactPageOrganizer from '../views/AdminViews/AdminViewSpecificContactPage/SpecificContactPageOrganizer.vue';
import SpecificEventPage from "../views/AdminViews/AdminViewSpecificEventPage/SpecificEventPage.vue";

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
