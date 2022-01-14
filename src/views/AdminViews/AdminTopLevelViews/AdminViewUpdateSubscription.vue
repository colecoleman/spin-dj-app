<template>
  <section>
    <img src="../../../assets/spin-beta-logo.png" alt="" />
    <h1>There seems to be an issue with your subscription.</h1>
    <button-standard-with-icon
      text="Manage Subscription In Stripe"
      @click="createPortal"
    >
    </button-standard-with-icon>
  </section>
</template>
<script>
import ButtonStandardWithIcon from "../../../SharedComponents/SharedComponentsUI/ButtonStandardWithIcon.vue";
export default {
  data() {
    return {};
  },
  methods: {
    createPortal() {
      this.$store.dispatch("stripeCreatePortal").then((res) => {
        window.location.href = res.data.url;
      });
    },
  },
  created() {},
  components: { ButtonStandardWithIcon },
  props: [],
};
</script>
<style scoped>
section {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
