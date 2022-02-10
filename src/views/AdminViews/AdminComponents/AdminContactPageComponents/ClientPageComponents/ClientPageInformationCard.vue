<template>
  <base-card :icon="icon" :loading="contact ? false : true" title="Information">
    <template v-slot:content>
      <div id="contact-card-lower-div" v-if="contact">
        <div class="contact-card-lower-div-half">
          <div class="indented-item">
            <h5>Created:</h5>
            <h5 class="indented">{{ formatDate(contact.createdAt) }}</h5>
          </div>
          <!-- <div class="indented-item">
            <h5>Last Login:</h5>
            <h5 class="indented">{{ contact.lastLogin }}</h5>
          </div> -->
        </div>
        <div class="contact-card-lower-div-half">
          <div class="indented-item"></div>
        </div>
      </div>
    </template>
  </base-card>
</template>

<script>
import BaseCard from "../../../../../SharedComponents/SharedComponentsUI/BaseCard.vue";
import { formatDate } from "../../../../../helpers.js";

export default {
  methods: {
    formatDate,
  },
  components: { BaseCard },
  props: ["contact", "icon"],
};
</script>

<style scoped>
#contact-card-lower-div {
  display: flex;
  flex-direction: row;
  margin: 10px 0;
}

.contact-card-lower-div-half {
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