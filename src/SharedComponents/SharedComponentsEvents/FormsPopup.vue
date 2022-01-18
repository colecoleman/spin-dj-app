<template>
  <backdrop @click="closePopup()"></backdrop>
  <section>
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
                  text="Download"
                  @click="downloadForms('form-wrapper-print')"
                ></button-standard-with-icon>
              </div>
              <div class="navigation-button-wrapper">
                <button-standard-with-icon
                  text="Save"
                  @click="saveForms()"
                ></button-standard-with-icon>
              </div>
            </div>
          </div>
        </template>
      </base-card>
    </div>
    <div class="forms-wrapper">
      <div
        class="form-wrapper"
        v-for="(form, index) in forms"
        :key="index"
        :id="form.id"
      >
        <base-card :title="form.name">
          <template v-slot:content>
            <div
              class="form-field"
              v-for="(formItem, formItemIndex) in form.fields"
              :key="formItemIndex"
            >
              <h5>{{ formItem.name }}</h5>
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
              <div class="duplicate-button-wrapper">
                <button-standard-with-icon
                  v-if="
                    formItem.duplicable &&
                    formItemIndex === form.fields.length - 1
                  "
                  text="Duplicate"
                  @click="duplicateField(form, formItem)"
                ></button-standard-with-icon>
              </div>
            </div>
          </template>
        </base-card>
      </div>
    </div>
  </section>
</template>


<script>
// import FullPagePopup from "../SharedComponentsUI/FullPagePopup.vue";
import Backdrop from "../SharedComponentsUI/Backdrop.vue";
import helpers from "../../helpers.js";
import _ from "lodash";

export default {
  data() {},
  methods: {
    scroll(id) {
      document.getElementById(id).scrollIntoView({
        behavior: "smooth",
      });
      this.activeLink = id;
    },
    closePopup() {
      this.$emit("closePopup");
    },
    downloadForms: helpers.saveElement,
    saveForms() {
      let payload = {
        variable: "forms",
        value: this.forms,
        eventId: this.eventId,
      };
      this.$store.dispatch("editEvent", payload);
    },
    duplicateField(form, fieldItem) {
      form.fields.push(_.cloneDeep(fieldItem));
      console.log(fieldItem);
      console.log(this.forms);
    },
  },
  emits: ["closePopup"],
  created() {
    console.log(this.forms);
  },
  props: ["forms", "eventId"],

  components: {
    // FullPagePopup,
    Backdrop,
  },
};
</script>

<style scoped>
section {
  position: fixed;
  top: 0;
  left: 0;
  /* margin: 5%; */
  display: flex;
  flex-direction: row;
  height: 90%;
  width: 90%;
  margin: 5%;
  z-index: 4;
}

.navigation-wrapper {
  width: fit-content;
  height: 100%;
}

.sidebar {
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 10px;
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

.forms-wrapper {
  width: 100%;
  overflow-y: scroll;
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
</style>