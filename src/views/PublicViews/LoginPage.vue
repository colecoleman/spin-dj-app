<template>
  <div id="login-hero">
    <div class="spin-dj-sign-in-login-hero-left login-hero-half">
      <div class="spin-dj-sign-in-image-container">
        <img :src="SpinLogoWithText" alt="Spin DJ Software Logo" />
      </div>
      <div class="login-tagline-container">
        <h1 id="spin-dj-sign-in-login-tagline">
          Software Built<br /><b>by</b> DJs<br /><b>for</b> DJs
        </h1>
      </div>
    </div>
    <div class="spin-dj-sign-in-login-hero-right login-hero-half">
      <h5>Sign in with the temporary password in your email.</h5>
      <div id="authenticator-container">
        <Authenticator> </Authenticator>
      </div>
      <!-- <h5>
        DJs: looking to create an account?
        <a href="https://spindj.io/signup"> Sign up!</a>
      </h5> -->
    </div>
  </div>
</template>

<script>
import SpinLogoWithText from "../../assets/spin-logo-with-text.svg";
import { Authenticator } from "@aws-amplify/ui-vue";
// import AmplifySignIn from "@aws-amplify/ui-components";
import "@aws-amplify/ui-vue/styles.css";
import Amplify from "aws-amplify";
import awsconfig from "../../aws-exports";

Amplify.configure(awsconfig);

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
      authConfig: {
        signInConfig: {
          isSignUpDisplayed: false,
        },
      },
      confirmPasswordError: false,
    };
  },
  components: {
    Authenticator,
    // AmplifySignIn,
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

<style>
@media screen {
  #login-hero {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    overflow: scroll;
  }

  .login-hero-half {
    width: 100%;
    min-height: 55%;
    justify-content: space-evenly;
    display: flex;
    flex-direction: column;
  }

  #spin-dj-sign-in-login-tagline {
    text-transform: uppercase;
    text-align: right;
    font-size: 1.5em;
    line-height: 2em;
    font-weight: 400;
    height: auto;
    display: block;
  }

  .login-tagline-container {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .spin-dj-sign-in-image-container {
    display: flex;
    justify-content: center;
    /* height: 30%; */
    align-items: center;
    align-content: center;
  }

  #authenticator-container {
    padding: 20px;
  }

  .spin-dj-sign-in-image-container {
    align-items: center;
  }

  .spin-dj-sign-in-image-container > img {
    width: 175px;
    padding: 30px;
  }

  .sign-in-text {
    position: absolute;
    top: 20px;
    right: 20px;
    font-weight: 600;
  }
  .spin-dj-sign-in-login-hero-left {
    background-color: white;
  }

  .spin-dj-sign-in-login-hero-right {
    background-color: black;
    padding-bottom: 60px;
  }

  .spin-dj-sign-in-login-hero-right h1,
  .spin-dj-sign-in-login-hero-right h2,
  .spin-dj-sign-in-login-hero-right h3,
  .spin-dj-sign-in-login-hero-right h4,
  .spin-dj-sign-in-login-hero-right h5,
  .spin-dj-sign-in-login-hero-right p,
  .spin-dj-sign-in-login-hero-right a {
    color: white;
  }

  a {
    text-decoration: underline;
  }

  .amplify-tabs {
    display: none;
  }

  .sign-in-text:hover {
    text-shadow: 1px 1px 10px white;
    cursor: pointer;
  }

  .amplify-tabs {
    display: none !important;
  }

  [data-amplify-authenticator] {
    --amplify-colors-background-primary: white;
    --amplify-colors-background-secondary: white;
    --amplify-colors-background-tertiary: white;
    --amplify-colors-border-primary: var(--amplify-colors-neutral-20);
    --amplify-colors-border-secondary: var(--amplify-colors-neutral-40);
    --amplify-colors-border-tertiary: var(--amplify-colors-neutral-60);
    --amplify-colors-brand-primary-10: var(--amplify-colors-teal-100);
    --amplify-colors-brand-primary-20: var(--amplify-colors-teal-90);
    --amplify-colors-brand-primary-40: var(--amplify-colors-teal-80);
    --amplify-colors-brand-primary-60: var(--amplify-colors-teal-60);
    --amplify-colors-brand-primary-80: var(--amplify-colors-teal-40);
    --amplify-colors-brand-primary-90: var(--amplify-colors-teal-20);
    --amplify-colors-brand-primary-100: var(--amplify-colors-teal-10);
    --amplify-colors-font-interactive: var(--amplify-colors-white);
    --amplify-components-heading-color: black !important;
    --amplify-components-text-color: black !important;
  }

  .amplify-button[data-variation="primary"] {
    background: black;
  }
  .amplify-button[data-variation="link"] {
    color: black;
    text-decoration: underline;
  }
  @media screen and (min-width: 800px) {
    #login-hero {
      flex-direction: column;
    }

    .login-hero-half {
      width: 100%;
      min-height: 100%;
    }

    .spin-dj-sign-in-image-container,
    .login-tagline-container {
      height: 100%;
    }

    .spin-dj-sign-in-login-hero-right {
      padding: 0;
    }

    .spin-dj-sign-in-login-hero-right {
      background-color: black;
      padding-bottom: 60px;
    }

    .spin-dj-sign-in-image-container > img {
      width: 150px;
    }

    #spin-dj-sign-in-login-tagline {
      font-size: 2em;
    }
  }
  @media screen and (min-width: 960px) {
    #login-hero {
      flex-direction: row;
    }

    .login-hero-half {
      width: 50%;
      height: 100%;
      justify-content: center;
      align-items: center;
      position: relative;
    }

    .spin-dj-sign-in-image-container,
    .login-tagline-container {
      height: 100%;
    }

    .spin-dj-sign-in-login-hero-right {
      padding: 0;
    }

    .spin-dj-sign-in-image-container > img {
      width: 250px;
    }

    #spin-dj-sign-in-login-tagline {
      font-size: 2em;
    }
  }
}
</style>
