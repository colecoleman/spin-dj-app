<template>
  <div id="hero">
    <div class="hero-left hero-half">
      <div class="image-container">
        <img
          src="../../assets/spin-logo-with-text.svg"
          alt="Spin DJ Software`"
        />
      </div>
      <div class="tagline-container">
        <h1>Software Built<br /><b>by</b> DJs<br /><b>for</b> DJs</h1>
      </div>
    </div>
    <div class="hero-right hero-half">
      <h5 class="sign-in-text" @click="navigateToSignInPage()">Sign In</h5>
      <div class="launch-div">
        <h1>Preparing for launch</h1>
        <countdown-clock :date="launchDate" />
        <div class="server-error" v-if="serverError">
          <h2>
            Uh-oh. Something went wrong on our end. <br />We've been made aware
            of the issue and are working on it!
          </h2>
        </div>
        <div class="successful-signup" v-if="successfullySubscribed">
          <h2>Dope! You'll be hearing from us.</h2>
        </div>
        <div class="signup" v-if="!serverError && !successfullySubscribed">
          <h3>Sign up for updates and alerts</h3>
          <div class="name-inputs">
            <input
              class="name-input"
              type="text"
              v-model="firstName"
              placeholder="First Name"
            />
            <input
              class="name-input"
              type="text"
              v-model="lastName"
              placeholder="Last Name"
            />
          </div>
          <div class="input-and-button">
            <input
              type="email"
              v-model="emailAddress"
              placeholder="dopestdj@domain.com"
            />
            <button-standard-with-icon
              v-if="validInputs()"
              text="Submit"
              @click="submitEmail"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="hero-right hero-half" v-if="step === 1"> -->
    <!-- <h5 class="sign-in-text" @click="navigateToSignInPage()">Sign In</h5> -->
    <!-- <h1>
        Ready for something <br />
        <b> better?</b>
      </h1> -->

    <!-- <h3>Grab your 30 day free trial below:</h3> -->

    <!-- <div class="login-form">
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
              v-model="family_name"
              :class="family_nameError ? 'error' : 'healthy'"
            />
          </div>
        </div>
        <p class="error-text" v-if="family_nameError || given_nameError">
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
        <button-standard-with-icon text="Sign Up" @click="validationBlock()" />
      </div> -->
    <!-- <p class="disclaimer">
        <i
          >By clicking “Sign Up”, you agree to our terms of service and privacy
          policy, which can be found
          <a target="_blank" href="https://spindj.io/tos"> here</a> and
          <a target="_blank" href="https://spindj.io/privacy">here</a>,
          respectively.</i
        >
      </p> -->
    <!-- </div> -->
    <!-- <div class="hero-right hero-half" v-if="step === 2">
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
    </div> -->
  </div>
</template>

<script>
import CountdownClock from "../../Components/SharedComponentsUI/CountdownClock.vue";
import SpinLogoWithText from "../../assets/spin-logo-with-text.svg";
import ButtonStandardWithIcon from "../../Components/SharedComponentsUI/ButtonStandardWithIcon.vue";
import axios from "axios";
import { Auth } from "aws-amplify";

