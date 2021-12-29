<template>
  <ul>
    <li
      v-for="(name, index) in configItems"
      :key="index"
      @click="scroll(name.toLowerCase())"
      :class="activeLink === name.toLowerCase() ? 'active-link' : ' '"
    >
      {{ name }}
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      activeLink: "Identity",
      configItems: [
        "Identity",
        "Services",
        "Packages",
        "Add-Ons",
        "Discounts",
        "Forms",
        "Contracts",
        "Automations",
        "Payments",
      ],
    };
  },
  methods: {
    scroll(id) {
      document.getElementById(id).scrollIntoView({
        behavior: "smooth",
      });
      this.activeLink = id;
    },
  },
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
}

.active-link {
  color: #00f5ff;
}
</style>