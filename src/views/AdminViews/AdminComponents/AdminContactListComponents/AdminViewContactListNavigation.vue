<template>
  <ul>
    <li
      v-for="(value, name) in contacts"
      :key="name"
      @click="scroll(`${name + '-card'}`)"
      :class="activeLink === `${name + '-card'}` ? 'active-link' : ' '"
    >
      {{ name }}
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      activeLink: "clients-card",
    };
  },
  computed: {
    contacts() {
      return this.$store.state.contacts;
    },
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
