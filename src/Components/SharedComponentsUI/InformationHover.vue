<template>
  <div class="information-hover-wrapper" :title="heading">
    <base-card>
      <template v-slot:content><p v-html="body"></p></template>
    </base-card>
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
  props: ["body", "heading"],
};
</script>
<style scoped>
.information-hover-wrapper {
  width: 300px;
  height: fit-content;
  position: absolute;
  z-index: 7;
  top: 0;
}
p {
  text-align: left;
}
</style>