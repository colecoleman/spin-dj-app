<template>
  <div class="site-header">
    <!-- <img src="@/assets/company-logo.svg" alt="" /> -->
    <img :src="businessLogo" alt="" />
    <tab-switcher />
    <search-bar />
    <!-- <notification-button></notification-button> -->
    <add-button />
    <logout-button />
  </div>
</template>

<script>
import TabSwitcher from "./TabSwitcher.vue";
import SearchBar from "./SearchBar.vue";
import AddButton from "./AddButton.vue";
import LogoutButton from "./LogoutButton.vue";
// import NotificationButton from "./NotificationButton/NotificationButton.vue";

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
    // NotificationButton,
    AddButton,
    LogoutButton,
  },
};
</script>

<style scoped>
@media screen and (min-width: 320px) {
  .site-header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
  }

  .site-header img {
    max-height: 25px;
    margin: 10px;
  }
}
@media screen and (min-width: 800px) {
  .site-header {
    height: 40px;
  }

  .site-header img {
    max-height: 40px;
  }
}
@media screen and (min-width: 1200px) {
  .site-header {
    height: 60px;
  }

  .site-header img {
    height: 40px;
  }
}
</style>