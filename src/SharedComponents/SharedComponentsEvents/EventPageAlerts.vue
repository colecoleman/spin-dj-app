<template>
  <base-card :icon="SVGs.NotificationBellSVG">
    <template v-slot:title>Alerts</template>
    <template v-slot:content>
      <div class="scroll-container">
        <div v-for="(alert, index) in alerts" :key="index" class="alert-item">
          <h4 class="alert-icon">
            <img
              :src="SVGs.ExclamationSVG"
              alt=""
              :class="alert.urgency + '-alert-icon'"
            />
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
import SVGs from "../../assets/SVGs/svgIndex.js";
export default {
  data() {
    return {
      SVGs,
    };
  },
  methods: {},
  components: {},
  props: ["alerts"],
};
</script>
<style scoped>
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

img {
  height: 20px;
  margin: 10px;
}

.high-alert-icon {
  filter: invert(11%) sepia(100%) saturate(6967%) hue-rotate(359deg)
    brightness(100%) contrast(107%);
}

.medium-alert-icon {
  filter: invert(57%) sepia(87%) saturate(664%) hue-rotate(359deg)
    brightness(102%) contrast(106%);
}
.low-alert-icon {
  filter: invert(79%) sepia(100%) saturate(4834%) hue-rotate(357deg)
    brightness(102%) contrast(102%);
}
</style>