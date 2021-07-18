<template>
  <base-card :icon="clipboardsvg">
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
                stroke="#fff"
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
                stroke="#fff"
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13.6"
            height="13.6"
            viewBox="0 0 13.6 13.6"
          >
            <path
              id="Icon_awesome-check-circle"
              data-name="Icon awesome-check-circle"
              d="M13.928,7.128a6.8,6.8,0,1,1-6.8-6.8A6.8,6.8,0,0,1,13.928,7.128Zm-7.587,3.6,5.045-5.045a.439.439,0,0,0,0-.62l-.62-.62a.439.439,0,0,0-.62,0L6.031,8.557,4.11,6.636a.439.439,0,0,0-.62,0l-.62.62a.439.439,0,0,0,0,.62l2.852,2.852A.439.439,0,0,0,6.342,10.729Z"
              transform="translate(-0.328 -0.328)"
              fill="#fff"
              @click="submitToDo()"
            />
          </svg>
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
      <img
        :src="plusbuttonsvg"
        @click="newToDoOpened = !newToDoOpened"
        alt=""
      />
    </template>
  </base-card>
</template>

<script>
import ToDoItem from "../../../components/ToDo/ToDoItem.vue";
import BaseCard from "../../../components/UI/BaseCard.vue";
import clipboardsvg from "../../../assets/SVGs/clipboard.svg";
import plusbuttonsvg from "../../../assets/SVGs/plus-sign.svg";

export default {
  data() {
    return {
      clipboardsvg,
      plusbuttonsvg,
      newToDoOpened: false,
      newToDo: undefined,
    };
  },
  methods: {
    submitToDo() {
      let item = {
        id: this.$store.state.toDos.length + 1,
        associatedClientId: this.id,
        title: this.newToDo,
        completed: false,
      };
      this.$store.dispatch("addToDo", item);
      this.newToDo = undefined;
      this.newToDoOpened = false;
    },
  },
  computed: {
    toDos() {
      return this.$store.state.toDos.filter(
        (item) => item.associatedClientId === this.id
      );
    },
    uncompletedToDos() {
      return this.toDos.filter((item) => !item.completed);
    },
    completedToDos() {
      return this.toDos.filter((item) => item.completed);
    },
  },
  components: { ToDoItem, BaseCard },
  props: ["id"],
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

img {
  height: 14px;
  width: 14px;
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
  color: white;
  font-family: Montserrat, sans-serif;
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