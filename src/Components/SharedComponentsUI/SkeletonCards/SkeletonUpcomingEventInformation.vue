<template>
  <div class="event-metadata-identifier">
    <p class="date-and-time skeleton"></p>
    <p class="date-and-time skeleton"></p>
    <p class="invoice-data skeleton"></p>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {},
  created() {},
  components: {},
  props: [],
};
</script>
<style scoped>
.skeleton {
  background-color: var(--textColor);
  width: 100px;
  height: 9px;
  border-radius: 3px;
}

.event-location-identifier,
.date-and-time-identitfier {
  flex-direction: column;
  align-items: center;
}

.event-metadata-identifier {
  flex-direction: column;
  align-items: flex-end;
}

.date-and-time {
  margin: 5px 0px;
}
</style>