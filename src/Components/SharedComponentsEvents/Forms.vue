<template>
  <backdrop id="forms-wrapper" @click.self="close">
    <music-library-song-picker
      @emit-track="addTrackToField"
      @close-song-picker="closeSongPicker"
      v-if="libraryActiveField"
    />
    <document-view-with-toolbar
      @close="close"
      @toggle-add-on-item-from-included="toggleFormFromIncluded"
      @save-button-clicked="saveForms"
      :icons="icons"
      :saveProcessing="saveProcessing"
      :addOnItems="businessForms"
      :includedItems="forms"
      :documents="forms"
      addOnItemTitle="name"
    >
      <template v-slot:document="document">
        <div class="form-wrapper" :id="document.document.id">
          <img :src="logo" alt="Business Logo" />
          <h2 class="form-title">{{ document.document.name }}</h2>
          <p v-if="document.document.description">
            {{ document.document.description }}
          </p>
          <div
            class="library-enable-disclaimer no-print"
            v-if="hasLibraryFields(document.document)"
          >
            <p>Look for the music icon to search our library!</p>
            <round-icon-button
              svg="music"
              class="library-enable-disclaimer-icon"
            />
          </div>
          <div
            class="form-field"
            v-for="(formItem, formItemIndex) in document.document.fields"
            :key="formItemIndex"
          >
            <h4
              v-if="
                firstDuplicatedForm(document.document, formItem) ===
                formItemIndex
              "
            >
              {{ formItem.name }}
            </h4>
            <div class="field-container">
              <round-icon-button
                svg="music"
                class="library-icon no-print"
                v-if="formItem.libraryEnabled"
                @click="changeLibraryActiveField(formItem)"
              />
              <div
                class="field-item"
                v-for="(input, index) in formItem.fields"
                :key="index"
              >
                <input-with-title
                  v-if="
                    input.inputType === 'text' ||
                    input.inputType === 'tel' ||
                    input.inputType === 'textarea' ||
                    input.inputType === 'email' ||
                    input.inputType === 'select'
                  "
                  class="no-print"
                  :title="input.inputTitle"
                  :type="input.inputType"
                  :inputValue="input.value"
                  optionDisplay="optionValue"
                  :options="input.options ? input.options : []"
                  @input="fieldInput(input, 'value', $event)"
                />
                <h5 class="no-screen">{{ input.inputTitle }}:</h5>
                <p
                  v-if="
                    input.inputType === 'text' ||
                    input.inputType === 'tel' ||
                    input.inputType === 'textarea' ||
                    input.inputType === 'email' ||
                    input.inputType === 'select'
                  "
                  class="no-screen print-text"
                >
                  {{ input.value }}
                </p>
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
              </div>
            </div>
            <div class="duplicate-button-wrapper no-print">
              <button-standard-with-icon
                v-if="formItem.duplicable"
                text="Duplicate"
                @click="
                  duplicateField(document.document, formItem, formItemIndex)
                "
              />
            </div>
          </div>
          <h2 class="event-title">{{ event.title }}</h2>
        </div>
      </template>
    </document-view-with-toolbar>
  </backdrop>
