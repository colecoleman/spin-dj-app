<template>
  <div class="site-header">
    <div class="left buttons">
      <dashboard-button />
      <admin-contacts-button />
      <admin-config-button />
    </div>
    <img :src="businessLogo" alt="" />

    <div class="right buttons">
      <search-bar />
      <!-- <notification-button></notification-button> -->
      <add-button />
      <logout-button />
    </div>
  </div>
</template>

<script>
import AdminConfigButton from "./AdminConfigButton.vue";
import AdminContactsButton from "./AdminContactsButton.vue";
import DashboardButton from "./DashboardButton.vue";
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
    SearchBar,
    AdminConfigButton,
    AdminContactsButton,
    DashboardButton,
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
    justify-content: space-between;
    align-items: center;
    height: 30px;
  }
  .buttons {
    width: 40%;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .right {
    justify-content: right;
  }

  .left {
    justify-content: left;
  }

  .site-header img {
    height: 80%;
    max-height: 80%;
    margin: 10px;
  }
}
@media screen and (min-width: 800px) {
  .site-header {
    height: 40px;
  }
}
@media screen and (min-width: 1200px) {
  .site-header {
    height: 60px;
  }
}
</style>