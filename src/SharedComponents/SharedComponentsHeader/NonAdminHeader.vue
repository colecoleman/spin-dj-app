<template>
  <div class="site-header">
    <img :src="logo" alt="" />
    <div class="button-wrapper">
      <!-- <notification-button></notification-button> -->
      <dashboard-button />
      <logout-button />
    </div>
  </div>
</template>
<script>
import LogoutButton from "./LogoutButton.vue";
import DashboardButton from "./DashboardButton.vue";
// import NotificationButton from "./NotificationButton/NotificationButton.vue";

export default {
  methods: {},
  computed: {
    logo() {
      return this.$store.state.businessSettings.identity.businessLogo;
    },
  },
  created() {},
  components: {
    DashboardButton,
    LogoutButton,
    // NotificationButton,
  },
  props: [],
};
</script>
<style scoped>
.site-header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
}

.button-wrapper {
  display: flex;
  position: absolute;
  right: 10px;
}

.site-header img {
  max-height: 45px;
  margin: 15px;
}
</style>