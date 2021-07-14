<template>
  <base-card>
    <template v-slot:icon>
      <svg width="14" height="14.667" viewBox="0 0 17 18.667">
        <g
          id="Group_517"
          data-name="Group 517"
          transform="translate(-519 -266)"
        >
          <path
            d="M6.167,6H17.833A1.643,1.643,0,0,1,19.5,7.619v11.33a1.643,1.643,0,0,1-1.667,1.619H6.167A1.643,1.643,0,0,1,4.5,18.948V7.619A1.643,1.643,0,0,1,6.167,6Z"
            transform="translate(515.5 263.1)"
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          />
          <path
            d="M24,3V7.2"
            transform="translate(506.833 264)"
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          />
          <path
            d="M12,3V7.2"
            transform="translate(512.167 264)"
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          />
          <path
            d="M4.5,15h15"
            transform="translate(515.5 261.167)"
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          />
        </g>
      </svg>
    </template>
    <template v-slot:action1>
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        v-if="singleDayViewOpen || timeSelectorOpen"
        @click="
          singleDayViewOpen
            ? (singleDayViewOpen = false)
            : '' || timeSelectorOpen
            ? (timeSelectorOpen = false)
            : ''
        "
      >
        <path
          data-name="Icon metro-cancel"
          d="M9.571,1.928a7,7,0,1,0,7,7,7,7,0,0,0-7-7Zm0,12.688a5.688,5.688,0,1,1,5.688-5.688,5.688,5.688,0,0,1-5.688,5.688Zm2.188-9.188L9.571,7.616,7.383,5.428,6.071,6.741,8.258,8.928,6.071,11.116l1.313,1.312,2.187-2.187,2.188,2.188,1.313-1.312L10.883,8.928l2.188-2.188Z"
          transform="translate(-2.571 -1.928)"
          fill="#fff"
        />
      </svg>
    </template>
    <template v-slot:title>Calendar</template>
    <template v-slot:content>
      <div id="base-container">
        <time-selector
          v-if="timeSelectorOpen && !singleDayViewOpen"
          :months="monthArray"
          :chosen-month="displayedMonth"
          :chosen-year="masterYear"
          :initial-year="INITIAL_YEAR"
          @toggle-month-selector="toggleMonthSelector"
          @select-month="newMonthSelected"
          @select-year="newYearSelected"
        ></time-selector>
        <single-day-view
          v-if="singleDayViewOpen && !timeSelectorOpen"
          :date="singleDayChosen"
          :events="events"
        ></single-day-view>
        <div
          id="calendar-container"
          v-if="!timeSelectorOpen && !singleDayViewOpen"
        >
          <div class="month-heading" @click="toggleMonthSelector">
            <div id="text">
              <h4>{{ `${displayedMonth + ", "}` }} {{ masterYear }}</h4>
              <svg width="15" height="13.503" viewBox="0 0 22.55 13.503">
                <path
                  d="M17.467,20.679l8.526-8.937a1.554,1.554,0,0,1,2.276,0,1.76,1.76,0,0,1,0,2.391L18.608,24.258a1.557,1.557,0,0,1-2.222.049L6.657,14.14a1.755,1.755,0,0,1,0-2.391,1.554,1.554,0,0,1,2.276,0Z"
                  transform="translate(-6.188 -11.246)"
                  fill="#fff"
                />
              </svg>
            </div>
          </div>
          <div id="body">
            <div
              class="side-arrows"
              @click="monthChange(`backward`)"
              @mousedown.prevent=""
            >
              <svg width="11.69" height="15" viewBox="0 0 11.69 23.616">
                <path
                  d="M11.813,8.166,20.742.429a1.869,1.869,0,0,1,2.384,0,1.337,1.337,0,0,1,0,2.07L13.008,11.265a1.878,1.878,0,0,1-2.327.043L.492,2.5A1.367,1.367,0,0,1,0,1.47,1.367,1.367,0,0,1,.492.435a1.869,1.869,0,0,1,2.384,0Z"
                  transform="translate(11.69) rotate(90)"
                  fill="#fff"
                />
              </svg>
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
              <svg width="11.69" height="15" viewBox="0 0 11.69 23.616">
                <path
                  id="Icon_ionic-ios-arrow-down"
                  d="M11.813,8.166,20.742.429a1.869,1.869,0,0,1,2.384,0,1.337,1.337,0,0,1,0,2.07L13.008,11.265a1.878,1.878,0,0,1-2.327.043L.492,2.5A1.367,1.367,0,0,1,0,1.47,1.367,1.367,0,0,1,.492.435a1.869,1.869,0,0,1,2.384,0Z"
                  transform="translate(0 23.616) rotate(-90)"
                  fill="#fff"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </template>
  </base-card>
</template>

<script>
import dayjs from "dayjs";
import TimeSelector from "./TimeSelector.vue";
import SingleDayView from "./SingleDayView/SingleDayView.vue";
import BaseCard from "../UI/BaseCard.vue";

export default {
  data() {
    return {
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
  created: function () {
    this.masterMonth = this.INITIAL_MONTH + this.yearChangeCount;
    this.masterYear = this.INITIAL_YEAR;
  },
  methods: {
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
        return event.eventStartTime.getMonth() === this.masterMonth - 1;
      });
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
  components: { TimeSelector, SingleDayView, BaseCard },
};
</script>


<style scoped>
h4 {
  font-size: 10pt;
}

#base-container {
  width: 100%;
  height: 100%;
  /* display: flex; */
  flex-direction: column;
  justify-content: space-around;
  /* align-items: center; */
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
  font-family: montserrat, sans-serif;
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
  opacity: 1;
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
  color: black;
  background: radial-gradient(ellipse at center, aqua 0%, aqua 50%, black 53%);
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
    white 0%,
    white 50%,
    black 53%
  );
  color: black;
}
</style>