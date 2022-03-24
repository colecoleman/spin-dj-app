<template>
  <div class="wrapper">
    <base-card title="Add Forms To Event">
      <template v-slot:content>
        <div class="form-item" v-for="form in forms" :key="form.id">
          <div class="form-title" @click="toggleActiveForm(form.id)">
            <vue-svg
              svg="down-arrow"
              :customStyle="form.id === activeForm ? '' : 'rotate: 270deg;'"
            />
            <vue-svg
              svg="plus-sign"
              v-if="activeForm === form.id"
              @clicked="addFormToEvent(form)"
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
                  <input-with-title
                    :title="input.inputTitle"
                    :type="input.inputType"
                    :placeholder="input.placeholder"
                    :options="input.options ? input.options : []"
                    optionDisplay="optionValue"
                    :inputValue="input.options ? input.options[0] : ''"
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
import VueSvg from "../../assets/VueSvg.vue";
import BaseCard from "../SharedComponentsUI/BaseCard.vue";
import InputWithTitle from "../SharedComponentsUI/ElementLibrary/InputWithTitle.vue";
export default {
  data() {
    return {
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
  components: { BaseCard, InputWithTitle, VueSvg },
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

.form-title > svg {
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