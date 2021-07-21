<template>
  <div id="full-page-popup-div">
    <base-card>
      <template v-slot:icon>
        <slot name="icon"></slot>
      </template>
      <template v-slot:title>
        <slot name="title"></slot>
      </template>
      <template v-slot:content>
        <slot name="content"> </slot>
      </template>
      <template v-slot:action1>
        <slot name="action1"></slot>
      </template>
    </base-card>
  </div>
</template>

<script>
</script>

<style>
@page {
  size: A4;
  margin: 0mm;
}

@media print {
  body,
  #full-page-popup-div {
    display: block !important;
    position: relative !important;
    width: auto !important;
    height: auto !important;
    overflow: visible !important;
    margin-left: 0 !important;
  }
}
#full-page-popup-div {
  z-index: 200;
  position: fixed;
  left: 5%;
  top: 5%;
  width: 90%;
  height: 100%;
}
</style>