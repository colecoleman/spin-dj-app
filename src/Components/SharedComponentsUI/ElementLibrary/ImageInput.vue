<template>
  <div class="image-input-wrapper">
    <div class="image-container">
      <img v-if="image" :src="image" :alt="image.name" class="image" />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 35 35"
        preserveAspectRatio="xMinYMin slice"
        class="image"
        v-if="!image"
      >
        <path
          id="Icon_awesome-image"
          fill="currentColor"
          data-name="Icon awesome-image"
          d="M38.625,37.5H-2.625A3.375,3.375,0,0,1-6,34.125V2.875A3.375,3.375,0,0,1-2.625-.5h41.25A3.375,3.375,0,0,1,42,2.875v31.25A3.375,3.375,0,0,1,38.625,37.5ZM7.875,8.438a3.938,3.938,0,1,0,3.938,3.938A3.937,3.937,0,0,0,7.875,8.438ZM4.5,27h27V19.125l-6.153-6.153a.844.844,0,0,0-1.193,0L14.625,22.5l-3.9-3.9a.844.844,0,0,0-1.193,0L4.5,23.625Z"
          transform="translate(0 0)"
        />
      </svg>
    </div>
    <round-icon-button
      class="round-icon-button"
      svg="edit-pen"
      @click="chooseFile"
    />
    <input type="file" id="hidden-file-button-package" @change="onFileChange" />
  </div>
</template>
<script>
import RoundIconButton from "../RoundIconButton.vue";
export default {
  data() {
    return {};
  },
  computed: {},
  methods: {
    chooseFile() {
      document.getElementById("hidden-file-button-package").click();
    },
    onFileChange(e) {
      console.log(e);
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.$emit("photo-chosen", files[0]);
    },
  },
  created() {},
  components: { RoundIconButton },
  emits: ["photo-chosen"],
  props: ["image"],
};
</script>
<style scoped>
.image-input-wrapper {
  position: relative;
  width: fit-content;
}
.image {
  height: 60px;
  width: 60px;
  filter: drop-shadow(0px 1px 0px var(--cardOutline));
  min-height: 60px;
  min-width: 60px;
  border-radius: 30px;
  object-fit: cover;
}
.round-icon-button {
  position: absolute;
  left: 0;
  bottom: 0;
  margin: 0;
}

#hidden-file-button-package {
  display: none;
}
</style>