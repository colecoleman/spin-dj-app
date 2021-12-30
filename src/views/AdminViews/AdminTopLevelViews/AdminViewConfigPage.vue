<template>
  <section id="config-wrapper">
    <base-navigation-card>
      <template v-slot:navigation>
        <admin-view-config-navigation-items />
      </template>
    </base-navigation-card>
    <two-button-dialog-modal
      v-if="dialogModal"
      :modalBody="dialogModalData[dialogModal].body"
      @select-button-one="dialogModalData[dialogModal].confirmButton"
      @select-button-two="dialogModalData[dialogModal].cancelButton"
      @close-modal="closeDialogModal"
    ></two-button-dialog-modal>
    <div id="body">
      <div class="config-section" id="identity">
        <base-card>
          <template v-slot:title>Identity</template>

          <template v-slot:content>
            <div id="wrapper">
              <div class="branding-colors">
                <div class="branding-preferences-item">
                  <p class="bold">
                    Background Color:
                    {{ backgroundColor }}
                  </p>

                  <input type="color" v-model="backgroundColor" />
                </div>
                <div class="branding-preferences-item">
                  <p class="bold">
                    Foreground Color:
                    {{ foregroundColor }}
                  </p>
                  <input type="color" v-model="foregroundColor" />
                </div>
                <div class="branding-preferences-item">
                  <p class="bold">
                    Card Outline:
                    {{ cardOutline }}
                  </p>
                  <input type="color" v-model="cardOutline" />
                </div>
                <div class="branding-preferences-item">
                  <p class="bold">
                    Highlight Color:
                    {{ highlightColor }}
                  </p>
                  <input type="color" v-model="highlightColor" />
                </div>
                <div class="branding-preferences-item">
                  <p class="bold">
                    Text Color:
                    {{ textColor }}
                  </p>
                  <input type="color" v-model="textColor" />
                </div>
              </div>

              <div class="business-information-wrapper">
                <div class="business-information-section">
                  <div class="business-information-item">
                    <p class="bold">Business Name:</p>
                    <input
                      type="text"
                      :placeholder="businessName"
                      v-model="businessName"
                    />
                  </div>
                  <div class="business-information-item">
                    <p>Business Phone Number:</p>
                    <input
                      type="text"
                      :placeholder="businessPhoneNumber"
                      v-model="businessPhoneNumber"
                    />
                  </div>
                  <div class="business-information-item">
                    <p class="bold">Business Email Addresses:</p>
                    <div
                      class="business-information-item"
                      v-for="(address, index) in emailAddresses"
                      :key="index"
                    >
                      <div class="row-flex">
                        <p>{{ address }}</p>
                        <img
                          :src="SVGs.XIconSVG"
                          alt=""
                          @click="startDeleteEmail(index)"
                        />
                      </div>
                    </div>
                    <p class="bold">Add New Email Address:</p>
                    <div class="row-flex">
                      <input
                        class="input-prefix"
                        type="text"
                        placeholder="Start Typing..."
                        v-model="newEmailField"
                      />
                      <p class="input-suffix">@{{ subdomain }}.spindj.io</p>
                      <img
                        :src="SVGs.CircleCheckmarkSVG"
                        alt=""
                        @click="addEmail"
                      />
                    </div>
                  </div>
                  <div class="business-information-item">
                    <p class="bold">Business Logo:</p>
                    <input
                      type="file"
                      id="business-logo-hidden-file-button"
                      @change="onFileChange"
                      style="display: none"
                    />
                    <div class="button-wrapper">
                      <button-standard-with-icon
                        text="Choose File"
                        @click="chooseFile()"
                        class="form-button"
                      />
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
                        :placeholder="streetAddress1"
                        v-model="streetAddress1"
                      />
                    </div>
                    <div class="business-information-item">
                      <p>Address 2:</p>
                      <input
                        type="text"
                        :placeholder="streetAddress2"
                        v-model="streetAddress2"
                      />
                    </div>
                    <div class="business-information-item">
                      <p>City, State, Zip Code:</p>
                      <input
                        type="text"
                        :placeholder="cityStateZip"
                        v-model="cityStateZip"
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

      <div class="config-section" id="payments">
        <admin-view-config-payments />
      </div>
    </div>
    <button-standard-with-icon
      text="Save Changes"
      @click="saveChanges()"
      class="floating-save-button"
    ></button-standard-with-icon>
  </section>
</template>

<script>
import SVGs from "../../../assets/SVGs/svgIndex.js";
import BaseNavigationCard from "../../../SharedComponents/SharedComponentsUI/BaseNavigationCard.vue";
import TwoButtonDialogModal from "../../../SharedComponents/SharedComponentsUI/TwoButtonDialogModal.vue";

import AdminViewConfigNavigationItems from "../AdminComponents/AdminConfigComponents/AdminViewConfigNavigationItems.vue";
import AdminViewConfigPackages from "../AdminComponents/AdminConfigComponents/AdminConfigCards/AdminViewConfigPackages.vue";
import AdminViewConfigServices from "../AdminComponents/AdminConfigComponents/AdminConfigCards/AdminViewConfigServices.vue";
import AdminViewConfigForms from "../AdminComponents/AdminConfigComponents/AdminConfigCards/AdminViewConfigForms.vue";
import AdminViewConfigAddOns from "../AdminComponents/AdminConfigComponents/AdminConfigCards/AdminViewConfigAddOns.vue";
import AdminViewConfigAutomations from "../AdminComponents/AdminConfigComponents/AdminConfigCards/AdminViewConfigAutomations.vue";
import AdminViewConfigContracts from "../AdminComponents/AdminConfigComponents/AdminConfigCards/AdminViewConfigContracts.vue";
import AdminViewConfigDiscounts from "../AdminComponents/AdminConfigComponents/AdminConfigCards/AdminViewConfigDiscounts.vue";
import AdminViewConfigPayments from "../AdminComponents/AdminConfigComponents/AdminConfigCards/AdminViewConfigPayments.vue";
import ButtonStandardWithIcon from "../../../SharedComponents/SharedComponentsUI/ButtonStandardWithIcon.vue";

