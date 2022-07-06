
<template>
  <large-floating-card @close="close">
    <div class="button-container">
      <round-icon-button
        class="round-button-icon"
        svg="save"
        @click="saveChanges"
      />
    </div>
    <div id="admin-config-identity-wrapper">
      <two-button-dialog-modal
        v-if="dialogModal"
        :modalBody="dialogModalData[dialogModal].body"
        @select-button-one="dialogModalData[dialogModal].confirmButton"
        @select-button-two="dialogModalData[dialogModal].cancelButton"
        @close-modal="closeDialogModal"
      />
      <div id="wrapper">
        <div class="color-inputs">
          <input-with-title
            v-for="(color, key, index) in colors"
            :key="index"
            :title="key"
            type="color"
            :inputValue="color.get()"
            @input="color.set($event)"
          />
        </div>
        <div class="business-information-wrapper">
          <div class="business-information-section">
            <input-with-title
              title="Business Name:"
              type="text"
              :inputValue="businessName"
              @input="fieldInput(undefined, 'businessName', $event)"
            />
            <input-with-title
              title="Business Phone:"
              type="text"
              :inputValue="businessPhoneNumber"
              @input="fieldInput(undefined, 'businessPhoneNumber', $event)"
            />
            <p>Business Email Addresses:</p>
            <input-with-suffix
              placeholder="Start Typing..."
              title="Add New Email Address:"
              :inputValue="newEmailField"
              :suffix="`@${subdomain}.spindj.io`"
              svg="circle-checkmark"
              @iconClicked="addEmail"
              @input="fieldInput(undefined, 'newEmailField', $event)"
            />
            <div class="flex-wrap">
              <div v-for="(address, index) in emailAddresses" :key="index">
                <item-with-actionable-icon
                  svg="x-icon"
                  :item="address"
                  @clicked="startDeleteEmail(index)"
                />
              </div>
            </div>
            <p>Business Logo:</p>
            <image-input :image="businessLogo" @photo-chosen="photoChosen" />
          </div>
          <div class="business-information-section">
            <input-with-title
              title="Address 1:"
              type="text"
              :inputValue="streetAddress1"
              @input="fieldInput(undefined, 'streetAddress1', $event)"
            />

            <input-with-title
              title="Address 2:"
              type="text"
              :inputValue="streetAddress2"
              @input="fieldInput(undefined, 'streetAddress2', $event)"
            />

            <input-with-title
              title="City, State, Zip Code:"
              type="text"
              :inputValue="cityStateZip"
              @input="fieldInput(undefined, 'cityStateZip', $event)"
            />

            <div v-if="this.$store.getters.identity.subdomain.length < 3">
              <p>Business Subdomains:</p>
              <input-with-suffix
                placeholder="Start Typing..."
                suffix=".spindj.io"
                title="Subdomain:"
                svg="circle-checkmark"
                @iconClicked="
                  subdomainAvailable ? addSubdomain() : checkSubdomain()
                "
                :inputValue="subdomainField"
                @input="fieldInput(undefined, 'subdomainField', $event)"
              />
            </div>
            <div class="flex-wrap">
              <div
                v-for="(subdomain, index) in this.$store.state.businessSettings
                  .identity.subdomain"
                :key="index"
              >
                <item-with-actionable-icon
                  svg="x-icon"
                  :item="subdomain"
                  @clicked="initiateDeleteSubdomain(index, subdomain)"
                />
              </div>
            </div>
            <p
              class="context"
              v-if="this.$store.getters.identity.subdomain.length >= 3"
            >
              You've reached the maximum limit of 3 subdomains. Please delete
              one to add another.
            </p>
            <p class="context" v-if="checkingSubdomain">Checking...</p>
            <p class="context" v-if="subdomainUnavailable">
              Subdomain Unavailable. Try choosing another!
            </p>
            <p class="context" v-if="subdomainAvailable">
              Subdomain Available! Click again to confirm.
            </p>
            <p class="context" v-if="subdomainAvailable">
              Note: Changing your subdomain will change links to your email
              domains. Please be sure to alert clients to retain consistent
              branding.
            </p>
          </div>
        </div>
      </div>
    </div></large-floating-card
  >
</template>

<script>
import ImageInput from "../../../SharedComponentsUI/ElementLibrary/ImageInput.vue";
import TwoButtonDialogModal from "../../../SharedComponentsUI/TwoButtonDialogModal.vue";
import InputWithTitle from "../../../SharedComponentsUI/ElementLibrary/InputWithTitle.vue";
import LargeFloatingCard from "../../../SharedComponentsUI/FloatingCards/LargeFloatingCard.vue";
import InputWithSuffix from "../../../SharedComponentsUI/ElementLibrary/InputWithSuffix.vue";
import ItemWithActionableIcon from "../../../SharedComponentsUI/ElementLibrary/ItemWithActionableIcon.vue";
import RoundIconButton from "../../../SharedComponentsUI/RoundIconButton.vue";

