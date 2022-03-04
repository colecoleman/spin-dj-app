<template>
  <div :class="loading ? 'loading-background card' : 'card'">
    <div class="heading" v-if="svg || title || subtitle || actionIcon">
      <vue-svg :svg="svg" v-if="svg" />
      <div class="title">
        <h3 v-if="title">
          {{ title }}
        </h3>
        <h5 v-if="subtitle">
          {{ subtitle }}
        </h5>
      </div>
      <div class="right-top">
        <h3 @click="actionOneClicked()" v-if="actionText">
          {{ actionText }}
        </h3>
        <div class="dropdown-container">
          <slot name="dropdownContainer"></slot>
        </div>
        <vue-svg
          v-if="actionIcon"
          :svg="actionIcon"
          @clicked="actionOneClicked"
        />
      </div>
    </div>

    <div class="content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
import VueSvg from "../../assets/VueSvg.vue";
export default {
  props: ["svg", "actionIcon", "loading", "actionText", "title", "subtitle"],
  methods: {
    actionOneClicked() {
      this.$emit("actionOneClicked");
    },
  },
  components: { VueSvg },
};
</script>

<style scoped>
@media print {
  .content,
  .card {
    display: block !important;
    position: relative !important;
    width: auto !important;
    height: auto !important;
    overflow: visible !important;
    margin-left: 0 !important;
  }
  .heading {
    visibility: hidden;
  }
}

.card {
  border: 1px solid var(--cardOutline);
  border-radius: 25px;
  background-color: var(--foregroundColor);
  box-sizing: border-box;
  padding: 20px 20px 10px 20px;
  width: 100%;
  height: 100%;
}

.content {
  height: 87%;
  display: inherit;
}

.heading,
.title,
.right-top {
  display: flex;
  align-items: center;
  text-transform: uppercase;
  color: var(--textColor);
}



.title {
  flex-direction: column;
  text-align: left;
  align-items: flex-start;
}

h3,
h4 {
  font-size: 11pt;
  margin: 0 0 0 10px;
  text-align: left;
}

h5 {
  border-top: 1px solid var(--textColor);
  font-size: 9pt;
  text-align: left;
  margin: 0 0 0 10px;
  font-weight: 400;
}

.right-top {
  margin-left: auto;
  position: relative;
  cursor: pointer;
}
.dropdown-container {
  position: absolute;
  right: 0;
  top: 100%;
}

@media screen and (min-width: 320px) {
  .content {
    height: 90%;
  }
}
</style>