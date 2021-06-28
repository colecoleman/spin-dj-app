<template>
  <div id="item-wrapper">
    <div id="left-div">
      <h4>{{ automationItem.title }}</h4>
      <p>{{ formatDate }}</p>
    </div>
    <div id="right-div">
      <button-standard-with-icon text="Approve" @click="approveAutomation">
        <template v-slot:icon>
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
            />
          </svg>
        </template>
      </button-standard-with-icon>
      <square-icon-button @click="deleteAutomation">
        <template v-slot:icon> </template>
      </square-icon-button>
    </div>
  </div>
</template>

<script>
import ButtonStandardWithIcon from "../UI/ButtonStandardWithIcon.vue";
import SquareIconButton from "../UI/TrashButtonIcon.vue";

export default {
  methods: {
    approveAutomation() {
      console.log("clicked");
      let id = this.automationItem.id;
      this.$store.dispatch("approveAutomation", id);
    },
    deleteAutomation() {
      console.log("clicked");
      let id = this.automationItem.id;
      this.$store.dispatch("deleteAutomation", id);
    },
  },
  props: ["automation-item"],
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
      let date = this.automationItem.performDate;
      let splitDate = date.split("-");

      let m = splitDate[1] - 1;
      let month = monthNames[m];
      return month + " " + splitDate[2] + ", " + splitDate[0];
    },
  },
  components: { ButtonStandardWithIcon, SquareIconButton },
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
  display: flex;
  flex-direction: row;
  justify-content: right;
  justify-items: right;
  align-items: flex-end;
  align-content: flex-end;
  align-self: flex-end;
  justify-self: right;
  height: 60px;
  margin-right: 0;
}
</style>