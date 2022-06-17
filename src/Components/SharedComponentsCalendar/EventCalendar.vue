<template>
  <base-card
    svg="calendar"
    actionIcon="day"
    :title="`${
      monthArray[viewedMonth.getMonth()]
    }, ${viewedMonth.getFullYear()}`"
    @action-one-clicked="toggleFloatingMenu"
  >
    <template v-slot:dropdownContainer>
      <dual-side-floating-menu-with-list-items
        class="right-title-parent"
        :actions="floatingIconActions"
        :currentLeftSelection="year"
        :currentRightSelection="month"
        v-if="floatingMenuOpen"
        @actionsClicked="newTimeframeSelected"
      />
    </template>
    <template v-slot:content v-if="events">
      <div id="calendar-container">
        <round-icon-button
          class="left-side-arrow arrow"
          @click="monthChange(`backward`)"
          svg="left-arrow"
        />
        <div id="main-calendar-content">
          <div v-for="(day, index) in WEEKDAYS" class="weekday" :key="index">
            {{ day }}
          </div>
          <div
            v-for="(day, index) in days"
            :key="index"
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
        <round-icon-button
          class="right-side-arrow arrow"
          svg="right-arrow"
          @click="monthChange(`forward`)"
        />
      </div>
    </template>
  </base-card>
</template>

<script>
import RoundIconButton from "../SharedComponentsUI/RoundIconButton.vue";
import DualSideFloatingMenuWithListItems from "../SharedComponentsUI/DualSideFloatingMenuWithListItems.vue";
import {
  nextMonthDays,
  previousMonthDays,
  currentMonthDays,
} from "../../calendarFunctions.js";

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
      floatingMenuOpen: false,
      singleDayChosen: undefined,
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
    };
  },

  methods: {
    toggleFloatingMenu() {
      this.floatingMenuOpen = !this.floatingMenuOpen;
    },
    monthChange(direction) {
      if (direction == `forward`) {
        this.month++;
      }
      if (direction == `backward`) {
        this.month--;
      }
    },
    newTimeframeSelected(selections) {
      if (selections.left !== undefined) {
        this.year = selections.left;
      }
      if (selections.right !== undefined) {
        this.month = selections.right;
      }
      this.floatingMenuOpen = false;
    },
  },
  computed: {
    viewedMonth() {
      return new Date(this.year, this.month);
    },
    surroundingYears() {
      let array = [];
      for (
        let temporaryYear = this.year - 3;
        temporaryYear < this.year + 7;
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
    currentMonthDays() {
      let eventDays = this.daysWithEvents;
      return currentMonthDays(this.viewedMonth).map((x) => {
        return {
          ...x,
          get hasEvents() {
            return eventDays.some((x) => {
              return x.toDateString() == this.date.toDateString();
            });
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
  emits: ["actionsClicked"],
  props: ["events"],
  components: {
    DualSideFloatingMenuWithListItems,
    RoundIconButton,
  },
};
</script>

<style scoped>
#calendar-container {
  height: 100%;
  width: 100%;
  color: var(--textColor);
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-template-rows: 1;
}
#main-calendar-content {
  height: 100%;
  grid-column: 2/9;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(auto-fill, 1fr);
  height: 100%;
  width: 100%;
  grid-row: 2/9;
  cursor: default;
  display: grid;
}

#main-calendar-content div {
  flex: 1;
  font-size: 12px;
  font-weight: 700;
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
  margin: auto;
  grid-row: 1/9;
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

.svg {
  height: 14px;
  margin: auto;
}
</style>
