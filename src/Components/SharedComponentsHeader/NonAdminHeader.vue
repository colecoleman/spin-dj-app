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
      <router-link to="/">
        <round-icon-button class="round-button" svg="home" />
      </router-link>
      <round-icon-button
        class="round-button"
        svg="exit-door"
        @click="logout()"
      />
    </div>
  </div>
</template>
<script>
import RoundIconButton from "../SharedComponentsUI/RoundIconButton.vue";
import { Auth } from "aws-amplify";
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
    async logout() {
      try {
        await Auth.signOut();
        this.$router.push("/login");
      } catch (e) {
        this.$store.dispatch("addStatus", {
          type: "error",
          note: `Something went wrong: ${e}`,
        });
      }
    },
  },
  computed: {
    logo() {
      return this.$store.getters.businessLogo;
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
    RoundIconButton,
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
  .round-button {
    margin: 5px;
    min-width: 30px;
    height: 30px;
    border-radius: 30px;
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
    .round-button {
      width: 60px;
      min-width: 60px;
      height: 60px;
      border-radius: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .site-header img {
      /* max-height: 45px; */
    }
  }
}
</style>