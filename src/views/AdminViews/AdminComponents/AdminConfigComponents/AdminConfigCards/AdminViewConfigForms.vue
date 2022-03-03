<template>
  <base-card title="Forms">
    <template v-slot:content>
      <div class="split-view">
        <div class="three-quarter-width">
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
              <p class="bold">{{ field.name }}</p>
              <div class="form-item row-flex">
                <img
                  :src="SVGs.EditPenSVG"
                  class="x-icon"
                  @click="editField(field, index)"
                />
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
                      <!-- <div class="form-item"> -->
                      <input
                        type="radio"
                        :name="input.inputTitle"
                        :value="option.optionValue"
                      />
                      <p>{{ option.optionValue }}</p>
                      <!-- </div> -->
                    </div>
                  </div>
                  <div v-if="input.inputType === 'select'">
                    <select :name="input.inputTitle">
                      <option
                        v-for="(option, index) in input.options"
                        :key="index"
                        :value="option.optionValue"
                      >
                        {{ option.optionValue }}
                      </option>
                    </select>
                  </div>
                  <div v-if="input.inputType === 'textarea'">
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="5"
                      :placeholder="input.placeholder"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="form-item">
            <p>New Field:</p>
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
                <p>Allow user to duplicate field?</p>
                <input
                  type="checkbox"
                  style="width: 10%"
                  v-model="newField.duplicable"
                />
              </div>
              <div class="form-item">
                <input-with-title
                  title="Field Templates:"
                  type="select"
                  :options="fieldTemplates"
                  optionDisplay="title"
                  @input="assignFieldTemplate($event)"
                />
              </div>
              <div class="form-item">
                <input-with-title
                  title="Number Of Inputs:"
                  type="select"
                  :options="[1, 2, 3]"
                  :inputValue="newField.inputQuantity"
                  @input="
                    newInputQuantity($event, { 1: 'newField', 2: 'fields' })
                  "
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
                    @input="
                      fieldInput(newField.fields[index], 'inputTitle', $event)
                    "
                  />
                </div>
                <div class="form-item">
                  <input-with-title
                    title="Input Type:"
                    type="select"
                    :options="inputTypes"
                    :inputValue="newField.fields[index].inputType"
                    @input="
                      fieldInput(newField.fields[index], 'inputType', $event)
                    "
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
                    @input="
                      fieldInput(newField.fields[index], 'placeholder', $event)
                    "
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
                            newField.fields[index].options[optionsIndex]
                              .optionValue
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
              <div class="form-item">
                <input-with-title
                  type="text"
                  title="Template Name:"
                  placeholder="Template Name"
                  :inputValue="fieldTemplateTitle"
                  @input="fieldInput(undefined, 'fieldTemplateTitle', $event)"
                />
              </div>
              <button-standard-with-icon
                style="margin: 30px; margin-top: 20px"
                @click="
                  fieldTemplateTitle
                    ? saveAsFieldTemplate()
                    : initiateSaveAsFieldTemplate()
                "
                text="Save As Field Template"
              />
              <button-standard-with-icon
                text="Add Field"
                @click="saveField()"
                style="margin: 30px; margin-top: 20px; width: 100px"
              />
            </div>
          </div>
          <button-standard-with-icon
            :text="'Save Form'"
            @click="saveForm()"
            style="margin: 30px; margin-top: 20px; width: 100px"
          />
        </div>
        <div class="quarter-width, .three-quarter-width">
          <h5 v-if="!hasForms">No forms added yet! Add One!</h5>
          <div v-if="hasForms" class="form-list">
            <h5 v-for="(form, index) in forms" :key="index">
              {{ form.name }}
              <img
                :src="SVGs.XIconSVG"
                class="x-icon"
                @click="deleteForm(index)"
              />
              <img
                :src="SVGs.EditPenSVG"
                class="x-icon"
                @click="editForm(form, index)"
              />
            </h5>
          </div>
        </div>
      </div>
    </template>
  </base-card>
</template>

<script>
import SVGs from "../../../../../assets/SVGs/svgIndex";
import InputWithTitle from "../../../../../SharedComponents/SharedComponentsUI/ElementLibrary/InputWithTitle.vue";
import ButtonStandardWithIcon from "../../../../../SharedComponents/SharedComponentsUI/ButtonStandardWithIcon.vue";

export default {
  components: { ButtonStandardWithIcon, InputWithTitle },
  data() {
    return {
      SVGs,
      inputTypes: [
        "text",
        "tel",
        "email",
        "color",
        "radio",
        "select",
        "textarea",
      ],
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
      },
      editIndex: undefined,
      fieldEditIndex: undefined,
      fieldTemplateTitleFieldOpen: false,
      fieldTemplateTitle: undefined,
      // fieldTemplates: [],
    };
  },
  methods: {
    fieldInput(object, property, value) {
      if (object) {
        object[property] = value;
      } else {
        this[property] = value;
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
    },
    initiateSaveAsFieldTemplate() {
      this.fieldTemplateTitleFieldOpen = true;
    },
    saveAsFieldTemplate() {
      this.newField.fields.forEach((x) => {
        this.stripColonsFromFields(x);
      });
      let template = {
        title: this.fieldTemplateTitle.replace(/:/g, ""),
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
    saveForm() {
      if (this.editIndex != undefined) {
        let payload = {
          index: this.editIndex,
          form: this.form,
        };
        this.$store.commit("adminConfigEditForm", payload);
      } else {
        this.$store.commit("adminConfigAddForm", this.form);
      }
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
      };
    },
    deleteForm(index) {
      this.$store.commit("adminConfigDeleteForm", index);
    },
    stripColonsFromFields(field) {
      return field.inputTitle.replace(/:/g, "");
    },
    editForm(form, index) {
      console.log(form);
      this.form = { ...this.form, ...form };
      this.editIndex = index;
    },
    editField(field, index) {
      console.log(field);
      this.newField = { ...this.newField, ...field };
      this.fieldEditIndex = index;
    },
  },
  computed: {
    forms() {
      if (this.$store.state.businessSettings.product.forms.forms) {
        return this.$store.state.businessSettings.product.forms.forms;
      } else {
        return this.$store.state.businessSettings.product.forms;
      }
    },
    fieldTemplates() {
      if (this.$store.state.businessSettings.product.forms.fieldTemplates) {
        return this.$store.state.businessSettings.product.forms.fieldTemplates;
      } else {
        return [];
      }
    },
    hasForms() {
      if (this.forms.length > 0) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style scoped>
@media screen {
  p {
    font-size: 9pt;
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
    display: flex;
    width: 90%;
    flex-direction: column;
    justify-content: left;
    margin-left: 15px;
  }

  .row-flex {
    display: flex;
    flex-direction: row;
    /* justify-content: space-evenly; */
    align-items: center;
  }

  .row-flex div {
    flex: 1;
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
    width: 90%;
    align-self: left;
    justify-self: left;
  }

  .field-creator {
    margin-top: 5px;
  }

  img {
    height: 10px;
    width: 10px;
    margin: 0px 5px;
    cursor: pointer;
  }

  .form-list {
    text-align: right;
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

    .three-quarter-width {
      width: 75%;
    }
    .form-item {
      display: flex;
      flex-direction: column;
      justify-content: left;
      margin-left: 15px;
    }

    .row-flex {
      display: flex;
      flex-direction: row;
      /* justify-content: space-evenly; */
      align-items: center;
    }

    .row-flex div {
      flex: 1;
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

    img {
      height: 10px;
      width: 10px;
      margin: 0px 5px;
      cursor: pointer;
    }

    .form-list {
      text-align: right;
    }
  }
}
</style>
