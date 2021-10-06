<template>
  <base-card :icon="calendar">
    <template v-slot:action1>
      <div class="right-title-parent">
        <h4 @click="floatingMenuOpen = !floatingMenuOpen">
          {{ `${displayedMonth + ", "}` }} {{ masterYear }}
        </h4>
        <dual-side-floating-menu-with-list-items
          :actions="floatingIconActions"
          :currentLeftSelection="masterYear"
          :currentRightSelection="masterMonth"
          v-if="floatingMenuOpen"
          @actionsClicked="newTimeframeSelected"
        ></dual-side-floating-menu-with-list-items>
      </div>
    </template>
    <template v-slot:title>Calendar</template>
    <template v-slot:content>
      <div id="base-container">
        <!-- <time-selector
          v-if="timeSelectorOpen && !singleDayViewOpen"
          :months="monthArray"
          :chosen-month="displayedMonth"
          :chosen-year="masterYear"
          :initial-year="INITIAL_YEAR"
          @toggle-month-selector="toggleMonthSelector"
          @select-month="newMonthSelected"
          @select-year="newYearSelected"
        ></time-selector> -->
        <single-day-view
          v-if="singleDayViewOpen && !timeSelectorOpen"
          :date="singleDayChosen"
          :events="events"
        ></single-day-view>
        <div
          id="calendar-container"
          v-if="!timeSelectorOpen && !singleDayViewOpen"
        >
          <div class="month-heading" @click="toggleMonthSelector"></div>
          <div id="body">
            <div
              class="side-arrows"
              @click="monthChange(`backward`)"
              @mousedown.prevent=""
            >
              <img :src="leftArrow" alt="" />
            </div>
            <div id="main-calendar-content">
              <div id="weekdays">
                <div v-for="day in WEEKDAYS" :key="day.key">
                  {{ day.identifier }}
                </div>
              </div>
              <div id="days">
                <div
                  v-for="day in days"
                  :key="day.date"
                  :class="{
                    day,
                    isNotCurrentMonth: !day.isCurrentMonth,
                    today: day.isCurrentDay,
                  }"
                >
                  <div
                    :class="day.hasEvents ? 'hasEvents' : ' '"
                    @click="day.hasEvents ? selectDay(day) : ''"
                  >
                    {{ day.dayOfMonth }}
                  </div>
                </div>
              </div>
            </div>
            <div
              class="side-arrows"
              @click="monthChange(`forward`)"
              @mousedown.prevent=""
            >
              <img :src="rightArrow" alt="" />
            </div>
          </div>
        </div>
      </div>
    </template>
  </base-card>
</template>

<script>
import dayjs from "dayjs";
// import TimeSelector from "./TimeSelector.vue";
import SingleDayView from "./SingleDayView/SingleDayView.vue";
import DualSideFloatingMenuWithListItems from "../SharedComponentsUI/DualSideFloatingMenuWithListItems.vue";

import calendar from "../../assets/SVGs/calendar.svg";
import xIcon from "../../assets/SVGs/x-icon.svg";
import downArrow from "../../assets/SVGs/down-arrow.svg";
import leftArrow from "../../assets/SVGs/left-arrow.svg";
import rightArrow from "../../assets/SVGs/right-arrow.svg";

