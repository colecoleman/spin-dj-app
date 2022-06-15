<template>
  <list-item-style-wrapper class="track-wrapper" hoverable="true">
    <p class="track-name">{{ track["Name"] }}</p>
    <p class="track-artist">{{ track["Artist"] }}</p>
    <div class="track-time">
      <p>{{ trackTime }}</p>
      <round-icon-button
        svg="plus-sign"
        class="library-button"
        v-if="plusSign"
        @click="plusSignClicked"
      />
    </div>
  </list-item-style-wrapper>
</template>
<script>
import RoundIconButton from "../SharedComponentsUI/RoundIconButton.vue";
import ListItemStyleWrapper from "../SharedComponentsUI/ListItemStyleWrapper.vue";
export default {
  data() {
    return {};
  },
  computed: {
    trackTime() {
      let m = Math.floor(this.track["Total Time"] / 60000);
      let s = Math.floor((this.track["Total Time"] / 1000) % 60).toLocaleString(
        "en-US",
        { minimumIntegerDigits: 2 }
      );
      return `${m}:${s}`;
    },
  },
  methods: {
    plusSignClicked() {
      this.$emit("plus-sign-clicked");
    },
  },
  created() {},

  components: { ListItemStyleWrapper, RoundIconButton },
  props: ["track", "plusSign"],
  emits: ["plus-sign-clicked"],
};
</script>
<style scoped>
.track-wrapper {
  width: auto;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  max-height: 100px;
  overflow: scroll;
}

.library-button {
  margin-right: 0;
}

p {
  font-weight: 600;
}

.track-name {
  width: 30%;
  text-align: left;
  overflow: scroll;
}

.track-artist {
  width: 30%;
  text-align: center;
}

.track-time {
  width: 30%;
  text-align: right;
  justify-content: right;
  display: flex;
  align-items: center;
}
</style>