import { createRouter, createWebHistory } from "vue-router";
import { Auth } from "aws-amplify";
import SignUpPage from "../views/PublicViews/SignUpPage.vue";
import LoginPage from "../views/PublicViews/LoginPage.vue";
import ForgotPage from "../views/PublicViews/ForgotPage.vue";
import PrivacyPolicy from "../views/PublicViews/PrivacyPolicy.vue";
import TermsOfService from "../views/PublicViews/TermsOfService.vue";
import NotFound from '../views/PublicViews/404NotFound.vue';
import AdminViewInitialSetup from "../views/AdminViews/AdminViewInitialSetup.vue";
import AdminViewInitialSetupSuccess from "../views/AdminViews/AdminViewSetupSuccess.vue";
import AdminViewUpdateSubscription from "../views/AdminViews/AdminViewUpdateSubscription.vue";
import AdminView from "../views/AdminViews/AdminView.vue";
import AdminViewDashboard from "../views/AdminViews/AdminViewDashboard";
import ContactsList from "../views/AdminViews/AdminViewContactList.vue";
import AdminConfigurationPage from "../views/AdminViews/AdminViewConfigPage.vue";
import SpecificContactPageClient from "../views/AdminViews/AdminViewSpecificContactPages/SpecificContactPageClient.vue";
import SpecificContactPageEmployee from "../views/AdminViews/AdminViewSpecificContactPages/SpecificContactPageEmployee.vue";
import SpecificContactPageVendor from "../views/AdminViews/AdminViewSpecificContactPages/SpecificContactPageVendor.vue";
import SpecificContactPageLocation from "../views/AdminViews/AdminViewSpecificContactPages/SpecificContactPageLocation.vue";
import SpecificContactPageOrganizer from "../views/AdminViews/AdminViewSpecificContactPages/SpecificContactPageOrganizer.vue";
import AdminViewEventPage from "../views/AdminViews/AdminViewEventPage.vue";
import AdminViewCreateEvent from "../views/AdminViews/AdminViewCreateEvent.vue";

import ClientView from "../views/ClientViews/ClientView.vue";
import ClientDashboard from "../views/ClientViews/ClientViewsTopLevelComponents/ClientDashboard.vue";
import ClientEventView from "../views/ClientViews/ClientViewsTopLevelComponents/ClientEventView.vue";

import EmployeeView from "../views/EmployeeViews/EmployeeView.vue";
import EmployeeDashboard from "../views/EmployeeViews/EmployeeViewsTopLevelComponents/EmployeeDashboard.vue";
import EmployeeEventView from "../views/EmployeeViews/EmployeeViewsTopLevelComponents/EmployeeEventView.vue";

import OrganizerView from "../views/OrganizerViews/OrganizerView.vue";
import OrganizerDashboard from "../views/OrganizerViews/OrganizerViewsTopLevelComponents/OrganizerDashboard.vue";
import OrganizerEventView from "../views/OrganizerViews/OrganizerViewsTopLevelComponents/OrganizerEventView.vue";

import VendorView from "../views/VendorViews/VendorView.vue";
import VendorDashboard from "../views/VendorViews/VendorViewsTopLevelComponents/VendorDashboard.vue";
import VendorEventView from "../views/VendorViews/VendorViewsTopLevelComponents/VendorEventView.vue";

// import store from "../store/index.js";
import axios from "axios";

let user;
let setAuthStatus = async function () {
  await Auth.currentAuthenticatedUser()
    .then((res) => {
      user = res;
    })
    .catch((e) => {
      console.log(e);
    });
};

let dbUser;
let setUser = async function () {
  await setAuthStatus();
  if (user) {
    let userId = user.username;
    let tenantId = user.attributes["custom:tenantId"]
      ? user.attributes["custom:tenantId"]
      : userId;
    return await axios
      .get(
        `https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${tenantId}/users/${userId}`
      )
      .then((res) => {
        dbUser = res.data.Item;
        return res.data.Item;
      })
      .catch((e) => {
        console.log(e);
      });
  }
};

