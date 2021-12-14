<template>
  <base-card :icon="SVGs.GroupPeopleSVG">
    <template v-slot:title>Event Contacts</template>
    <template v-slot:content>
      <div id="contact-carousel-top-wrapper">
        <img
          @click="scrollToPreviousElement()"
          :src="SVGs.LeftArrowSVG"
          alt=""
        />

        <div id="contact-carousel-wrapper">
          <event-page-contact-carousel-item
            v-for="(contact, index) in contacts"
            :key="contact.id"
            :contact="contact"
            :id="`${index + '-card'}`"
            @click="navigateToContactPage(contact)"
          ></event-page-contact-carousel-item>
        </div>
        <img @click="scrollToNextElement()" :src="SVGs.RightArrowSVG" alt="" />
      </div>
    </template>
  </base-card>
</template>

<script>
import EventPageContactCarouselItem from "./EventPageContactCarouselItem.vue";
import SVGs from "../../../assets/SVGs/svgIndex.js";

export default {
  data() {
    return {
      SVGs,
    };
  },
  props: ["contacts"],
  methods: {
    scrollToNextElement() {
      let container = document.getElementById("contact-carousel-wrapper");
      let sLeft = container.scrollLeft;
      let containerWidth = container.getBoundingClientRect().width;
      let childWidth = containerWidth / 2;
      let currentObjectIndex = Math.round(sLeft / childWidth);
      let scrollToObjectIndex = currentObjectIndex + 2;
      if (scrollToObjectIndex > this.contacts.length - 1) {
        document.getElementById("0-card").scrollIntoView({
          behavior: "smooth",
        });
      } else {
        document.getElementById(scrollToObjectIndex + "-card").scrollIntoView({
          behavior: "smooth",
        });
      }
    },
    scrollToPreviousElement() {
      let container = document.getElementById("contact-carousel-wrapper");
      let sLeft = container.scrollLeft;
      let containerWidth = container.getBoundingClientRect().width;
      let childWidth = containerWidth / 2;
      let currentObjectIndex = Math.round(sLeft / childWidth);
      let scrollToObjectIndex = currentObjectIndex - 1;
      if (currentObjectIndex === 0) {
        document
          .getElementById(this.contacts.length - 1 + "-card")
          .scrollIntoView({
            behavior: "smooth",
          });
      } else {
        document.getElementById(scrollToObjectIndex + "-card").scrollIntoView({
          behavior: "smooth",
        });
      }
    },
    navigateToContactPage(contact) {
      this.$router.push(
        "/admin/contacts/" + contact.role + "s/" + contact.userId
      );
    },
  },
  components: { EventPageContactCarouselItem },
};
</script>

<style scoped>
#contact-carousel-top-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

#contact-carousel-wrapper {
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 100%;
  height: 90%;
  overflow: scroll;
  white-space: nowrap;
}

img {
  height: 15px;
  width: 15px;
}
</style>