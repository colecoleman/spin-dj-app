<template>
  <layout
    :addButtonText="addButtonText"
    :processing="processing"
    productNameProperty="name"
    :products="forms"
    :saveButtonEnabled="true"
    @clear-form="resetFields"
    @close="close"
    @delete-button-clicked="deleteForm"
    @edit-button-clicked="editForm"
    @save-button-clicked="saveForm"
  >
    <template v-slot:form>
      <div class="forms-section">
        <div class="form-item">
          <input-with-title
            title="Form Name:"
            type="text"
            :inputValue="form.name"
            @input="fieldInput(form, 'name', $event)"
          />
        </div>
        <div class="form-item">
          <input-with-title
            title="Form Description:"
            type="textarea"
            :inputValue="form.description"
            @input="fieldInput(form, 'description', $event)"
          />
        </div>
        <div class="form-item" v-if="form.fields.length > 0">
          <div
            class="form-item"
            v-for="(field, index) in form.fields"
            :key="index"
          >
            <div class="row-flex">
              <div class="field-title">
                <round-icon-button
                  class="round-icon-button"
                  svg="music"
                  v-if="field.libraryEnabled"
                  hoverable="false"
                />
                <p class="bold">{{ field.name }}</p>
              </div>
              <div class="action-buttons">
                <round-icon-button
                  class="round-icon-button"
                  svg="x-icon"
                  @click="deleteField(form, index)"
                  hoverable="true"
                />
                <round-icon-button
                  class="round-icon-button"
                  svg="edit-pen"
                  @click="editField(field, index)"
                  hoverable="true"
                />
                <round-icon-button
                  class="round-icon-button"
                  svg="down-arrow"
                  hoverable="true"
                  @click="moveField(index + 1, index, form.fields)"
                  v-if="index != form.fields.length - 1"
                />
                <round-icon-button
                  class="round-icon-button"
                  svg="down-arrow"
                  @click="moveField(index - 1, index, form.fields)"
                  hoverable="true"
                  style="transform: rotate(180deg)"
                  v-if="index != 0"
                />
              </div>
            </div>
            <div class="form-item row-flex">
              <div
                class="form-item input-view"
                v-for="(input, inputIndex) in field.fields"
                :key="inputIndex"
              >
                <input-with-title
                  v-if="
                    input.inputType === 'text' ||
                    input.inputType === 'tel' ||
                    input.inputType === 'textarea' ||
                    input.inputType === 'email'
                  "
                  :title="input.inputTitle"
                  :type="input.inputType"
                  :placeholder="input.placeholder"
                />
                <div v-if="input.inputType === 'radio'">
                  <div
                    v-for="(option, index) in input.options"
                    :key="index"
                    class="radio"
                  >
                    <input
                      type="radio"
                      :name="input.inputTitle"
                      :value="option.optionValue"
                    />
                    <p>{{ option.optionValue }}</p>
                  </div>
                </div>
                <div v-if="input.inputType === 'select'">
                  <input-with-title
                    :options="input.options"
                    type="select"
                    optionDisplay="optionValue"
                    :inputValue="input.options[0]"
                    :title="input.inputTitle"
                  />
                </div>
              </div>
            </div>
            <form-field-creation
              @new-input-quantity="newInputQuantity"
              @set-option-quantity="setOptionQuantity"
              @toggle-library-enabled="toggleLibraryEnabled"
              v-if="fieldEditIndex === index"
              :newField="newField"
              :fieldEditIndex="index"
              @save-field="saveField"
            />
          </div>
        </div>
        <form-field-creation
          @new-input-quantity="newInputQuantity"
          @set-option-quantity="setOptionQuantity"
          @toggle-library-enabled="toggleLibraryEnabled"
          v-if="newFieldOpen"
          :newField="newField"
          :fieldEditIndex="index"
          @save-field="saveField"
        />
        <button-standard-with-icon
          text="Add Field"
          v-if="!newFieldOpen && !fieldEditIndex"
          @click="openNewField"
          class="button-styling"
        />
        <!-- <button-standard-with-icon
          :text="'Save Form'"
          @click="saveForm()"
          class="button-styling"
        /> -->
      </div>
    </template>
  </layout>
</template>

<script>
import RoundIconButton from "../../../../SharedComponentsUI/RoundIconButton.vue";
import FormFieldCreation from "./AdminViewConfigFormsComponents/FormFieldCreation.vue";
import InputWithTitle from "../../../../SharedComponentsUI/ElementLibrary/InputWithTitle.vue";
import ButtonStandardWithIcon from "../../../../SharedComponentsUI/ButtonStandardWithIcon.vue";
import Layout from "../../AdminConfigUIComponents/AdminConfigLayoutTileAndForm.vue";

