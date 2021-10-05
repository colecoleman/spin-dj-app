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
        <a href="/signup"
          ><h5 class="sign-in-text">Don't Have an Account? Sign Up</h5></a
        >
        <h1>Login:</h1>

        <div class="login-form">
          <div class="input-field">
            <p>Email Address:</p>
            <input
              type="text"
              v-model="username"
              :class="usernameError ? 'error' : 'healthy'"
            />
            <p class="error-text" v-if="usernameError">
              <i> Oops! Username must be a valid email address.</i>
            </p>
          </div>
          <div class="input-field">
            <p>Password:</p>
            <input
              type="password"
              v-model="password"
              :class="
                passwordError.strength || passwordError.match
                  ? 'error'
                  : 'healthy'
              "
            />
          </div>
          <button-standard-with-icon
            text="Sign In"
            @click="validationBlock()"
            :loading="loading"
          ></button-standard-with-icon>
        </div>
        <p class="disclaimer">
          <i
            >By clicking “Sign Up”, you agree to our terms of service, which can
            be found here</i
          >
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import SpinLogoWithText from "../../assets/spin-logo-with-text.svg";

import ButtonStandardWithIcon from "../../SharedComponents/SharedComponentsUI/ButtonStandardWithIcon.vue";
// import AWS from "aws-sdk";
import { Auth } from "aws-amplify";

export default {
  components: { ButtonStandardWithIcon },
  data() {
    return {
      SpinLogoWithText,
      username: undefined,
      password: undefined,
      confirmPassword: undefined,
      loading: false,
      usernameError: false,
      passwordError: {
        match: false,
        strength: false,
      },
    };
  },
  methods: {
    validationBlock() {
      if (!this.username) {
        this.usernameError = true;
      } else {
        this.usernameError = false;
      }

      if (!this.usernameError) {
        this.login(this.username, this.password);
      }
    },

    async login(username, password) {
      this.loading = true;
      {
        try {
          const user = await Auth.signIn(username, password);
          this.$store.dispatch("setUser", user.username);
          if (this.$store.state.user) {
            this.loading = false;
            this.$router.push("/admin/dashboard");
          }
          this.$store.dispatch("getAdminUsers");
        } catch (error) {
          this.loading = false;
          this.$store.dispatch("addError", error);
        }
      }
    },
  },
};
</script>

<style scoped>
#hero {
  height: 100vh;
  width: 100vw;
  display: flex;
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

.hero-left {
  background-color: white;
}

h1 {
  text-transform: uppercase;
  text-align: right;
  font-size: 2em;
  line-height: 2em;
  font-weight: 400;
}

.image-container,
.tagline-container {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 50%;
}

.image-container {
  align-items: center;
}

.image-container > img {
  height: 40%;
  width: 40%;
}

.hero-right {
  background-color: black;
}

.hero-right h1,
h2,
h3,
h4,
h5,
p {
  color: white;
}

.hero-right h1 {
  color: white;
  text-align: center;
}

.login-form {
  width: 50%;
}

.input-field {
  text-align: left;
}

.healthy {
  border: 1px solid white;
  width: 100%;
  color: white;
}
.error {
  border: 1px solid white;
  border-bottom: 2px solid red;
  width: 100%;
  color: white;
}

.error-text {
  color: red;
  text-align: center;
}

input:focus {
  outline: none;
  border-bottom: 3px solid white;
}

.button-standard-with-icon {
  border: 1px solid white;
  color: white;
  border-radius: 3px;
  margin: 40px 30%;
  width: 40%;
}

.disclaimer {
  position: absolute;
  bottom: 10px;
}

.sign-in-text {
  position: absolute;
  top: 20px;
  right: 20px;
  font-weight: 600;
}

.sign-in-text:hover {
  text-shadow: 1px 1px 10px white;
  cursor: pointer;
}
</style>