<template>
  <base-card
    :svg="icon"
    actionIcon="edit-pen"
    @action-one-clicked="toggleEditCard()"
    title="Location"
  >
    <template v-slot:content v-if="location">
      <div class="address-container">
        <h4>{{ location.name }}</h4>
        <p>{{ location.address.streetAddress1 }}</p>
        <p>{{ location.address.cityStateZip }}</p>
      </div>
    </template>
  </base-card>
</template>

<script>
export default {
  methods: {
    toggleEditCard() {
      this.$emit("edit-card-clicked");
    },
  },
  props: ["icon", "location"],
  emits: ["edit-card-clicked"],
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