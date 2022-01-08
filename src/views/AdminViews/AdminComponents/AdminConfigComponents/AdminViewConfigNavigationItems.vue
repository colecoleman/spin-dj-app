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
}

.active-link {
  color: #00f5ff;
}
</style>