<template>
  <!-- <amplify-authenticator> -->
  <div id="application-wrapper" :style="cssVars" v-if="loaded">
    <router-view name="main"></router-view>
  </div>
  <transition name="fade1">
    <status-indicator />
  </transition>
  <!-- </amplify-authenticator> -->
</template>

<script>
/* eslint-disable */
import { Auth } from "aws-amplify";
import axios from "axios";
// import { components } from "aws-amplify-vue";
// import { Hub } from "aws-amplify";
import StatusIndicator from "./SharedComponents/SharedComponentsUI/StatusIndicator.vue";
import ButtonStandardWithIcon from "./SharedComponents/SharedComponentsUI/ButtonStandardWithIcon.vue";

export default {
  data() {
    return {
      loaded: true,
    };
  },
  computed: {
    branding() {
      if (!Auth.currentAuthenticatedUser()) {
        if (this.$store.state.businessSettings.identity.branding) {
          return this.$store.state.businessSettings.identity.branding;
        }
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
        "--backgroundColor": this.branding.backgroundColor,
        "--foregroundColor": this.branding.foregroundColor,
        "--cardOutline": this.branding.cardOutline,
        "--highlightColor": this.branding.highlightColor,
        "--textColor": this.branding.textColor,
      };
    },
  },
  components: {
    StatusIndicator,
    ButtonStandardWithIcon,
  },

  async created() {
    await this.$store.dispatch("setUser");
    await this.$store.dispatch("setBusinessSettings");
    if (this.$store.state.businessSettings.identity.businessName) {
      document.title = this.$store.state.businessSettings.identity.businessName;
    } else {
      document.title = "Spin";
    }
    this.loaded = true;
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,300;1,400;1,500;1,700;1,900&display=swap");

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

.signout {
  display: none;
}

#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
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

ul {
  list-style: none;
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

p {
  font-size: 8pt;
}

h4 {
  font-size: 15px;
  text-transform: uppercase;
  margin: 0;
}

a {
  text-decoration: none;
}

.bold {
  font-weight: 600;
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
  font-family: Roboto, Helvetica, Arial, sans-serif;
  border: 1px solid;
  border-radius: 5px;
  padding: 3px;
}

.router-link-exact-active {
  color: var(--highlightColor);
}

[data-amplify-authenticator] {
  --amplify-colors-background-primary: var(--foregroundColor);
  --amplify-colors-background-secondary: var(--backgroundColor);
  --amplify-colors-background-tertiary: var(--textColor);
  --amplify-components-text-color: var(--textColor);
}
</style>