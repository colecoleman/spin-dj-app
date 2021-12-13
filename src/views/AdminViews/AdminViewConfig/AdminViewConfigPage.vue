<template>
  <section id="config-wrapper">
    <base-navigation-card>
      <template v-slot:navigation>
        <admin-view-config-navigation-items />
      </template>
    </base-navigation-card>

    <div id="body" v-if="loaded">
      <div class="config-section" id="identity">
        <base-card>
          <template v-slot:title>Identity</template>

          <template v-slot:content>
            <div id="wrapper">
              <div class="branding-colors">
                <div class="branding-preferences-item">
                  <p class="bold">
                    Background Color:
                    {{ branding.backgroundColor }}
                  </p>

                  <input
                    type="color"
                    v-model="branding.backgroundColor"
                    name=""
                    id=""
                  />
                </div>
                <div class="branding-preferences-item">
                  <p class="bold">
                    Foreground Color:
                    {{ branding.foregroundColor }}
                  </p>
                  <input
                    type="color"
                    v-model="branding.foregroundColor"
                    name=""
                    id=""
                  />
                </div>
                <div class="branding-preferences-item">
                  <p class="bold">
                    Card Outline:
                    {{ branding.cardOutline }}
                  </p>
                  <input
                    type="color"
                    v-model="branding.cardOutline"
                    name=""
                    id=""
                  />
                </div>
                <div class="branding-preferences-item">
                  <p class="bold">
                    Highlight Color:
                    {{ branding.highlightColor }}
                  </p>
                  <input
                    type="color"
                    v-model="branding.highlightColor"
                    name=""
                    id=""
                  />
                </div>
                <div class="branding-preferences-item">
                  <p class="bold">
                    Text Color:
                    {{ branding.textColor }}
                  </p>
                  <input
                    type="color"
                    v-model="branding.textColor"
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
                      :placeholder="fields.identity.businessName"
                      v-model="fields.identity.businessName"
                    />
                  </div>
                  <div class="business-information-item">
                    <p>Business Phone Number:</p>
                    <input
                      type="text"
                      :placeholder="fields.identity.businessPhoneNumber"
                      v-model="fields.identity.businessPhoneNumber"
                    />
                  </div>
                  <div class="business-information-item">
                    <p class="bold">Business Email Addresses:</p>
                    <!-- <div
                      class="business-information-item"
                      v-for="(
                        address, index
                      ) in identity.businessEmailAddresses"
                      :key="index"
                    >
                      <p>Email Address ({{ index + 1 }}):</p>
                      <input type="text" :placeholder="address.address" />
                    </div> -->
                  </div>
                </div>
                <div class="business-information-section">
                  <div class="business-information-item">
                    <p class="bold">Business Address:</p>
                    <div class="business-information-item">
                      <p>Address 1:</p>
                      <input
                        type="text"
                        :placeholder="
                          fields.identity.businessAddress.address1one
                        "
                        v-model="fields.identity.businessAddress.streetAddress1"
                      />
                    </div>
                    <div class="business-information-item">
                      <p>Address 2:</p>
                      <input
                        type="text"
                        :placeholder="
                          fields.identity.businessAddress.address1two
                        "
                        v-model="fields.identity.businessAddress.streetAddress2"
                      />
                    </div>
                    <div class="business-information-item">
                      <p>City, State, Zip Code:</p>
                      <input
                        type="text"
                        :placeholder="fields.identity.businessAddress.address2"
                        v-model="fields.identity.businessAddress.address2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </base-card>
      </div>
      <div class="config-section" id="services">
        <admin-view-config-services
          :storeServices="businessSettings.product.services"
        />
      </div>
      <div class="config-section" id="packages">
        <admin-view-config-packages
          :storePackages="businessSettings.product.packages"
        />
      </div>
      <div class="config-section" id="add-ons">
        <admin-view-config-add-ons
          :storeAddOns="businessSettings.product.addOns"
        />
      </div>
      <div class="config-section" id="discounts">
        <admin-view-config-discounts
          :storeDiscounts="businessSettings.product.discounts"
        />
      </div>
      <div class="config-section" id="forms">
        <admin-view-config-forms :storeForms="businessSettings.product.form" />
      </div>

      <div class="config-section" id="contracts">
        <admin-view-config-contracts
          :storeContracts="businessSettings.product.contracts"
        />
      </div>

      <div class="config-section" id="automations">
        <admin-view-config-automations
          :storeAutomations="businessSettings.automations"
        />
      </div>
    </div>
    <button-standard-with-icon
      text="Save Changes"
      @click="saveChanges()"
    ></button-standard-with-icon>
  </section>
