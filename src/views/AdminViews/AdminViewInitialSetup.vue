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
        <h1>Let's get into it.</h1>
        <h3>Tell us more about your business.</h3>
        <div class="login-form">
          <div class="input-field">
            <p>Business Name:</p>
            <input
              type="text"
              v-model="businessName"
              :class="businessNameError ? 'error' : 'healthy'"
            />
            <p class="error-text" v-if="businessNameError">
              <i> Oops! We're missing something here.</i>
            </p>
          </div>
          <div class="input-field">
            <p>Business Phone:</p>
            <input
              type="phone"
              v-model="businessPhone"
              :class="businessPhoneError ? 'error' : 'healthy'"
            />
          </div>
          <div class="input-field">
            <p>Business Address 1:</p>
            <input
              type="address"
              v-model="address1"
              :class="address1error ? 'error' : 'healthy'"
            />
            <p>Business Address 2:</p>
            <input
              type="address"
              v-model="address2"
              :class="address2error ? 'error' : 'healthy'"
            />
            <p class="error-text" v-if="address2error || address1error">
              <i>Oops! We're missing something here.</i>
            </p>
          </div>
          <div class="input-field">
            <p>Business Logo:</p>
            <input
              type="file"
              id="hidden-file-button-logo"
              @change="onFileChangeLogo"
              style="display: none"
            />
            <button-standard-with-icon
              text="Choose File"
              @click="chooseFileLogo()"
              style="margin: 0px; padding: 5px; height: 30px"
            />
            <p v-if="logo">
              <i>{{ logo.name }}</i>
            </p>
          </div>
          <button-standard-with-icon
            text="Next"
            @click="step1validationBlock()"
          ></button-standard-with-icon>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import SpinLogoWithText from "../../assets/spin-logo-with-text.svg";
import ButtonStandardWithIcon from "../../SharedComponents/SharedComponentsUI/ButtonStandardWithIcon.vue";
import { Auth } from "aws-amplify";

export default {
  components: { ButtonStandardWithIcon },
  data() {
    return {
      SpinLogoWithText,
      loading: false,
      businessName: undefined,
      businessPhone: undefined,
      address1: undefined,
      address2: undefined,
      logo: undefined,
      importData: undefined,
      step: 1,
      businessNameError: false,
      businessPhoneError: false,
      address1error: false,
      address2error: false,
      logoError: false,
      importIssue: false,
    };
  },
  methods: {
    chooseFileLogo() {
      document.getElementById("hidden-file-button-logo").click();
    },
    onFileChangeLogo(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.logo = files[0];
      console.log(files);
      console.log(this.logo);
    },
    step1validationBlock() {
      this.loading = true;
      if (!this.businessName) {
        this.businessNameError = true;
      } else {
        this.businessNameError = false;
      }
      if (!this.businessPhone) {
        this.businessPhoneError = true;
      }
      if (!this.address1) {
        this.address1error = true;
      }

      if (!this.address2) {
        this.address2error = true;
      }
      if (
        !this.businessNameError &&
        !this.businessPhoneError &&
        !this.address1error &&
        !this.address2error
      ) {
        this.loading = false;
        console.log(Auth.currentSession());
      }
    },
  },
  // created() {
  //   AWS.config.region = "us-east-1"; // Region
  //   AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  //     IdentityPoolId: "us-east-1:61655840-a96e-4408-a05c-cb6fda6e8544",
  //   });
  // },
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