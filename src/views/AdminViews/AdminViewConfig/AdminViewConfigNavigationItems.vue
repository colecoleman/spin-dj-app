<template>
  <ul>
    <li
      v-for="(value, name) in configItems"
      :key="value"
      @click="scroll(`${name + '-card'}`)"
      :class="activeLink === `${name + '-card'}` ? 'active-link' : ' '"
      :style="{ color: brandingPreferences.textColor }"
    >
      {{ value.name }}
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      configItems: [
        {
          name: "Branding",
        },
        {
          name: "Information",
        },
        {
          name: "Services",
        },
        {
          name: "Packages",
        },
        {
          name: "Add-Ons",
        },
        {
          name: "Discounts",
        },
        // {
        //   name: "Equipment",
        // },
        {
          name: "Automations",
        },
        {
          name: "To-Dos",
        },
        // {
        //   name: "Payments",
        // },
        // {
        //   name: "Reports",
        // },
      ],
    };
  },
  computed: {
    brandingPreferences() {
      return this.$store.state.businessSettings.brandingPreferences;
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

<style>
ul {
  /* color: white; */
  text-align: right;
  height: 90%;
  width: 100%;
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
  /* color: #00f5ff; */
}
</style>