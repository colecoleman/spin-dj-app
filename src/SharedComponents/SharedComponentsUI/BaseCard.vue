<template>
  <div :class="loading ? 'loading-background card' : 'card'">
    <div id="heading">
      <img v-if="icon" :src="icon" alt="" />
      <slot name="icon"></slot>
      <h3>
        <slot name="title"></slot>
      </h3>
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
  props: ["icon", "actionIcon", "loading"],
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
  width: 12px;
  height: 12px;
}
#content {
  /* padding: 0 10px 0 10px; */
  height: 90%;
  display: inherit;
}

#heading {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  text-transform: uppercase;
  margin-bottom: 10px;
}

h3,
h4 {
  font-size: 11pt;
  margin: 0 0 0 10px;
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