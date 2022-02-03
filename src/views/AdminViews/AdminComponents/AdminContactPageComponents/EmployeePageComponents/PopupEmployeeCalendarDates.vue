<template>
  <img
    :src="XIconSVG"
    alt=""
    v-if="timeSelectorOpen"
    @click="
      singleDayViewOpen
        ? (singleDayViewOpen = false)
        : '' || timeSelectorOpen
        ? (timeSelectorOpen = false)
        : ''
    "
  />
  <div id="base-container" @mouseleave="hoverDate = undefined">
    <time-selector
      v-if="timeSelectorOpen"
      :months="monthArray"
      :chosen-month="displayedMonth"
      :chosen-year="masterYear"
      :initial-year="masterYear"
      @toggle-month-selector="toggleMonthSelector"
      @select-month="newMonthSelected"
      @select-year="newYearSelected"
    />
    <div id="calendar-container" v-if="!timeSelectorOpen">
      <div class="month-heading" @click="toggleMonthSelector">
        <div id="text">
          <h3>{{ `${displayedMonth + ", "}` }} {{ masterYear }}</h3>
          <img :src="DownArrowSVG" alt="" />
        </div>
      </div>
      <div id="body">
        <div
          class="side-arrows"
          @click="monthChange(`backward`)"
          @mousedown.prevent=""
        >
          <img :src="LeftArrowSVG" alt="" />
        </div>
        <div id="main-calendar-content">
          <div id="weekdays">
            <div v-for="(day, index) in WEEKDAYS" :key="index">
              {{ day }}
            </div>
          </div>
          <div id="days" @mouseleave="hoverDate = undefined">
            <div
              v-for="day in days"
              :key="day.UTC"
              :class="{
                day,
                isNotCurrentMonth: !day.isCurrentMonth,
                today: day.isCurrentDay,
              }"
            >
              <div
                :class="day.hasEvents ? 'hasEvents' : ''"
                @click="day.hasEvents ? selectDay(day) : ''"
                @mouseover="openDateUtility(day.date)"
                @mouseleave="hoverDate = undefined"
              >
                <div class="hover-date" v-if="hoverDate == day.date">
                  <h5>Mark as:</h5>
                  <p @click="markUnavailable(day.date)">Unavailable</p>
                  <br />
                  <p @click="markAvailable(day.date)">Available</p>
                </div>
                <div class="availability-indicator">
                  <img
                    class="availability-icon"
                    v-if="
                      employee.unavailableDates.includes(day.date) ||
                      day.unavailable
                    "
                    :src="RedXCircle"
                    alt=""
                  />
                  <img
                    class="availability-icon"
                    v-if="employee.availableDates.includes(day.date)"
                    :src="GreenCheckmark"
                    alt=""
                  />
                </div>
                <h4>
                  {{ day.dayOfMonth }}
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div
          class="side-arrows"
          @click="monthChange(`forward`)"
          @mousedown.prevent=""
        >
          <img :src="RightArrowSVG" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import TimeSelector from "../../../../../SharedComponents/SharedComponentsCalendar/TimeSelector.vue";

import {
  CalendarSVG,
  XIconSVG,
  DownArrowSVG,
  LeftArrowSVG,
  RightArrowSVG,
  GreenCheckmark,
  RedXCircle,
} from "../../../../../assets/SVGs/svgIndex.js";

