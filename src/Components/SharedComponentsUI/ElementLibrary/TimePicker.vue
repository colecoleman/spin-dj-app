<template>
  <div id="time-picker-wrapper">
    <div id="pickers">
      <div class="hour-picker">
        <div class="scroll-container">
          <h5
            v-for="num in 12"
            :key="num"
            :class="{ currentSelection: checkForHour(num) }"
            :id="'hour-' + num"
            @click="selectHour(num)"
          >
            {{ num }}
          </h5>
        </div>
      </div>
      <div class="minute-picker">
        <h5
          :class="{ currentSelection: checkForMinute((num - 1) * 15) }"
          v-for="num in 4"
          :key="num"
          @click="selectMinute((num - 1) * 15)"
        >
          {{ num === 1 ? "00" : (num - 1) * 15 }}
        </h5>
      </div>
      <div class="period-picker">
        <h5
          :class="{ currentSelection: checkForPeriod(val) }"
          v-for="val in ['AM', 'PM']"
          :key="val"
          @click="selectPeriod(val)"
        >
          {{ val }}
        </h5>
      </div>
    </div>
    ,
    <div class="button-container">
      <button-standard-with-icon
        class="cancel-button button"
        text="Cancel"
        @click="close"
        :processing="processing"
      />
      <button-standard-with-icon
        class="save-button button"
        text="Save"
        :processing="processing"
        @click="save"
      />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      minuteOptions: ["00", "15", "30", "45"],
      hour: 3,
      minute: 30,
      period: "AM",
    };
  },
  computed: {},
  methods: {
    checkForHour(num) {
      return this.hour === num;
    },
    checkForMinute(num) {
      return this.minute === num;
    },
    checkForPeriod(val) {
      return val === this.period;
    },
    selectHour(num) {
      this.hour = num;
    },
    selectMinute(num) {
      this.minute = num;
    },
    selectPeriod(val) {
      this.period = val;
    },
    save() {
      let time;
      if (this.time) {
        time = new Date(this.time);
      } else {
        time = new Date();
      }
      if (this.period === "PM") {
        time.setHours(this.hour + 12);
      } else {
        time.setHours(this.hour);
      }
      time.setMinutes(this.minute);
      this.$emit("save-time", time);
    },
    close() {
      this.$emit("close");
    },
  },
  created() {
    console.log(this.time);
    let time;
    if (this.time) {
      time = new Date(this.time);
    } else {
      time = new Date();
    }
    this.hour = time.getHours() % 12;
    this.minute = time.getMinutes();
    console.log(time.getMinutes());
    if (time.getHours() > 12) {
      this.period = "PM";
    } else {
      this.period = "AM";
    }
    setTimeout(() => {
      let element = document.getElementById("hour-" + this.hour);
      element.scrollIntoView({ behavior: "smooth" });
    }, 500);
  },
  components: {},
  props: ["date", "time", "processing"],
  emits: ["close", "save-time"],
};
</script>
<style scoped>
#time-picker-wrapper {
  background-color: var(--foregroundColor);
  filter: drop-shadow(0px 4px 3px var(--cardOutline));
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 300px;
  height: fit-content;
  top: 10%;
  left: calc(50% - 165px);
  padding: 15px;
  z-index: 101;
}

#pickers {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.hour-picker,
.minute-picker,
.period-picker {
  background-color: var(--foregroundColor);
  filter: drop-shadow(0px 1px 3px var(--cardOutline));
  border-radius: 10px;
  overflow: hidden;
  width: 60px;
  margin: 5px;
}

.hour-picker {
  position: relative;
  max-height: 160px;
}

.minute-picker {
  max-height: 160px;
}

.period-picker {
  max-height: 80px;
}

.scroll-container {
  scroll-snap-type: y mandatory;
  overflow: scroll;
  max-height: inherit;
}

h5 {
  scroll-snap-align: start;
  height: 40px;
  margin: 0;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.currentSelection {
  background-color: var(--textColor);
  color: var(--foregroundColor);
  border-radius: 10px;
}

.frosted-cover {
  height: 40px;
  width: 60px;
  position: absolute;
}

.upper-cover {
  top: 0;
  background-image: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 0)
  );
}

.lower-cover {
  bottom: 0;
  background-image: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 0)
  );
}

.button-container {
  display: flex;
}

.button {
  margin: 4px;
}

.save-button {
  background-color: var(--textColor);
  color: var(--foregroundColor);
}
</style>