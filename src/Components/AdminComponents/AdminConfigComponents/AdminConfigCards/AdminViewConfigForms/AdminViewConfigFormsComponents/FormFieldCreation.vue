<template>
  <div class="form-item indented">
    <div class="form-item input-creation">
      <div class="form-item">
        <input-with-title
          title="Input Title:"
          type="text"
          :inputValue="newField.name"
          @input="fieldInput(newField, 'name', $event)"
        />
      </div>
      <div class="form-item">
        <input-with-binary-selection
          :item="
            newField.duplicable
              ? 'User may duplicate field'
              : 'User may not duplicate field'
          "
          :checked="newField.duplicable"
          @clicked="fieldInput(newField, 'duplicable', !newField.duplicable)"
        />
        <input-with-binary-selection
          :item="
            newField.libraryEnabled ? 'Library enabled' : 'Library disabled'
          "
          :checked="newField.libraryEnabled === true"
          @clicked="
            checkLibraryEnabled(newField.libraryEnabled === true ? false : true)
          "
        />
      </div>
      <!-- <div class="form-item">
        <input-with-title
          title="Field Templates:"
          type="select"
          :options="fieldTemplates"
          optionDisplay="title"
          @input="assignFieldTemplate($event)"
        />
      </div> -->
      <div v-if="newField.libraryEnabled === true">
        <p class="disclaimer">
          Enabling library search on a field generates the below default inputs.
        </p>
        <div class="row-flex">
          <div
            class="input-view"
            v-for="(input, inputIndex) in newField.fields"
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
          </div>
        </div>
        <input-with-title
          title="3rd Input Title"
          @input="fieldInput(newField.fields[2], 'inputTitle', $event)"
        />
      </div>
      <div v-if="!newField.libraryEnabled">
        <div class="form-item">
          <input-with-title
            title="Number Of Inputs:"
            type="select"
            :options="[1, 2, 3]"
            :inputValue="newField.inputQuantity"
            @input="newInputQuantity($event, { 1: 'newField', 2: 'fields' })"
          />
        </div>
        <div
          class="form-item field-creator"
          v-for="(input, index) in newField.fields"
          :key="newField.fields[index]"
        >
          <p>Input {{ index + 1 }}:</p>
          <div class="form-item">
            <input-with-title
              title="Input Title"
              type="text"
              :inputValue="newField.fields[index].inputTitle"
              @input="fieldInput(newField.fields[index], 'inputTitle', $event)"
            />
          </div>
          <div class="form-item">
            <input-with-title
              title="Input Type:"
              type="select"
              :options="inputTypes"
              :inputValue="newField.fields[index].inputType"
              @input="fieldInput(newField.fields[index], 'inputType', $event)"
            />
          </div>
          <div
            class="form-item"
            v-if="
              newField.fields[index].inputType === 'text' ||
              newField.fields[index].inputType === 'tel' ||
              newField.fields[index].inputType === 'textarea' ||
              newField.fields[index].inputType === 'email'
            "
          >
            <input-with-title
              title="Placeholder"
              type="text"
              :inputValue="newField.fields[index].placeholder"
              @input="fieldInput(newField.fields[index], 'placeholder', $event)"
            />
          </div>
          <div class="button-wrapper">
            <div
              class="form-item"
              v-if="
                newField.fields[index].inputType === 'radio' ||
                newField.fields[index].inputType === 'select'
              "
            >
              <div class="form-item">
                <input-with-title
                  title="Number of Options:"
                  type="select"
                  :options="[1, 2, 3, 4, 5]"
                  :inputValue="newField.fields[index].optionQuantity"
                  @input="setOptionQuantity($event, index)"
                />

                <div
                  class="form-item"
                  v-for="(options, optionsIndex) in newField.fields[index]
                    .options"
                  :key="optionsIndex"
                >
                  <input-with-title
                    type="text"
                    :title="`Option ${optionsIndex + 1}`"
                    :inputValue="
                      newField.fields[index].options[optionsIndex].optionValue
                    "
                    @input="
                      fieldInput(
                        newField.fields[index].options[optionsIndex],
                        'optionValue',
                        $event
                      )
                    "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="form-item">
        <input-with-title
          type="text"
          title="Template Name:"
          placeholder="Template Name"
          :inputValue="fieldTemplateTitle"
          @input="fieldInput(undefined, 'fieldTemplateTitle', $event)"
        />
      </div> -->
      <button-standard-with-icon
        text="Save Field"
        @click="saveField()"
        style="margin: 30px; margin-top: 20px; width: 150px"
      />
      <button-standard-with-icon
        v-if="!newField.libraryEnabled"
        style="margin: 30px; margin-top: 20px; width: 150px"
        @click="
          fieldTemplateTitle
            ? saveAsFieldTemplate()
            : initiateSaveAsFieldTemplate()
        "
        text="Save As Field Template"
      />
    </div>
  </div>
