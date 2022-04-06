<template>
  <div class="site-header">
    <div class="admin-selector-dropdown">
      <option-input-with-title
        v-if="tenants.length > 1"
        :dropdownSelections="tenants"
        :dropdownDisplay="['businessName']"
        :inputValue="chosenTenant"
        @dropdown-selected="tenantChosen"
      />
    </div>
    <img :src="logo" alt="" />
    <div class="button-wrapper">
      <dashboard-button />
      <logout-button />
    </div>
  </div>
</template>
<script>
import LogoutButton from "./LogoutButton.vue";
import DashboardButton from "./DashboardButton.vue";
import OptionInputWithTitle from "../SharedComponentsUI/ElementLibrary/OptionInputWithTitle.vue";

export default {
  data() {
    return {
      chosenTenant: undefined,
    };
  },
  methods: {
    tenantChosen(tenant) {
      this.$store.dispatch("newTenantChosen", tenant);
      this.chosenTenant = tenant;
    },
  },
  computed: {
    logo() {
      if (this.$store.state.businessSettings.identity.businessLogo) {
        return this.$store.state.businessSettings.identity.businessLogo;
      } else {
        return "";
      }
    },
    tenants() {
      if (this.$store.state.user) {
        return this.$store.state.user.tenants;
      } else {
        return [];
      }
    },
  },
  created() {},
  components: {
    DashboardButton,
    LogoutButton,
    OptionInputWithTitle,
  },
  props: [],
};
</script>
<style scoped>
@media screen {
  .site-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    position: relative;
    height: 30px;
  }

  .button-wrapper {
    display: flex;
    height: 100%;
    align-items: center;
  }

  .admin-selector-dropdown {
    width: 30%;
    max-width: 300px;
    z-index: 5;
  }

  .site-header img {
    position: absolute;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    /* max-height: 25px; */
    height: 100%;
  }
  @media (min-width: 800px) {
    .site-header {
      height: 60px;
    }

    .site-header img {
      /* max-height: 45px; */
    }
  }
}
</style>