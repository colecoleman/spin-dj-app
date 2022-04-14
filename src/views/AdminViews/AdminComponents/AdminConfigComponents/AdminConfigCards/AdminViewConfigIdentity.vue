df
<template>
  <two-button-dialog-modal
    v-if="dialogModal"
    :modalBody="dialogModalData[dialogModal].body"
    @select-button-one="dialogModalData[dialogModal].confirmButton"
    @select-button-two="dialogModalData[dialogModal].cancelButton"
    @close-modal="closeDialogModal"
  />
  <base-card title="Identity">
    <template v-slot:content>
      <div id="wrapper">
        <div class="flex-wrap">
          <input-with-title
            :title="`
              Background:
              ${backgroundColor}`"
            type="color"
            :inputValue="backgroundColor"
            @input="fieldInput(undefined, 'backgroundColor', $event)"
          />
          <input-with-title
            :title="`
              Foreground:
              ${foregroundColor}`"
            type="color"
            :inputValue="foregroundColor"
            @input="fieldInput(undefined, 'foregroundColor', $event)"
          />
          <input-with-title
            :title="`
              Card Outline:
              ${cardOutline}`"
            type="color"
            :inputValue="cardOutline"
            @input="fieldInput(undefined, 'cardOutline', $event)"
          />
          <input-with-title
            :title="`
              Highlight:
              ${highlightColor}`"
            type="color"
            :inputValue="highlightColor"
            @input="fieldInput(undefined, 'highlightColor', $event)"
          />
          <input-with-title
            :title="`
              Text:
              ${textColor}`"
            type="color"
            :inputValue="textColor"
            @input="fieldInput(undefined, 'textColor', $event)"
          />
          <input-with-title
            :title="`
              Secondary Text:
              ${secondaryTextColor}`"
            type="color"
            :inputValue="secondaryTextColor"
            @input="fieldInput(undefined, 'secondaryTextColor', $event)"
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
            <input
              type="file"
              id="business-logo-hidden-file-button"
              @change="onFileChange"
              style="display: none"
            />
            <div class="button-wrapper">
              <button-standard-with-icon
                :text="photoFile ? photoFile.name : 'Choose File'"
                @click="chooseFile()"
                class="form-button"
              />
            </div>
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
    </template>
  </base-card>
</template>

<script>
import TwoButtonDialogModal from "../../../../../SharedComponents/SharedComponentsUI/TwoButtonDialogModal.vue";
import InputWithTitle from "../../../../../SharedComponents/SharedComponentsUI/ElementLibrary/InputWithTitle.vue";
import InputWithSuffix from "../../../../../SharedComponents/SharedComponentsUI/ElementLibrary/InputWithSuffix.vue";
import ItemWithActionableIcon from "../../../../../SharedComponents/SharedComponentsUI/ElementLibrary/ItemWithActionableIcon.vue";

export default {
  data() {
    return {
      svgStyling:
        "height: 10px; width: 10px; margin: 0px 5px; cursor: pointer;",
      dialogModal: null,
      newEmailField: null,
      emailDeleteIndex: undefined,
      photoFile: undefined,
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
    subdomain() {
      return this.$store.getters.identity.businessName
        .replaceAll(" ", "")
        .toLowerCase();
    },
    backgroundColor: {
      get() {
        return this.$store.getters.branding.backgroundColor;
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
        return this.$store.getters.branding.foregroundColor;
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
        return this.$store.getters.branding.cardOutline;
      },
      set(value) {
        return this.$store.commit("adminConfigIdentitySetCardOutline", value);
      },
    },
    highlightColor: {
      get() {
        return this.$store.getters.branding.highlightColor;
      },
      set(value) {
        return this.$store.commit(
          "adminConfigIdentitySetHighlightColor",
          value
        );
      },
    },
    textColor: {
      get() {
        return this.$store.getters.branding.textColor;
      },
      set(value) {
        return this.$store.commit("adminConfigIdentitySetTextColor", value);
      },
    },
    secondaryTextColor: {
      get() {
        return this.$store.getters.branding.secondaryTextColor;
      },
      set(value) {
        return this.$store.commit(
          "adminConfigIdentitySetSecondaryTextColor",
          value
        );
      },
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
  emits: ["logo"],
  methods: {
    chooseFile() {
      document.getElementById("business-logo-hidden-file-button").click();
    },
    fieldInput(object, property, value) {
      if (object) {
        object[property] = value;
      } else {
        this[property] = value;
      }
    },
    async onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.photoFile = files[0];
      this.$emit("logo", this.photoFile);
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
    ItemWithActionableIcon,
  },
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

  #wrapper {
    padding: 10px;
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
  @media (min-width: 850px) {
    .business-information-wrapper {
      flex-direction: row;
    }

    .business-information-section {
      width: 50%;
    }
  }
}
</style>
