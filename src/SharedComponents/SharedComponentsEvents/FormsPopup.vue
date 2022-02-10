<template>
  <backdrop class="no-print" @click="closePopup()"></backdrop>
  <two-button-dialog-modal
    @select-button-one="deleteForm"
    @select-button-two="closeDeleteForm"
    v-if="deleteFormOpen"
  />
  <section class="no-print">
    <div class="navigation-wrapper">
      <base-card>
        <template v-slot:content>
          <div class="sidebar">
            <ul v-if="forms.length > 0">
              <li
                v-for="form in forms"
                :key="form.id"
                @click="scroll(form.id)"
                :class="activeLink === form.id ? 'active-link' : ' '"
              >
                {{ form.name }}
              </li>
            </ul>
            <div v-if="forms.length <= 0">
              <h4>No forms found for this event.</h4>
            </div>
            <div class="button-container">
              <div class="navigation-button-wrapper">
                <button-standard-with-icon
                  :text="openView === 'eventForms' ? 'Add Forms' : 'View Forms'"
                  v-if="userRole === 'admin'"
                  @click="toggleAddForms()"
                />
              </div>
              <div class="navigation-button-wrapper">
                <button-standard-with-icon
                  text="Print / Download"
                  @click="downloadForms()"
                />
              </div>
              <div class="navigation-button-wrapper">
                <button-standard-with-icon text="Save" @click="saveForms()" />
              </div>
            </div>
          </div>
        </template>
      </base-card>
    </div>
    <div class="forms-wrapper" v-if="openView === 'eventForms'">
      <div
        class="form-wrapper"
        v-for="(form, index) in forms"
        :key="index"
        :id="form.id"
      >
        <base-card
          :title="form.name"
          :action-icon="
            userRole === 'admin' || 'client' ? SVGs.TrashCanSVG : ''
          "
          @action-one-clicked="
            userRole === 'admin' || 'client' ? initiateDeleteForm(index) : ''
          "
        >
          <template v-slot:content>
            <div
              class="form-field"
              v-for="(formItem, formItemIndex) in form.fields"
              :key="formItemIndex"
            >
              <h5 v-if="firstDuplicatedForm(form, formItem) === formItemIndex">
                {{ formItem.name }}
              </h5>
              <div class="field-container">
                <div
                  class="field-item"
                  v-for="(input, index) in formItem.fields"
                  :key="index"
                >
                  <p>{{ input.inputTitle }}:</p>
                  <input
                    v-if="
                      input.inputType === 'text' ||
                      input.inputType === 'tel' ||
                      input.inputType === 'email'
                    "
                    :type="input.inputType"
                    :placeholder="input.placeholder"
                    v-model="input.value"
                  />

                  <div
                    class="radio-container"
                    v-if="input.inputType === 'radio'"
                  >
                    <input
                      v-for="(option, index) in input.options"
                      :key="index"
                      :type="input.inputType"
                      :name="input.name"
                      v-model="input.value"
                    />
                    <p>{{ option }}</p>
                  </div>
                  <select
                    v-if="input.inputType === 'select'"
                    v-model="input.value"
                  >
                    <option
                      v-for="(option, index) in input.options"
                      :key="index"
                    >
                      {{ option.optionValue }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="duplicate-button-wrapper">
                <button-standard-with-icon
                  v-if="formItem.duplicable"
                  text="Duplicate"
                  @click="duplicateField(form, formItem, formItemIndex)"
                />
              </div>
            </div>
          </template>
        </base-card>
      </div>
    </div>
    <div v-if="openView === 'addForms'" class="add-form-wrapper">
      <forms-popup-add-form
        :eventForms="forms"
        @add-form-to-event="addFormToEvent"
      />
    </div>
  </section>
  <section id="print-format">
    <img :src="logo" alt="Business Logo" />
    <div
      class="form-wrapper"
      v-for="(form, index) in forms"
      :key="index"
      :id="form.id"
    >
      <h3 class="form-name">{{ form.name }}</h3>
      <div
        class="form-field"
        v-for="(formItem, formItemIndex) in form.fields"
        :key="formItemIndex"
      >
        <h4 v-if="firstDuplicatedForm(form, formItem) === formItemIndex">
          {{ formItem.name }}
        </h4>
        <div class="field-container">
          <div
            class="field-item"
            v-for="(input, index) in formItem.fields"
            :key="index"
          >
            <p>{{ input.inputTitle }}:</p>
            <input
              v-if="
                input.inputType === 'text' ||
                input.inputType === 'tel' ||
                input.inputType === 'email'
              "
              :type="input.inputType"
              :placeholder="input.placeholder"
              v-model="input.value"
            />

            <div class="radio-container" v-if="input.inputType === 'radio'">
              <input
                v-for="(option, index) in input.options"
                :key="index"
                :type="input.inputType"
                :name="input.name"
                v-model="input.value"
              />
              <p>{{ option }}</p>
            </div>
            <select v-if="input.inputType === 'select'" v-model="input.value">
              <option v-for="(option, index) in input.options" :key="index">
                {{ option }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// import FullPagePopup from "../SharedComponentsUI/FullPagePopup.vue";
import Backdrop from "../SharedComponentsUI/Backdrop.vue";
import FormsPopupAddForm from "./FormsPopupAddForm.vue";
import TwoButtonDialogModal from "../SharedComponentsUI/TwoButtonDialogModal.vue";
import SVGs from "../../assets/SVGs/svgIndex.js";
import { Auth } from "aws-amplify";
import _ from "lodash";

export default {
  data() {
    return {
      SVGs,
      activeLink: undefined,
      openView: "eventForms",
      deleteFormOpen: false,
      formDeleteIndex: undefined,
      userRole: undefined,
    };
  },
  computed: {
    logo() {
      return this.$store.state.businessSettings.identity.businessLogo;
    },
  },
  methods: {
    scroll(id) {
      document.getElementById(id).scrollIntoView({
        behavior: "smooth",
      });
      this.activeLink = id;
    },
    closePopup() {
      if (this.openView === "addForm") {
        this.saveForms();
      }
      this.$emit("closePopup");
    },
    downloadForms() {
      window.print();
    },
    saveForms() {
      let payload = {
        variable: "forms",
        value: this.forms,
        eventId: this.eventId,
      };
      this.$store.dispatch("editEvent", payload);
    },
    duplicateField(form, fieldItem, formItemIndex) {
      form.fields.splice(formItemIndex, 0, _.cloneDeep(fieldItem));
      form.fields[formItemIndex].duplicable = false;
      console.log(fieldItem);
      console.log(this.forms);
    },
    toggleAddForms() {
      if (this.openView === "addForms") {
        this.saveForms();
        this.openView = "eventForms";
      } else {
        this.openView = "addForms";
        console.log(this.openView);
      }
    },
    addFormToEvent(form) {
      console.log(form);
      this.$emit("addFormToEvent", form);
    },
    initiateDeleteForm(index) {
      this.formDeleteIndex = index;
      this.deleteFormOpen = true;
    },
    closeDeleteForm() {
      this.deleteFormOpen = false;
    },
    deleteForm() {
      this.$emit("deleteForm", this.formDeleteIndex);
      this.closeDeleteForm();
    },
    firstDuplicatedForm(form, field) {
      console.log(form.fields[0].name);
      console.log(field.name);
      console.log(form.fields.findIndex((x) => x.name == field.name));
      return form.fields.findIndex((x) => x.name == field.name);
    },
  },
  emits: ["closePopup", "addFormToEvent", "deleteForm"],
  async created() {
    let user = await Auth.currentAuthenticatedUser();
    this.userRole = user.attributes["custom:role"];
  },
  props: ["forms", "eventId"],

  components: {
    FormsPopupAddForm,
    Backdrop,
    TwoButtonDialogModal,
  },
};
</script>

<style scoped>
@media screen {
  #print-format {
    display: none;
  }

  section {
    filter: drop-shadow(0 0 20px rgba(0, 0, 0, 0.5));
    position: fixed;
    top: 5%;
    left: 5%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 90%;
    width: 90%;
    z-index: 3;
  }

  .navigation-wrapper {
    backdrop-filter: blur(2px);
    width: fit-content;
    height: 100%;
    min-width: 250px;
    margin-right: 10px;
  }

  .sidebar {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  ul {
    text-align: right;
    height: 90%;
    padding: 0;
  }

  li {
    width: 100%;
    text-transform: uppercase;
    font-size: 12pt;
    list-style: none;
    font-weight: 600;
    margin: 20px 0px;
    cursor: pointer;
  }

  li:hover {
    color: var(--highlightColor);
  }

  a {
    text-decoration: none;
    font-weight: 700;
  }

  .navigation-button-wrapper {
    margin-top: 10px;
  }

  .duplicate-button-wrapper {
    width: 100px;
    margin-top: 10px;
    margin-left: 40px;
  }

  .active-link {
    color: var(--highlightColor);
  }

  .button-container {
    margin-top: auto;
  }

  .forms-wrapper,
  .add-form-wrapper {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
  }

  .form-wrapper {
    margin-bottom: 10px;
  }

  .form-field {
    padding: 10px;
    text-align: left;
    align-items: center;
    justify-content: center;
  }

  .field-container {
    display: flex;
    flex-direction: row;
  }

  h5 {
    margin-bottom: 0;
  }

  .field-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    text-align: left;
    max-width: 200px;
    margin-left: 20px;
  }

  input {
    margin-left: 20px;
  }
}

@media print {
  #print-format {
    display: block;
    width: 100%;
    height: auto;
    min-height: auto;
    margin: 0;
    background-color: white;
    overflow: visible !important;
    box-sizing: border-box;

    font-family: Georgia, "Times New Roman", Times, serif;
  }

  section {
    position: auto;
    top: unset;
    left: unset;
    display: block;
    height: auto;
    width: auto;
    margin: 0;
  }

  .forms-wrapper {
    width: 100%;
    overflow-y: visible;
  }
  .form-name {
    text-align: center;
    border-bottom: 1px solid black;
  }
  img {
    height: 60px;
    margin: 40px;
  }

  .form-wrapper {
    width: 100%;
    page-break-after: always;
  }

  p {
    font-size: 12pt;
  }
  .form-field {
    width: 100%;
    margin: 0px;
    text-align: left;
    /* align-items: center; */
    /* justify-content: center; */
  }

  .field-container {
    display: flex;
    /* flex-direction: row; */
    width: 100%;
  }

  .field-item {
    flex: 1;
    /* display: flex; */
    flex-direction: column;
    text-align: left;
    width: 33%;
    max-width: unset;
    /* margin-left: 20px; */
  }

  h4 {
    margin-bottom: 0;
  }

  input {
    margin-left: 20px;
  }

  .no-print {
    display: none;
  }
}
</style>
