<template>
  <!-- <amplify-authenticator> -->
  <div id="application-wrapper" :style="cssVars" v-if="loaded">
    <router-view name="main"></router-view>
  </div>
  <transition name="fade1">
    <status-indicator />
  </transition>
  <div id="mobile-wall">
    <img id="spin-logo" src="./assets/spin-beta-logo.png" alt="" />
    <div class="heading-wrapper">
      <h1>Our Mobile + Tablet Site is Under Contruction</h1>
      <h5>
        Please use a desktop to access this site. Sorry for the inconvenience
      </h5>
      <h4>Thank you for using Spin</h4>
    </div>
  </div>
  <!-- </amplify-authenticator> -->
</template>

<script>
/* eslint-disable */
import { Auth } from "aws-amplify";
import axios from "axios";
import SVGs from "./assets/SVGs/svgIndex.js";
import StatusIndicator from "./SharedComponents/SharedComponentsUI/StatusIndicator.vue";
import ButtonStandardWithIcon from "./SharedComponents/SharedComponentsUI/ButtonStandardWithIcon.vue";

export default {
  data() {
    return {
      SVGs,
      loaded: true,
    };
  },
  computed: {
    branding() {
      if (this.$store.state.businessSettings) {
        return this.$store.state.businessSettings.identity.branding;
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
    console.log(this.$store.state.user);
    // await this.$store.dispatch("setBusinessSettings");
    console.log(this.$store.state);
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
@media screen {
  html,
  body {
    width: 100%;
    margin: 0px;
    padding: 0px;
    overflow: hidden;
  }

  #app {
    font-family: Roboto, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    height: 100vh;
    width: 100vw;
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
    height: 100%;
    background-color: var(--backgroundColor);
  }

  .router-link-exact-active {
    color: var(--highlightColor);
  }

  #mobile-wall {
    display: none;
  }
}
@media screen and (max-width: 900px) {
  #application-wrapper {
    display: none;
  }
  #mobile-wall {
    width: 100vh;
    height: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    justify-items: center;
    align-content: space-between;
    align-items: center;
    padding: 20px;
    /* display: none; */
  }

  #mobile-wall h1,
  h2,
  h3,
  h4,
  h5 {
    text-transform: uppercase;
  }

  #spin-logo {
    margin-top: 40px;
    width: 50%;
  }
}

@media print {
  @page {
    margin: 20mm;
  }
  html,
  body {
    width: 100%;
    /* height: 100%; */
    /* max-height: 100%; */
    height: auto;
    margin: 0px;
    padding: 0px;
    overflow: visible !important;
    overflow: none;
    /* position: fixed; */
  }

  #app {
    height: auto;
    width: auto;
    overflow: visible !important;
    overflow: none;
    display: block;
  }

  input,
  select,
  textarea {
    color: black;
    background-color: white;
    border: 1px solid;
    border-radius: 5px;
    padding: 3px;
  }

  input::placeholder {
    opacity: 0;
  }

  #application-wrapper {
    overflow: visible !important;
    overflow: none;
    height: auto;
    background-color: var(--backgroundColor);
    display: block;
  }

  #mobile-wall {
    display: none;
  }
}
</style>