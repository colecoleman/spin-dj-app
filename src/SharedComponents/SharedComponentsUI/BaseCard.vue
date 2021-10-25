<template>
  <div class="card">
    <div id="heading">
      <img v-if="icon" :src="icon" alt="" />
      <slot name="icon"></slot>
      <h3>
        <slot name="title"></slot>
      </h3>
      <div class="right-top">
        <h4>
          <slot name="action1" class="right-top"></slot>
        </h4>
        <img v-if="actionIcon" :src="actionIcon" alt="" />
      </div>
    </div>
    <div id="content">
      <slot name="content"></slot>
    </div>
  </div>
</template>




<script>
export default {
  props: ["icon", "actionIcon"],
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
  width: 14px;
  height: 14px;
}
#content {
  padding: 0 10px 0 10px;
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
  position: relative;
}
</style>