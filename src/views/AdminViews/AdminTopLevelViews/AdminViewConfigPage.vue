<template>
  <section>
    <div id="navigation">
      <base-card>
        <template v-slot:content>
          <admin-view-config-navigation-items :items="navigationItems" />
        </template>
      </base-card>
    </div>
    <div id="scroll-container">
      <div
        class="config-section"
        :id="key"
        v-for="(config, key, index) in configCategories"
        :key="index"
      >
        <component :is="config.component"></component>
      </div>
    </div>
    <button-standard-with-icon
      text="Save Changes"
      @click="saveChanges()"
      class="floating-save-button"
    ></button-standard-with-icon>
  </section>
</template>

<script>
import AdminViewConfigIdentity from "../AdminComponents//AdminConfigComponents/AdminConfigCards/AdminViewConfigIdentity.vue";
import AdminViewConfigNavigationItems from "../AdminComponents/AdminConfigComponents/AdminViewConfigNavigationItems.vue";
import AdminViewConfigPackages from "../AdminComponents/AdminConfigComponents/AdminConfigCards/AdminViewConfigPackages.vue";
import AdminViewConfigServices from "../AdminComponents/AdminConfigComponents/AdminConfigCards/AdminViewConfigServices.vue";
import AdminViewConfigForms from "../AdminComponents/AdminConfigComponents/AdminConfigCards/AdminViewConfigForms.vue";
import AdminViewConfigAddOns from "../AdminComponents/AdminConfigComponents/AdminConfigCards/AdminViewConfigAddOns.vue";
import AdminViewConfigAutomations from "../AdminComponents/AdminConfigComponents/AdminConfigCards/AdminViewConfigAutomations.vue";
import AdminViewConfigContracts from "../AdminComponents/AdminConfigComponents/AdminConfigCards/AdminViewConfigContracts.vue";
import AdminViewConfigDiscounts from "../AdminComponents/AdminConfigComponents/AdminConfigCards/AdminViewConfigDiscounts.vue";
import AdminViewConfigPayments from "../AdminComponents/AdminConfigComponents/AdminConfigCards/AdminViewConfigPayments.vue";

export default {
  data() {
    return {
      configCategories: {
        Identity: {
          display: "Identity",
          component: AdminViewConfigIdentity,
        },
        Packages: {
          display: "Packages",
          component: AdminViewConfigPackages,
        },
        Services: {
          display: "Services",
          component: AdminViewConfigServices,
        },
        Forms: {
          display: "Forms",
          component: AdminViewConfigForms,
        },
        AddOns: {
          display: "Add-Ons",
          component: AdminViewConfigAddOns,
        },
        Automations: {
          display: "Automations",
          component: AdminViewConfigAutomations,
        },
        Contracts: {
          display: "Contracts",
          component: AdminViewConfigContracts,
        },
        Discounts: {
          display: "Discounts",
          component: AdminViewConfigDiscounts,
        },
        Payments: {
          display: "Payments",
          component: AdminViewConfigPayments,
        },
      },
    };
  },
  methods: {
    async saveChanges() {
      await this.$store.dispatch("updateBusinessSettings");
    },
  },
  computed: {
    navigationItems() {
      return Object.keys(this.configCategories);
    },
    businessSettings() {
      if (Object.keys(this.$store.state.businessSettings).length > 0) {
        return this.$store.state.businessSettings;
      } else {
        return {
          identity: {
            branding: {
              backgroundColor: undefined,
              foregroundColor: undefined,
              textColor: undefined,
              cardOutline: undefined,
              highlightColor: undefined,
            },
            businessName: undefined,
            businessPhoneNumber: undefined,
            businessAddress: {
              streetAddress1: undefined,
              streetAddress2: undefined,
              address2: undefined,
            },
          },
          product: {
            services: [],
            addOns: [],
            packages: [],
            discounts: [],
            form: [],
          },
          contracts: [],
          automations: [],
          payments: {
            creditCard: {
              enabled: false,
              Stripe: {},
              QuickBooks: {},
              Square: {},
            },
            p2p: {
              PayPal: {},
              Venmo: {},
            },
            check: {},
            custom: {},
          },
        };
      }
    },
  },
  components: {
    AdminViewConfigNavigationItems,
  },
};
</script>

<style scoped>
section {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 20% 80%;
  grid-template-rows: 50% 50% 20px;
}

#navigation {
  grid-column: 1 / 2;
  grid-row: 1 / 3;
}

#scroll-container {
  grid-column: 2 / 3;
  grid-row: 1 / 4;
  overflow: scroll;
}

#body {
  width: 80%;
  height: 100%;
  overflow: scroll;
}
.config-section {
  height: auto;
}

#configuration-navigation {
  height: 100%;
  width: 20%;
}

.button-wrapper {
  width: 50%;
}

.floating-save-button {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: var(--foregroundColor);
}
</style>