export default {
  data() {
    return {
      xIcon,
      downArrow,
      rightArrow,
      leftArrow,
      calendar,
      WEEKDAYS: {
        sunday: {
          key: 1,
          identifier: "S",
        },
        monday: {
          key: 2,
          identifier: "M",
        },
        tuesday: {
          key: 3,
          identifier: "T",
        },
        wednesday: {
          key: 4,
          identifier: "W",
        },
        thursday: {
          key: 5,
          identifier: "T",
        },
        friday: {
          key: 6,
          identifier: "F",
        },
        saturday: {
          key: 7,
          identifier: "S",
        },
      },
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
      monthChangeCount: 0,
      yearChangeCount: 0,
      floatingMenuOpen: false,
      singleDayViewOpen: false,
      singleDayChosen: undefined,
      masterMonth: undefined,
      masterYear: undefined,
    };
  },
  created: function () {
    this.masterMonth = this.INITIAL_MONTH + this.yearChangeCount;
    this.masterYear = this.INITIAL_YEAR;
  },
  methods: {
    getNumberOfDaysInMonth: function (year, month) {
      return dayjs(`${year}-${month}-01`).daysInMonth();
    },
    createDaysForCurrentMonth: function (year, month, today) {
      return [...Array(this.getNumberOfDaysInMonth(year, month, today))].map(
        (day, index) => {
          return {
            date: dayjs(`${year}-${month}-${index + 1}`).format("YYYY-MM-DD"),
            get UTC() {
              let ms = Date.parse(
                dayjs(`${year}-${month}-${index + 2}`).format("YYYY-MM-DD")
              );
              let item = new Date(ms);
              return item;
            },
            dayOfMonth: index + 1,
            isCurrentMonth: true,
          };
        }
      );
    },
    createDaysForPreviousMonth: function (year, month) {
      let firstDayOfTheMonthWeekday = this.getWeekday(
        this.currentMonthDays[1].date
      );
      const previousMonth = dayjs(`${year}-${month}-01`).subtract(1, "month");
      const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday
        ? firstDayOfTheMonthWeekday - 1
        : 6;
      const previousMonthLastMondayDayOfMonth = dayjs(
        this.currentMonthDays[0].date
      )
        .subtract(visibleNumberOfDaysFromPreviousMonth, "day")
        .date();

      return [...Array(visibleNumberOfDaysFromPreviousMonth)].map(
        (day, index) => {
          return {
            date: dayjs(
              `${previousMonth.year()}-${previousMonth.month() + 1}-${
                previousMonthLastMondayDayOfMonth + index
              }`
            ).format("YYYY-MM-DD"),
            dayOfMonth: previousMonthLastMondayDayOfMonth + index,
            isCurrentMonth: false,
          };
        }
      );
    },
    createDaysForNextMonth: function (year, month) {
      const lastDayOfTheMonthWeekday = this.getWeekday(
        `${year}-${month}-${this.currentMonthDays.length + 1}`
      );
      const nextMonth = dayjs(`${year}-${month}-01`).add(1, "month");
      const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday
        ? 7 - lastDayOfTheMonthWeekday
        : lastDayOfTheMonthWeekday;
      return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
        return {
          date: dayjs(
            `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`
          ).format("YYYY-MM-DD"),
          dayOfMonth: index + 1,
          isCurrentMonth: false,
        };
      });
    },
    getWeekday(date) {
      return dayjs(date).weekday();
    },
    monthChange(direction) {
      let count = this.masterMonth;
      let yearCount = this.yearChangeCount;
      const countGuards = function () {
        if (count < 1) {
          count = 12;
          yearCount--;
        }
        if (count > 12) {
          count = 1;
          yearCount++;
        }
      };
      if (direction == `forward`) {
        count++;
        countGuards();
      }
      if (direction == `backward`) {
        count--;
        countGuards();
      }
      this.masterMonth = +count;
      this.masterYear = this.masterYear + yearCount;
    },
    newMonthSelected(id) {
      this.monthChangeCount = 0;
      this.masterMonth = id + 1;
      this.toggleMonthSelector();
    },
    newYearSelected(year) {
      this.yearChangeCount = 0;
      this.masterYear = year;
    },
    selectDay(day) {
      this.singleDayChosen = day.UTC;
      this.singleDayViewOpen = true;
    },
    newTimeframeSelected(selections) {
      if (selections.right !== undefined) {
        this.masterYear = selections.left;
      }
      if (selections.right !== undefined) {
        this.masterMonth = selections.right + 1;
      }
      this.floatingMenuOpen = false;
    },
  },
  computed: {
    //establishing data
    INITIAL_YEAR: function () {
      let year = parseInt(dayjs().format("YYYY"));
      return year;
    },
    INITIAL_MONTH: function () {
      let month = parseInt(dayjs().format("M"));
      return month;
    },
    TODAY: function () {
      let day = dayjs().format("YYYY-MM-DD");
      return day;
    },
    changeableMonth: function () {
      return parseInt(this.INITIAL_MONTH + this.monthChangeCount);
    },
    changeableYear: function () {
      return parseInt(this.INITIAL_YEAR + this.yearChangeCount);
    },
    selectedMonth: function () {
      return this.monthSelection();
    },
    displayedMonth: function () {
      return this.monthArray[this.masterMonth - 1];
    },
    surroundingYears() {
      let array = [];
      for (
        let temporaryYear = this.masterYear - 3;
        temporaryYear < this.masterYear + 7;
        temporaryYear++
      ) {
        array.push(temporaryYear);
      }
      return array;
    },
    floatingIconActions() {
      return {
        left: this.surroundingYears,
        right: this.monthArray,
      };
    },
    events() {
      if (this.$store.state.events.length > 0) {
        return this.$store.state.events.filter((event) => {
          if (event.eventStartTime) {
            // return event.eventStartTime.getMonth() === this.masterMonth - 1;
          }
        });
      } else {
        return [];
      }
    },
    daysWithEvents() {
      return this.events.map((a) => a.eventStartTime.getDate());
    },
    // used to establish the dates shown on calendar
    currentMonthDays: function () {
      var currentDays = this.createDaysForCurrentMonth(
        this.masterYear,
        this.masterMonth,
        this.TODAY
      );
      currentDays.forEach((day) => {
        if (day.date === this.TODAY) {
          day.isCurrentDay = true;
        } else {
          day.isCurrentDay = false;
        }
        if (this.daysWithEvents.includes(day.dayOfMonth)) {
          day.hasEvents = true;
        } else {
          day.hasEvents = false;
        }
      });
      return currentDays;
    },
    previousMonthDays: function () {
      return this.createDaysForPreviousMonth(this.masterYear, this.masterMonth);
    },
    nextMonthDays: function () {
      return this.createDaysForNextMonth(this.masterYear, this.masterMonth);
    },
    days() {
      return [
        ...this.previousMonthDays,
        ...this.currentMonthDays,
        ...this.nextMonthDays,
      ];
    },
  },
  emits: ["actionsClicked"],

  components: {
    // TimeSelector,
    SingleDayView,
    DualSideFloatingMenuWithListItems,
  },
};
</script>


