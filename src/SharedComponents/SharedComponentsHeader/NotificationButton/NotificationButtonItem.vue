<template>
  <div class="notification-item">
    <div class="read-indentifier"><img :src="fillableCircle" alt="" /></div>
    <div>
      <h5>{{ notification.title }}</h5>
      <p>{{ notification.body }}</p>
      <p class="date">
        {{
          `${
            formatDate(notification.date) + " " + formatTime(notification.date)
          }`
        }}
      </p>
    </div>
  </div>
</template>

<script>
import fillableCircle from "../../../assets/SVGs/fillable-circle.svg";
import helpers from "../../../helpers.js";

export default {
  data() {
    return {
      fillableCircle,
    };
  },
  methods: {
    formatDate: helpers.formatDate,
    formatTime: helpers.formatTime,
  },
  props: ["notification"],
};
</script>

<style scoped>
h5,
p {
  text-align: left;
  margin: 5px;
}

h5 {
  font-weight: 600;
}

.date {
  text-align: right;
}

.notification-item {
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
}
img {
  height: 6px;
  width: 6px;
  color: aqua;
}
</style>