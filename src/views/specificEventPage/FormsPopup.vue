<template>
  <full-page-popup>
    <template v-slot:icon
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="18.375"
        height="18.379"
        viewBox="0 0 18.375 18.379"
      >
        <path
          d="M18.375,3.084V17.92A1.752,1.752,0,0,1,16.6,19.692H1.772A1.758,1.758,0,0,1,0,17.916V3.084A1.752,1.752,0,0,1,1.772,1.313H16.607A1.751,1.751,0,0,1,18.375,3.084Zm-1.53,14.831V3.084a.244.244,0,0,0-.238-.238h-.381L11.7,5.906,9.188,3.86,6.677,5.906,2.153,2.842H1.772a.244.244,0,0,0-.238.238V17.916a.244.244,0,0,0,.238.238H16.607a.238.238,0,0,0,.238-.238ZM6.161,7.629V9.146H3.146V7.629Zm0,3.052v1.53H3.146V10.68Zm.455-6.042L8.831,2.846H3.97Zm8.613,2.99V9.146H7.19V7.629Zm0,3.052v1.53H7.19V10.68Zm-3.47-6.042L14.4,2.846H9.548Zm3.47,9.1v1.53H11.152V13.74Z"
          transform="translate(0 -1.313)"
          fill="#fff"
        />
      </svg>
    </template>
    <template v-slot:title>Forms</template>
    <template v-slot:action1>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="17.995"
        height="17.995"
        viewBox="0 0 17.995 17.995"
        @click="closePopup()"
      >
        <path
          d="M19.33,15.581h0l-5.459-5.459L19.33,4.663h0a.564.564,0,0,0,0-.8L16.751,1.289a.564.564,0,0,0-.8,0h0L10.5,6.748,5.038,1.289h0a.564.564,0,0,0-.8,0L1.664,3.868a.564.564,0,0,0,0,.8h0l5.459,5.459L1.664,15.581h0a.564.564,0,0,0,0,.8l2.579,2.579a.564.564,0,0,0,.8,0h0L10.5,13.5l5.459,5.459h0a.564.564,0,0,0,.8,0l2.579-2.579a.564.564,0,0,0,0-.8Z"
          transform="translate(-1.5 -1.125)"
          fill="#fff"
        /></svg
    ></template>
    <template v-slot:content></template>
  </full-page-popup>
</template>


<script>

import FullPagePopup from "../../components/UI/FullPagePopup.vue";

export default {
  methods: {
    closePopup() {
      this.$emit("closePopup");
    },
  },
  components: {
    FullPagePopup,
  },
};
</script>

<style scoped>
</style>