<template>
  <ul>
    <li>
      <router-link to="admin/dashboard">Events</router-link>
    </li>
    <li>
      <router-link to="admin/sales">Sales</router-link>
    </li>
  </ul>
</template>

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