export default {
  data() {
    return {
      SVGs,
      dialogModal: null,
      newEmailField: null,
      emailDeleteindex: undefined,
      photoFile: undefined,
      dialogModalData: {
        deleteEmail: {
          body: "Are you sure you want to delete? Emails received from at address will no longer be deliverable.",
          confirmButton: this.confirmDeleteEmail,
          cancelButton: this.cancelDeleteEmail,
        },
        changeBusinessName: {
          body: "Changing your business name will also change your subdomain. Are you sure you want to change your business name?",
          confirmButton: this.confirmChangeBusinessName,
          cancelButton: this.cancelChangeBusinessName,
        },
      },
    };
  },
  methods: {
    chooseFile() {
      document.getElementById("business-logo-hidden-file-button").click();
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.photoFile = files[0];
    },
    async saveChanges() {
      if (this.photoFile) {
        await this.$store.dispatch("addPhoto").then((res) => {
          this.$store.commit("adminConfigIdentitySetBusinessLogo", res);
        });
      }
      this.$store.dispatch("updateBusinessSettings");
    },
    addEmail() {
      this.emailAddresses.push(
        `${this.newEmailField}@${this.subdomain}.spindj.io`
      );
      this.newEmailField = null;
    },
    closeDialogModal() {
      this.dialogModal = null;
    },
    startDeleteEmail(index) {
      this.dialogModal = "deleteEmail";
      this.emailDeleteindex = index;
    },
    confirmDeleteEmail(index) {
      this.identity.emailAddresses.splice(index, 1);
      this.closeDialogModal();
    },
    cancelDeleteEmail() {
      this.closeDialogModal();
      this.emailDeleteindex = undefined;
    },
  },
  computed: {
    subdomain() {
      return this.$store.state.businessSettings.identity.businessName
        .replaceAll(" ", "")
        .toLowerCase();
    },
    backgroundColor: {
      get() {
        return this.$store.state.businessSettings.identity.branding
          .backgroundColor;
      },
      set(value) {
        return this.$store.commit(
          "adminConfigIdentitySetBackgroundColor",
          value
        );
      },
    },
    foregroundColor: {
      get() {
        return this.$store.state.businessSettings.identity.branding
          .foregroundColor;
      },
      set(value) {
        return this.$store.commit(
          "adminConfigIdentitySetForegroundColor",
          value
        );
      },
    },
    cardOutline: {
      get() {
        return this.$store.state.businessSettings.identity.branding.cardOutline;
      },
      set(value) {
        return this.$store.commit("adminConfigIdentitySetCardOutline", value);
      },
    },
    highlightColor: {
      get() {
        return this.$store.state.businessSettings.identity.branding
          .highlightColor;
      },
      set(value) {
        return this.$store.commit(
          "adminConfigIdentitySetHightlightColor",
          value
        );
      },
    },
    textColor: {
      get() {
        return this.$store.state.businessSettings.identity.branding.textColor;
      },
      set(value) {
        return this.$store.commit("adminConfigIdentitySetTextColor", value);
      },
    },
    businessName: {
      get() {
        return this.$store.state.businessSettings.identity.businessName;
      },
      set(value) {
        return this.$store.commit("adminConfigIdentitySetBusinessName", value);
      },
    },
    businessPhoneNumber: {
      get() {
        return this.$store.state.businessSettings.identity.businessPhoneNumber;
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
        return this.$store.state.businessSettings.identity.businessAddress
          .streetAddress1;
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
        return this.$store.state.businessSettings.identity.businessAddress
          .streetAddress2;
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
        return this.$store.state.businessSettings.identity.businessAddress
          .cityStateZip;
      },
      set(value) {
        return this.$store.commit(
          "adminConfigIdentitySetBusinessCityStateZip",
          value
        );
      },
    },
    emailAddresses() {
      return this.$store.state.businessSettings.identity.emailAddresses;
    },
    businessSettings() {
      if (Object.keys(this.$store.state.businessSettings).length > 0) {
        console.log(this.$store.state.businessSettings);
        return this.$store.state.businessSettings;
      } else {
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
          payments: {
            creditCard: {
              enabled: false,
              Stripe: {},
              QuickBooks: {},
              Square: {},
            },
            p2p: {
              PayPal: {},
              Venmo: {},
            },
            check: {},
            custom: {},
          },
        };
      }
    },
  },
  components: {
    BaseNavigationCard,
    TwoButtonDialogModal,
    AdminViewConfigNavigationItems,
    AdminViewConfigPackages,
    AdminViewConfigServices,
    AdminViewConfigForms,
    AdminViewConfigAddOns,
    AdminViewConfigDiscounts,
    AdminViewConfigContracts,
    AdminViewConfigAutomations,
    AdminViewConfigPayments,
    ButtonStandardWithIcon,
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

.button-wrapper {
  width: 50%;
}

.floating-save-button {
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
.row-flex {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.input-prefix,
.input-suffix {
  height: 15px;
  padding: 4px;
  outline: none;
  border: 1px solid var(--textColor);
}

.input-prefix {
  border-right: none;
  border-radius: 5px 0px 0px 5px;
}
.input-suffix {
  background-color: var(--backgroundColor);
  border-left: none;
  border-radius: 0px 5px 5px 0px;
}

img {
  margin: 5px;
  height: 10px;
}

/* End Identity Card */
</style>