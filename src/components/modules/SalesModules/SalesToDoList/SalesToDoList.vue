<template>
  <div id="div-heading">
    <div id="leftmost-heading">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="17"
        height="17"
        viewBox="0 0 21 28"
      >
        <path
          id="Icon_awesome-clipboard-list"
          data-name="Icon awesome-clipboard-list"
          d="M18.375,3.5H14a3.5,3.5,0,0,0-7,0H2.625A2.626,2.626,0,0,0,0,6.125v19.25A2.626,2.626,0,0,0,2.625,28h15.75A2.626,2.626,0,0,0,21,25.375V6.125A2.626,2.626,0,0,0,18.375,3.5ZM5.25,23.188a1.313,1.313,0,1,1,1.313-1.312A1.309,1.309,0,0,1,5.25,23.188Zm0-5.25a1.313,1.313,0,1,1,1.313-1.312A1.309,1.309,0,0,1,5.25,17.938Zm0-5.25a1.313,1.313,0,1,1,1.313-1.312A1.309,1.309,0,0,1,5.25,12.688Zm5.25-10.5A1.313,1.313,0,1,1,9.188,3.5,1.309,1.309,0,0,1,10.5,2.188Zm7,20.125a.439.439,0,0,1-.437.438H9.188a.439.439,0,0,1-.437-.437v-.875A.439.439,0,0,1,9.188,21h7.875a.439.439,0,0,1,.438.438Zm0-5.25a.439.439,0,0,1-.437.438H9.188a.439.439,0,0,1-.437-.437v-.875a.439.439,0,0,1,.438-.437h7.875a.439.439,0,0,1,.438.438Zm0-5.25a.439.439,0,0,1-.437.438H9.188a.439.439,0,0,1-.437-.437v-.875a.439.439,0,0,1,.438-.437h7.875a.439.439,0,0,1,.438.438Z"
          fill="#fff"
        />
      </svg>

      <h4>To-Do</h4>
    </div>
    <div id="rightmost-heading" @click="toggleAddButtonClicked">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 21 21"
        :class="addButtonClicked ? `clicked` : `unclicked`"
      >
        <path
          id="Path_71"
          data-name="Path 71"
          d="M18,7.5v18"
          transform="translate(-7.5 -6)"
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
          transform="translate(-6 -7.5)"
          fill="none"
          stroke="#fff"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="3"
        />
      </svg>
    </div>
  </div>
  <div id="to-do-wrapper">
    <transition-group tag="div" id="to-do-window" name="to-do-list">
      <sales-to-do-list-item
        v-for="toDo in toDoList"
        :key="toDo.id"
        :id="toDo.id"
        :type="toDo.type"
        :client="toDo.associatedClient"
        :status="toDo.pipelineStatus"
        :value="toDo.dollarValue"
        @remove-task="removeTask"
      ></sales-to-do-list-item>
    </transition-group>
  </div>
</template>

<script>
import SalesToDoListItem from "../SalesToDoList/SalesToDoListItem.vue";

export default {
  data() {
    return {
      addButtonClicked: false,
      toDoList: [
        {
          id: 1,
          type: "Followup",
          associatedClient: "Anna Smith",
          pipelineStatus: "Proposal Sent",
          dollarValue: `$1000`,
        },
        {
          id: 2,
          type: "Call",
          associatedClient: "Cole Coleman",
          pipelineStatus: "Proposal Sent",
          dollarValue: `$1000`,
        },
        {
          id: 3,
          type: "Email",
          associatedClient: "Chris Johnson",
          pipelineStatus: "Proposal Sent",
          dollarValue: `$1000`,
        },
        {
          id: 4,
          type: "Text",
          associatedClient: "Blah Blah",
          pipelineStatus: "Proposal Sent",
          dollarValue: `$1000`,
        },
        {
          id: 5,
          type: "Followup",
          associatedClient: "Anna Smith",
          pipelineStatus: "Proposal Sent",
          dollarValue: `$1000`,
        },
        {
          id: 6,
          type: "Call",
          associatedClient: "Anna Smith",
          pipelineStatus: "Proposal Sent",
          dollarValue: `$1000`,
        },
        {
          id: 7,
          type: "Text",
          associatedClient: "Anna Smith",
          pipelineStatus: "Proposal Sent",
          dollarValue: `$1000`,
        },
        {
          id: 8,
          type: "Email",
          associatedClient: "Anna Smith",
          pipelineStatus: "Proposal Sent",
          dollarValue: `$1000`,
        },
        {
          id: 9,
          type: "Followup",
          associatedClient: "Anna Smith",
          pipelineStatus: "Proposal Sent",
          dollarValue: `$1000`,
        },
      ],
    };
  },
  methods: {
    toggleAddButtonClicked() {
      this.addButtonClicked = !this.addButtonClicked;
    },
    removeTask(taskId) {
      let removeIndex = this.toDoList
        .map(function (task) {
          return task.id;
        })
        .indexOf(taskId);
      this.toDoList.splice(removeIndex, 1);
    },
  },
  components: { SalesToDoListItem },
};
</script>

<style scoped>
#to-do-wrapper {
  max-height: 90%;
  margin: auto;
}
#to-do-window {
  max-height: 30vh;
  padding: 20px;
  padding-top: 0;
  overflow: scroll;
}

#leftmost-heading {
  flex: 10;
  display: flex;
  justify-content: left;
  align-items: center;
}

#leftmost-heading svg {
  padding: 7px;
}

#rightmost-heading {
  flex: 1;
  display: flex;
  text-align: right;
  justify-content: right;
}
#div-heading {
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
  align-self: flex-start;
}

.to-do-list-leave-from {
  opacity: 100%;
}

.to-do-list-leave-active {
  transition: all 0.3s ease-in-out;
}

.to-do-list-leave-to {
  opacity: 0%;
}

.clicked {
  transform: rotate(45deg);
  transition-duration: 0.5s;
}

.unclicked {
  transform: rotate(0);
  transition-duration: 0.5s;
}
</style>