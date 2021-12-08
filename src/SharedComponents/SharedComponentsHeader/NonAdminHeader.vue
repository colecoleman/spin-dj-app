<template>
  <div class="site-header">
    <img src="@/assets/company-logo.svg" alt="" />
    <div class="button-bar-wrapper">
      <four-button-bar-with-drop-down
        :buttons="buttons"
        :dropdown="dropdown"
      ></four-button-bar-with-drop-down>
    </div>
    <notification-button></notification-button>

    <logout-button></logout-button>
  </div>
</template>
<script>
import FourButtonBarWithDropDown from "../../SharedComponents/SharedComponentsUI/FourButtonBarWithDropDown.vue";
import LogoutButton from "./LogoutButton.vue";
import NotificationButton from "./NotificationButton/NotificationButton.vue";

export default {
  data() {
    return {
      buttons: [
        {
          title: "Send Email",
          action: this.openEmailComposition,
        },
        {
          title: "Assign Events",
          action: this.toggleEventAssignment,
        },
        {
          title: "Availability",
          action: this.openAvailabilityManager,
        },
      ],
      dropdown: {
        title: "Actions",
        actionItems: [
          {
            title: "Email",
            action: this.openEmailComposition,
          },
          // {
          //   title: "Reset Password",
          //   action: this.resetPassword,
          //   icon: keysvg,
          // },
        ],
      },
    };
  },
  methods: {},
  created() {},
  components: {
    FourButtonBarWithDropDown,
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
  margin: 20px 20px 10px 20px;
  height: 60px;
}

.button-bar-wrapper {
  flex: 1;
}

.site-header img {
  height: 100px;
  width: 125px;
  margin: 15px;
}
</style>