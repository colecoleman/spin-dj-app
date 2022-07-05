<template>
  <item-tile
    class="package-item"
    :style="photo ? `background-image: url(${photo})` : ''"
  >
    <div class="package-details">
      <p class="package-detail" v-for="(detail, index) in details" :key="index">
        {{ detail }}
      </p>
    </div>
    <p class="package-title">
      {{ title }}
    </p>
    <div class="package-buttons">
      <round-icon-button class="button" svg="x-icon" @click="xClicked" />
      <round-icon-button class="button" svg="edit-pen" @click="editClicked" />
    </div>
  </item-tile>
</template>
<script>
import ItemTile from "../../../SharedComponentsUI/ItemTile.vue";
import RoundIconButton from "../../../SharedComponentsUI/RoundIconButton.vue";
export default {
  data() {
    return {};
  },
  computed: {},
  methods: {
    xClicked() {
      this.$emit("delete");
    },
    editClicked() {
      this.$emit("edit");
    },
  },
  created() {},
  components: {
    ItemTile,
    RoundIconButton,
  },
  emits: ["delete", "edit"],
  props: ["title", "details", "photo"],
};
</script>
<style scoped>
.package-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  margin: 10px;
  background-size: cover;
}
.package-title {
  padding: 0 10px 10px 0;
  width: fit-content;
  max-width: 90%;
  margin: 0;
  text-align: right;
  text-transform: uppercase;
  font-size: 12pt;
  font-weight: 600;
  max-height: 50%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.package-item::before {
  content: "";
  background-color: var(--foregroundColor);
  position: absolute;
  opacity: 0.75;
  width: 100%;
  height: 100%;
  z-index: -1;
  border-radius: 5px;
}
.package-details {
  margin: 10px;
  /* background-color: var(--foregroundColor); */
}
.package-detail {
  margin: 0;
  width: 100%;
  text-align: left;
  font-weight: bold;
}

.package-buttons {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: -15px;
  right: -15px;
}

.button {
  /* margin-top: 0; */
  margin: 5px;
}
@media screen and (min-width: 800px) {
  .package-item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    margin: 10px;
    background-size: cover;
  }
  .package-title {
    padding: 0 10px 10px 0;
    width: fit-content;
    max-width: 90%;
    margin: 0;
    text-align: right;
    text-transform: uppercase;
    font-size: 15pt;
    font-weight: 600;
    max-height: 50%;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .package-item::before {
    content: "";
    background-color: var(--foregroundColor);
    position: absolute;
    opacity: 0.75;
    width: 100%;
    height: 100%;
    z-index: -1;
    border-radius: 5px;
  }
  .package-details {
    margin: 10px;
    /* background-color: var(--foregroundColor); */
  }
  .package-detail {
    margin: 0;
    width: 100%;
    text-align: left;
    font-weight: bold;
  }

  .package-buttons {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: -15px;
    right: -15px;
  }

  .button {
    /* margin-top: 0; */
    margin: 5px;
  }
}
</style>