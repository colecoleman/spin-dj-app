<template>
  <div id="toolbar" class="no-print">
    <div id="icons">
      <vue-svg
        svg="left-arrow"
        v-if="checkForIcon('left-arrow')"
        :customStyle="svgStyling"
        class="svg-styling"
        @clicked="leftArrowClicked"
      />
      <vue-svg
        v-if="checkForIcon('print')"
        svg="print"
        :customStyle="svgStyling"
        class="svg-styling"
        @clicked="print"
      />
      <vue-svg
        v-if="checkForIcon('save')"
        svg="save"
        :customStyle="svgStyling"
        class="svg-styling"
        @clicked="saveButtonClicked"
      />
      <vue-svg
        v-if="checkForIcon('plus-sign')"
        svg="plus-sign"
        :customStyle="svgStyling"
        class="svg-styling"
        @clicked="toggleAddMenuOpened"
      />
      <vue-svg
        v-if="checkForIcon('checked-signature')"
        svg="checked-signature"
        :customStyle="svgStyling"
        class="svg-styling"
        @clicked="markAsSigned"
      />
      <div v-if="checkForIcon('admin-signature')" class="e-sign-grouping">
        <vue-svg
          svg="signature-admin"
          :customStyle="svgStyling"
          class="svg-styling"
          customClass="pulsing"
          @clicked="toggleAdminESign"
        />
        <transition name="slide">
          <div class="e-sign-field" v-if="adminESignOpen">
            <input-with-title
              title="Legal Name"
              :placeholder="`${user.given_name} ${user.family_name}`"
              :inputValue="eSignField"
              :error="eSignFieldNotFilled"
              @input="setESignField($event)"
            />
            <vue-svg
              svg="circle-checkmark"
              :customStyle="svgStyling"
              class="svg-styling"
              @clicked="submitAdminESign"
            />
          </div>
        </transition>
      </div>
      <div class="e-sign-grouping" v-if="checkForIcon('signature')">
        <vue-svg
          svg="signature"
          :customStyle="svgStyling"
          class="svg-styling"
          customClass="pulsing"
          @clicked="toggleESign"
        />
        <transition name="slide">
          <div class="e-sign-field" v-if="eSignOpen">
            <input-with-title
              title="Legal Name"
              :placeholder="`${user.given_name} ${user.family_name}`"
              :inputValue="eSignField"
              @input="setESignField($event)"
            />
            <vue-svg
              svg="circle-checkmark"
              :customStyle="svgStyling"
              class="svg-styling"
              @clicked="submitESign"
            />
          </div>
        </transition>
      </div>
      <vue-svg
        svg="x-icon"
        :customStyle="svgStyling"
        class="svg-styling"
        @clicked="close"
      />
      <vue-svg
        v-if="checkForIcon('right-arrow')"
        svg="right-arrow"
        :customStyle="svgStyling"
        class="svg-styling"
        @clicked="rightArrowClicked"
      />
    </div>
    <Transition name="grow">
      <div id="e-sign-disclaimer" v-if="eSignOpen">
        <p>
          By electronically signing the agreement, I agree and consent to do
          business electronically. I understand that this agreement is legally
          binding.
        </p>
      </div>
    </Transition>
    <Transition name="grow">
      <div id="add-button-list" class="bubble-pool" v-if="addMenuOpened">
        <input-with-binary-selection
          v-for="item in addOnItems"
          :key="item.id"
          :item="item[addOnItemTitle]"
          :checked="checkIfIncludes(item)"
          @clicked="toggleAddOnItemFromIncluded(item)"
        />
      </div>
    </Transition>
  </div>
