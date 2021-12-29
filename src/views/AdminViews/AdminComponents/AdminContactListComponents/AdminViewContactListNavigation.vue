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
  /* color: white; */
  text-align: right;
  height: 90%;
  padding: 0;
}

li {
  line-height: 3.25;
  width: 100%;
  text-transform: uppercase;
  font-size: 12pt;
  list-style: none;

  font-weight: 600;
}

a {
  text-decoration: none;
  /* color: white; */
  font-weight: 700;
}

.active-link {
  color: #00f5ff;
}
</style>