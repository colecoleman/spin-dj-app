<template>
  <div class="wrapper">
    <base-card title="Add Forms To Event">
      <template v-slot:content>
        <div class="form-item" v-for="form in forms" :key="form.id">
          <div class="form-title" @click="toggleActiveForm(form.id)">
            <img
              :src="SVGs.DownArrowSVG"
              alt=""
              :class="form.id === activeForm ? '' : 'inactive-arrow'"
            />
            <img
              :src="SVGs.PlusSignSVG"
              v-if="activeForm === form.id"
              @click="addFormToEvent(form)"
            />
            <h4>{{ form.name }}</h4>
          </div>
          <div v-if="form.id === activeForm" class="form-wrapper">
            <div
              class="form-field"
              v-for="(formItem, formItemIndex) in form.fields"
              :key="formItemIndex"
            >
              <h5>{{ formItem.name }}</h5>
              <p v-if="formItem.duplicable" class="duplicable-text">
                <i>^ *Duplicable</i>
              </p>
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
                      {{ option }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </base-card>
  </div>
</template>
<script>
import BaseCard from "../SharedComponentsUI/BaseCard.vue";
import SVGs from "../../assets/SVGs/svgIndex.js";
export default {
  data() {
    return {
      SVGs,
      activeForm: undefined,
    };
  },
  methods: {
    toggleActiveForm(id) {
      this.activeForm === id
        ? (this.activeForm = undefined)
        : (this.activeForm = id);
    },
    addFormToEvent(form) {
      console.log(form);
      this.$emit("addFormToEvent", form);
    },
  },
  computed: {
    forms() {
      return this.$store.state.businessSettings.product.forms.forms.filter(
        (x) => {
          return !this.eventForms.find((ef) => {
            return x.id === ef.id;
          });
        }
      );
    },
    formTemplates() {
      return this.$store.state.businessSEttings.product.forms.formTemplates;
    },
  },
  created() {},
  components: { BaseCard },
  emit: ["addFormToEvent"],
  props: ["eventForms"],
};
</script>
<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
}

.form-item {
  width: 100%;
  text-align: left;
}

.form-title {
  margin: 20px;
  display: flex;
  align-items: center;
}

.form-title > img {
  height: 10px;
  margin-right: 10px;
}

.inactive-arrow {
  rotate: 270deg;
}

.form-wrapper {
  margin-left: 60px;
}
input {
  margin-left: 20px;
}

h5 {
  margin: 5px 0;
}
.form-field {
  text-align: left;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
}

.field-container {
  display: flex;
  flex-direction: row;
}
.duplicable-text {
  margin: 0px;
}
</style>