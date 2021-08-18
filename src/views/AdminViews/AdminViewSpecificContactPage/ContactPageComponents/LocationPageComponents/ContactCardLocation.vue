<template>
  <base-card :icon="icon">
    <template v-slot:title>Location</template>
    <template v-slot:content>
      <div class="address-container">
        <h4>{{ location.name }}</h4>
        <p>{{ location.address.address1 }}</p>
        <p>{{ location.address.address2 }}</p>
      </div>
    </template>
  </base-card>
</template>

<script>
export default {
  props: ["icon", "location"],
};
</script>

<style scoped>
.address-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

p {
  margin: 5px;
}

h4 {
  margin-bottom: 10px;
}
</style>