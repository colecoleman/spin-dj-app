<template>
  <base-card
    svg="clipboard"
    title="To-Do"
    actionIcon="plus-sign"
    @action-one-clicked="toggleNewToDo"
    :loading="contact ? false : true"
  >
    <template v-slot:content>
      <div id="wrapper" v-if="contact">
        <div class="to-do-item" v-if="newToDoOpened">
          <vue-svg svg="clipboard" />
          <input
            type="text"
            placeholder="Start typing.."
            v-model="newToDo"
            @keyup.enter="submitToDo()"
          />
          <vue-svg svg="circle-checkmark" @click="submitToDo()" />
        </div>
        <div class="to-do-item" v-for="toDo in uncompletedToDos" :key="toDo.id">
          <to-do-item :toDo="toDo"></to-do-item>
        </div>
        <div v-if="uncompletedToDos.length < 1">
          <p class="bold">Looks like you're all done!</p>
          <p>Add another or take a vacation.</p>
        </div>
        <div class="to-do-item" v-for="toDo in completedToDos" :key="toDo.id">
          <to-do-item :toDo="toDo"></to-do-item>
        </div>
      </div>
    </template>
  </base-card>
</template>

<script>
import VueSvg from "../../assets/VueSvg.vue";
import ToDoItem from "../SharedComponentsToDoList/ToDoItem.vue";

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
    submitToDo() {
      let item = {
        id: "todo" + new Date().getTime(),
        associatedContacts: [this.contact.userId],
        associatedEvents: [],
        title: this.newToDo,
        completed: false,
      };
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
  watch: {
    contact: function () {
      let payload = {
        associatedContactId: this.contact.userId,
      };
      this.$store.dispatch("getToDos", payload).then(
        (res) => {
          this.toDos = [...res.Items];
        },
        (error) => {
          this.$store.commit("addStatus", { type: "error", note: error });
        }
      );
    },
  },
  components: { ToDoItem, VueSvg },
  props: ["contact"],
};
</script>

<style scoped>
#wrapper {
  width: 100%;
  height: 90%;
  max-height: 90%;
  overflow-y: scroll;
  position: relative;
  display: flex;
  flex-direction: column;
}
.to-do-item {
  height: 50px;
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
}

h4,
input {
  margin: 10px;
  text-align: left;
}

input {
  background: none;
  border: none;
  border-bottom: 1px solid gray;
  color: var(--textColor);
}

input:active,
input:focus {
  outline: none;
}

h5 {
  margin: 5px;
}
</style>