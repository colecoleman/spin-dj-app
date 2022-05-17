<template>
  <base-card
    title="To-Do"
    svg="clipboard"
    :actionIcon="newToDoOpened ? 'x-icon' : 'plus-sign'"
    @action-one-clicked="toggleNewToDo"
  >
    <template v-slot:content>
      <div id="wrapper">
        <div v-if="newToDoOpened">
          <to-do-add-to-do
            :listType="listType"
            :eventId="event ? event.userId : undefined"
            :contactId="contact ? contact.userId : undefined"
            :eventContacts="eventContacts"
            :contactEvents="contact ? contact.associatedEvents : undefined"
            @add-to-do="submitToDo"
          />
        </div>
        <div v-if="uncompletedToDos.length < 1"></div>
        <div id="to-do-scroll-container">
          <to-do-item
            v-for="toDo in uncompletedToDos"
            :key="toDo.userId"
            :toDo="toDo"
            :listType="listType"
          />

          <to-do-item
            v-for="toDo in completedToDos"
            :key="toDo.userId"
            :toDo="toDo"
            :listType="listType"
          />
        </div>
      </div>
    </template>
  </base-card>
</template>

<script>
import ToDoItem from "../SharedComponentsToDoList/ToDoItem.vue";
import ToDoAddToDo from "../SharedComponentsToDoList/ToDoAddToDo.vue";

export default {
  data() {
    return {
      toDos: [],
      newToDoOpened: false,
      newToDo: undefined,
    };
  },
  computed: {
    uncompletedToDos() {
      return this.toDos.filter((item) => !item.completed);
    },
    completedToDos() {
      return this.toDos.filter((item) => item.completed);
    },
  },
  methods: {
    toggleNewToDo() {
      this.newToDoOpened = !this.newToDoOpened;
    },
    submitToDo(item) {
      this.$store.dispatch("addToDo", item).then((res) => {
        this.toDos.unshift(res.data);
      });
      this.newToDo = undefined;
      this.newToDoOpened = false;
    },
  },
  created() {
    let payload;
    if (this.event) {
      payload = {
        associatedEventId: this.event.userId,
      };
    }
    if (this.contact) {
      payload = {
        associatedContactId: this.contact.userId,
      };
    }
    this.$store.dispatch("getToDos", payload).then(
      (res) => {
        this.toDos = [...res.Items];
      },
      (error) => {
        this.$store.commit("addStatus", { type: "error", note: error });
      }
    );
  },
  components: { ToDoItem, ToDoAddToDo },
  props: ["event", "eventContacts", "listType", "contact"],
};
</script>

<style scoped>
#wrapper {
  width: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  overflow: scroll;
}

#to-do-scroll-container {
  /* height: 100%;
  max-height: 100%; */
  width: 100%;
  /* height: 100%; */
  overflow-y: scroll;
}
</style>