</template>
<script>
import InputWithTitle from "../../../../../SharedComponentsUI/ElementLibrary/InputWithTitle.vue";
import InputWithBinarySelection from "../../../../../SharedComponentsUI/ElementLibrary/InputWithBinarySelection.vue";
export default {
  data() {
    return {
      inputTypes: [
        "text",
        "tel",
        "email",
        "color",
        "radio",
        "select",
        "textarea",
      ],
      fieldTemplateTitle: undefined,
    };
  },
  methods: {
    fieldInput(object, property, value) {
      let string;
      if (typeof value === "string") {
        string = value.replaceAll(":", "");
      } else {
        string = value;
      }
      if (object) {
        object[property] = string;
      } else {
        this[property] = string;
      }
    },

    saveField() {
      this.$emit("save-field");
    },
    newInputQuantity(e) {
      this.$emit("new-input-quantity", e);
    },
    setOptionQuantity(e, index) {
      this.$emit("set-option-quantity", e, index);
    },
    checkLibraryEnabled(value) {
      this.$emit("toggle-library-enabled", value);
    },
    initiateSaveAsFieldTemplate() {
      this.$emit("initiate-save-as-field-template");
    },
    saveAsFieldTemplate() {
      //   let template = {
      //     title: this.fieldTemplateTitle,
      //     fields: [...this.newField.fields],
      //   };
      //   this.fieldTemplates.push(Object.assign({}, template));
      //   this.newField = {
      //     name: undefined,
      //     inputQuantity: undefined,
      //     fields: [],
      //   };
      //   this.fieldTemplateTitleFieldOpen = false;
      this.$emit("save-as-field-template");
    },
  },
  created() {},
  components: {
    InputWithTitle,
    InputWithBinarySelection,
  },
  emits: [
    "save-field",
    "new-input-quantity",
    "set-option-quantity",
    "toggle-library-enabled",
  ],
  props: ["newField", "fieldEditIndex"],
};
</script>
<style scoped>
@media screen {
  p {
    font-size: 9pt;
  }
  .split-view {
    padding: 10px;
  }
  .split-view,
  .input-creation {
    display: flex;
    flex-direction: column-reverse;
  }

  .quarter-width,
  .three-quarter-width {
    width: 100%;
  }

  .form-item {
    max-width: 100%;
  }

  .indented {
    margin-left: 20px;
    padding-left: 10px;
    border-left: 1px solid var(--cardOutline);
  }

  .row-flex {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .row-flex div {
    /* flex: 1; */
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

  .field-creator {
    margin-top: 5px;
  }

  .action-buttons {
    display: flex;
  }

  .disclaimer {
    font-style: italic;
    text-align: left;
    margin-left: 10px;
  }

  @media (min-width: 850px) {
    p {
      font-size: 9pt;
    }

    .split-view,
    .input-creation {
      display: flex;
      flex-direction: row;
    }

    .quarter-width {
      width: 25%;
    }

    .button-styling {
      margin: 30px;
      margin-top: 20px;
      max-width: 150px;
    }

    .three-quarter-width {
      width: 75%;
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

    .row-flex div {
      /* flex: 1; */
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

    .field-creator {
      margin-top: 5px;
    }
  }
}
</style>
