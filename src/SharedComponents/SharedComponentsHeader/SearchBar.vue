<template>
  <div id="search-bar-container">
    <input type="text" placeholder="Search..." />
  </div>
</template>

<style scoped>
#search-bar-container {
  background-color: var(--foregroundColor);
  border: 1px solid var(--cardOutline);
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
  color: var(--textcolor);
  background: none;
  border: none;
  font-family: montserrat, sans-serif;
  font-weight: 600;
  font-size: 1em;
  opacity: 1;
}

input::placeholder {
  opacity: 1;
}
</style>