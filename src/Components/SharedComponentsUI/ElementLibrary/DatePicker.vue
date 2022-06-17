<template>
  <div id="date-picker-wrapper">
    <div id="date-picker-heading">
      <div class="icon-group">
        <round-icon-button
          class="icon"
          svg="double-left-arrow"
          @click="yearChange('backward')"
        />
        <round-icon-button
          class="icon"
          svg="left-arrow"
          @click="monthChange('backward')"
        />
      </div>
      <h5 id="month-heading">
        {{ monthArray[viewedMonth.getMonth()] }}
        {{ viewedMonth.getFullYear() }}
      </h5>
      <div class="icon-group">
        <round-icon-button
          class="icon"
          svg="right-arrow"
          @click="monthChange('forward')"
        />
        <round-icon-button
          class="icon"
          svg="double-right-arrow"
          @click="yearChange('forward')"
        />
      </div>
    </div>
    <div id="main-calendar-content">
      <p
        v-for="(day, index) in WEEKDAYS"
        class="weekday isNotCurrentMonth"
        :key="index"
      >
        {{ day }}
      </p>

      <p
        v-for="(day, index) in days"
        :key="index"
        :class="{
          day,
          isNotCurrentMonth: !day.isCurrentMonth,
          today: day.isCurrentDay,
          chosenDate: day.chosenDate,
          hasEvents: day.hasEvents,
        }"
        @click="dateChosen(day)"
      >
        {{ day.dayOfMonth }}
      </p>
    </div>
    <button-standard-with-icon
      class="cancel-button"
      text="Cancel"
      :processing="processing"
      @click="closeDatePicker()"
    />
  </div>
</template>
<script>
import RoundIconButton from "../RoundIconButton.vue";

import {
  nextMonthDays,
  previousMonthDays,
  currentMonthDays,
} from "../../../calendarFunctions.js";
export default {
  data() {
    return {
      WEEKDAYS: ["S", "M", "T", "W", "T", "F", "S"],
      monthArray: [
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
      ],
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
    };
  },
  computed: {
    viewedMonth() {
      return new Date(this.year, this.month);
    },
    currentMonthDays() {
      return currentMonthDays(this.viewedMonth).map((x) => {
        let date = new Date(this.chosenDate);
        return {
          ...x,
          get chosenDate() {
            return (
              x.date.getMonth() === date.getMonth() &&
              x.date.getDate() === date.getDate() &&
              x.date.getFullYear() === date.getFullYear()
            );
          },
        };
      });
    },
    days() {
      return [
        ...previousMonthDays(this.viewedMonth),
        ...this.currentMonthDays,
        ...nextMonthDays(this.viewedMonth),
      ];
    },
  },
  methods: {
    dateChosen(date) {
      this.$emit("date-chosen", date.date);
    },
    closeDatePicker() {
      this.$emit("close");
    },
    monthChange(direction) {
      if (direction == `forward`) {
        this.month++;
      }
      if (direction == `backward`) {
        this.month--;
      }
    },
    yearChange(direction) {
      if (direction == `forward`) {
        this.year++;
      }
      if (direction == `backward`) {
        this.year--;
      }
    },
  },
  created() {
    if (this.chosenDate) {
      let date = new Date(this.chosenDate);
      this.month = date.getMonth();
      this.year = date.getFullYear();
    }
  },
  components: { RoundIconButton },
  emits: ["date-chosen", "close"],
  props: ["chosenDate", "processing"],
};
</script>
<style scoped>
#date-picker-wrapper {
  position: absolute;
  width: 300px;
  left: calc(50% - 167.5px);
  height: fit-content;
  top: 10%;
  background-color: var(--foregroundColor);
  filter: drop-shadow(0px 4px 3px var(--cardOutline));
  border-radius: 10px;
  padding: 15px;
  z-index: 101;
}

.icon-group {
  display: flex;
  justify-content: space-around;
}
.icon {
  margin: 6px;
  padding: 10px;
}

#date-picker-heading {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding-bottom: 30px;
  /* height: 20%; */
}

#month-heading {
  margin: 5px;
}

#month-heading {
  text-transform: uppercase;
}

#main-calendar-content {
  height: 80%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(auto-fill, 1fr);
  max-height: 100%;
  width: 100%;
  cursor: default;
}

#main-calendar-content div {
  flex: 1;
  font-size: 9pt;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.day,
.weekday {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  height: 40px;
  padding: auto;
}

.day:hover {
  font-weight: 600;
  cursor: pointer;
}
.chosenDate {
  background: radial-gradient(
    circle at center,
    var(--textColor) 0%,
    var(--textColor) 43%,
    rgba(0, 0, 0, 0) 44%
  );
  color: var(--foregroundColor);
}

.isNotCurrentMonth {
  opacity: 0.25;
}
</style>