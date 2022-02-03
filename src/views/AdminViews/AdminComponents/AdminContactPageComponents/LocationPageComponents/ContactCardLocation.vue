<template>
  <base-card
    :icon="icon"
    :actionIcon="editPen"
    @action-one-clicked="toggleEditCard()"
    title="Location"
  >
    <template v-slot:dropdownContainer>
      <location-information-edit
        v-if="editCardOpen"
        :location="location"
        @close-edit-card="toggleEditCard()"
    /></template>
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
import editPen from "../../../../../assets/SVGs/edit-pen.svg";
import LocationInformationEdit from "./LocationInformationEdit.vue";
export default {
  data() {
    return {
      editPen,
      editCardOpen: false,
    };
  },
  methods: {
    toggleEditCard() {
      this.editCardOpen = !this.editCardOpen;
    },
  },
  props: ["icon", "location"],
  components: {
    LocationInformationEdit,
  },
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