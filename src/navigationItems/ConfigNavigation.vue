<template>
  <ul>
    <li>
      <router-link to="/packages">Packages</router-link>
    </li>
    <li>
      <router-link to="/services">Services</router-link>
    </li>
    <li>
      <router-link to="/addons">Add-Ons</router-link>
    </li>
    <li>
      <router-link to="/general">General</router-link>
    </li>
    <li>
      <router-link to="/equipment">Equipment</router-link>
    </li>
    <li>
      <router-link to="/dataimport">Import</router-link>
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