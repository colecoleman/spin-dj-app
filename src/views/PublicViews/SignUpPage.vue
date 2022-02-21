<template>
  <div id="hero">
    <div class="hero-left hero-half">
      <div class="image-container">
        <img src="../../assets/spin-beta-logo.png" alt="Spin DJ Software`" />
      </div>
      <div class="tagline-container">
        <h1>Software Built<br /><b>by</b> DJs<br /><b>for</b> DJs</h1>
      </div>
    </div>
    <div class="hero-right hero-half" v-if="step === 1">
      <h5 class="sign-in-text" @click="navigateToSignInPage()">Sign In</h5>
      <h1>
        Ready for something <br />
        <b> better?</b>
      </h1>

      <!-- <h3>Grab your 30 day free trial below:</h3> -->
      <div class="login-form">
        <div class="input-field flex-row">
          <div class="half-width">
            <p>First Name</p>
            <input
              type="text"
              v-model="given_name"
              :class="given_nameError ? 'error' : 'healthy'"
            />
          </div>
          <div class="half-width">
            <p>Last Name:</p>
            <input
              type="text"
              v-model="familyName"
              :class="familyNameError ? 'error' : 'healthy'"
            />
          </div>
        </div>
        <p class="error-text" v-if="familyNameError || given_nameError">
          <i> Oops! We're missing your name.</i>
        </p>
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
              >Passwords must contain an uppercase letter, lowercase letter, and
              a number.</i
            >
          </p>
        </div>
        <div class="input-field">
          <p>Beta Access Code:</p>
          <input v-model="accessCode" type="text" class="healthy" />
        </div>
        <button-standard-with-icon text="Sign Up" @click="validationBlock()" />
      </div>
      <p class="disclaimer">
        <i
          >By clicking “Sign Up”, you agree to our terms of service and privacy
          policy, which can be found
          <a target="_blank" href="https://spindj.io/tos"> here</a> and
          <a target="_blank" href="https://spindj.io/privacy">here</a>,
          respectively.</i
        >
      </p>
    </div>
    <div class="hero-right hero-half" v-if="step === 2">
      <h5 class="sign-in-text" @click="navigateToSignInPage()">Sign In</h5>
      <h1>Check your inbox <br />for a code.</h1>

      <h3>Just making sure we <br />have the right person.</h3>
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

        <button-standard-with-icon
          text="Confirm"
          @click="submitConfirmationCode()"
        />
      </div>
      <p class="disclaimer">
        <i
          >By clicking “Sign Up”, you agree to our terms of service, which can
          be found <a target="_blank" href="https://spindj.io/tos"> here</a></i
        >
      </p>
    </div>
  </div>
</template>

<script>
import SpinLogoWithText from "../../assets/spin-logo-with-text.svg";
import ButtonStandardWithIcon from "../../SharedComponents/SharedComponentsUI/ButtonStandardWithIcon.vue";

import { Auth } from "aws-amplify";

export default {
  data() {
    return {
      SpinLogoWithText,
      given_name: undefined,
      familyName: undefined,
      username: undefined,
      password: undefined,
      confirmPassword: undefined,
      confirmationCode: undefined,
      step: 2,
      accessCode: undefined,
      user: undefined,
      given_nameError: false,
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
    validationBlock() {
      if (
        !this.passwordError.strength &&
        !this.passwordError.match &&
        !this.usernameError
      ) {
        this.signUp(
          this.username,
          this.password,
          this.familyName,
          this.given_name
        );
      }
    },
    async signUp(username, password, familyName, given_name) {
      let access = await this.$store
        .dispatch("submitBetaAccessCode", this.accessCode)
        .catch(() => {
          this.$store.commit("addStatus", {
            type: "error",
            note: "Incorrect Access Code",
          });
        });
      if (access) {
        try {
          const { user } = await Auth.signUp({
            username,
            password,
            attributes: {
              email: username,
              family_name: familyName,
              given_name: given_name,
              "custom:role": "admin",
            },
          });
          this.step++;
          this.user = user;
          console.log(this.user);
        } catch (error) {
          this.$store.commit("addStatus", {
            type: "error",
            note: `Error signing up: ${error}`,
          });
        }
      }
    },
    async submitConfirmationCode() {
      const user = this.user;
      const code = this.confirmationCode;
      try {
        await Auth.confirmSignUp(user.username, code);
        await Auth.signIn(user.username, this.password);
        await this.$store.dispatch("setUser");
        this.$router.push("/setup");
      } catch (error) {
        this.$store.commit("addStatus", {
          type: "error",
          note: `Error signing up: ${error}`,
        });
        console.log("error confirming sign up", error);
      }
    },
  },
  components: { ButtonStandardWithIcon },
};
</script>

<style scoped>
@media screen {
  a {
    color: white;
    font-weight: bold;
    text-decoration: underline;
  }
  #hero {
    height: 100vh;
    width: 100vw;
    /* display: flex; */
    flex-direction: column;
    overflow: scroll;
  }

  .hero-half {
    width: 100%;
    min-height: 55%;
    justify-content: space-evenly;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
  }

  .hero-left {
    background-color: white;
  }
  .hero-right {
    background-color: black;
    align-items: center;
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
  }

  .image-container {
    align-items: center;
  }

  .image-container > img {
    width: 175px;
    padding: 30px;
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
    width: 80%;
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
    width: 80%;
  }

  .sign-in-text {
    position: fixed;
    color: black;
    top: 10px;
    right: 10px;
    font-weight: 600;
  }

  .sign-in-text:hover {
    text-shadow: 1px 1px 10px white;
    cursor: pointer;
  }

  @media (min-width: 800px) {
    a {
      color: white;
      font-weight: bold;
      text-decoration: underline;
    }
    #hero {
      height: 100vh;
      width: 100vw;
      display: flex;
      flex-direction: row;
      overflow: visible;
    }

    .hero-half {
      width: 50%;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .hero-left {
      background-color: white;
    }

    h1 {
      text-transform: uppercase;
      text-align: right;
      font-size: 1.5em;
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
      width: 125px;
      padding: 30px;
    }

    .hero-right {
      background-color: black;
      overflow: scroll;
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
      margin-top: 200px;
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
      bottom: 10px;
    }

    .sign-in-text {
      top: 20px;
      right: 20px;
      font-weight: 600;
    }

    .sign-in-text:hover {
      text-shadow: 1px 1px 10px white;
      cursor: pointer;
    }
  }
  @media (min-width: 960px) {
    a {
      color: white;
      font-weight: bold;
      text-decoration: underline;
    }
    #hero {
      height: 100vh;
      width: 100vw;
      display: flex;
      flex-direction: row;
      overflow: visible;
    }

    .hero-half {
      width: 50%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
    }

    .hero-left {
      background-color: white;
    }

    h1 {
      text-transform: uppercase;
      text-align: right;
      font-size: 1.5em;
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
      width: 125px;
      padding: 30px;
    }

    .hero-right {
      background-color: black;
      overflow: unset;
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
      margin: unset;
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
      bottom: 10px;
    }

    .sign-in-text {
      top: 20px;
      right: 20px;
      font-weight: 600;
    }

    .sign-in-text:hover {
      text-shadow: 1px 1px 10px white;
      cursor: pointer;
    }
  }
}
</style>
