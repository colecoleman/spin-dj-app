<template>
  <base-card :svg="icon" actionIcon="edit-pen" title="Prospect">
    <template v-slot:content>
      <div id="wrapper">
        <div id="prospect-card-upper-div">
          <div id="prospect-information">
            <h4 id="first-name">{{ prospect.given_name }}</h4>
            <h4 id="last-name">{{ prospect.family_name }}</h4>
            <p class="prospect-prospect-information">
              {{ formatPhoneNumber(prospect.phoneNumber) }}
            </p>
            <p class="prospect-prospect-information">
              {{ prospect.email }}
            </p>
          </div>
        </div>
      </div>
    </template>
  </base-card>
</template>

<script>
import { formatPhoneNumber } from "../../../../../helpers.js";

export default {
  data() {
    return {};
  },
  methods: {
    formatPhoneNumber,
  },
  props: ["prospect", "icon"],
};
</script>

<style scoped>
#wrapper {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

#first-name {
  font-weight: normal;
}

#last-name {
  padding-bottom: 10px;
}

.prospect-prospect-information {
  font-size: 10pt;
  margin: 2px;
}

#prospect-card-upper-div {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
}

#prospect-information {
  text-align: left;
}

#prospect-card-lower-div {
  display: flex;
  flex-direction: row;
  margin: 10px 0;
}

.prospect-card-lower-div-half {
  width: 50%;
  justify-content: center;
  justify-items: center;
  align-content: center;
  align-items: center;
}

.indented-item {
  text-align: left;
  margin: 25px 4px;
}

.indented {
  text-align: right;
}

h5 {
  text-transform: uppercase;
  margin: 5px;
  font-size: 8pt;
}

input {
  background-color: black;
  color: white;
  border: none;
  border-bottom: 1px solid white;
  width: 80%;
  margin: 0;
  text-align: right;
}

input:focus {
  outline: none;
}
</style>