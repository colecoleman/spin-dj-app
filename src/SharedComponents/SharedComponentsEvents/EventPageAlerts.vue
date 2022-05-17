<template>
  <base-card svg="notification-bell" :title="`Alerts (${alerts.length})`">
    <template v-slot:content>
      <div class="scroll-container">
        <div v-for="(alert, index) in alerts" :key="index" class="alert-item">
          <h4 :class="alert.urgency + '-alert-icon'">
            <vue-svg svg="exclamation-mark" class="svg" />
          </h4>
          <h4>
            {{ alert.text }}
          </h4>
        </div>
      </div>
    </template>
    <template></template>
  </base-card>
</template>
<script>
import VueSvg from "../../assets/VueSvg.vue";

export default {
  data() {
    return {};
  },
  methods: {},
  components: { VueSvg },
  props: ["alerts"],
};
</script>
<style scoped>
.svg {
  width: 14px;
  height: 14px;
  margin: 5px;
}
.scroll-container {
  overflow: scroll;
  height: 100%;
}

.alert-item {
  text-align: left;
  display: flex;
  flex-direction: row;
  /* justify-content: center; */
  align-items: center;
}

.high-alert-icon {
  color: red;
}

.medium-alert-icon {
  color: yellow;
}
.low-alert-icon {
  color: green;
}
</style>