</template>
<script>
import Backdrop from "../SharedComponentsUI/Backdrop.vue";
import DocumentViewWithToolbar from "../SharedComponentsUI/DocumentViewWithToolbar.vue";
import InputWithTitle from "../SharedComponentsUI/ElementLibrary/InputWithTitle.vue";
import RoundIconButton from "../SharedComponentsUI/RoundIconButton.vue";
import MusicLibrarySongPicker from "../SharedComponentsLibrary/MusicLibrarySongPicker.vue";
import _ from "lodash";
export default {
  data() {
    return {
      deleteFormOpen: false,
      formDeleteIndex: undefined,
      libraryActiveField: undefined,
      saveProcessing: false,
    };
  },
  computed: {
    businessForms() {
      return this.$store.getters.forms;
    },
    role() {
      return this.$store.getters.userRole;
    },
    icons() {
      let array = ["print"];
      if (this.role === "admin") {
        console.log("this is an admin");
        array.push("save", "plus-sign");
      }
      if (this.role === "organizer" || this.role === "client") {
        array.push("save");
      }
      return array;
    },
    logo() {
      return this.$store.getters.identity.businessLogo;
    },
  },
  methods: {
    hasLibraryFields(form) {
      if (
        form.fields.find((x) => {
          return x.libraryEnabled === true;
        })
      ) {
        return true;
      }
    },
    close() {
      this.saveForms();
      this.$emit("close");
    },
    fieldInput(object, property, value) {
      if (object) {
        object[property] = value;
      } else {
        this[property] = value;
      }
    },
    async saveForms() {
      this.saveProcessing = true;
      let payload = {
        variable: "forms",
        value: this.forms,
        eventKey: { userId: this.event.userId, tenantId: this.event.tenantId },
      };
      await this.$store.dispatch("editEvent", payload);
      this.saveProcessing = false;
    },
    duplicateField(form, fieldItem, formItemIndex) {
      console.log(form, fieldItem, formItemIndex);
      form.fields.splice(formItemIndex, 0, _.cloneDeep(fieldItem));
      form.fields[formItemIndex].duplicable = false;
    },
    async toggleFormFromIncluded(form) {
      let forms = this.event.forms;
      let index = this.event.forms.findIndex((x) => {
        return x.id === form.id;
      });
      if (index > -1) {
        forms.splice(index, 1);
      } else {
        forms.push(form);
      }
      let editPayload = {
        eventKey: { userId: this.event.userId, tenantId: this.event.tenantId },
        variable: "forms",
        value: forms,
      };
      await this.$store.dispatch("editEvent", editPayload);
    },
    changeLibraryActiveField(field) {
      this.libraryActiveField = field;
    },
    addTrackToField(track) {
      this.libraryActiveField.libraryMatch = track;
      this.libraryActiveField.fields[0].value = track["Name"];
      this.libraryActiveField.fields[1].value = track["Artist"];
      this.changeLibraryActiveField(undefined);
    },
    addFormToEvent(form) {
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
      return form.fields.findIndex((x) => x.name == field.name);
    },
    closeSongPicker() {
      this.libraryActiveField = undefined;
    },
  },
  created() {},
  components: {
    Backdrop,
    DocumentViewWithToolbar,
    InputWithTitle,
    RoundIconButton,
    MusicLibrarySongPicker,
  },
  emits: ["close"],
  props: ["forms", "event"],
};
</script>
<style scoped>
h2 {
  font-size: 20px;
  margin-bottom: 10px;
}
h4 {
  font-size: 12px;
}

#forms-wrapper {
  z-index: 100;
  backdrop-filter: blur(3px);
}

.form-field {
  text-align: left;
}

.field-container {
  display: flex;
  width: 100%;
  position: relative;
  flex-wrap: wrap;
}

.field-item {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.library-icon {
  position: absolute;
  left: -30px;
}

.library-enable-disclaimer {
  position: absolute;
  display: flex;
  align-items: center;
  right: -20px;
  top: -60px;
}

.form-wrapper {
  position: relative;
}

@media screen {
  .no-screen {
    display: none;
  }

  img,
  .event-title {
    display: none;
  }
  .field-container {
    flex-direction: column;
  }

  .duplicate-button-wrapper {
    width: 100px;
    margin-top: 10px;
    margin-left: 40px;
    margin: 10px 0 20px 40px;
  }

  .form-field {
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;
  }

  .field-item {
    max-width: 200px;
    margin: 0 10px;
  }

  @media screen and (min-width: 800px) {
    .field-container {
      flex-direction: row;
    }
  }
}
@media print {
  @page {
    margin: auto auto 0 auto;
  }

  #forms-wrapper {
    backdrop-filter: unset;
    z-index: unset;
    display: unset;
    overflow: visible;
    position: unset;
  }

  .form-title {
    text-align: center;
    border-bottom: 1px solid black;
    width: 100%;
    text-align: center;
    top: 0;
  }
  img {
    position: fixed;
    right: 0;
    top: 0;
    height: 20px;
  }

  .form-wrapper {
    width: 100%;

    max-height: 90%;
    page-break-after: always;
  }

  .form-field {
    /* width: 100%; */
    margin: 0px;
  }

  .field-item {
    flex: 1;
    width: 33%;
    max-width: unset;
  }

  h4 {
    margin-bottom: 0;
  }

  .event-title {
    width: 100%;
    text-align: center;
    position: fixed;
    bottom: 0px;
  }

  .no-print {
    display: none;
  }

  .print-text {
    font-weight: 600;
    margin: 10px;
  }
}
</style>