<template>
  <div class="title-and-photo">
    <image-input @photo-chosen="photoChosen" :image="image" />
    <input
      class="product-name-input"
      :placeholder="placeholder"
      v-model="titleInput"
      type="text"
    />
  </div>
</template>
<script>
import ImageInput from "../../../SharedComponentsUI/ElementLibrary/ImageInput.vue";
export default {
  data() {
    return {};
  },
  computed: {
    titleInput: {
      get() {
        return this.title;
      },
      set(value) {
        console.log(value);
        this.$emit("input", value);
      },
    },
  },
  methods: {
    photoChosen(photo) {
      this.$emit("photo-chosen", photo);
    },
  },
  created() {},
  components: {
    ImageInput,
  },
  props: ["placeholder", "image", "title"],
  emits: ["photo-chosen", "input"],
};
</script>
<style scoped>
.title-and-photo {
  display: flex;
  width: 100%;
}

.product-name-input {
  outline: none;
  border: none;
  font-size: 10pt;
  font-family: Roboto;
  border-radius: 2px;
  margin: 10px;
  padding: 0 10px;
  filter: drop-shadow(0px 1px 0px var(--cardOutline));
}
</style>