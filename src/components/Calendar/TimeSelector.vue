<template>
  <div id="backdrop" @click="toggleMonthSelector"></div>
  <div id="modal">
    <div id="lists">
      <ul
        id="years"
        v-for="year in yearArray"
        :key="year.index"
        :class="{ currentYear: year.isCurrentYear }"
      >
        <li @click="changeYearData(year.year)">{{ year.year }}</li>
      </ul>
      <ul
        id="months"
        v-for="months in monthArrayWithSelection"
        :key="months.index"
        :month="months.month"
        :class="{ currentMonth: months.isCurrentMonth }"
      >
        <li @click="changeMonthData(months.id)">{{ months.month }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["months", "chosenMonth", "chosenYear", "initialYear"],
  emits: ["toggle-month-selector", "select-month", "select-year"],
  data() {
    return {
      monthArray: this.months,
      years: this.yearArray,
      monthClickCount: 0,
      yearClickCount: 0,
      selectedMonth: null,
      selectedYear: this.chosenYear,
    };
  },
  computed: {
    yearArray: function () {
      let array = [];
      array.push({
        year: parseInt(this.initialYear - 3),
        isCurrentYear: this.yearSelectionCheck(this.initialYear - 3),
      });
      array.push({
        year: this.initialYear - 2,
        isCurrentYear: this.yearSelectionCheck(this.initialYear - 2),
      });
      array.push({
        year: this.initialYear - 1,
        isCurrentYear: this.yearSelectionCheck(this.initialYear - 1),
      });
      array.push({
        year: parseInt(this.initialYear),
        isCurrentYear: this.yearSelectionCheck(this.initialYear),
      });
      array.push({
        year: this.initialYear + 1,
        isCurrentYear: this.yearSelectionCheck(this.initialYear + 1),
      });
      array.push({
        year: this.initialYear + 2,
        isCurrentYear: this.yearSelectionCheck(this.initialYear + 2),
      });
      return array;
    },
    monthArrayWithSelection: function () {
      let array = [];
      for (const month of this.months) {
        if (this.monthSelectionCheck(month)) {
          month.isCurrentMonth = true;
        } else {
          month.isCurrentMonth = false;
        }
        array.push(month);
      }
      return array;
    },
  },
  methods: {
    selectedYearStyling() {},
    changeYearData(year) {
      this.selectedYear = year;
      console.log(year);
      console.log(this.yearArray);
      this.selectYear(year);
    },
    changeMonthData(month) {
      this.selectedMonth = month;
      this.selectMonth(month);
    },
    yearSelectionCheck(year) {
      if (year == this.selectedYear) {
        return true;
      } else {
        return false;
      }
    },
    monthSelectionCheck(month) {
      if (month.month === this.chosenMonth) {
        return true;
      } else {
        return false;
      }
    },

    toggleMonthSelector() {
      console.log("sent!");
      this.$emit("toggle-month-selector");
    },
    selectMonth(month) {
      console.log("new Month selected");
      console.log(month);
      this.$emit("select-month", month);
    },
    selectYear(year) {
      console.log("newYearSelected");
      console.log(year);
      this.$emit("select-year", year);
    },
  },
  created: function () {
    console.log(this.yearArray);
  },
};
</script>

<style scoped>
#modal {
  justify-content: space-around;
  z-index: 10;
}

#backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
}
ul {
  list-style: none;
  font-weight: 600;
  padding: 0;
  margin-top: 12px;
  z-index: 10;
}
li {
  padding: 0px;
  z-index: 10;
  font-size: 10pt;
  cursor: pointer;
}

#lists {
  align-content: center;
  justify-content: center;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.currentYear,
.currentMonth {
  color: #00f5ff;
}
</style>