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
              v-model="data.businessName"
              :class="errors.businessNameError ? 'error' : 'healthy'"
            />
            <p class="error-text" v-if="errors.businessNameError">
              <i> Oops! We're missing something here.</i>
            </p>
          </div>
          <div class="input-field">
            <p>Business Phone:</p>
            <input
              type="phone"
              v-model="data.businessPhone"
              :class="errors.businessPhoneError ? 'error' : 'healthy'"
            />
          </div>
          <div class="input-field">
            <p>Street Address:</p>
            <input
              type="address"
              v-model="data.address1"
              :class="errors.address1error ? 'error' : 'healthy'"
            />
            <div class="third-container">
              <div class="input-field third-width">
                <p>City:</p>
                <input
                  type="address"
                  v-model="data.city"
                  :class="errors.address2error ? 'error' : 'healthy'"
                />
              </div>
              <div class="input-field third-width">
                <p>State:</p>
                <input
                  type="address"
                  v-model="data.state"
                  :class="errors.address2error ? 'error' : 'healthy'"
                />
              </div>
              <div class="input-field third-width">
                <p>Zip Code:</p>
                <input
                  type="address"
                  v-model="data.zipCode"
                  :class="errors.address2error ? 'error' : 'healthy'"
                />
              </div>
            </div>
            <p
              class="error-text"
              v-if="errors.address2error || errors.address1error"
            >
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

import axios from "axios";

export default {
  data() {
    return {
      SpinLogoWithText,
      loading: false,
      data: {
        businessName: null,
        businessPhone: null,
        address1: null,
        city: null,
        state: null,
        zipCode: null,
        subdomain: this.domain,
      },
      errors: {
        businessNameError: false,
        businessPhoneError: false,
        address1error: false,
        address2error: false,
        logoError: false,
      },
      logo: undefined,
      importData: undefined,
      step: 1,
      importIssue: false,
    };
  },
  computed: {
    domain() {
      console.log(this.data.businessName.replaceAll(" ", "").toLowerCase());
      return this.data.businessName.replaceAll(" ", "").toLowerCase();
    },
    user() {
      return this.$store.state.user;
    },
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
      if (!this.data.businessName) {
        this.errors.businessNameError = true;
      } else {
        this.errors.businessNameError = false;
      }
      if (!this.data.businessPhone) {
        this.errors.businessPhoneError = true;
      }
      if (!this.data.address1) {
        this.errors.address1error = true;
      }

      if (!this.data.city || !this.data.state || !this.data.zipCode) {
        this.errors.address2error = true;
      }
      if (
        !this.errors.businessNameError &&
        !this.errors.businessPhoneError &&
        !this.errors.address1error &&
        !this.errors.address2error
      ) {
        this.data.subdomain = this.data.businessName
          .replaceAll(" ", "")
          .toLowerCase();
        this.addToDB();
        console.log(this.data);
      }
    },
    addToDB() {
      this.loading = true;
      Object.keys(this.data).forEach((key) => {
        if (this.data[key] != null) {
          let post = {
            variable: key,
            value: this.data[key],
          };
          axios
            .put(
              `https://9q6nkwso78.execute-api.us-east-1.amazonaws.com/Beta/admin/${this.user.tenantId}/users/${this.user.userId}`,
              post
            )
            .then((result) => {
              console.log(result);
            });
        }
      });
      this.loading = false;
      this.navigateToDashboard();
    },
    navigateToDashboard() {
      this.$router.push("/admin/dashboard");
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
  /* color: white; */
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

.third-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.third-width {
  width: 30%;
}

.healthy {
  border: 1px solid white;
  width: 100%;
  /* color: white; */
}
.error {
  border: 1px solid white;
  border-bottom: 2px solid red;
  width: 100%;
  /* color: white; */
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
  color: white;
  top: 20px;
  right: 20px;
  font-weight: 600;
}

.sign-in-text:hover {
  text-shadow: 1px 1px 10px white;
  cursor: pointer;
}
</style>