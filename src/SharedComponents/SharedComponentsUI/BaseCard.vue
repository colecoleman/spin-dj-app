<template>
  <div :class="loading ? 'loading-background card' : 'card'">
    <div id="heading" v-if="icon || title || subtitle || actionIcon">
      <img v-if="icon" :src="icon" alt="" />
      <slot name="icon"></slot>
      <div class="title">
        <h3>
          <slot name="title"></slot>
          {{ title }}
        </h3>
        <h5 v-if="subtitle">
          {{ subtitle }}
        </h5>
      </div>
      <div class="right-top">
        <h4 @click="actionOneClicked()">
          <slot name="action1"></slot>
        </h4>
        <slot name="dropdownContainer"></slot>
        <img
          v-if="actionIcon"
          :src="actionIcon"
          alt=""
          @click="actionOneClicked()"
        />
      </div>
    </div>

    <div id="content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ["icon", "actionIcon", "loading", "title", "subtitle"],
  methods: {
    actionOneClicked() {
      this.$emit("actionOneClicked");
    },
  },
  created() {},
};
</script>

<style scoped>
@media print {
  #content,
  .card {
    display: block !important;
    position: relative !important;
    width: auto !important;
    height: auto !important;
    overflow: visible !important;
    margin-left: 0 !important;
  }
  #heading {
    visibility: hidden;
  }
}

.card {
  border: 1px solid var(--cardOutline);
  border-radius: 25px;
  background-color: var(--foregroundColor);
  align-items: stretch;
  width: calc(100% - 40px);
  max-width: calc(100% - 80px);
  height: calc(100% - 60px);
  padding: 20px 30px;
  margin: 10px;
}
img {
  margin-top: 2px;
  width: 13px;
  height: 13px;
}
#content {
  height: 90%;
  display: inherit;
}

#heading {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  text-transform: uppercase;
  margin-bottom: 10px;
}

h3,
h4 {
  font-size: 11pt;
  margin: 0 0 0 10px;
  text-align: left;
}
.heading {
  text-align: left;
  display: flex;
  flex-direction: column;
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
  display: flex;
  align-items: center;
  position: relative;
}

.right-top > img {
  margin-left: 10px;
}

.loading-background {
  background: var(--foregroundColor);
  background: linear-gradient(
    90deg,
    var(--foregroundColor) -50%,
    var(--foregroundColor) 45%,
    var(--backgroundColor) 50%,
    var(--foregroundColor) 55%,
    var(--foregroundColor) 150%
  );
  background-size: 300%;
  -webkit-animation-name: shimmer;
  -moz-animation-name: shimmer;
  animation-name: shimmer;
  -webkit-animation-duration: 2.5s;
  -moz-animation-duration: 2.5s;
  animation-duration: 2.5s;
  -webkit-animation-iteration-count: infinite;
  -moz-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  animation-direction: normal;
}

@keyframes shimmer {
  0% {
    background-position: top right;
  }
  100% {
    background-position: top left;
  }
}

@-moz-keyframes shimmer {
  0% {
    background-position: top left;
  }
  100% {
    background-position: top right;
  }
}
</style>