<template>
  <div class="site-header">
    <img src="@/assets/company-logo.svg" alt="" />
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
  margin: 20px 20px 10px 20px;
  height: 60px;
}

.site-header img {
  height: 100px;
  width: 125px;
  margin: 15px;
}
</style>