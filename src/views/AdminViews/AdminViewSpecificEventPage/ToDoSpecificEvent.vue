<template>
  <base-card :icon="svg.clipboardsvg">
    <template v-slot:title>To-Do</template>
    <template v-slot:content>
      <div id="wrapper" :style="cssVars">
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
                stroke="#000"
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
          <img :src="circleCheckmark" alt="" />
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
    </template>
  </base-card>
</template>

<script>
import ToDoItem from "../../../SharedComponents/SharedComponentsToDoList/ToDoItem.vue";
import BaseCard from "../../../SharedComponents/SharedComponentsUI/BaseCard.vue";
import clipboardsvg from "../../../assets/SVGs/clipboard.svg";
import circleCheckmarkSvg from "../../../assets/SVGs/circle-checkmark.svg";

export default {
  data() {
    return {
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
        id: this.$store.state.toDos.length + 1,
        associatedEventId: this.id,
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
        (item) => item.associatedEventId === this.id
      );
    },
    uncompletedToDos() {
      return this.toDos.filter((item) => !item.completed);
    },
    completedToDos() {
      return this.toDos.filter((item) => item.completed);
    },
    foregroundColor() {
      return this.$store.state.businessSettings.brandingPreferences
        .foregroundColor;
    },
    cardOutline() {
      return this.$store.state.businessSettings.brandingPreferences.cardOutline;
    },
    textColor() {
      return this.$store.state.businessSettings.brandingPreferences.textColor;
    },
    cssVars() {
      return {
        "--cardOutline": this.cardOutline,
        "--foregroundColor": this.foregroundColor,
        "--textColor": this.textColor,
      };
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