const routes = [
  {
    path: "/",
    name: "index",
    beforeEnter: async (to, from, next) => {
      await setAuthStatus();
      console.log(user);
      if (user == undefined) {
        next({ path: "/login" });
      } else if (user.attributes["custom:role"].includes("admin")) {
        next({ path: "/admin/dashboard" });
      } else if (user.attributes["custom:role"].includes("client")) {
        next({ path: "/client/dashboard" });
      } else if (user.attributes["custom:role"].includes("employee")) {
        next({ path: "/employee/dashboard" });
      } else if (user.attributes["custom:role"].includes("organizer")) {
        next({ path: "/organizer/dashboard" });
      } else if (user.attributes["custom:role"].includes("vendor")) {
        next({ path: "/vendor/dashboard" });
      }
    },
  },
  {
    path: "/admin",
    meta: {
      title: "Spin DJ Software",
    },
    components: {
      main: AdminView,
    },
    beforeEnter: async (to, from, next) => {
      await setAuthStatus();
      if (user == undefined) {
        next({ path: "/login" });
      } else if (!user.attributes["custom:role"].includes("admin")) {
        next({ path: "/" });
      } else {
        next();
      }
    },
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        meta: { requiresAdminAuth: true },
        components: {
          content: AdminViewDashboard,
        },
      },
      {
        path: "library",
        name: "library",
        meta: { requiresAdminAuth: true },
        components: {
          content: AdminViewDashboard
        }
      },
      {
        path: "contacts",
        name: "contacts",
        meta: { requiresAdminAuth: true },
        components: {
          content: ContactsList,
        },
      },
      {
        path: "contacts/clients/:id",
        name: "specificContactPageClient",
        meta: { requiresAdminAuth: true },
        components: {
          content: SpecificContactPageClient,
        },
      },
      {
        path: "contacts/vendors/:id",
        name: "specificContactPageVendor",
        meta: { requiresAdminAuth: true },
        components: {
          content: SpecificContactPageVendor,
        },
      },
      {
        path: "contacts/employees/:id",
        name: "specificContactPageEmployee",
        meta: { requiresAdminAuth: true },
        components: {
          content: SpecificContactPageEmployee,
        },
      },
      {
        path: "contacts/locations/:id",
        name: "specificContactPageLocation",
        meta: { requiresAdminAuth: true },
        components: {
          content: SpecificContactPageLocation,
        },
      },
      {
        path: "contacts/organizers/:id",
        name: "specificContactPageOrganizer",
        meta: { requiresAdminAuth: true },
        components: {
          content: SpecificContactPageOrganizer,
        },
      },
      {
        path: "events/:id",
        name: "specificEventPage",
        meta: { requiresAdminAuth: true },
        components: {
          content: AdminViewEventPage,
        },
      },
      {
        path: "createnewevent",
        name: "admincreateevent",
        meta: { requiresAdminAuth: true },
        components: {
          content: AdminViewCreateEvent,
        },
      },
      {
        path: "config/",
        name: "adminConfigPage",
        meta: { requiresAdminAuth: true },
        components: {
          content: AdminConfigurationPage,
        },
      },
      {
        path: "setup/success",
        name: "adminConfigSuccess",
        meta: { requiresAdminAuth: true },
        components: {
          content: AdminViewInitialSetupSuccess,
        },
      },
    ],
  },
  {
    path: "/client",
    components: {
      main: ClientView,
    },
    beforeEnter: async (to, from, next) => {
      await setAuthStatus();
      if (user == undefined) {
        next({ path: "/login" });
      } else if (!user.attributes["custom:role"].includes("client")) {
        next({ path: "/" });
      } else {
        next();
      }
    },
    children: [
      {
        path: "dashboard",
        name: "clientDashboard",
        meta: { requiresClientAuth: true },
        components: {
          content: ClientDashboard,
        },
      },
      {
        path: "events/:tenantId/:eventId",
        name: "clientEventView",
        meta: { requiresClientAuth: true },
        components: {
          content: ClientEventView,
        },

      },
    ],
  },
  {
    path: "/employee",
    components: {
      main: EmployeeView,
    },
    beforeEnter: async (to, from, next) => {
      await setAuthStatus();
      if (user == undefined) {
        next({ path: "/login" });
      } else if (!user.attributes["custom:role"].includes("employee")) {
        next({ path: "/" });
      } else {
        next();
      }
    },
    children: [
      {
        path: "dashboard",
        name: "employeeDashboard",
        meta: { requiresEmployeeAuth: true },
        components: {
          content: EmployeeDashboard,
        },
      },
      {
        path: "events/:tenantId/:eventId",
        name: "employeeEventView",
        meta: { requiresEmployeeAuth: true },
        components: {
          content: EmployeeEventView,
        },
      },
    ],
  },
  {
    path: "/organizer",
    components: {
      main: OrganizerView,
    },
    beforeEnter: async (to, from, next) => {
      await setAuthStatus();
      if (user == undefined) {
        next({ path: "/login" });
      } else if (!user.attributes["custom:role"].includes("organizer")) {
        next({ path: "/" });
      } else {
        next();
      }
    },
    children: [
      {
        path: "dashboard",
        name: "organizerDashboard",
        meta: { requiresOrganizerAuth: true },
        components: {
          content: OrganizerDashboard,
        },
      },
      {
        path: "events/:tenantId/:eventId",
        name: "organizerEventView",
        meta: { requiresOrganizerAuth: true },
        components: {
          content: OrganizerEventView,
        },
      },
    ],
  },
  {
    path: "/vendor",
    components: {
      main: VendorView,
    },
    beforeEnter: async (to, from, next) => {
      await setAuthStatus();
      if (user == undefined) {
        next({ path: "/login" });
      } else if (!user.attributes["custom:role"].includes("vendor")) {
        next({ path: "/" });
      } else {
        next();
      }
    },
    children: [
      {
        path: "dashboard",
        name: "vendorDashboard",
        meta: { requiresVendorAuth: true },
        components: {
          content: VendorDashboard,
        },
      },
      {
        path: "events/:tenantId/:eventId",
        name: "vendorEventView",
        meta: { requiresVendorAuth: true },
        components: {
          content: VendorEventView,
        },
      },
    ],
  },
  {
    path: "/signup",
    name: "signUpPage",
    components: {
      main: SignUpPage,
    },
  },
  {
    path: "/login",
    name: "loginPage",
    components: {
      main: LoginPage,
    },
  },
  {
    path: "/forgot",
    name: "forgot",
    components: {
      main: ForgotPage,
    },
  },
  {
    path: "/privacy",
    name: "privacy",
    components: {
      main: PrivacyPolicy,
    },
  },
  {
    path: "/tos",
    name: "tos",
    components: {
      main: TermsOfService,
    },
  },
  {
    path: "/setup",
    name: "initialSetupPage",
    components: {
      main: AdminViewInitialSetup,
    },
  },
  {
    path: "/updatesubscription",
    name: "updateSubscription",
    components: {
      main: AdminViewUpdateSubscription,
    },
  },
  {
    path: "/:catchAll(.*)",
    name: "Not Found",
    components: {
      main: NotFound
    }
  }
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active-link",
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    }
  },
});

router.beforeEach(async (to, from, next) => {
  if (!dbUser) {
    dbUser = await setUser();
  }
  if (to.matched.some((record) => record.meta.requiresAdminAuth)) {
    if (user.attributes["custom:role"].includes("admin")) {
      if (new Date(dbUser.subscriptionExpirationDate) < new Date()) {
        next("/updatesubscription");
      } else {
        next();
      }
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
