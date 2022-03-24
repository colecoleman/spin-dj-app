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
        <component :is="config.component" @logo="newLogoSelected"></component>
      </div>
    </div>
    <button-standard-with-icon
      :text="saving ? 'Saving...' : 'Save Changes'"
      @click="saveChanges()"
      class="floating-save-button"
    />
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
import AdminViewConfigCalendar from "../AdminComponents/AdminConfigComponents/AdminConfigCards/AdminViewConfigCalendar.vue";

export default {
  data() {
    return {
      logo: undefined,
      saving: false,
      configCategories: {
        Identity: {
          display: "Identity",
          component: "AdminViewConfigIdentity",
        },
        Packages: {
          display: "Packages",
          component: "AdminViewConfigPackages",
        },
        Services: {
          display: "Services",
          component: "AdminViewConfigServices",
        },
        Forms: {
          display: "Forms",
          component: "AdminViewConfigForms",
        },
        AddOns: {
          display: "Add-Ons",
          component: "AdminViewConfigAddOns",
        },
        Automations: {
          display: "Automations",
          component: "AdminViewConfigAutomations",
        },
        Contracts: {
          display: "Contracts",
          component: "AdminViewConfigContracts",
        },
        Discounts: {
          display: "Discounts",
          component: "AdminViewConfigDiscounts",
        },
        Payments: {
          display: "Payments",
          component: "AdminViewConfigPayments",
        },
        Calendar: {
          display: "Calendar",
          component: "AdminViewConfigCalendar",
        },
      },
    };
  },
  methods: {
    async newLogoSelected(logo) {
      this.logo = logo;
    },
    async saveChanges() {
      this.saving = true;
      if (this.logo) {
        await this.$store
          .dispatch("addPhoto", this.logo)
          .then((res) => {
            this.$store.commit("adminConfigIdentitySetBusinessLogo", res);
          })
          .catch((e) => {
            console.log(e);
          });
      }
      await this.$store.dispatch("updateBusinessSettings").then(() => {
        this.saving = false;
      });
    },
  },
  computed: {
    navigationItems() {
      return Object.keys(this.configCategories);
    },
  },
  components: {
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
  },
};
</script>

<style scoped>
@media screen {
  section {
    width: 100%;
    height: 100%;
    display: grid;
    gap: 10px;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 65px;
  }

  #navigation {
    display: none;
  }

  #scroll-container {
    overflow: scroll;
  }

  .config-section {
    margin-bottom: 10px;
    height: auto;
  }

  .floating-save-button {
    width: calc(100% - 20px);
    position: absolute;
    bottom: 40px;
    right: 0px;
    margin: 10px;
    background-color: var(--foregroundColor);
  }
  @media (min-width: 1100px) {
    section {
      width: 100%;
      height: 100%;
      display: grid;
      position: relative;
      gap: 10px;
      grid-template-columns: 20% 1fr;
      grid-template-rows: 1fr 20px;
    }

    #navigation {
      display: unset;
      grid-column: 1 / 2;
      grid-row: 1 / 3;
    }

    #scroll-container {
      grid-column: 2 / 3;
      grid-row: 1 / 3;
      overflow: scroll;
    }

    .config-section {
      margin-bottom: 10px;
      height: auto;
    }

    .button-wrapper {
      width: 50%;
    }

    .floating-save-button {
      position: absolute;
      width: 100px;
      bottom: 20px;
      right: 20px;
      background-color: var(--foregroundColor);
    }
  }
}
</style>
