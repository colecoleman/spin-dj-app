<template>
  <div>
    <input type="text" placeholder="Search..." />
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
div {
  background-color: black;
  border-radius: 25px;
  height: 100%;
  width: 100%;
  margin-left: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
input {
  width: 90%;
  background: none;
  border: none;
  font-family: montserrat, sans-serif;
  font-weight: 600;
  font-size: 1em;
  opacity: 1;
}
input:focus {
  outline: none;
  color: white;
}

input::placeholder {
  opacity: 1;
}
</style>