export default {
  data() {
    return {
      activeComponent: undefined,
      dialogModal: null,
      newEmailField: null,
      emailDeleteIndex: undefined,
      photoFile: undefined,
      logo: undefined,
      subdomainField: undefined,
      checkingSubdomain: false,
      subdomainAvailable: false,
      subdomainUnavailable: false,
      subdomainToDelete: null,
    };
  },
  computed: {
    dialogModalData() {
      return {
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
        deleteSubdomain: {
          body: `Are you sure you want to delete the "${
            this.subdomainToDelete ? this.subdomainToDelete.subdomain : ""
          }" subdomain?`,
          confirmButton: this.confirmDeleteSubdomain,
          cancelButton: this.cancelDeleteSubdomain,
        },
      };
    },
    colors() {
      let branding = this.$store.getters.branding;
      let store = this.$store;
      return {
        Background: {
          get() {
            return branding.backgroundColor;
          },
          set(value) {
            console.log(value);
            return store.commit("adminConfigIdentitySetBackgroundColor", value);
          },
        },
        Foreground: {
          get() {
            return branding.foregroundColor;
          },
          set(value) {
            return store.commit("adminConfigIdentitySetForegroundColor", value);
          },
        },
        "Card Outline": {
          get() {
            return branding.cardOutline;
          },
          set(value) {
            return store.commit("adminConfigIdentitySetCardOutline", value);
          },
        },
        Highlight: {
          get() {
            return branding.highlightColor;
          },
          set(value) {
            return store.commit("adminConfigIdentitySetHighlightColor", value);
          },
        },
        Text: {
          get() {
            return branding.textColor;
          },
          set(value) {
            return store.commit("adminConfigIdentitySetTextColor", value);
          },
        },
        "Secondary Text": {
          get() {
            return branding.secondaryTextColor;
          },
          set(value) {
            return store.commit(
              "adminConfigIdentitySetSecondaryTextColor",
              value
            );
          },
        },
      };
    },
    businessLogo() {
      return this.$store.getters.businessLogo;
    },
    subdomain() {
      return this.$store.getters.identity.businessName
        .replaceAll(" ", "")
        .toLowerCase();
    },
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
    emailAddresses() {
      return this.$store.getters.emailAddresses;
    },
  },

  methods: {
    close() {
      this.$emit("close");
    },
    fieldInput(object, property, value) {
      if (object) {
        object[property] = value;
      } else {
        this[property] = value;
      }
    },
    async saveChanges() {
      if (this.logo) {
        await this.$store
          .dispatch("addPhoto", this.logo)
          .then((res) => {
            this.$store.commit("adminConfigIdentitySetBusinessLogo", res);
          })
          .catch((e) => {
            console.log(e);
          });
      }
      await this.$store.dispatch("updateBusinessIdentity").then(() => {
        this.saving = false;
      });
    },
    photoChosen(file) {
      this.logo = file;
      this.$store.commit("adminConfigIdentitySetBusinessLogo", file);
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
      this.emailDeleteIndex = index;
    },
    confirmDeleteEmail() {
      this.emailAddresses.splice(this.emailDeleteIndex, 1);
      this.closeDialogModal();
    },
    cancelDeleteEmail() {
      this.closeDialogModal();
      this.emailDeleteIndex = undefined;
    },
    cancelDeleteSubdomain() {
      this.closeDialogModal();
      this.subdomainToDelete = undefined;
    },
    checkSubdomain() {
      this.checkingSubdomain = true;
      this.$store
        .dispatch("checkSubdomain", this.subdomainField)
        .then((res) => {
          this.checkingSubdomain = false;
          if (res.data === "available") {
            this.subdomainAvailable = true;
            this.subdomainUnavailable = false;
          } else {
            this.subdomainAvailable = false;
            this.subdomainUnavailable = true;
          }
        })
        .catch((err) => {
          this.checkingSubdomain = false;
          console.log(err);
        });
    },
    addSubdomain() {
      if (this.subdomainAvailable === true) {
        this.$store
          .dispatch("addSubdomain", this.subdomainField)
          .then(() => {
            this.subdomainField = null;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    initiateDeleteSubdomain(index, subdomain) {
      this.subdomainToDelete = { index: index, subdomain: subdomain };
      this.dialogModal = "deleteSubdomain";
    },
    confirmDeleteSubdomain() {
      this.$store.dispatch("deleteSubdomain", this.subdomainToDelete.index);
      this.closeDialogModal();
    },
  },
  components: {
    TwoButtonDialogModal,
    InputWithTitle,
    InputWithSuffix,
    ImageInput,
    ItemWithActionableIcon,
    RoundIconButton,
    LargeFloatingCard,
  },
  emits: ["logo", "close-card"],
  watch: {
    subdomainField() {
      this.subdomainAvailable = false;
    },
  },
};
</script>

<style scoped>
@media screen {
  * {
    color: var(--textColor);
  }
  #admin-config-identity-wrapper {
    position: relative;
    height: calc(100% - 20px);
    width: calc(100% - 20px);
    padding: 10px;
    overflow: scroll;
  }

  p {
    font-size: 9pt;
    text-align: left;
    font-weight: 600;
  }

  .flex-wrap {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
  }

  .color-inputs {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }

  .color {
    width: 100px;
  }

  #wrapper {
    padding: 10px;
  }

  .button-container {
    display: flex;
    position: absolute;
    top: 0;
    right: 0;
  }

  .business-information-wrapper {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    /* max-height: 100%; */
    overflow-y: scroll;
    margin-top: 10px;
  }

  .business-information-section {
    width: 100%;
  }

  .context {
    margin: 2px;
    font-style: italic;
  }

  .button-wrapper {
    width: 50%;
  }
  @media screen and (min-width: 800px) {
    * {
      color: var(--textColor);
    }
    #admin-config-identity-wrapper {
      position: relative;
    }

    p {
      font-size: 9pt;
      text-align: left;
      font-weight: 600;
    }

    .flex-wrap {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      width: 100%;
    }

    .color-inputs {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
    }

    .color {
      width: 100px;
    }

    #wrapper {
      padding: 10px;
    }

    .button-container {
      display: flex;
      position: absolute;
      top: 0;
      right: 0;
    }

    .business-information-wrapper {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      /* max-height: 100%; */
      overflow-y: scroll;
      margin-top: 10px;
    }

    .business-information-section {
      width: 100%;
    }

    .context {
      margin: 2px;
      font-style: italic;
    }

    .button-wrapper {
      width: 50%;
    }
  }
}
</style>
