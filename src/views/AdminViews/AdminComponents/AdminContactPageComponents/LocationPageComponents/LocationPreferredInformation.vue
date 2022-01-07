<template>
  <base-card :icon="referCircle" title="Preferred">
    <template v-slot:title>Preferred</template>
    <template v-slot:content>
      <div id="preferred-information">
        <h4>Status:</h4>
        <p>PREFERRED</p>
        <h4>Agreement:</h4>
        <p>10% Referral Bonus</p>
      </div>
    </template>
  </base-card>
</template>

<script>
import referCircle from "../../../../../assets/SVGs/refer-circle.svg";
export default {
  data() {
    return {
      referCircle,
    };
  },
};
</script>

<style scoped>
#preferred-information {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  justify-items: center;
  align-content: space-around;
}
</style>