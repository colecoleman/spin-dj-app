import { createRouter, createWebHistory } from "vue-router";
import { Auth } from "aws-amplify";
import SignUpPage from '../views/PublicViews/SignUpPage.vue';
import LoginPage from '../views/PublicViews/LoginPage.vue';
import ForgotPage from '../views/PublicViews/ForgotPage.vue';
import AdminViewInitialSetup from '../views/AdminViews/AdminViewInitialSetup.vue'
import AdminView from '../views/AdminViews/AdminView.vue';
import EventManager from '../views/AdminViews/AdminViewDashboard/EventManager.vue';
import ContactsList from '../views/AdminViews/AdminViewContactList/ContactsList.vue';
import AdminConfigurationPage from '../views/AdminViews/AdminViewConfig/AdminViewConfigPage.vue';
import SpecificContactPageClient from '../views/AdminViews/AdminViewSpecificContactPage/SpecificClientPage/SpecificContactPageClient.vue';
import SpecificContactPageProspect from '../views/AdminViews/AdminViewSpecificContactPage/SpecificProspectPage/SpecificContactPageProspect.vue';
import SpecificContactPageEmployee from '../views/AdminViews/AdminViewSpecificContactPage/SpecificContactPageEmployee.vue';
import SpecificContactPageVendor from '../views/AdminViews/AdminViewSpecificContactPage/SpecificVendorPage/SpecificContactPageVendor.vue';
import SpecificContactPageLocation from '../views/AdminViews/AdminViewSpecificContactPage/SpecificLocationPage/SpecificContactPageLocation.vue';
import SpecificContactPageOrganizer from '../views/AdminViews/AdminViewSpecificContactPage/SpecificContactPageOrganizer.vue';
import SpecificEventPage from "../views/AdminViews/AdminViewSpecificEventPage/SpecificEventPage.vue";
import AdminViewCreateEvent from '../views/AdminViews/AdminViewCreate/AdminViewCreateEvent.vue';



const routes = [
  
  {
    path: '/',
    name: 'index', 
    async beforeEnter(to, from ,next) {
      try {
        let user = await Auth.currentAuthenticatedUser().then(
          (results) => {
            console.log(results)
            if (
              user.signInUserSession.idToken.payload[`cognito:groups`].includes("admins") 
            ) {
              next({path: '/admin/dash'})
    
            } else {
              next({name: 'loginPage'})
            }
          }
        );
        
      } catch (e) {
        this.$store.dispatch('addError', "Please login!");
        next({name: 'loginPage'})
      }
    }
  },
  {
    path: '/admin',
    components: {
      main: AdminView
    },
    children: [
      { 
        path: 'dashboard',
        name: "dash",
        components: {
         content: EventManager
        },  
      },
      {
      path: 'contacts',
      name: 'contacts',
      components: {
        content: ContactsList
      },
      },
      {
        path: 'contacts/clients/:id',
        name: 'specificContactPageClient',
        components: {
          content: SpecificContactPageClient
        }
      },
      {
        path: 'contacts/prospects/:id',
        name: 'specificContactPageProspect',
        components: { 
          content:SpecificContactPageProspect
        },
      },
      {
        path: 'contacts/vendors/:id',
        name: 'specificContactPageVendor',
        components: { 
          content: SpecificContactPageVendor
        },
      },  
      {
        path: 'contacts/employees/:id',
        name: 'specificContactPageEmployee',
        components: {
          content: SpecificContactPageEmployee
        },
      },
      {
        path: 'contacts/locations/:id',
        name: 'specificContactPageLocation',
        components: {
          content: SpecificContactPageLocation
        }
      },
      {
        path: 'contacts/organizers/:id',
        name: 'specificContactPageOrganizer',
        components: {
          content: SpecificContactPageOrganizer
        }
      },      
      {
        path: 'events/:id',
        name: 'specificEventPage',
        components: {
          content: SpecificEventPage
        }
      },
      {
        path: 'createnewevent',
        name: 'admincreateevent',
        components: {
          content: AdminViewCreateEvent
        }
      },
      {
        path: 'config/',
        name: 'adminConfigPage',
        components: {
          content: AdminConfigurationPage,
          }
      },
      
    ]
  
  },
  
  {
    path: '/signup',
    name: 'signUpPage',
    components: {
      main: SignUpPage
    } 
  },
  {
    path: '/login',
    name: 'loginPage',
    components: { 
      main:LoginPage
    },
    beforeEnter(to, from, next) {
      console.log(to, from)
      next()
    }
  },
  {
    path: '/forgot',
    name: 'forgot',
    components: {
      main: ForgotPage
    },
  },
  {
    path: '/setup',
    name: 'initialSetupPage',
    components: {
      main: AdminViewInitialSetup
    }
  }

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
