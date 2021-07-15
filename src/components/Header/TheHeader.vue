<template>
  <div class="site-header">
    <img src="@/assets/spin-logo.png" alt="" />
    <tab-switcher></tab-switcher>
    <search-bar></search-bar>
    <notification-button></notification-button>
    <add-button></add-button>
  </div>
</template>

<script>
import TabSwitcher from "./TabSwitcher.vue";
import SearchBar from "./SearchBar.vue";
import AddButton from "./AddButton.vue";
import NotificationButton from "./NotificationButton/NotificationButton.vue";

export default {
  data() {
    return {
      addButtonClicked: false,
    };
  },

  components: {
    TabSwitcher,
    SearchBar,
    NotificationButton,
    AddButton,
  },
};
</script>

<style scoped>
.site-header {
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  padding: 20px 10px 0 10px;
  width: 95vw;
  height: 60px;
}

.site-header img {
  height: 50px;
  margin: 15px;
}

.rotated {
  rotate: 45deg;
}
</style>