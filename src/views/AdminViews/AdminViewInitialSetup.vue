<template>
  <section id="page-wrapper">
    <div id="hero">
      <div class="hero-left hero-half">
        <div class="image-container">
          <img
            src="../../assets/spin-logo-with-text.svg"
            alt="Spin DJ Software Logo"
          />
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
              v-model="businessPhoneNumber"
              :class="errors.businessPhoneError ? 'error' : 'healthy'"
            />
          </div>
          <div class="input-field">
            <p>Street Address:</p>
            <input
              type="address"
              v-model="streetAddress1"
              :class="errors.address1error ? 'error' : 'healthy'"
            />
            <p>City, State/Province, Zip Code:</p>
            <input
              type="address"
              v-model="cityStateZip"
              :class="errors.address1error ? 'error' : 'healthy'"
            />

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
              @change="onFileChange"
              style="display: none"
            />
            <button-standard-with-icon
              :text="logo ? logo.name.split('.')[0] : 'Choose File'"
              @click="chooseFileLogo()"
            />
          </div>
          <button-standard-with-icon
            text="Next"
            @click="step1validationBlock()"
          />
        </div>
      </div>
      <div class="hero-right hero-half" v-if="step === 2">
        <h1>Let's get you subscribed.</h1>
        <div class="price-section">
          <div class="price-item">
            <div class="price-item-top">
              <h1>PUBLIC</h1>
              <h1>BETA</h1>
            </div>
            <div class="price-item-bottom">
              <h2>$15/MO</h2>
              <h5>USD</h5>
            </div>
          </div>
          <p class="context">
            You will be grandfathered in at the current price, until you cancel
            your subscription.
          </p>
        </div>

        <button-standard-with-icon
          text="Next"
          @click="
            step === 1
              ? step1validationBlock()
              : step === 2
              ? initiateSubscription()
              : ''
          "
        />
      </div>
    </div>
  </section>
</template>

<script>
import SpinLogoWithText from "../../assets/spin-logo-with-text.svg";

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
        subdomain: this.subdomain,
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
      step: 2,
      importIssue: false,
    };
  },
  computed: {
    businessName: {
      get() {
        return this.$store.getters.identity.businessName;
      },
      set(value) {
        return this.$store.commit("adminConfigIdentitySetBusinessName", value);
      },
    },
    businessPhoneNumber: {
      get() {
        return this.$store.getters.identity.businessPhoneNumber;
      },
      set(value) {
        return this.$store.commit(
          "adminConfigIdentitySetBusinessPhoneNumber",
          value
        );
      },
    },
    streetAddress1: {
      get() {
        return this.$store.getters.identity.businessAddress.streetAddress1;
      },
      set(value) {
        return this.$store.commit(
          "adminConfigIdentitySetBusinessAddress1",
          value
        );
      },
    },
    streetAddress2: {
      get() {
        return this.$store.getters.identity.businessAddress.streetAddress2;
      },
      set(value) {
        return this.$store.commit(
          "adminConfigIdentitySetBusinessAddress2",
          value
        );
      },
    },
    cityStateZip: {
      get() {
        return this.$store.getters.identity.businessAddress.cityStateZip;
      },
      set(value) {
        return this.$store.commit(
          "adminConfigIdentitySetBusinessCityStateZip",
          value
        );
      },
    },
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    chooseFileLogo() {
      document.getElementById("hidden-file-button-logo").click();
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.logo = files[0];
    },
    step1validationBlock() {
      if (!this.businessName) {
        this.errors.businessNameError = true;
      } else {
        this.errors.businessNameError = false;
      }
      if (!this.businessPhoneNumber) {
        this.errors.businessPhoneError = true;
      }
      if (!this.streetAddress1) {
        this.errors.address1error = true;
      }

      if (!this.cityStateZip) {
        this.errors.address2error = true;
      }
      if (
        !this.errors.businessNameError &&
        !this.errors.businessPhoneError &&
        !this.errors.address1error &&
        !this.errors.address2error
      ) {
        this.addToDB();
      }
    },
    async addToDB() {
      this.loading = true;
      if (this.logo) {
        let photo = await this.$store.dispatch("addPhoto", this.logo);
        await this.$store.commit("adminConfigIdentitySetBusinessLogo", photo);
        await this.$store.dispatch("updateBusinessIdentity");
      }
      this.loading = false;
      this.navigateToDashboard();
    },
    async initiateSubscription() {
      await this.$store.dispatch("stripeCreateSubscription").then((res) => {
        window.location.href = res.data.url;
      });
    },
    navigateToDashboard() {
      this.$router.push("/admin/dashboard");
    },
  },
};
</script>

<style scoped>
@media screen {
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
    /* line-height: 2em; */
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
    align-content: center;
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
  }
  .error {
    border: 1px solid white;
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
    margin: 0px 30% 40px;
    width: 40%;
  }

  .price-section {
    width: 150px;
  }

  .price-item {
    cursor: pointer;
    border: 1px solid white;
    width: 150px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
  }

  .price-item-top {
    background-color: white;
    border-radius: 8px 8px 0 0;
  }

  .price-item-top > h1 {
    color: black;
    margin: 15px;
  }

  .price-item-bottom > h2,
  h5 {
    margin: 5px;
  }

  @media (min-width: 800px) {
    #hero {
      height: 100vh;
      width: 100vw;
      display: flex;
      flex-direction: row;
    }

    .hero-half {
      width: 50%;
      height: 100%;
    }
  }
}
</style>
