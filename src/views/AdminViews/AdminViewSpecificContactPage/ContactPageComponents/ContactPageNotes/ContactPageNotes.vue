<template>
  <base-card :icon="notessvg">
    <template v-slot:title>Notes</template>
    <template v-slot:action1>
      <img
        :src="plussignsvg"
        :class="addNewNoteOpen ? 'tilted' : ''"
        @click="toggleOpenNote()"
        alt=""
      />
    </template>
    <template v-slot:content>
      <contact-page-notes-add-new
        v-if="addNewNoteOpen"
        :contact="contact"
        :contactCategory="contactCategory"
        @submit-note="addNewNote"
      ></contact-page-notes-add-new>
      <div class="notes-wrapper" v-if="!addNewNoteOpen">
        <div class="section-wrapper">
          <h5>Public Notes:</h5>
          <p>Visible to others</p>
          <div class="notes-item" v-for="note in notes.public" :key="note.none">
            <p class="note-date">
              <i>{{ formatDate(note.date) }}</i>
            </p>
            <p class="note-content">{{ note.note }}</p>
          </div>
        </div>
        <div class="section-wrapper">
          <h5>Private Notes:</h5>
          <p>Visible to you</p>
          <div
            class="notes-item"
            v-for="note in notes.private"
            :key="note.none"
          >
            <p class="note-date">
              <i>{{ formatDate(note.date) }}</i>
            </p>
            <p class="note-content">{{ note.note }}</p>
          </div>
        </div>
      </div>
    </template>
  </base-card>
</template>

<script>
import notessvg from "../../../../../assets/SVGs/file-open.svg";
import plussignsvg from "../../../../../assets/SVGs/plus-sign.svg";
import helpers from "../../../../../helpers.js";
import ContactPageNotesAddNew from "./ContactPageNotesAddNew.vue";

export default {
  data() {
    return {
      notessvg,
      plussignsvg,
      addNewNoteOpen: false,
    };
  },
  methods: {
    toggleOpenNote() {
      this.addNewNoteOpen = !this.addNewNoteOpen;
    },
    addNewNote(note) {
      this.toggleOpenNote();
      let payload = {
        category: this.contactCategory,
        id: this.contact.id,
        note: note,
      };
      this.$store.dispatch("addContactNote", payload);
    },
    formatDate: helpers.formatDate,
  },
  created() {
    console.log(this.notes);
  },
  props: ["notes", "contact", "contactCategory"],
  components: {
    ContactPageNotesAddNew,
  },
};
</script>

<style scoped>
.notes-wrapper {
  width: 100%;
  height: 100%;
  overflow: scroll;
}

h5 {
  font-weight: 600;
}

.tilted {
  transform: rotate(45deg);
}

img {
  height: 14px;
  width: 14px;
}

.note-date {
  text-align: left;
}

.note-content {
  text-align: left;
  margin-left: 10px;
}
</style>