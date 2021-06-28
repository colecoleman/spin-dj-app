<template>
  <base-card>
    <h1>General Settings</h1>
    <h3>Business Settings</h3>
    <div>
      <h5>Business Logo</h5>
    </div>
  </base-card>
</template>

<script>
import BaseCard from "../UI/BaseCard.vue";
export default {
  components: {
    BaseCard,
  },
};
</script>

<style scoped>
h3 {
  text-align: left;
  width: 85%;
  justify-self: center;
  border-bottom: 1px solid white;
  line-height: 1.5em;
}

h5 {
  text-align: left;
  margin-left: 15px;
}
</style>