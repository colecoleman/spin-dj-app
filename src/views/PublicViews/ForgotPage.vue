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
      <div class="hero-right hero-half" v-if="step === 1">
        <h5 class="sign-in-text" @click="navigateToSignInPage()">Sign In</h5>
        <h1>Forgot Your Password?</h1>

        <h3>Enter your email below to retrieve it.</h3>
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
          <button-standard-with-icon
            text="Submit"
            @click="userNameValidationBlock()"
          ></button-standard-with-icon>
        </div>
        <p class="disclaimer">
          <i
            >By clicking “Sign Up”, you agree to our terms of service, which can
            be found here</i
          >
        </p>
      </div>
      <div class="hero-right hero-half" v-if="step === 2">
        <h5 class="sign-in-text" @click="navigateToSignInPage()">Sign In</h5>
        <h1>Reset Your Password</h1>

        <h3>also, check your email for a code.</h3>
        <div class="login-form">
          <div class="input-field">
            <p>Code:</p>
            <input
              type="text"
              v-model="confirmationCode"
              :class="confirmationCodeError ? 'error' : 'healthy'"
            />
            <p class="error-text" v-if="confirmationCodeError">
              <i> Oops! That doesn't seem right. Check it and try again! </i>
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
          <div class="input-field">
            <p>Confirm Password:</p>
            <input
              type="password"
              v-model="confirmPassword"
              :class="passwordError.match ? 'error' : 'healthy'"
            />
            <p class="error-text" v-if="passwordError.match">
              <i>Oops! Passwords don't match! Try again.</i>
            </p>
            <p class="error-text" v-if="passwordError.strength">
              <i
                >Passwords must contain an uppercase letter, lowercase letter,
                and a number.</i
              >
            </p>
          </div>

          <button-standard-with-icon
            text="Confirm"
            @click="passwordValidationBlock()"
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
      firstName: undefined,
      familyName: undefined,
      username: undefined,
      password: undefined,
      confirmPassword: undefined,
      confirmationCode: undefined,
      step: 1,
      user: undefined,
      firstNameError: false,
      familyNameError: false,
      usernameError: false,
      passwordError: {
        match: false,
        strength: false,
      },
    };
  },
  methods: {
    navigateToSignInPage() {
      this.$router.push("/login");
    },
    userNameValidationBlock() {
      console.log(Auth);
      if (!this.username) {
        this.usernameError = true;
      } else {
        this.usernameError = false;
      }
      if (!this.usernameError) {
        this.sendCode(this.username);
      }
    },
    passwordValidationBlock() {
      const re = new RegExp(
        "^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
      );
      if (this.password != this.confirmPassword) {
        this.passwordError.match = true;
      } else {
        this.passwordError.match = false;
      }
      if (!re.test(this.password)) {
        this.passwordError.strength = true;
      } else {
        this.passwordError.strength = false;
      }
      if (!this.passwordError.match || this.passwordError.strength) {
        this.submitNewPassword();
      }
    },
    sendCode(username) {
      Auth.forgotPassword(username)
        .then((data) => {
          console.log(data);
          this.step++;
        })
        .catch((err) => console.log(err));
    },
    submitNewPassword() {
      Auth.forgotPasswordSubmit(
        this.username,
        this.confirmationCode,
        this.password
      )
        .then((data) => {
          console.log(data);
          this.$router.push("/admin/dashboard");
        })
        .catch((err) => console.log(err));
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

.flex-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.half-width {
  width: 45%;
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