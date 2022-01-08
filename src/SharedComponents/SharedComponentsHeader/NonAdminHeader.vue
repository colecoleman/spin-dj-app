<template>
  <div class="site-header">
    <img :src="logo" alt="" />
    <div class="button-wrapper">
      <notification-button></notification-button>
      <logout-button></logout-button>
    </div>
  </div>
</template>
<script>
import LogoutButton from "./LogoutButton.vue";
import NotificationButton from "./NotificationButton/NotificationButton.vue";

export default {
  methods: {},
  computed: {
    logo() {
      return this.$store.state.businessSettings.identity.businessLogo;
    },
  },
  created() {},
  components: {
    LogoutButton,
    NotificationButton,
  },
  props: [],
};
</script>
<style scoped>
.site-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 20px 0px 20px;
  height: 60px;
  position: relative;
}

.button-wrapper {
  display: flex;
  position: absolute;
  right: 10px;
}

.button-bar-wrapper {
  flex: 1;
}

.site-header img {
  height: 100%;
  align-self: center;
  justify-self: center;
}
</style>