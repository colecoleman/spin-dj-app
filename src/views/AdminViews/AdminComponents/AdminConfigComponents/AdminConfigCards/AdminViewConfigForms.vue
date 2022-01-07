<template>
  <base-card>
    <template v-slot:title>Forms</template>
    <template v-slot:content>
      <div class="split-view">
        <div class="three-quarter-width">
          <div class="form-item">
            <p>Form Name:</p>
            <input type="text" v-model="form.name" />
          </div>
          <div class="form-item">
            <p>Form Description:</p>
            <textarea v-model="form.description" />
          </div>
          <div class="form-item" v-if="form.fields.length > 0">
            <div
              class="form-item"
              v-for="(field, index) in form.fields"
              :key="index"
            >
              <p class="bold">{{ field.name }}</p>
              <div class="form-item row-flex">
                <div
                  class="form-item input-view"
                  v-for="(input, inputIndex) in field.fields"
                  :key="inputIndex"
                >
                  <p class="bold">{{ input.inputTitle }}</p>
                  <div
                    v-if="
                      input.inputType === 'text' ||
                      input.inputType === 'tel' ||
                      input.inputType === 'email'
                    "
                  >
                    <input
                      :type="input.inputType"
                      :placeholder="input.placeholder"
                    />
                  </div>
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
                </div>
              </div>
            </div>
          </div>
          <div class="form-item">
            <p>New Field:</p>
            <div class="form-item input-creation">
              <div class="form-item">
                <p>Input Title:</p>
                <input type="text" v-model="newField.name" />
              </div>
              <div class="form-item">
                <p>Number Of Inputs:</p>
                <select
                  v-model="newField.inputQuantity"
                  @change="
                    newInputQuantity($event, { 1: 'newField', 2: 'fields' })
                  "
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
              <div
                class="form-item field-creator"
                v-for="(input, index) in newField.fields"
                :key="newField.fields[index]"
              >
                <p>Input {{ index + 1 }}:</p>
                <div class="form-item">
                  <p>Input Title:</p>
                  <input v-model="newField.fields[index].inputTitle" />
                </div>
                <div class="form-item">
                  <p>Input Type:</p>
                  <select
                    v-model="newField.fields[index].inputType"
                    :key="newField.fields[index]"
                  >
                    <option value="text">text</option>
                    <option value="tel">tel</option>
                    <option value="email">email</option>
                    <option value="color">color</option>
                    <option value="radio">radio</option>
                    <option value="select">select</option>
                  </select>
                </div>
                <div
                  class="form-item"
                  v-if="
                    newField.fields[index].inputType === 'text' ||
                    newField.fields[index].inputType === 'tel' ||
                    newField.fields[index].inputType === 'email'
                  "
                >
                  <p>Placeholder:</p>
                  <input
                    type="text"
                    v-model="newField.fields[index].placeholder"
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
                    <p>Options:</p>
                    <div class="form-item">
                      <p>Number of Options:</p>
                      <select
                        v-model="newField.fields[index].optionQuantity"
                        @change="setOptionQuantity($event, index)"
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                      <div
                        class="form-item"
                        v-for="(options, optionsIndex) in newField.fields[index]
                          .options"
                        :key="optionsIndex"
                      >
                        <p>Option {{ optionsIndex + 1 }}:</p>
                        <input
                          type="text"
                          v-model="
                            newField.fields[index].options[optionsIndex]
                              .optionValue
                          "
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button-standard-with-icon
                :text="'Add Field'"
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
        <div class="quarter-width">
          <h5 v-if="!hasForms">No forms added yet! Add One!</h5>
          <div v-if="hasForms">
            <h5
              v-for="(form, index) in businessSettings.product.forms"
              :key="index"
              class="bolds"
            >
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

export default {
  data() {
    return {
      SVGs,
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
      },
      editIndex: undefined,
    };
  },
  methods: {
    newInputQuantity(e) {
      this.newField.fields = [];
      for (let x = 0; x < parseInt(e.target.value); x++) {
        this.newField.fields.push({
          inputTitle: undefined,
          inputType: undefined,
          placeholder: undefined,
          options: [],
        });
      }
    },
    setOptionQuantity(e, index) {
      this.newField.fields[index].options = [];
      for (let x = 0; x < this.newField.fields[index].optionQuantity; x++) {
        this.newField.fields[index].options.push({
          optionValue: undefined,
        });
      }
    },
    saveField() {
      this.form.fields.push(this.newField);
      this.newField = {
        name: undefined,
        inputQuantity: undefined,
        fields: [],
      };
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
        name: undefined,
        description: undefined,
        fields: [],
      };
    },
    deleteForm(index) {
      this.$store.commit("adminConfigDeleteForm", index);
    },
    editForm(form, index) {
      this.form = { ...this.form, ...form };
      this.editIndex = index;
    },
  },
  computed: {
    businessSettings() {
      return this.$store.state.businessSettings;
    },
    hasForms() {
      if ("product" in this.$store.state.businessSettings) {
        if ("forms" in this.$store.state.businessSettings.product) {
          if (this.$store.state.businessSettings.product.forms.length > 0) {
            return true;
          }
        }
      }
      return false;
    },
  },
};
</script>

<style scoped>
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

.x-icon {
  height: 10px;
  width: 10px;
  margin: 0px 5px;
}
</style>