export default {
  data() {
    return {
      // temporary for pre-launch

      launchDate: new Date(2022, 7, 15, 12),
      emailAddress: undefined,
      firstName: undefined,
      lastName: undefined,
      successfullySubscribed: false,
      serverError: false,

      // temporary for pre-launch ^^
      SpinLogoWithText,
      given_name: undefined,
      family_name: undefined,
      username: undefined,
      password: undefined,
      confirmPassword: undefined,
      confirmationCode: undefined,
      step: 1,
      accessCode: undefined,
      user: undefined,
      given_nameError: false,
      family_nameError: false,
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
    validInputs() {
      return (
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          this.emailAddress
        ) &&
        this.firstName !== undefined &&
        this.lastName !== undefined
      );
    },
    clearFields() {
      this.email = undefined;
      this.firstName = undefined;
      this.lastName = undefined;
    },
    async submitEmail() {
      await axios
        .put(
          "https://2to7i6xiv3.execute-api.us-east-1.amazonaws.com/addUserToMailingList",
          {
            email: this.emailAddress,
            firstName: this.firstName,
            lastName: this.lastName,
          }
        )
        .then(() => {
          this.successfullySubscribed = true;
          // if (res.body === "success") {
          // }
        })
        .catch((e) => {
          console.log(e);
          this.serverError = true;
        });
      this.clearFields();
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
          this.family_name,
          this.given_name
        );
      }
    },
    async signUp(username, password, family_name, given_name) {
      try {
        const { user } = await Auth.signUp({
          username,
          password,
          attributes: {
            email: username,
            family_name: family_name,
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
        console.log("dur confirming sign up", error);
      }
    },
  },
  components: { ButtonStandardWithIcon, CountdownClock },
};
</script>

<style scoped>
@media screen {
  a {
    color: #494949;
    font-weight: bold;
    text-decoration: underline;
  }
  #hero {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    overflow: scroll;
  }

  .hero-half {
    width: 100%;
    /* min-height: 55%; */
    height: fit-content;
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
    /* background-color: #494949; */
    background: linear-gradient(180deg, #fee8ff, #a7efef);
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
  .button-standard-with-icon {
    margin: 0;
  }
  .hero-right h1,
  h2,
  h3,
  h4,
  h5,
  p {
    color: #494949;
  }

  .hero-right h1 {
    color: #494949;
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
    border-bottom: 3px solid #494949;
  }

  .button-standard-with-icon {
    border: 1px solid #494949;
    color: #494949;
    border-radius: 3px;
    margin: 0 10px;
    width: 100px;
    height: 100%;
    /* margin: 40px 30%; */
    /* width: 40%; */
  }

  .disclaimer {
    width: 80%;
  }

  .sign-in-text {
    position: fixed;
    color: #494949;
    top: 10px;
    right: 10px;
    font-weight: 600;
  }

  .sign-in-text:hover {
    text-shadow: 1px 1px 10px #494949;
    cursor: pointer;
  }
  #join-wait-list-wrapper {
    /* height: calc(100vh - 80px);
   */
    min-height: 100%;
    /* overflow: scroll; */
    /* background-color: #494949; */
  }

  .launch-div {
    padding: 40px;
    margin: 40px;
    width: 90%;
    box-sizing: border-box;
    border-radius: 25px;
    border: 1px solid white;
    box-shadow: inset 0 0 1000px rgba(255, 255, 255, 1);
    color: #494949 !important;
  }

  input {
    padding: 14px 20px;
    font-size: 10pt;
    border-radius: 4px;
    outline: none;
    border: 1px solid #494949;
    color: #494949;
    background-color: none;
    background: none;
    text-align: center;
    box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.5);
  }

  h2 {
    font-size: 15pt;
    width: 80%;
    color: #494949;
  }

  .server-error,
  .successful-signup {
    display: flex;
    justify-content: center;
  }

  .name-input {
    margin: 10px;
  }
  .input-and-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;
    justify-content: center;
    align-items: center;
    justify-content: center;
  }

  @media (min-width: 800px) {
    /* temporary for signup */
    #join-wait-list-wrapper {
      height: calc(100vh - 80px);
      overflow: scroll;
      background-color: #494949;
    }

    .hero {
      height: calc(100vh - 80px);
      width: 100%;
    }

    .launch-div {
      padding: 40px;
    }

    .input-and-button {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }

    h2 {
      width: 60%;
    }
    /* // temporary for signup list */
    #hero {
      flex-direction: row;
      overflow: visible;
    }

    .hero-half {
      width: 50%;
      height: 100%;
    }

    h1 {
      font-size: 1.5em;
    }

    .image-container,
    .tagline-container {
      height: 50%;
    }
    .image-container > img {
      width: 125px;
    }

    .hero-right {
      background-color: #494949;
      overflow: scroll;
    }

    .hero-right h1 {
      margin-top: 200px;
    }

    .login-form {
      width: 50%;
    }

    .disclaimer {
      bottom: 10px;
    }

    .sign-in-text {
      top: 20px;
      right: 20px;
    }
  }
  @media (min-width: 960px) {
    .image-container > img {
      width: 250px;
    }

    .hero-right {
      overflow: unset;
    }

    .hero-right h1 {
      margin: unset;
    }
  }
}
</style>