<style scoped>
h4 {
  font-size: 10pt;
}

img {
  height: 14px;
  width: 14px;
}

#base-container {
  width: 100%;
  height: 100%;
  flex-direction: column;
  position: relative;
  justify-content: space-around;
}

.right-title-parent {
  height: 100%;
}

#body {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

#weekdays {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 10px;
  align-items: center;
  justify-content: center;
}
#weekdays div {
  text-transform: uppercase;
  font-size: 7pt;
  font-weight: bold;
  align-items: center;
  justify-content: center;
}

#main-calendar-content {
  padding: 10px;
  height: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#days {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  align-items: center;
  justify-content: center;
  cursor: default;
}

#days div {
  width: calc(266px / 7);
  font-size: 12px;
  font-weight: 700;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hasEvents {
  background: radial-gradient(
    ellipse at center,
    var(--highlightColor) 0%,
    var(--highglightColor) 50%,
    rgba(0, 0, 0, 0) 53%
  );
  cursor: pointer;
}

.isNotCurrentMonth {
  opacity: 0.25;
}

#text > svg {
  cursor: pointer;
}

.side-arrows {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.today {
  background: radial-gradient(
    ellipse at center,
    var(--textColor) 0%,
    var(--textColor) 50%,
    rgba(0, 0, 0, 0) 53%
  );
}

.today > * {
  filter: invert(100%);
}
</style>