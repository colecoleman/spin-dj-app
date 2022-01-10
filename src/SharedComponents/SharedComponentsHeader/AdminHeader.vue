<template>
  <div class="site-header">
    <!-- <img src="@/assets/company-logo.svg" alt="" /> -->
    <img :src="businessLogo" alt="" />
    <tab-switcher></tab-switcher>
    <search-bar></search-bar>
    <notification-button></notification-button>
    <add-button></add-button>
    <logout-button></logout-button>
  </div>
</template>

<script>
import TabSwitcher from "./TabSwitcher.vue";
import SearchBar from "./SearchBar.vue";
import AddButton from "./AddButton.vue";
import LogoutButton from "./LogoutButton.vue";
import NotificationButton from "./NotificationButton/NotificationButton.vue";

export default {
  data() {
    return {
      addButtonClicked: false,
    };
  },
  computed: {
    businessLogo() {
      if (this.$store.state.businessSettings) {
        return this.$store.state.businessSettings.identity.businessLogo;
      } else {
        return "../../spin-beta-logo.png";
      }
    },
  },

  components: {
    TabSwitcher,
    SearchBar,
    NotificationButton,
    AddButton,
    LogoutButton,
  },
};
</script>

<style scoped>
.site-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 20px 10px 20px;
  height: 60px;
}

.site-header img {
  max-height: 45px;

  margin: 15px;
}
</style>