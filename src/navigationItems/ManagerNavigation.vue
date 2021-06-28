<template>
  <ul>
    <li>
      <router-link to="/events">Events</router-link>
    </li>
    <li>
      <router-link to="/sales">Sales</router-link>
    </li>
  </ul>
</template>

<script>
export default {};
</script>

<style scoped>
ul {
  color: white;
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
  font-family: Montserrat, arial, sans-serif;
  font-weight: 600;
}

a {
  font-family: Montserrat, Helvetica, sans-serif;
  text-decoration: none;
  color: white;
  font-weight: 700;
}

.active-link {
  color: #00f5ff;
}
</style>