</template>

<script>
import BaseNavigationCard from "../../../SharedComponents/SharedComponentsUI/BaseNavigationCard.vue";
import AdminViewConfigNavigationItems from "./AdminViewConfigNavigationItems.vue";
import AdminViewConfigPackages from "./AdminViewConfigCards/AdminViewConfigPackages.vue";
import AdminViewConfigServices from "./AdminViewConfigCards/AdminViewConfigServices.vue";
import AdminViewConfigForms from "./AdminViewConfigCards/AdminViewConfigForms.vue";
import AdminViewConfigAddOns from "./AdminViewConfigCards/AdminViewConfigAddOns.vue";
import AdminViewConfigAutomations from "./AdminViewConfigCards/AdminViewConfigAutomations.vue";
import AdminViewConfigContracts from "./AdminViewConfigCards/AdminViewConfigContracts.vue";
import AdminViewConfigDiscounts from "./AdminViewConfigCards/AdminViewConfigDiscounts.vue";

export default {
  data() {
    return {
      loaded: false,
      fields: {
        identity: {
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
      },
    };
  },
  methods: {
    async saveChanges() {
      this.$store.dispatch(
        "adminConfigIdentitySetBusinessName",
        this.fields.identity.businessName
      );
      this.$store.dispatch(
        "adminConfigIdentitySetBusinessAddress",
        this.fields.identity.businessAddress
      );
      this.$store.dispatch(
        "adminConfigIdentitySetBusinessPhoneNumber",
        this.fields.identity.businessPhoneNumber
      );
      this.$store.dispatch("updateBusinessSettings");
    },
  },
  computed: {
    identity() {
      if (this.$store.state.businessSettings.identity) {
        return this.$store.state.businessSettings.identity;
      } else {
        return null;
      }
    },
    branding() {
      if (this.$store.state.branding) {
        return this.$store.state.businessSettings.identity.branding;
      } else {
        return {
          branding: {
            backgroundColor: "#F0F0F0",
            foregroundColor: "#FFFFFF",
            cardOutline: "#DDDDDD",
            highlightColor: "#00F5FF",
            textColor: "#000000",
          },
        };
      }
    },
    businessSettings() {
      if (Object.keys(this.$store.state.businessSettings).length > 0) {
        console.log("there are settings here, line 270 admin config");
        console.log(this.$store.state.businessSettings);
        return this.$store.state.businessSettings;
      } else {
        console.log("this is wrong, line 272 in admin config");
        return {
          identity: {
            branding: {
              backgroundColor: undefined,
              foregroundColor: undefined,
              textColor: undefined,
              cardOutline: undefined,
              highlightColor: undefined,
            },
            businessName: undefined,
            businessPhoneNumber: undefined,
            businessAddress: {
              streetAddress1: undefined,
              streetAddress2: undefined,
              address2: undefined,
            },
          },
          product: {
            services: [],
            addOns: [],
            packages: [],
            discounts: [],
            form: [],
          },
          contracts: [],
          automations: [],
        };
      }
    },
  },
  async created() {
    // await this.$store.dispatch("setBusinessSettings");
    this.fields.identity.businessName = this.identity.businessName;
    this.fields.identity.businessAddress.streetAddress1 =
      this.identity.businessAddress.streetAddress1;
    this.fields.identity.businessAddress.streetAddress2 =
      this.identity.businessAddress.streetAddress2;
    this.fields.identity.businessAddress.address2 =
      this.identity.businessAddress.address2;
    this.fields.identity.businessPhoneNumber =
      this.identity.businessPhoneNumber;
    console.log(this.fields);
    this.loaded = true;
  },
  components: {
    BaseNavigationCard,
    AdminViewConfigNavigationItems,
    AdminViewConfigPackages,
    AdminViewConfigServices,
    AdminViewConfigForms,
    AdminViewConfigAddOns,
    AdminViewConfigDiscounts,
    AdminViewConfigContracts,
    AdminViewConfigAutomations,
  },
};
</script>

<style scoped>
#config-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}

.config-section {
  height: auto;
}

#configuration-navigation {
  height: 100%;
  width: 20%;
}
#body {
  width: 80%;
  height: 100%;
  overflow: scroll;
}

.button-standard-with-icon {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: var(--foregroundColor);
}

/* 
For Identity Card
*/

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

/* End Identity Card */
</style>