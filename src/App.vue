<template>
  <div id="application-wrapper" :style="cssVars">
    <router-view name="main"></router-view>
  </div>
  <transition name="fade1">
    <error-indicator :errors="errors" v-if="errors.length > 0" />
  </transition>
</template>

<script>
/* eslint-disable */
import { Auth } from "aws-amplify";
import axios from "axios";
import EventManager from "./views/AdminViews/AdminViewDashboard/EventManager.vue";
import ErrorIndicator from "./SharedComponents/SharedComponentsUI/ErrorIndicator.vue";

export default {
  computed: {
    brandingPreferences() {
      if (this.$store.state.businessSettings.brandingPreferences) {
        return this.$store.state.businessSettings.brandingPreferences;
      } else {
        return {
          backgroundColor: "#F0F0F0",
          foregroundColor: "#FFFFFF",
          cardOutline: "#DDDDDD",
          highlightColor: "#00F5FF",
          textColor: "#000000",
        };
      }
    },
    cssVars() {
      return {
        "--backgroundColor": this.brandingPreferences.backgroundColor,
        "--foregroundColor": this.brandingPreferences.foregroundColor,
        "--cardOutline": this.brandingPreferences.cardOutline,
        "--highlightColor": this.brandingPreferences.highlightColor,
        "--textColor": this.brandingPreferences.textColor,
      };
    },
    currentUser: async () => {
      await Auth.currentAuthenticatedUser();
    },
    errors() {
      return this.$store.state.errors;
    },
  },
  components: {
    EventManager,
    ErrorIndicator,
  },
  async beforeCreate() {
    let user = await Auth.currentAuthenticatedUser();
    console.log(user);
    if (user) {
      this.$store.dispatch("setUser", user.username);
    }
  },
};
</script>

<style>
@import url(https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap);

html,
body {
  width: 100%;
  height: 100%;
  max-height: 100%;
  margin: 0px;
  padding: 0px;
  overflow: none;
  position: fixed;
}

#app {
  font-family: Montserrat, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  max-height: 100vh;
  max-width: 100vw;
  display: flex;
  justify-content: left;
  align-items: center;
}

.router-link-exact-active > svg {
  fill: var(--highlightColor);
}

p,
h1,
h2,
h3,
h4,
h5,
a {
  color: var(--textColor);
}

h4 {
  font-size: 15px;
  text-transform: uppercase;
  margin: 0;
}

a {
  text-decoration: none;
}

#application-wrapper {
  width: 100vw;
  height: 100vh;
  background-color: var(--backgroundColor);
}

input,
select,
textarea {
  color: var(--textColor);
  background-color: var(--foregroundColor);
  font-family: Montserrat, sans-serif;
  border: 1px solid;
  border-radius: 5px;
  padding: 3px;
}

.router-link-exact-active {
  color: var(--highlightColor);
}

/* .fade1-enter-active {
  animation: fade1 0.5s;
}

.fade1-leave-active {
  animation: fade1 0.5s reverse;
}

@keyframes fade1 {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
} */
</style>