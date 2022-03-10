<template>
  <base-card
    title="To-Do"
    svg="clipboard"
    actionIcon="plus-sign"
    @action-one-clicked="toggleNewToDo"
  >
    <template v-slot:content>
      <div id="wrapper">
        <div v-if="newToDoOpened">
          <to-do-add-to-do
            :eventId="event.userId"
            :eventContacts="eventContacts"
            @add-to-do="submitToDo"
          />
        </div>
        <div v-if="uncompletedToDos.length < 1">
          <!-- <p class="bold">Looks like you're all done!</p>
          <p>Add another or take a vacation.</p> -->
        </div>
        <div id="to-do-scroll-container">
          <to-do-item
            v-for="toDo in uncompletedToDos"
            :key="toDo.userId"
            :contacts="eventContacts"
            :toDo="toDo"
          />

          <to-do-item
            v-for="toDo in completedToDos"
            :key="toDo.userId"
            :contacts="eventContacts"
            :toDo="toDo"
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
  methods: {
    toggleNewToDo() {
      this.newToDoOpened = !this.newToDoOpened;
    },
    submitToDo(item) {
      console.log(item);
      this.$store.dispatch("addToDo", item).then((res) => {
        this.toDos.unshift(res.data);
      });
      this.newToDo = undefined;
      this.newToDoOpened = false;
    },
  },
  computed: {
    uncompletedToDos() {
      return this.toDos.filter((item) => !item.completed);
    },
    completedToDos() {
      return this.toDos.filter((item) => item.completed);
    },
  },
  created() {
    let payload = {
      associatedEventId: this.event.userId,
    };
    this.$store.dispatch("getToDos", payload).then(
      (res) => {
        this.toDos = [...res.Items];
        console.log(res.Items);
      },
      (error) => {
        this.$store.commit("addStatus", { type: "error", note: error });
      }
    );
  },
  components: { ToDoItem, ToDoAddToDo },
  props: ["event", "eventContacts"],
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