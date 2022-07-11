<template>
  <div class="countdown-clock">
    <div class="time-item">
      <h3 class="number">{{ days.display }}</h3>
      <!-- <h3 class="category">days</h3> -->
    </div>
    <div class="time-item"><h3 class="number">:</h3></div>
    <div class="time-item">
      <h3 class="number">{{ hours.display }}</h3>
      <!-- <h3 class="category">hours</h3> -->
    </div>
    <div class="time-item"><h3 class="number">:</h3></div>

    <div class="time-item">
      <h3 class="number">{{ minutes.display }}</h3>
      <!-- <h3 class="category">minutes</h3> -->
    </div>
    <div class="time-item"><h3 class="number">:</h3></div>

    <div class="time-item">
      <h3 class="number">{{ seconds.display }}</h3>
      <!-- <h3 class="category">seconds</h3> -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentDate: 0,
    };
  },
  computed: {
    days() {
      return {
        raw: (this.date - this.currentDate) / 60 / 60 / 24 / 1000,
        display: Math.floor(
          (this.date - this.currentDate) / 60 / 60 / 24 / 1000
        ),
      };
    },
    hours() {
      return {
        raw: (this.days.raw - this.days.display) * 24,
        display: Math.floor(
          (this.days.raw - this.days.display) * 24
        ).toLocaleString("lookup", {
          minimumIntegerDigits: 2,
        }),
      };
    },
    minutes() {
      return {
        raw: (this.hours.raw - this.hours.display) * 60,
        display: Math.floor(
          (this.hours.raw - this.hours.display) * 60
        ).toLocaleString("lookup", {
          minimumIntegerDigits: 2,
        }),
      };
    },
    seconds() {
      return {
        raw: (this.minutes.raw - this.minutes.display) * 60,
        display: Math.floor(
          (this.minutes.raw - this.minutes.display) * 60
        ).toLocaleString("lookup", {
          minimumIntegerDigits: 2,
        }),
      };
    },
  },
  methods: {},
  created() {
    this.currentDate = new Date();
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  },
  components: {},
  props: ["date"],
};
</script>
<style scoped>
.countdown-clock {
  display: flex;
  justify-content: space-evenly;
  padding: 15px;
}

.number {
  font-size: 25pt;
  margin: 7px;
  color: #494949;
}

.category {
  font-size: 20pt;
}
@media screen and (min-width: 500px) {
  .countdown-clock {
    padding: 20px;
  }

  .number {
    font-size: 35pt;
    margin: 10px;
  }
}
@media screen and (min-width: 600px) {
  .countdown-clock {
    padding: 20px;
  }

  .number {
    /* font-size: pt; */
    margin: 10px;
  }
}
@media screen and (min-width: 700px) {
  .countdown-clock {
    padding: 20px;
  }

  .number {
    /* font-size: 40pt; */
    margin: 10px;
  }
}
@media screen and (min-width: 800px) {
  .countdown-clock {
    padding: 20px;
  }

  .number {
    /* font-size: 40pt; */
    margin: 10px;
  }
}
</style>
