<template>
  <div class="edit-card-wrapper">
    <base-card
      actionIcon="x-icon"
      @action-one-clicked="closeEditCard()"
      title="Edit Contact"
    >
      <template v-slot:content>
        <div class="edit-card-inner-wrapper">
          <select v-model="fieldToEdit">
            <option v-for="(field, key) in fields" :key="key" :value="key">
              {{ field.display }}
            </option>
          </select>
          <div v-if="fieldToEdit != undefined">
            <input-with-title
              :title="fields[fieldToEdit].display"
              :type="fieldToEdit.inputType"
              v-if="fieldToEdit != 'profilePicture'"
              :inputValue="fields[fieldToEdit].value"
              @input="fieldInput(fields[fieldToEdit], 'value', $event)"
              :placeholder="contact[fieldToEdit]"
            />
            <input
              v-if="fieldToEdit === 'profilePicture'"
              type="file"
              id="contact-card-edit-hidden-file-button"
              @change="onFileChange"
              style="display: none"
            />
            <div class="button-wrapper">
              <button-standard-with-icon
                v-if="fieldToEdit === 'profilePicture'"
                :text="photoFile ? photoFile.name : 'Choose File'"
                @click="chooseFile()"
                class="form-button"
              />
            </div>
            <div class="button-wrapper">
              <button-standard-with-icon text="Save" @click="saveField()" />
            </div>
          </div>
        </div>
      </template>
    </base-card>
  </div>
</template>

<script>
import InputWithTitle from "../../Components/SharedComponentsUI/ElementLibrary/InputWithTitle.vue";
export default {
  data() {
    return {
      photoFile: undefined,
      fieldToEdit: undefined,
      fields: {
        given_name: {
          display: "First Name",
          inputType: "text",
          value: undefined,
        },
        family_name: {
          display: "Last Name",
          inputType: "text",
          value: undefined,
        },
        pronoun: { display: "Pronoun", inputType: "text", value: undefined },
        phoneNumber: {
          display: "Phone Number",
          inputType: "tel",
          value: undefined,
        },
        email: {
          display: "Email Address",
          inputType: "email",
          value: undefined,
        },
        profilePicture: {
          display: "Profile Picture",
          inputType: "file",
          value: undefined,
        },
      },
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
    closeEditCard() {
      this.$emit("closeEditCard");
    },
    chooseFile() {
      document.getElementById("contact-card-edit-hidden-file-button").click();
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.photoFile = files[0];
    },
    async saveField() {
      if (this.photoFile) {
        await this.$store.dispatch("addPhoto", this.photoFile).then((res) => {
          this.fields.profilePicture.value = res;
        });
      }
      let key = {
        userId: this.contact.userId,
        tenantId: this.contact.tenantId,
      };
      let payload = {
        contactKey: key,
        variable: this.fieldToEdit,
        value: this.fields[this.fieldToEdit].value,
      };
      await this.$store.dispatch("editContact", payload);
    },
  },
  components: {
    InputWithTitle,
  },
  props: ["contact"],
};
</script>

<style scoped>
.edit-card-wrapper {
  position: absolute;
  right: -50px;
  top: -100%;
  z-index: 2;
  width: 300px;
}

.button-wrapper {
  padding: 10px;
}
input {
  margin: 10px;
}
</style>