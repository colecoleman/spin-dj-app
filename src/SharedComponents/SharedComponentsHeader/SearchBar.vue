<template>
  <div id="search-bar-container">
    <input type="text" placeholder="Search Coming Soon..." />
  </div>
</template>

<style scoped>
@media screen and (min-width: 320px) {
  #search-bar-container {
    background-color: var(--foregroundColor);
    border: 1px solid var(--cardOutline);
    border-radius: 25px;
    height: 100%;
    width: 100%;
    margin-left: 10px;
    display: none;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  input {
    width: 90%;
    color: var(--textcolor);
    background: none;
    border: none;
    font-weight: 600;
    font-size: 1em;
    opacity: 1;
  }

  input::placeholder {
    opacity: 0.5;
  }
}
@media screen and (min-width: 575px) {
  #search-bar-container {
    display: flex;
  }
  input {
    font-size: 0.8em;
  }
}

@media screen and (min-width: 1200px) {
  input {
    font-size: 1em;
  }
}
</style>