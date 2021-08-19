<template>
  <base-card :icon="icon">
    <template v-slot:title>Information</template>
    <template v-slot:content>
      <div id="contact-card-lower-div">
        <div class="contact-card-lower-div-half">
          <div class="indented-item">
            <h5>Created:</h5>
            <h5 class="indented">{{ contact.createdDate }}</h5>
          </div>
          <div class="indented-item">
            <h5>Last Login:</h5>
            <h5 class="indented">{{ contact.lastLogin }}</h5>
          </div>
        </div>
        <div class="contact-card-lower-div-half">
          <div class="indented-item">
            <h5>Source:</h5>
            <h5 class="indented">
              {{ contact.source }}
            </h5>
          </div>
          <div class="indented-item">
            <h5>Lifetime Value:</h5>
            <h5 class="indented">
              {{ `$${contact.lifetimeValue * 0.01} ` }}
            </h5>
          </div>
        </div>
      </div>
    </template>
  </base-card>
</template>

<script>
import BaseCard from "../../../../../SharedComponents/SharedComponentsUI/BaseCard.vue";
export default {
  components: { BaseCard },
  props: ["contact", "icon"],
};
</script>

<style>
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
  font-family: Montserrat, sans-serif;
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