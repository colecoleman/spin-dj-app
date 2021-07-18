<template>
  <div id="item-wrapper">
    <div id="left-div">
      <h5>{{ automationItemApproved.title }}</h5>
      <p>{{ formatDate(automationItemApproved.performDate) }}</p>
    </div>
    <div id="right-div">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14.6"
        height="14.6"
        viewBox="0 0 13.6 13.6"
      >
        <path
          id="Icon_awesome-check-circle"
          data-name="Icon awesome-check-circle"
          d="M13.928,7.128a6.8,6.8,0,1,1-6.8-6.8A6.8,6.8,0,0,1,13.928,7.128Zm-7.587,3.6,5.045-5.045a.439.439,0,0,0,0-.62l-.62-.62a.439.439,0,0,0-.62,0L6.031,8.557,4.11,6.636a.439.439,0,0,0-.62,0l-.62.62a.439.439,0,0,0,0,.62l2.852,2.852A.439.439,0,0,0,6.342,10.729Z"
          transform="translate(-0.328 -0.328)"
          fill="#fff"
        />
      </svg>
      <div class="button-standard-with-icon">
        <h4 class="approved">Approved</h4>
      </div>
      <square-icon-button @click="deleteAutomation">
        <template v-slot:icon> </template>
      </square-icon-button>
    </div>
  </div>
</template>

<script>
import SquareIconButton from "../UI/TrashButtonIcon.vue";
import helpers from "../../helpers.js";

export default {
  methods: {
    deleteAutomation() {
      console.log("clicked");
      let id = this.automationItemApproved.id;
      this.$store.dispatch("deleteApprovedAutomation", id);
    },
    formatDate: helpers.formatDate,
  },
  props: ["automation-item-approved"],
  components: {
    SquareIconButton,
  },
};
</script>

<style scoped>
#item-wrapper {
  width: 100%;
  margin-bottom: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

#right-div {
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}

#left-div {
  text-align: left;
  width: 50%;
}

.approved {
  margin: 10px;
}
</style>