<template>
  <base-card :icon="SVGs.GroupPeopleSVG" title="Event Contacts">
    <template v-slot:content>
      <div id="contact-carousel-top-wrapper">
        <div class="contact-carousel-wrapper">
          <skeleton-event-page-contact-carousel-item />
          <skeleton-event-page-contact-carousel-item />
        </div>
      </div>
    </template>
  </base-card>
</template>

<script>
import SkeletonEventPageContactCarouselItem from "./SkeletonEventPageContactCarouselItem.vue";
import SVGs from "../../../assets/SVGs/svgIndex.js";

export default {
  data() {
    return {
      SVGs,
    };
  },
  components: {
    SkeletonEventPageContactCarouselItem,
  },
};
</script>

<style scoped>
#contact-carousel-top-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  height: 100%;
}

.contact-carousel-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  width: 100%;
  max-width: 100%;
  height: 90%;
  overflow: scroll;
  /* white-space: nowrap; */
}
</style>