export default {
  data() {
    return {
      activeView: "forms-list",
      addButtonText: "Add New Form",
      newFieldOpen: true,
      form: {
        id: "form" + new Date().getTime(),
        name: undefined,
        description: undefined,
        fields: [],
      },
      newField: {
        name: undefined,
        inputQuantity: undefined,
        fields: [],
        duplicable: false,
        libraryEnabled: false,
      },
      editIndex: undefined,
      fieldEditIndex: undefined,
      fieldTemplateTitleFieldOpen: false,
      fieldTemplateTitle: undefined,
      // fieldTemplates: [],
      processing: false,
    };
  },
  computed: {
    forms() {
      return this.$store.getters.forms;
    },
    fieldTemplates() {
      return this.$store.getters.formTemplates;
    },
    hasForms() {
      if (this.forms.length > 0) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },

    resetFields() {
      this.editIndex = undefined;
      this.form = {
        id: "form" + new Date().getTime(),
        name: undefined,
        description: undefined,
        fields: [],
      };
      this.newField = {
        name: undefined,
        inputQuantity: undefined,
        fields: [],
        duplicable: false,
        libraryEnabled: false,
      };
    },
    fieldInput(object, property, value) {
      let string = value.replaceAll(":", "");
      if (object) {
        object[property] = string;
      } else {
        this[property] = string;
      }
    },
    newInputQuantity(e) {
      this.newField.fields = [];
      this.newField.inputQuantity = e;
      for (let x = 0; x < parseInt(e); x++) {
        this.newField.fields.push({
          inputTitle: undefined,
          inputType: undefined,
          placeholder: undefined,
          options: [],
        });
      }
    },
    setOptionQuantity(e, index) {
      this.newField.fields[index].optionQuantity = e;
      this.newField.fields[index].options = [];
      for (let x = 0; x < e; x++) {
        this.newField.fields[index].options.push({
          optionValue: undefined,
        });
      }
    },
    saveField() {
      if (this.fieldEditIndex != undefined) {
        this.form.fields[this.fieldEditIndex] = this.newField;
      } else {
        this.newField.name = this.newField.name.replace(/:/g, "");
        this.form.fields.push(Object.assign({}, this.newField));
      }
      this.newField = {
        name: undefined,
        inputQuantity: undefined,
        fields: [],
        duplicable: false,
      };
      this.fieldEditIndex = undefined;
    },
    initiateSaveAsFieldTemplate() {
      this.fieldTemplateTitleFieldOpen = true;
    },
    saveAsFieldTemplate() {
      let template = {
        title: this.fieldTemplateTitle,
        fields: [...this.newField.fields],
      };
      this.fieldTemplates.push(Object.assign({}, template));
      this.newField = {
        name: undefined,
        inputQuantity: undefined,
        fields: [],
      };
      this.fieldTemplateTitleFieldOpen = false;
    },
    assignFieldTemplate(template) {
      this.newField.fields = JSON.parse(JSON.stringify(template.fields));
    },
    toggleLibraryEnabled(value) {
      if (value === true) {
        this.newField.fields = [
          {
            inputTitle: "Song Name",
            inputType: "text",
            placeholder: "Song Name",
          },
          {
            inputTitle: "Song Artist",
            inputType: "text",
            placeholder: "Song Artist",
          },
          {
            inputTitle: "Notes",
            inputType: "text",
            placeholder: "Notes",
          },
        ];
        this.newField.libraryEnabled = true;
      } else {
        this.newField.libraryEnabled = false;
        this.newField.fields = [];
      }
    },
    async saveForm() {
      this.processing = true;
      if (this.editIndex != undefined) {
        let payload = {
          index: this.editIndex,
          form: this.form,
        };
        await this.$store.commit("adminConfigEditForm", payload);
      } else {
        await this.$store.commit("adminConfigAddForm", this.form);
      }
      await this.$store.dispatch("updateBusinessSettings");
      this.processing = false;
    },
    openNewField() {
      this.newFieldOpen = true;
    },
    async deleteForm(index) {
      await this.$store.commit("adminConfigDeleteForm", index);
      await this.$store.dispatch("updateBusinessSettings");
    },
    editForm(form, index) {
      this.form = { ...this.form, ...form };
      this.editIndex = index;
    },
    editField(field, index) {
      this.newField = { ...this.newField, ...field };
      this.fieldEditIndex = index;
    },
    deleteField(form, index) {
      form.fields.splice(index, 1);
    },
    moveField(direction, index, array) {
      let item = array.slice(index, index + 1);
      array.splice(index, 1);
      array.splice(direction, 0, ...item);
    },
  },
  components: {
    ButtonStandardWithIcon,
    InputWithTitle,
    RoundIconButton,
    FormFieldCreation,
    Layout,
  },
  emits: ["close"],
};
</script>

<style scoped>
@media screen {
  .forms-section {
    width: calc(100% - 20px);
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    /* padding: 5px; */
  }

  .forms-form-section {
    width: 100%;
    height: fit-content;
  }

  p {
    text-align: left;
  }

  .form-item {
    max-width: 100%;
    width: 100%;
  }

  .row-flex {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .round-icon-button {
    width: 28px;
    height: 28px;
  }

  .field-title {
    display: flex;
    align-items: center;
  }

  .input-view {
    align-items: flex-start;
  }

  .input-view > p {
    margin: 5px;
  }

  .radio {
    display: flex;
    align-items: center;
    flex-direction: row;
  }

  .form-item > p,
  .form-section > h5,
  .form-list {
    text-align: left;
  }
  .form-item > input,
  .form-item > select,
  .form-item > textarea,
  .button-standard-with-icon {
    width: 90%;
    align-self: left;
    justify-self: left;
  }

  .action-buttons {
    display: flex;
  }
  @media (min-width: 850px) {
    p {
      font-size: 9pt;
    }

    .input-creation {
      display: flex;
      flex-direction: row;
    }

    .button-styling {
      margin: 30px;
      margin-top: 20px;
      max-width: 150px;
    }

    .form-item {
      display: flex;
      flex-direction: column;
      justify-content: left;
      /* margin-left: 15px; */
    }

    .row-flex {
      display: flex;
      flex-direction: row;
      /* justify-content: space-evenly; */
      align-items: center;
    }

    .input-view {
      /* max-width: 100px; */
      align-items: flex-start;
    }

    .input-view > p {
      margin: 5px;
    }

    .radio {
      display: flex;
      align-items: center;
      flex-direction: row;
    }

    .form-item > p,
    .form-section > h5 {
      text-align: left;
    }
    .form-item > input,
    .form-item > select,
    .form-item > textarea,
    .button-standard-with-icon {
      width: 40%;
      align-self: left;
      justify-self: left;
    }
  }
}
</style>
