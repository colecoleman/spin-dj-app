<template>
  <div class="information-hover-wrapper">
    <base-card>
      <template v-slot:title>{{ heading }}</template>
      <template v-slot:content
        ><p>{{ body }}</p></template
      >
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
  top: 0;
}
</style>