<template>
  <div id="matching-event-list-item">
    <div>
      <p>{{ firstName }} {{ lastName }}</p>
    </div>
    <div>
      <p>{{ eventDate }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["firstName", "lastName", "eventDate"],
};
</script>

<style scoped>
#matching-event-list-item {
  height: 42.5px;
  display: flex;
  flex-direction: row;
  border-bottom: 0.5px solid white;
  cursor: pointer;
}

#matching-event-list-item p {
  font-size: 10pt;
}
#matching-event-list-item div {
  flex: 1;
}
</style>