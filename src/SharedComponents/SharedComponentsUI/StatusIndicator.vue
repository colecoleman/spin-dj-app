<template>
  <div class="successes-wrapper" v-if="statuses.length > 0">
    <div
      :class="`status-item ${status.type}`"
      v-for="(status, index) in statuses"
      :key="index"
    >
      <p>
        {{ status.note }}
      </p>
      <vue-svg
        svg="x-icon"
        :customStyle="svgStyling"
        @clicked="clearStatus(index)"
      />
    </div>
  </div>
</template>

<script>
import VueSvg from "../../assets/VueSvg.vue";

export default {
  data() {
    return {
      svgStyling: "height: 10px; width: 10px; margin-left: 10px;",
    };
  },
  computed: {
    statuses() {
      return this.$store.state.statuses;
    },
  },
  methods: {
    clearStatus(index) {
      this.$store.commit("clearStatus", index);
    },
  },
  created() {
    for (let index = -1; index < this.statuses.length + 1; index++) {
      setTimeout(this.clearStatus, 3000, index);
    }
  },
  components: { VueSvg },
};
</script>

<style scoped>
.successes-wrapper {
  position: fixed;
  bottom: 10px;
  right: 10px;
  height: fit-content;
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  color: black;
}
.success {
  background-color: rgb(64, 230, 72);
}

.error {
  background-color: rgb(255, 80, 80);
}
.status-item {
  border-radius: 10px;
  padding: 0 10px;
  margin-top: 3px;
  width: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}

p {
  text-transform: capitalize;
  font-size: 10pt;
}
</style>