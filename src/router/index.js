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

import ClientView from '../views/ClientViews/ClientView.vue';
import ClientDashboard from '../views/ClientViews/ClientViewsTopLevelComponents/ClientDashboard.vue';
import ClientEventView from '../views/ClientViews/ClientViewsTopLevelComponents/ClientEventView.vue';

import EmployeeView from '../views/EmployeeViews/EmployeeView.vue';
import EmployeeDashboard from '../views/EmployeeViews/EmployeeViewsTopLevelComponents/EmployeeDashboard.vue';

import OrganizerView from '../views/OrganizerViews/OrganizerView.vue';
import OrganizerDashboard from '../views/OrganizerViews/OrganizerViewsTopLevelComponents/OrganizerDashboard.vue';

import VendorView from '../views/VendorViews/VendorView.vue';
import VendorDashboard from '../views/VendorViews/VendorViewsTopLevelComponents/VendorDashboard.vue';

// async function ionViewCanEnter() {
//   try {
//       await Auth.currentAuthenticatedUser();
//       return true;
//   } catch {
//       return false;
//   }
// }
let user;
let setAuthStatus = async function () {
  await Auth.currentAuthenticatedUser()
    .then((res) => {
      user = res;
    })
    .catch((e) => {
      console.log(e);
    });
    console.log(user)
}

// setAuthStatus();

const routes = [
  
  {
    path: '/',
    name: 'index', 
    beforeEnter: async (to, from, next) => {
      await setAuthStatus(); 
      if (user == undefined) {
        next({path: "/login"})
      } else if (user.signInUserSession.idToken.payload["cognito:preferred_role"].includes('Admin')) {
        console.log('admin, biatch')
        next({path: '/admin/dashboard'})
      } else if (user.signInUserSession.idToken.payload['cognito:preferred_role'].includes("Client")) {
        console.log('client, biatch');
        next({path: '/client/dashboard'})
      } else if (user.signInUserSession.idToken.payload['cognito:preferred_role'].includes("Employee")) {
        console.log('employee, biatch');
        next({path: '/employee/dashboard'})
      } else if (user.signInUserSession.idToken.payload['cognito:preferred_role'].includes("Organizer")) {
        console.log('client, biatch');
        next({path: '/organizer/dashboard'})
      } else if (user.signInUserSession.idToken.payload['cognito:preferred_role'].includes("Vendor")) {
        console.log('client, biatch');
        next({path: '/vendor/dashboard'})
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
        name: "dashboard",
        meta: {requiresAdminAuth: true},
        components: {
         content: EventManager
        },  
      },
      {
      path: 'contacts',
      name: 'contacts',
      meta: {requiresAdminAuth: true},
      components: {
        content: ContactsList
      },
      },
      {
        path: 'contacts/clients/:id',
        name: 'specificContactPageClient',
        meta: {requiresAdminAuth: true},
        components: {
          content: SpecificContactPageClient
        }
      },
      {
        path: 'contacts/prospects/:id',
        name: 'specificContactPageProspect',
        meta: {requiresAdminAuth: true},
        components: { 
          content:SpecificContactPageProspect
        },
      },
      {
        path: 'contacts/vendors/:id',
        name: 'specificContactPageVendor',
        meta: {requiresAdminAuth: true},
        components: { 
          content: SpecificContactPageVendor
        },
      },  
      {
        path: 'contacts/employees/:id',
        name: 'specificContactPageEmployee',
        meta: {requiresAdminAuth: true},
        components: {
          content: SpecificContactPageEmployee
        },
      },
      {
        path: 'contacts/locations/:id',
        name: 'specificContactPageLocation',
        meta: {requiresAdminAuth: true},
        components: {
          content: SpecificContactPageLocation
        }
      },
      {
        path: 'contacts/organizers/:id',
        name: 'specificContactPageOrganizer',
        meta: {requiresAdminAuth: true},
        components: {
          content: SpecificContactPageOrganizer
        }
      },      
      {
        path: 'events/:id',
        name: 'specificEventPage',
        meta: {requiresAdminAuth: true},
        components: {
          content: SpecificEventPage
        }
      },
      {
        path: 'createnewevent',
        name: 'admincreateevent',
        meta: {requiresAdminAuth: true},
        components: {
          content: AdminViewCreateEvent
        }
      },
      {
        path: 'config/',
        name: 'adminConfigPage',
        meta: {requiresAdminAuth: true},
        components: {
          content: AdminConfigurationPage,
          }
      },
      
    ]
  
  },
  {
    path: '/client',
    components: {
      main: ClientView
    }, 
    children: [
      {
        path: 'dashboard',
        name: 'clientDashboard',
        meta: {requiresClientAuth: true},
        components: {
          content: ClientDashboard
        }
      }, {
        path: 'events/:eventId',
        name: 'clientEventView',
        meta: {requiresClientAuth: true},
        components: {
          content: ClientEventView
        }
      }
    ]
  },
  {
    path: '/employee',
    components: {
      main: EmployeeView
    }, 
    children: [
      {
        path: 'dashboard',
        name: 'employeeDashboard',
        meta: {requiresEmployeeAuth: true},
        components: {
          content: EmployeeDashboard
        }
      }
    ]
  },
  {
    path: '/organizer',
    components: {
      main: OrganizerView
    }, 
    children: [
      {
        path: 'dashboard',
        name: 'organizerDashboard',
        meta: {requiresOrganizerAuth: true},
        components: {
          content: OrganizerDashboard
        }
      }
    ]
  },
  {
    path: '/vendor',
    components: {
      main: VendorView
    }, 
    children: [
      {
        path: 'dashboard',
        name: 'vendorDashboard',
        meta: {requiresVendorAuth: true},
        components: {
          content: VendorDashboard
        }
      }
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

// router.beforeEach(async (to, from, next) => {
  // await setAuthStatus();
  // if (user == undefined && to.name !== 'loginPage') {
  //   next({path: '/login'})
  // } else {
  //   if (to.name === 'loginPage') {
  //     user = undefined;
  //     next();
  //   }
  //   console.log(to.meta.requiresAdminAuth)
  //   console.log(user.signInUserSession.idToken.payload)
  //   // if (to.meta.requiresAdminAuth && user.signInUserSession.idToken.payload["cognito:preferred_role"].includes('Admin')) {
  //   //   console.log('admin, biatch')
  //   //   next({path: 'admin/dashboard'})
  //   // } else if (to.meta.requiresClientAuth && user.signInUserSession.idToken.payload['cognito:preferred_role'].includes("Client")) {
  //   //   console.log('user is client');
  //   // }
  // } 
  // if (to.matched.some(record => record.meta.requiresAdminAuth)) {
  //   // let user = await Auth.currentAuthenticatedUser();
  //   // console.log(user);
  //   return true;
  // }
// })

export default router;
