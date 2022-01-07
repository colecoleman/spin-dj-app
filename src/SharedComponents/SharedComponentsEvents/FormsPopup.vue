<template>
  <full-page-popup>
    <template v-slot:icon
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="14.375"
        height="14.379"
        viewBox="0 0 18.375 18.379"
      >
        <path
          d="M18.375,3.084V17.92A1.752,1.752,0,0,1,16.6,19.692H1.772A1.758,1.758,0,0,1,0,17.916V3.084A1.752,1.752,0,0,1,1.772,1.313H16.607A1.751,1.751,0,0,1,18.375,3.084Zm-1.53,14.831V3.084a.244.244,0,0,0-.238-.238h-.381L11.7,5.906,9.188,3.86,6.677,5.906,2.153,2.842H1.772a.244.244,0,0,0-.238.238V17.916a.244.244,0,0,0,.238.238H16.607a.238.238,0,0,0,.238-.238ZM6.161,7.629V9.146H3.146V7.629Zm0,3.052v1.53H3.146V10.68Zm.455-6.042L8.831,2.846H3.97Zm8.613,2.99V9.146H7.19V7.629Zm0,3.052v1.53H7.19V10.68Zm-3.47-6.042L14.4,2.846H9.548Zm3.47,9.1v1.53H11.152V13.74Z"
          transform="translate(0 -1.313)"
          fill="currentColor"
        />
      </svg>
    </template>
    <template v-slot:title>Forms</template>
    <template v-slot:action1>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="10.995"
        height="10.995"
        viewBox="0 0 17.995 17.995"
        @click="closePopup()"
      >
        <path
          d="M19.33,15.581h0l-5.459-5.459L19.33,4.663h0a.564.564,0,0,0,0-.8L16.751,1.289a.564.564,0,0,0-.8,0h0L10.5,6.748,5.038,1.289h0a.564.564,0,0,0-.8,0L1.664,3.868a.564.564,0,0,0,0,.8h0l5.459,5.459L1.664,15.581h0a.564.564,0,0,0,0,.8l2.579,2.579a.564.564,0,0,0,.8,0h0L10.5,13.5l5.459,5.459h0a.564.564,0,0,0,.8,0l2.579-2.579a.564.564,0,0,0,0-.8Z"
          transform="translate(-1.5 -1.125)"
          fill="currentColor"
        /></svg
    ></template>
    <template v-slot:content>
      <div class="wrapper">
        <div class="sidebar">
          <div v-if="forms.length > 0">
            <h4
              v-for="form in forms"
              :key="form.id"
              @click="this.selectedForm = form"
              :class="form === selectedForm ? 'activeLink title' : 'title'"
            >
              {{ form.name }}
            </h4>
          </div>
          <div v-if="forms.length <= 0">
            <h4>No forms found for this event.</h4>
          </div>
          <div class="button-container">
            <button-standard-with-icon
              text="Download"
              @click="downloadForms('form-wrapper-print')"
            ></button-standard-with-icon>
            <button-standard-with-icon
              text="Save"
              @click="saveForms()"
            ></button-standard-with-icon>
          </div>
        </div>
        <div class="form-content">
          <div id="form-wrapper-print">
            <div v-if="this.forms.length > 0">
              <div
                class="form-field"
                v-for="(formItem, index) in selectedForm.fields"
                :key="index"
              >
                <h5>{{ formItem.name }}</h5>
                <div class="field-container">
                  <div
                    class="field-item"
                    v-for="(input, index) in formItem.fields"
                    :key="index"
                  >
                    <p>{{ input.inputTitle }}</p>
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
        </div>
      </div>
    </template>
  </full-page-popup>
</template>


<script>
import FullPagePopup from "../SharedComponentsUI/FullPagePopup.vue";
import ButtonStandardWithIcon from "../SharedComponentsUI/ButtonStandardWithIcon.vue";
import helpers from "../../helpers.js";

export default {
  data() {
    return {
      selectedForm: this.forms[0],
    };
  },
  methods: {
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
  },
  props: ["forms", "eventId"],

  components: {
    FullPagePopup,
    ButtonStandardWithIcon,
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
}

.sidebar {
  display: flex;
  flex-direction: column;
  justify-items: center;
  border-right: 1px solid var(--textColor);
  margin: 10px 30px 10px 10px;
  padding: 10px 30px 10px 10px;
}

.title {
  cursor: pointer;
}

.activeLink {
  text-decoration: underline;
}

.button-container {
  margin-top: auto;
}

.form-field {
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