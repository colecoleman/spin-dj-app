<template>
  <div id="item-wrapper">
    <div id="left-div">
      <h4>{{ automationItemApproved.title }}</h4>
      <p>{{ formatDate }}</p>
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

export default {
  methods: {
    deleteAutomation() {
      console.log("clicked");
      let id = this.automationItemApproved.id;
      this.$store.dispatch("deleteApprovedAutomation", id);
    },
  },
  props: ["automation-item-approved"],
  computed: {
    formatDate() {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      let date = this.automationItemApproved.performDate;
      let splitDate = date.split("-");

      let m = splitDate[1] - 1;
      let month = monthNames[m];
      return month + " " + splitDate[2] + ", " + splitDate[0];
    },
  },
  components: {
    SquareIconButton,
  },
};
</script>

<style scoped>
p {
  font-size: 10pt;
  margin: 5px;
}

#item-wrapper {
  width: 90%;
  margin: 0 5%;
  margin-bottom: 8px;
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  justify-content: space-evenly;
}

#left-div {
  text-align: left;
  width: 50%;
}
#right-div {
  width: fit-content;
  /* margin-right: 24px; */
  display: flex;
  flex-direction: row;
  height: 60px;
  /* justify-items: flex-end; */
  align-content: center;
  align-items: center;
  justify-content: flex-end;
}

.approved {
  margin: 10px;
}

.button-standard-with-icon {
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  justify-content: center;
  text-transform: uppercase;
  margin: 8px;
  /* padding: 5px 15px 5px 5px; */
  /* border: 1px solid white; */
  border-radius: 7px;
  fill: white;
}


</style>