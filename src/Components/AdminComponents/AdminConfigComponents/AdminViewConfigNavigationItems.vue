<template>
  <ul>
    <li
      v-for="(config, index) in items"
      :key="index"
      @click="scroll(config)"
      :class="activeLink === config ? 'active-link' : ' '"
    >
      {{ config }}
    </li>
    <li @click="manageSubscription">Subscription</li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      activeLink: "Identity",
    };
  },
  methods: {
    scroll(id) {
      document.getElementById(id).scrollIntoView({
        behavior: "smooth",
      });
      this.activeLink = id;
    },
    manageSubscription() {
      this.$store.dispatch("stripeCreatePortal").then((res) => {
        window.location.href = res.data.url;
      });
    },
  },
  props: ["items"],
};
</script>

<style scoped>
ul {
  text-align: right;
}

li {
  line-height: 3.25;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--secondaryTextColor);
}

li:hover {
  color: var(--highlightColor);
  cursor: pointer;
}

.active-link {
  color: var(--highlightColor);
}
</style>
