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
        <authenticator>
          <template> </template>
        </authenticator>
        <!-- <template v-slot="{ user, signOut }">
            <h1>Hello {{ user.username }}!</h1>
            <button @click="signOut">Sign Out</button>
          </template> -->
        <!-- <div class="login-form" v-if="!newPasswordNeeded">
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
              @click="login()"
              :loading="loading"
            ></button-standard-with-icon>
          </div> -->

        <div class="login-form" v-if="newPasswordNeeded">
          <div class="input-field">
            <p>First Name:</p>
            <input
              type="text"
              v-model="given_name"
              :class="firstNameError ? 'error' : 'healthy'"
            />
            <p class="error-text" v-if="firstNameError">
              <i>Missing a first name!</i>
            </p>
          </div>
          <div class="input-field">
            <p>Last Name:</p>
            <input
              type="text"
              v-model="family_name"
              :class="lastNameError ? 'error' : 'healthy'"
            />
            <p class="error-text" v-if="lastNameError">
              <i>Oops! We're missing a last name!</i>
            </p>
          </div>
          <div class="input-field">
            <p>New Password:</p>
            <input
              type="password"
              v-model="newPassword"
              :class="
                passwordError.strength || passwordError.match
                  ? 'error'
                  : 'healthy'
              "
            />
            <p
              class="error-text"
              v-if="passwordError.strength || passwordError.match"
            >
              <i></i>
            </p>
          </div>
          <div class="input-field">
            <p>Confirm Password:</p>
            <input
              type="password"
              v-model="confirmPassword"
              :class="
                confirmPasswordError.strength || confirmPasswordError.match
                  ? 'error'
                  : 'healthy'
              "
            />
          </div>
          <button-standard-with-icon
            text="Sign In"
            :loading="loading"
            @click="completeNewPassword"
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
import { Auth } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-vue";
// import { AmplifyEventxBus } from "aws-amplify-vue";
import { Hub } from "aws-amplify";

import ButtonStandardWithIcon from "../../SharedComponents/SharedComponentsUI/ButtonStandardWithIcon.vue";

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
  methods: {
    checkForAuth() {
      Hub.listen("auth", (data) => {
        const { payload } = data;
        this.onAuthEvent(payload);
        console.log(
          "A new auth event has happened: ",
          data.payload.data.username + " has " + data.payload.event
        );
      });
    },
    usernameValidationBlock() {
      if (!this.username) {
        this.usernameError = true;
      } else {
        this.usernameError = false;
      }
    },
    newPasswordValidationBlock() {
      const re = new RegExp(
        "^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
      );
      if (this.newPassword !== this.confirmPassword) {
        this.passwordError.match = true;
      }
      if (!re.test(this.newPassword)) {
        this.passwordError.strength = true;
      } else {
        this.passwordError.strength = false;
      }
    },
    async completeNewPassword() {
      this.loading = true;
      this.newPasswordValidationBlock();
      if (!this.passwordError.strength && !this.passwordError.match) {
        // this.user = await Auth.signIn(this.username, this.password);
        console.log(this.tempUser);
        Auth.signIn(this.username, this.password)
          .then((res) => {
            console.log(res);
            // const { requiredAttributes } = res.challengeParam;

            return Auth.completeNewPassword(res, this.newPassword, {
              family_name: this.family_name,
              given_name: this.given_name,
            }).then((res) => {
              console.log(res);
              this.$router.push("/");
            });
          })
          .catch((e) => {
            console.log(e);
          });
        // await Auth.currentAuthenticatedUser()
        //   .then((user) => {
        //     console.log(user);
        //   })
        //   .then((data) => console.log(data))
        //   .catch((err) => console.log(err));
        // return;
      }
      this.loading = false;
    },
    async login() {
      this.usernameValidationBlock();
      this.loading = true;
      await Auth.signIn(this.username, this.password)
        .then((user) => {
          console.log(user);
          if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
            this.newPasswordNeeded = true;
            this.tempUser = user;
          } else {
            this.$router.push("/");
          }
        })
        .catch((e) => {
          console.log(e);
        });
      this.loading = false;
    },
  },
  components: {
    ButtonStandardWithIcon,
    Authenticator,
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  mounted() {
    Hub.listen("auth", (data) => {
      switch (data.payload.event) {
        case "signIn":
          console.log("user signed in");
          console.log(data);
          this.$router.push("/");

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
    // AmplifyEventBus.$on("authState", (info) => {
    //   console.log(
    //     `Here is the auth event that was just emitted by an Amplify component: ${info}`
    //   );
    // });
  },
  watch: {
    user() {
      console.log("hjk");
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
  text-align: center;
}

.login-form {
  width: 50%;
}

.input-field {
  text-align: left;
}

.healthy {
  width: 100%;
}
.error {
  border-bottom: 2px solid red;
  width: 100%;
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