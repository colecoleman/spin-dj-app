<template>
  <base-card :icon="calendar" v-if="!singleDayViewOpen">
    <template v-slot:action1>
      <div class="right-title-parent">
        <h4 @click="floatingMenuOpen = !floatingMenuOpen">
          {{ `${monthArray[masterMonth] + ", "}` }} {{ masterYear }}
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
    <template v-slot:content v-if="events">
      <div id="base-container">
        <div id="calendar-container" v-if="!singleDayViewOpen">
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
                    :class="day.hasEvents ? 'hasEvents' : ''"
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
  <single-day-view
    v-if="singleDayViewOpen"
    :date="singleDayChosen"
    :events="events"
    @close-single-day-view="singleDayViewOpen = false"
  ></single-day-view>
</template>

<script>
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
    console.log(this.events);
    console.log(this.daysWithEvents);
  },
  methods: {
    getNumberOfDaysInMonth: function (year, month) {
      return new Date(year, month + 1, 0).getDate();
    },
    getWeekday(date) {
      return date.getDay();
    },
    monthChange(direction) {
      console.log(this.currentMonthDays);
      let count = this.masterMonth;
      let yearCount = this.yearChangeCount;
      const countGuards = function () {
        if (count < 0) {
          count = 11;
          yearCount--;
        }
        if (count > 11) {
          count = 0;
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
      this.singleDayChosen = day.date;
      this.singleDayViewOpen = true;
    },
    newTimeframeSelected(selections) {
      if (selections.left !== undefined) {
        this.masterYear = selections.left;
      }
      if (selections.right !== undefined) {
        this.masterMonth = selections.right;
      }
      this.floatingMenuOpen = false;
    },
  },
  computed: {
    today() {
      return new Date();
    },
    INITIAL_YEAR: function () {
      return this.today.getFullYear();
    },
    INITIAL_MONTH: function () {
      return this.today.getMonth();
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
    daysWithEvents() {
      return this.events.map((a) => new Date(a.data.date));
    },
    // used to establish the dates shown on calendar
    currentMonthDays: function () {
      let year = this.masterYear;
      let month = this.masterMonth;
      let eventDays = this.daysWithEvents;
      return [...Array(this.getNumberOfDaysInMonth(year, month))].map(
        (day, index) => {
          return {
            date: new Date(year, month, index + 1),
            dayOfMonth: index + 1,
            isCurrentMonth: true,
            get isCurrentDay() {
              return this.date
                .toDateString()
                .includes(new Date().toDateString());
            },
            get hasEvents() {
              return eventDays.some((x) => {
                return x.toDateString() == this.date.toDateString();
              });
            },
          };
        }
      );
    },
    previousMonthDays: function () {
      let year = this.masterYear;
      let month = this.masterMonth - 1;
      let firstDayOfTheMonthWeekday = this.getWeekday(
        this.currentMonthDays[1].date
      );
      const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday
        ? firstDayOfTheMonthWeekday - 1
        : 6;
      const previousMonthLastMondayDayOfMonth = new Date(
        year,
        month,
        `${0 - visibleNumberOfDaysFromPreviousMonth}`
      ).getDate();
      return [...Array(visibleNumberOfDaysFromPreviousMonth)].map(
        (day, index) => {
          return {
            date: new Date(
              year,
              month,
              previousMonthLastMondayDayOfMonth + index
            ),
            dayOfMonth: previousMonthLastMondayDayOfMonth + index,
            isCurrentMonth: false,
          };
        }
      );
    },
    nextMonthDays: function () {
      let year = this.masterYear;
      let month = this.masterMonth + 1;
      const lastDayOfTheMonthWeekday = this.getWeekday(
        this.currentMonthDays[this.currentMonthDays.length - 1].date
      );
      const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday
        ? 6 - lastDayOfTheMonthWeekday
        : 6;
      return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
        return {
          date: new Date(year, month, index + 1),
          dayOfMonth: index + 1,
          isCurrentMonth: false,
        };
      });
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
  props: ["events"],
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
    var(--highlightColor) 50%,
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