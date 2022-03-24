<template>
  <base-card
    svg="calendar"
    actionIcon=""
    :actionText="`${monthArray[masterMonth]}, ${masterYear}`"
    v-if="!singleDayViewOpen"
    title="calendar"
    @action-one-clicked="floatingMenuOpen = !floatingMenuOpen"
  >
    <template v-slot:dropdownContainer>
      <div class="right-title-parent">
        <dual-side-floating-menu-with-list-items
          :actions="floatingIconActions"
          :currentLeftSelection="masterYear"
          :currentRightSelection="masterMonth"
          v-if="floatingMenuOpen"
          @actionsClicked="newTimeframeSelected"
        />
      </div>
    </template>
    <template v-slot:content v-if="events">
      <div id="calendar-container" v-if="!singleDayViewOpen">
        <div id="body">
          <div
            class="left-side-arrow arrow"
            @click="monthChange(`backward`)"
            @mousedown.prevent=""
          >
            <vue-svg svg="left-arrow" />
          </div>
          <div id="main-calendar-content">
            <div id="days">
              <div v-for="day in WEEKDAYS" class="weekday" :key="day.key">
                {{ day.identifier }}
              </div>
              <div
                v-for="day in days"
                :key="day.date"
                :class="{
                  day,
                  isNotCurrentMonth: !day.isCurrentMonth,
                  today: day.isCurrentDay,
                  hasEvents: day.hasEvents,
                }"
              >
                <p>{{ day.dayOfMonth }}</p>
              </div>
            </div>
          </div>
          <div
            class="right-side-arrow arrow"
            @click="monthChange(`forward`)"
            @mousedown.prevent=""
          >
            <vue-svg svg="right-arrow" />
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
  />
</template>

<script>
import SingleDayView from "./SingleDayView/SingleDayView.vue";
import DualSideFloatingMenuWithListItems from "../SharedComponentsUI/DualSideFloatingMenuWithListItems.vue";
import VueSvg from "../../assets/VueSvg.vue";

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
      return new Date(year, month + 1, 0).getDate();
    },
    getWeekday(date) {
      return date.getDay();
    },
    monthChange(direction) {
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
    VueSvg,
    SingleDayView,
    DualSideFloatingMenuWithListItems,
  },
};
</script>

<style scoped>
#calendar-container {
  height: 100%;
  color: var(--textColor);
}

#body {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  height: 100%;
  width: 100%;
}

#main-calendar-content {
  grid-column: 2/9;
  height: 100%;
}

#days {
  width: 100%;
  height: 100%;
  display: grid;
  grid-row: 2/9;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(auto-fill, 1fr);
  cursor: default;
}

#days div {
  flex: 1;

  /* width: calc(250px / 7); */
  font-size: 12px;
  font-weight: 700;
  /* height: 35px; */
  /* width: 35px; */
  display: flex;
  align-items: center;
  justify-content: center;
}

.hasEvents {
  background: radial-gradient(
    circle at center,
    var(--highlightColor) 0%,
    var(--highlightColor) 40%,
    var(--textColor) 43%,
    rgba(0, 0, 0, 0) 44%
  );
  cursor: pointer;
}

.isNotCurrentMonth {
  opacity: 0.25;
}

#text > svg {
  cursor: pointer;
}

.left-side-arrow {
  grid-column: 1/2;
}

.right-side-arrow {
  grid-column: 9 /10;
}

.arrow {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.today {
  background: radial-gradient(
    circle at center,
    var(--textColor) 0%,
    var(--textColor) 43%,
    rgba(0, 0, 0, 0) 44%
  );
}

.today > * {
  filter: invert(100%);
}
</style>
