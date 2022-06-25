<template>
  <div class="editable-profile-picture">
    <profile-picture
      class="profile-picture"
      :contact="contact"
      :profilePicture="profilePicture"
      @click="chooseFile"
    />
    <round-icon-button
      class="edit-button"
      :svg="loading ? 'loading' : 'edit-pen'"
      @click="chooseFile"
    />
    <input
      type="file"
      id="profile-picture-hidden-file-button"
      @change="onFileChange"
    />
  </div>
</template>
<script>
import ProfilePicture from "../../assets/ProfilePicture.vue";
import RoundIconButton from "../SharedComponentsUI/RoundIconButton.vue";
export default {
  data() {
    return {
      loading: false,
      photoFile: undefined,
    };
  },
  methods: {
    chooseFile() {
      this.loading = true;
      document.getElementById("profile-picture-hidden-file-button").click();
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.photoFile = files[0];
      this.$emit("update-profile-picture", this.photoFile);
    },
  },
  components: {
    ProfilePicture,
    RoundIconButton,
  },
  emits: ["update-profile-picture"],
  props: ["contact", "profilePicture", "processing"],
};
</script>
<style scoped>
.editable-profile-picture {
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

#profile-picture-hidden-file-button {
  display: none;
}

.profile-picture {
  height: 40px;
  max-width: 40px;
}
</style>