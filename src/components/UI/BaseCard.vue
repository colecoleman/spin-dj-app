<template>
  <div class="card">
    <div id="heading">
      <img :src="icon" alt="" />
      <slot name="icon"></slot>
      <h3>
        <slot name="title"></slot>
      </h3>
      <div class="right-top">
        <slot name="action1" class="right-top"></slot>
      </div>
    </div>
    <div id="content">
      <slot name="content"></slot>
    </div>
  </div>
</template>




<script>
export default {
  props: ["icon"],
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
  background-color: black;
  border-radius: 25px;
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
  fill: white;
  color: white;
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
  font-size: 13px;
  margin-bottom: 10px;
}

h3 {
  font-size: 10pt;
  margin: 0 0 0 10px;
}

.right-top {
  margin-left: auto;
  display: flex;
}
</style>