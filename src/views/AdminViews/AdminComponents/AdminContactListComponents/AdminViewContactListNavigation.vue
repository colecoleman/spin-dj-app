<template>
  <ul>
    <li
      v-for="(value, name) in contacts"
      :key="name"
      @click="scroll(`${value + '-card'}`)"
      :class="activeLink === `${value + '-card'}` ? 'active-link' : ' '"
    >
      {{ value }}
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      activeLink: "clients-card",
      contacts: [
        "clients",
        "employees",
        "locations",
        "organizers",
        "vendors",
        "uncategorized",
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
