<template>
  <backdrop @click.self="closeEditCard" id="edit-card-wrapper">
    <div id="edit-card">
      <div id="information-edit-section">
        <div class="information-item">
          <editable-profile-picture
            :processing="processing"
            contact="person"
            :profilePicture="contact.profilePicture"
            @update-profile-picture="updateProfilePicture"
          />
        </div>
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
import Backdrop from "../SharedComponentsUI/Backdrop.vue";
import InputWithActionableIcon from "../SharedComponentsUI/ElementLibrary/InputWithActionableIcon.vue";
import RoundIconButton from "../SharedComponentsUI/RoundIconButton.vue";
import EditableProfilePicture from "./EditableProfilePicture.vue";
export default {
  data() {
    return {
      photoFile: undefined,
      fieldToEdit: undefined,
      activeEditField: undefined,
      activeEditValue: undefined,
      processing: false,
    };
  },
  computed: {
    fields() {
      const { given_name, family_name, email, phoneNumber, pronoun } =
        this.contact;
      return {
        given_name: {
          data: given_name,
          display: "First Name",
          component: InputWithActionableIcon,
          componentParameters: {
            placeholder: given_name,
            svg: this.processing ? "loading" : "circle-checkmark",
          },
        },
        family_name: {
          data: family_name,
          display: "First Name",
          component: InputWithActionableIcon,
          componentParameters: {
            placeholder: family_name,
            svg: this.processing ? "loading" : "circle-checkmark",
          },
        },
        email: {
          data: email,
          display: "Email",
          component: InputWithActionableIcon,
          componentParameters: {
            placeholder: email,
            svg: this.processing ? "loading" : "circle-checkmark",
          },
        },
        phoneNumber: {
          data: phoneNumber,
          display: "Phone Number",
          component: InputWithActionableIcon,
          componentParameters: {
            placeholder: phoneNumber,
            svg: this.processing ? "loading" : "circle-checkmark",
          },
        },
        pronoun: {
          data: pronoun,
          display: "Pronoun",
          component: InputWithActionableIcon,
          componentParameters: {
            placeholder: pronoun,
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
    async updateProfilePicture(picture) {
      this.activeEditField = "profilePicture";
      await this.$store.dispatch("addPhoto", picture).then((res) => {
        this.activeEditValue = res;
      });
      this.actionableIconClicked();
    },
    async actionableIconClicked() {
      this.procesing = true;
      let { userId, tenantId } = this.contact;
      let key = { userId, tenantId };
      let payload = {
        contactKey: key,
        variable: this.activeEditField,
        value: this.activeEditValue,
      };
      await this.$store.dispatch("editContact", payload);
      this.$emit("edit-contact", payload);
      this.processing = false;
      this.$emit("close-edit-card");
    },
  },
  components: {
    InputWithActionableIcon,
    Backdrop,
    RoundIconButton,
    EditableProfilePicture,
  },
  emits: ["close-edit-card", "edit-contact"],
  props: ["contact"],
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
