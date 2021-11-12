<template>
  <base-card :icon="svg.clipboardsvg">
    <template v-slot:title>To-Do</template>
    <template v-slot:content>
      <div id="wrapper">
        <div class="to-do-item" v-if="newToDoOpened">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 21 21"
          >
            <g
              id="Group_395"
              data-name="Group 395"
              transform="translate(1.5 1.5)"
            >
              <path
                id="Path_71"
                data-name="Path 71"
                d="M18,7.5v18"
                transform="translate(-9 -7.5)"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3"
              />
              <path
                id="Path_72"
                data-name="Path 72"
                d="M7.5,18h18"
                transform="translate(-7.5 -9)"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3"
              />
            </g>
          </svg>
          <input
            type="text"
            placeholder="Start typing.."
            v-model="newToDo"
            @keyup.enter="submitToDo()"
          />
          <img :src="svg.circleCheckmarkSvg" @click="submitToDo()" alt="" />
        </div>
        <div class="to-do-item" v-for="toDo in uncompletedToDos" :key="toDo.id">
          <to-do-item :toDo="toDo"></to-do-item>
        </div>
        <div v-if="uncompletedToDos.length < 1">
          <h5>Looks like you're all done!</h5>
          <p>Add another or take a vacation.</p>
        </div>
        <div class="to-do-item" v-for="toDo in completedToDos" :key="toDo.id">
          <to-do-item :toDo="toDo"></to-do-item>
        </div>
      </div>
    </template>
    <template v-slot:action1>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 21 21"
        @click="newToDoOpened = !newToDoOpened"
      >
        <g id="Group_395" data-name="Group 395" transform="translate(1.5 1.5)">
          <path
            id="Path_71"
            data-name="Path 71"
            d="M18,7.5v18"
            transform="translate(-9 -7.5)"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="3"
          />
          <path
            id="Path_72"
            data-name="Path 72"
            d="M7.5,18h18"
            transform="translate(-7.5 -9)"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="3"
          />
        </g>
      </svg>
    </template>
  </base-card>
</template>

<script>
import ToDoItem from "../../../SharedComponents/SharedComponentsToDoList/ToDoItem.vue";
import clipboardsvg from "../../../assets/SVGs/clipboard.svg";
import circleCheckmarkSvg from "../../../assets/SVGs/circle-checkmark.svg";

export default {
  data() {
    return {
      toDos: [],
      svg: {
        clipboardsvg,
        circleCheckmarkSvg,
      },
      newToDoOpened: false,
      newToDo: undefined,
    };
  },
  methods: {
    submitToDo() {
      let item = {
        id: "todo" + new Date().getTime(),
        associatedContacts: [],
        associatedEvents: [this.event.userId],
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
    watch: {
      event: function () {
        let payload = {
          associatedEventId: this.event.userId,
        };
        this.$store.dispatch("getToDos", payload).then(
          (res) => {
            console.log(res);
            this.toDos = [...res.Items];
          },
          (error) => {
            this.$store.dispatch("addError", error);
          }
        );
      },
    },
  },
  created() {
    console.log(this.event);
    let payload = {
      associatedEventId: this.event.userId,
    };
    this.$store.dispatch("getToDos", payload).then(
      (res) => {
        console.log(res);
        this.toDos = [...res.Items];
      },
      (error) => {
        this.$store.dispatch("addError", error);
      }
    );
  },
  components: { ToDoItem },
  props: ["event"],
};
</script>

<style scoped>
#wrapper {
  width: 100%;
  height: 90%;
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

svg {
  margin: 4px;
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

p {
  font-size: 10pt;
}
h5 {
  margin: 5px;
}
</style>