<template>
  <div
    id="application-wrapper"
    :style="{ backgroundColor: backgroundColor, color: textColor }"
  >
    <div id="header">
      <the-header></the-header>
    </div>
    <div id="main-content">
      <div id="right-div">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import TheHeader from "./SharedComponents/SharedComponentsHeader/TheHeader.vue";
import EventManager from "./views/AdminViews/AdminViewDashboard/EventManager.vue";

export default {
  computed: {
    backgroundColor() {
      return this.$store.state.businessSettings.brandingPreferences
        .backgroundColor;
    },
    branding() {
      return this.$store.state.businessSettings.brandingPreferences;
    },
    textColor() {
      return this.$store.state.businessSettings.brandingPreferences.textColor;
    },
  },
  components: {
    TheHeader,
    EventManager,
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
  fill: #00ffe2;
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
  max-width: calc(100vw - 40px);
  width: calc(100vw - 40px);
  height: 100vh;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 20px 0px 20px;
}
#header {
  height: 10vh;
}
#main-content {
  display: flex;
  flex-direction: row;
  min-width: 100%;
  width: 100%;
  height: 85vh;
}

input,
select,
textarea {
  font-family: Montserrat, sans-serif;
  border: 1px solid;
  border-radius: 5px;
  padding: 3px;
}

#navigation-div {
  height: calc(100% - 20px);
}

#contact-us-div {
  flex: 1;
}

#right-div {
  width: 100%;
  height: inherit;
}
</style>