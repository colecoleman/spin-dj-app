<template>
  <base-card
    svg="file-open"
    actionIcon="plus-sign"
    @action-one-clicked="toggleOpenNote"
    title="Notes"
  >
    <template v-slot:content v-if="contact">
      <contact-page-notes-add-new
        v-if="addNewNoteOpen"
        :contact="contact"
        @submit-note="addNewNote"
      />
      <h5
        v-if="!contact.notesPublic && !contact.notesPrivate && !addNewNoteOpen"
      >
        No notes found for this client.
      </h5>
      <div
        class="notes-wrapper"
        v-if="!addNewNoteOpen && (contact.notesPublic || contact.notesPrivate)"
      >
        <div class="section-wrapper" v-if="contact.notesPublic">
          <h5>Public Notes:</h5>
          <p>Visible to others</p>
          <div
            class="notes-item"
            v-for="note in contact.notesPublic"
            :key="note.note"
          >
            <p class="note-date">
              <i>{{ formatDate(note.date) }}</i>
            </p>
            <p class="note-content">{{ note.note }}</p>
          </div>
        </div>
        <div class="section-wrapper" v-if="contact.notesPrivate">
          <h5>Private Notes:</h5>
          <p>Visible to you</p>
          <div
            class="notes-item"
            v-for="note in contact.notesPrivate"
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
import { formatDate } from "../../../../../../helpers.js";
import ContactPageNotesAddNew from "./ContactPageNotesAddNew.vue";

export default {
  data() {
    return {
      addNewNoteOpen: false,
    };
  },
  methods: {
    formatDate,
    toggleOpenNote() {
      this.addNewNoteOpen = !this.addNewNoteOpen;
    },
    addNewNote(note) {
      this.toggleOpenNote();
      let payload = {
        operation: "addToList",
        variable: note.privacy,
        value: {
          date: note.date,
          note: note.note,
        },
        contactKey: {
          tenantId: this.contact.tenantId,
          userId: this.contact.userId,
        },
      };
      this.$store.dispatch("editContact", payload);
    },
  },
  props: ["contact"],
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

.note-date {
  text-align: left;
}

.note-content {
  text-align: left;
  margin-left: 10px;
}
</style>