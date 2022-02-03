<template>
  <div class="add-new-note-wrapper">
    <h5>Privacy:</h5>
    <select name="Privacy" id="" v-model="note.privacy">
      <option value="notesPrivate" selected>Private</option>
      <option value="notesPublic">Public</option>
    </select>
    <h5>Note:</h5>
    <textarea
      :class="error ? 'error' : ''"
      name=""
      id=""
      cols="30"
      rows="4"
      v-model="note.note"
    ></textarea>
    <p v-if="error">Oops! Put something in here!</p>
    <button-standard-with-icon @click="submitNote" text="Submit Note" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      note: {
        privacy: "notesPrivate",
        date: new Date(),
        note: undefined,
      },
      error: false,
    };
  },
  methods: {
    submitNote() {
      if (this.note.note) {
        this.error = false;
        this.$emit("submit-note", this.note);
      } else {
        this.error = true;
      }
    },
  },
};
</script>

<style scoped>
.add-new-note-wrapper {
  height: 100%;
  overflow: scroll;
}

textarea,
select {
  width: 80%;
}

h5 {
  text-align: left;
  margin: 10px;
}

.error {
  border: 1px solid red;
}
</style>