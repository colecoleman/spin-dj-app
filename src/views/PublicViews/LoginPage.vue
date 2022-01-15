<template>
  <section id="page-wrapper">
    <div id="hero">
      <div class="hero-left hero-half">
        <div class="image-container">
          <img :src="SpinLogoWithText" alt="Spin DJ Software Logo" />
        </div>
        <div class="tagline-container">
          <h1>Software Built<br /><b>by</b> DJs<br /><b>for</b> DJs</h1>
        </div>
      </div>
      <div class="hero-right hero-half">
        <div id="authenticator-container">
          <authenticator>
            <template> </template>
          </authenticator>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import SpinLogoWithText from "../../assets/spin-logo-with-text.svg";
import { Authenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";
import { Hub } from "aws-amplify";

export default {
  data() {
    return {
      SpinLogoWithText,
      // user: undefined,
      tempUser: undefined,
      newPasswordNeeded: false,
      subdomain: undefined,
      username: undefined,
      password: undefined,
      family_name: undefined,
      given_name: undefined,
      newPassword: undefined,
      confirmPassword: undefined,
      loading: false,
      usernameError: false,
      passwordError: {
        match: false,
        strength: false,
      },
      confirmPasswordError: false,
    };
  },
  components: {
    Authenticator,
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    authTheme() {
      return {
        name: "auth-theme",
        tokens: {
          fonts: {
            default: {
              variable: { value: "Roboto, sans-serif" },
              static: { value: "Roboto, sans-serif" },
            },
          },
        },
      };
    },
  },
  mounted() {
    Hub.listen("auth", (data) => {
      switch (data.payload.event) {
        case "signIn":
          console.log("user signed in");
          this.$router.push("/");
          this.$store.dispatch("setUser");
          break;
        case "signUp":
          console.log("user signed up");
          break;
        case "signOut":
          console.log("user signed out");
          break;
        case "signIn_failure":
          console.log("user sign in failed");
          this.$store.commit("addStatus", {
            type: "error",
            note: "Sign In Failed, Try Again",
          });
          break;
        case "configured":
          console.log("the Auth module is configured");
      }
    });
  },
};
</script>

<style scoped>
#hero {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  overflow: scroll;
}

.hero-half {
  width: 100%;
  justify-content: space-evenly;
}

h1 {
  text-transform: uppercase;
  text-align: right;
  font-size: 2em;
  line-height: 2em;
  font-weight: 400;
  height: auto;
  display: block;
}

.tagline-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.image-container {
  display: flex;
  justify-content: center;
  /* height: 30%; */
  align-items: center;
  align-content: center;
}

#authenticator-container {
  padding: 20px;
}

.image-container {
  align-items: center;
}

.image-container > img {
  /* height: 40%; */
  width: 40%;
  padding: 30px;
}

.sign-in-text {
  position: absolute;
  top: 20px;
  right: 20px;
  font-weight: 600;
}
.hero-left {
  background-color: white;
  height: auto;
  display: flex;
  flex-direction: column;
}

.hero-right {
  background-color: black;
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  justify-items: space-around;
  justify-content: space-around;
  align-content: space-around;
}

.hero-right h1,
h2,
h3,
h4,
h5,
p {
  color: white;
}

.amplify-button {
  background-color: black;
}

.amplify-tabs {
  display: none;
}

.sign-in-text:hover {
  text-shadow: 1px 1px 10px white;
  cursor: pointer;
}

:root {
  --form-color: cyan !important;
}

@media screen and (min-width: 350px) {
  .image-container > img {
    width: 150px;
  }

  .hero-left {
    height: 50vh;
  }
}
@media screen and (min-width: 960px) {
  #hero {
    flex-direction: row;
  }

  .hero-half {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .image-container,
  .tagline-container {
    height: 100%;
  }

  .image-container > img {
    height: 40%;
  }
}
</style>
