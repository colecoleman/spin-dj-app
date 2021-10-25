<template>
  <base-card>
    <template v-slot:title>Identity</template>
    <template v-slot:content>
      <div>
        <div class="branding-colors">
          <div class="branding-preferences-item">
            <p class="bold">
              Background Color:
              {{ identity.branding.backgroundColor }}
            </p>

            <input
              type="color"
              v-model="identity.branding.backgroundColor"
              name=""
              id=""
            />
          </div>
          <div class="branding-preferences-item">
            <p class="bold">
              Foreground Color:
              {{ identity.branding.foregroundColor }}
            </p>
            <input
              type="color"
              v-model="identity.branding.foregroundColor"
              name=""
              id=""
            />
          </div>
          <div class="branding-preferences-item">
            <p class="bold">
              Card Outline:
              {{ identity.branding.cardOutline }}
            </p>
            <input
              type="color"
              v-model="identity.branding.cardOutline"
              name=""
              id=""
            />
          </div>
          <div class="branding-preferences-item">
            <p class="bold">
              Highlight Color:
              {{ identity.branding.highlightColor }}
            </p>
            <input
              type="color"
              v-model="identity.branding.highlightColor"
              name=""
              id=""
            />
          </div>
          <div class="branding-preferences-item">
            <p class="bold">
              Text Color:
              {{ identity.branding.textColor }}
            </p>
            <input
              type="color"
              v-model="identity.branding.textColor"
              name=""
              id=""
            />
          </div>
        </div>

        <div class="business-information-wrapper">
          <div class="business-information-section">
            <div class="business-information-item">
              <p class="bold">Business Name:</p>
              <input
                type="text"
                :placeholder="identity.businessName"
                v-model="inputs.businessName"
              />
            </div>
            <div class="business-information-item">
              <p>Business Phone Number:</p>
              <input
                type="text"
                :placeholder="identity.businessPhoneNumber"
                v-model="inputs.businessPhoneNumber"
              />
            </div>
            <div class="business-information-item">
              <p class="bold">Business Email Addresses:</p>
              <div
                class="business-information-item"
                v-for="(address, index) in identity.businessEmailAddresses"
                :key="index"
              >
                <p>Email Address ({{ index + 1 }}):</p>
                <input type="text" :placeholder="address.address" />
              </div>
            </div>
          </div>
          <div class="business-information-section">
            <div class="business-information-item">
              <p class="bold">Business Address:</p>
              <div class="business-information-item">
                <p>Address 1:</p>
                <input
                  type="text"
                  :placeholder="identity.businessAddress.address1one"
                />
              </div>
              <div class="business-information-item">
                <p>Address 2:</p>
                <input
                  type="text"
                  :placeholder="identity.businessAddress.address1two"
                />
              </div>
              <div class="business-information-item">
                <p>City, State, Zip Code:</p>
                <input
                  type="text"
                  :placeholder="identity.businessAddress.address2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      inputs: {
        businessName: undefined,
        businessAddress: {
          streetAddress1: undefined,
          streetAddress2: undefined,
          address2: undefined,
        },
        businessPhoneNumber: undefined,
        branding: {
          backgroundColor: undefined,
          foregroundColor: undefined,
          cardOutline: undefined,
          highlightColor: undefined,
          textColor: undefined,
        },
      },
      emailAddressInput: undefined,
    };
  },
  computed: {
    identity() {
      return this.$store.state.businessSettings.identity;
    },
  },
};
</script>

<style scoped>
.branding-colors {
  display: flex;
  flex-direction: row;
}

#body {
  width: 80%;
  height: 100%;
  overflow: scroll;
}

.branding-preferences-item {
  display: flex;
  flex-direction: column;
  width: 20%;
}

.business-information-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-height: 100%;
  overflow-y: scroll;
  margin-top: 10px;
}

.business-information-section {
  width: 50%;
}

.business-information-item {
  display: flex;
  flex-direction: column;
  justify-content: left;
  margin-left: 10px;
}

.business-information-item > p {
  text-align: left;
}

.business-information-item > input {
  width: 50%;
  align-self: left;
  justify-self: left;
}

.bold {
  font-weight: 600;
  margin-top: 20px;
}

:disabled {
  opacity: 0.5;
}
</style>