</template>
<script>
import InputWithTitle from "../../SharedComponents/SharedComponentsUI/ElementLibrary/InputWithTitle.vue";
import InputWithBinarySelection from "../../SharedComponents/SharedComponentsUI/ElementLibrary/InputWithBinarySelection.vue";
import VueSvg from "../../assets/VueSvg.vue";
export default {
  data() {
    return {
      svgStyling:
        "width: 18px; height: 18px; color: var(--textColor); margin: 3px;",
      adminESignOpen: false,
      eSignFieldNotFilled: false,
      eSignOpen: false,
      addMenuOpened: false,
      eSignField: undefined,
    };
  },
  methods: {
    print() {
      window.print();
    },
    setESignField(val) {
      this.eSignField = val;
    },
    toggleESign() {
      this.eSignOpen = !this.eSignOpen;
    },
    checkForIcon(icon) {
      return this.icons.includes(icon);
    },
    checkIfIncludes(item) {
      if (
        this.includedItems.find((x) => {
          return x.id == item.id;
        })
      ) {
        return true;
      } else {
        return false;
      }
    },
    toggleAddMenuOpened() {
      this.addMenuOpened = !this.addMenuOpened;
    },
    toggleAddOnItemFromIncluded(item) {
      this.$emit("toggleAddOnItemFromIncluded", item);
    },
    submitESign() {
      if (!this.eSignField) {
        this.eSignFieldNotFilled = true;
      } else {
        let signature = {
          signerName: this.eSignField,
          signerDate: new Date(),
          signerUUID: this.$store.state.user.userId,
          status: "signed",
        };
        this.$emit("submitESignature", signature);
      }
    },
    markAsSigned() {
      let signature = {
        signerName: "Marked By Admin",
        signerDate: new Date(),
        signerUUID: this.$store.state.user.userId,
        status: "signed",
      };
      this.$emit("submitESignature", signature);
    },
    submitAdminESign() {
      if (!this.eSignField) {
        this.eSignFieldNotFilled = true;
      } else {
        let signature = {
          signerName: this.eSignField,
          signerDate: new Date(),
          signerUUID: this.$store.state.user.userId,
          status: "signed",
        };
        this.$emit("submitAdminESignature", signature);
      }
    },
    toggleAdminESign() {
      this.adminESignOpen = !this.adminESignOpen;
    },
    close() {
      this.$emit("close");
    },
    leftArrowClicked() {
      this.$emit("leftArrowClicked");
    },
    saveButtonClicked() {
      this.$emit("saveButtonClicked");
    },
    rightArrowClicked() {
      this.$emit("rightArrowClicked");
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  created() {},
  components: { VueSvg, InputWithTitle, InputWithBinarySelection },
  emits: [
    "submitESignature",
    "submitAdminESignature",
    "toggleAddOnItemFromIncluded",
    "leftArrowClicked",
    "saveButtonClicked",
    "rightArrowClicked",
    "close",
  ],
  props: ["icons", "addOnItems", "includedItems", "addOnItemTitle"],
};
</script>
<style scoped>
#toolbar {
  width: 100%;
  /* background-color: rgba(0, 0, 0, 0.25); */
  /* border: 1px solid var(--textColor); */
  /* border-bottom: none; */
  display: flex;
  flex-direction: column;
  overflow: hidden;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
}
.svg-styling {
  width: 18px;
  height: 18px;
  color: var(--textColor);
  margin: 3px;
}
.e-sign-grouping,
.e-sign-field {
  display: flex;
  align-items: center;
  width: auto;
}
#icons {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  height: fit-content;
  width: 100%;
}
#e-sign-disclaimer {
  width: 100%;
  /* position: absolute; */
  /* bottom: 0; */
  height: auto;
  justify-content: space-between;
  /* align-items: center; */
}

#add-button-list {
  /* height: auto; */
  max-height: 200px;
}

.bubble-pool {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.grow-enter-active,
.grow-leave-active {
  transition: all 1s ease;
}

.grow-enter-from,
.grow-leave-to {
  opacity: 0;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 1s ease;
}

.slide-enter-from,
.slide-leave-to {
  width: 0px;
  opacity: 0;
  transform: translateX(100%);
  overflow: hidden;
}

@media print {
  #toolbar {
    display: none;
  }
}
</style>