export default {
  data() {
    return {
      CalendarSVG,
      XIconSVG,
      DownArrowSVG,
      RightArrowSVG,
      LeftArrowSVG,
      GreenCheckmark,
      RedXCircle,
      hoverDate: undefined,
      WEEKDAYS: ["S", "M", "T", "W", "T", "F", "S"],
      monthArray: [
        { id: 0, month: "January", isCurrentMonth: false },
        { id: 1, month: "February", isCurrentMonth: false },
        { id: 2, month: "March", isCurrentMonth: false },
        { id: 3, month: "April", isCurrentMonth: false },
        { id: 4, month: "May", isCurrentMonth: false },
        { id: 5, month: "June", isCurrentMonth: false },
        { id: 6, month: "July", isCurrentMonth: false },
        { id: 7, month: "August", isCurrentMonth: false },
        { id: 8, month: "September", isCurrentMonth: false },
        { id: 9, month: "October", isCurrentMonth: false },
        { id: 10, month: "November", isCurrentMonth: false },
        { id: 11, month: "December", isCurrentMonth: false },
      ],
      monthChangeCount: 0,
      yearChangeCount: 0,
      timeSelectorOpen: false,
      singleDayViewOpen: false,
      singleDayChosen: undefined,
      masterMonth: undefined,
      masterYear: undefined,
    };
  },
  emits: ["selectedDate", "currentMonth", "send-date"],
  created: function () {
    this.masterMonth = this.INITIAL_MONTH + this.yearChangeCount;
    this.masterYear = this.INITIAL_YEAR;
    this.sendCurrentTimeUp();
  },
  methods: {
    sendCurrentTimeUp() {
      let monthDate = new Date();
      monthDate.setMonth(this.masterMonth - 1, 1);
      monthDate.setYear(this.masterYear);
      this.$emit("send-date", monthDate);
    },
    openDateUtility(day) {
      this.hoverDate = day;
    },
    markAvailable(date) {
      let payload = {
        type: "availability",
        date: date,
        employeeId: this.employee.id,
      };
      this.$store.dispatch("changeEmployeeAvailability", payload);
    },
    markUnavailable(date) {
      let payload = {
        type: "unavailability",
        date: date,
        employeeId: this.employee.id,
      };
      this.$store.dispatch("changeEmployeeAvailability", payload);
    },
    toggleMonthSelector() {
      this.timeSelectorOpen = !this.timeSelectorOpen;
    },
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
      this.sendCurrentTimeUp();
    },
    newMonthSelected(id) {
      this.monthChangeCount = 0;
      this.masterMonth = id + 1;
      this.toggleMonthSelector();
      this.sendCurrentTimeUp();
    },
    newYearSelected(year) {
      this.yearChangeCount = 0;
      this.masterYear = year;
      this.sendCurrentTimeUp();
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
      return this.monthArray[this.masterMonth - 1].month;
    },
    events() {
      return this.$store.state.events.filter((event) => {
        return (
          new Date(event.data.date).getMonth() === this.masterMonth - 1 ||
          new Date(event.data.date).getYear() === this.masterYear
        );
      });
    },
    daysWithEvents() {
      return this.events.map((a) => a.data.date.toISOString().split("T")[0]);
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
        if (this.daysWithEvents.includes(day.date)) {
          day.hasEvents = true;
        } else {
          day.hasEvents = false;
        }
        if (
          this.employee.availabilityRules.dayOfWeek[day.UTC.getDay()] ||
          this.employee.availabilityRules.months[day.UTC.getMonth()]
        ) {
          day.unavailable = true;
        } else {
          day.unavailable = false;
        }
        if (this.employee.availabilityRules.dateRanges.length) {
          this.employee.availabilityRules.dateRanges.forEach((range) => {
            let start = range.start.getTime();
            let end = range.end.getTime();
            let check = new Date(day.UTC);
            if (start < check && check < end) {
              day.unavailable = true;
            } else {
              return;
            }
          });
        }
        // if () {
        //   return;
        // }
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
  components: { TimeSelector },
  props: ["employee"],
};
</script>


<style scoped>
h3 {
  font-size: 8pt;
}

img {
  height: 14px;
  width: 14px;
}

#base-container {
  width: 55%;
  height: 100%;
  flex-direction: column;
  justify-content: space-around;
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

.day {
  position: relative;
  z-index: 2;
}

.hover-date {
  position: absolute;
  top: -100px;
  display: flex;
  min-width: 60px;
  flex-direction: column;
  background-color: var(--foregroundcolor);
  border: 1px solid var(--cardoutline);
  border-radius: 5px;
  padding: 30px;
  z-index: 100;
}

.hover-date > p {
  margin: 0px;
}

.hasEvents {
  color: var(--textcolor);
  background: radial-gradient(
    ellipse at center,
    var(--color) 0%,
    var(--color) 50%,
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
    var(--textcolor) 0%,
    var(--textcolor) 50%,
    rgba(0, 0, 0, 0) 53%
  );
}

.hover-date > p {
  font-weight: 400;
}
.hover-date > p:hover {
  font-weight: 600;
}
.hover-date > h5 {
  font-weight: 600;
  margin-bottom: 10px;
}

.availability-indicator {
  position: absolute;
  top: -10px;
  right: -10px;
  z-index: 1;
}

.availability-icon {
  height: 8px;
  width: 8px;
}

.today h4 {
  filter: invert(100%);
}
</style>