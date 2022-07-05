
<script>
export default {
  async created() {
    this.$store.dispatch("stripeCreatePortal").then((res) => {
      window.location.href = res.data.url;
    });
  },
};
</script>
