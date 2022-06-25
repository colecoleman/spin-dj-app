<template>
  <backdrop @click.self="closeEditCard" id="edit-card-wrapper">
    <div id="edit-card">
      <div id="information-edit-section">
        <div
          class="information-item"
          v-for="(item, key, index) in fields"
          :key="index"
        >
          <p>{{ item.display }}:</p>
          <div
            class="information-and-pen"
            v-if="
              !checkIfEditArrayContainsField(key) &&
              item.display !== 'Profile Picture'
            "
          >
            <p>
              <span>{{ item.data }}</span>
            </p>
            <round-icon-button svg="edit-pen" @click="toggleEditField(key)" />
          </div>
          <div
            class="information-and-pen"
            v-if="
              checkIfEditArrayContainsField(key) ||
              item.display === 'Profile Picture'
            "
          >
            <component
              :is="item.component"
              v-bind="item.componentParameters"
              :processing="processing"
              @input="textInput"
              @actionable-icon-clicked="actionableIconClicked"
              @update-profile-picture="updateProfilePicture"
              @close="toggleEditField(key)"
            />
          </div>
        </div>
      </div>
    </div>
  </backdrop>
</template>

<script>
import Backdrop from "../../../SharedComponentsUI/Backdrop.vue";
import InputWithActionableIcon from "../../../SharedComponentsUI/ElementLibrary/InputWithActionableIcon.vue";
import RoundIconButton from "../../../SharedComponentsUI/RoundIconButton.vue";
export default {
  data() {
    return {
      fieldToEdit: undefined,
      activeEditField: undefined,
      activeEditValue: undefined,
      processing: false,
      // fields: {
      //   name: undefined,
      //   streetAddress1: undefined,
      //   streetAddress2: undefined,
      //   cityStateZip: undefined,
      // },
    };
  },
  computed: {
    fields() {
      const {
        name,
        address: { streetAddress1, streetAddress2, cityStateZip },
      } = this.location;
      return {
        name: {
          data: name,
          display: "Name",
          component: InputWithActionableIcon,
          componentParameters: {
            placeholder: name,
            svg: this.processing ? "loading" : "circle-checkmark",
          },
        },
        streetAddress1: {
          data: streetAddress1,
          display: "Street Address 1",
          component: InputWithActionableIcon,
          componentParameters: {
            placeholder: streetAddress1,
            svg: this.processing ? "loading" : "circle-checkmark",
          },
        },
        streetAddress2: {
          data: streetAddress2,
          display: "Street Address 2",
          component: InputWithActionableIcon,
          componentParameters: {
            placeholder: streetAddress2,
            svg: this.processing ? "loading" : "circle-checkmark",
          },
        },
        cityStateZip: {
          data: cityStateZip,
          display: "City, State, Zip",
          component: InputWithActionableIcon,
          componentParameters: {
            placeholder: cityStateZip,
            svg: this.processing ? "loading" : "circle-checkmark",
          },
        },
      };
    },
  },
  methods: {
    closeEditCard() {
      this.$emit("close-edit-card");
    },
    textInput(val) {
      this.activeEditValue = val;
    },
    toggleEditField(field) {
      if (field !== this.activeEditField) {
        this.activeEditField = field;
      } else {
        this.activeEditField = undefined;
      }
    },
    checkIfEditArrayContainsField(field) {
      if (field === this.activeEditField) {
        return true;
      } else {
        return false;
      }
    },
    async actionableIconClicked() {
      this.procesing = true;
  
      let payload = {
        locationId: this.location.userId,
      };
      if (this.activeEditField === "name") {
        payload.variable = this.activeEditField;
        payload.value = this.activeEditValue;
      } else {
        let address = this.location.address;
        address[this.activeEditField] = this.activeEditValue;
        payload.value = address;
        payload.variable = 'address'
      }
      await this.$store.dispatch("editLocation", payload);
      this.$emit("edit-location", payload);
      this.processing = false;
      this.$emit("close-edit-card");
    },
  },
  components: { Backdrop, RoundIconButton, InputWithActionableIcon },
  emits: ["close-edit-card", "edit-location"],
  props: ["location"],
};
</script>

<style scoped>
#edit-card-wrapper {
  z-index: 100;
  backdrop-filter: blur(3px);
}
#edit-card {
  background-color: var(--foregroundColor);
  position: absolute;
  right: 30%;
  left: calc(50% - 150px);
  top: calc(50% - 275px);
  width: 40%;
  min-width: 300px;
  height: 550px;
  border-radius: 10px;
  filter: drop-shadow(0px 4px 3px var(--cardOutline));
}

#information-edit-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-wrap: wrap;
  height: 100%;
  box-sizing: border-box;
  padding: 10%;
}
.information-item {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 20px;
}

.information-and-pen {
  display: flex;
  align-items: center;
  /* position: relative; */
}

p {
  text-align: left;
  margin: 0px;
}

p > span {
  font-weight: 600;
  cursor: pointer;
}
@media screen and (min-width: 800px) {
  #edit-card {
    left: 30%;
    top: 32.5%;
    height: 35%;
  }

  #information-edit-section {
    align-items: flex-start;
  }
  .information-item {
    flex: 1 1 50px;
    max-width: 50%;
    padding-bottom: unset;
  }
}
</style>
