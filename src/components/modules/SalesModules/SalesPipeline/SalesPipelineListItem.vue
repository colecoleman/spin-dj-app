<template>
  <div class="pipeline-item">
    <div class="pipeline-item-left">
      <p>{{ emailAddress }}</p>
      <p>{{ phoneNumber }}</p>
    </div>
    <div class="pipeline-item-center">
      <h4>{{ name }}</h4>
      <p>{{ status }}</p>
      <p>Value: ${{ value.toLocaleString() }}</p>
    </div>
    <div class="pipeline-item-right">
      <p>Last contact: {{ lastContactDate }}</p>
      <p>
        <i>{{ lastContactType }}</i>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "name",
    "status",
    "value",
    "emailAddress",
    "phoneNumber",
    "lastContactDate",
    "lastContactType",
  ],
};
</script>

<style scoped>
.pipeline-item {
  width: 95%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  position: relative;
  margin: 10px 15px 30px 15px;
}

.pipeline-item p {
  font-size: 9pt;
  width: 100%;
  margin: 0;
}

.pipeline-item h3 {
  text-transform: uppercase;
}

.pipeline-item-left {
  text-align: left;
  align-self: flex-end;
}
.pipeline-item-right {
  text-align: right;
  align-self: flex-end;
}
</style>