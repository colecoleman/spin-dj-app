<template>
  <base-card>
    <template v-slot:icon>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="21"
        height="13.364"
        viewBox="0 0 21 13.364"
      >
        <path
          id="Icon_material-people"
          data-name="Icon material-people"
          d="M15.193,10.1A2.864,2.864,0,1,0,12.33,7.239,2.852,2.852,0,0,0,15.193,10.1Zm-7.636,0A2.864,2.864,0,1,0,4.693,7.239,2.852,2.852,0,0,0,7.557,10.1Zm0,1.909c-2.224,0-6.682,1.117-6.682,3.341v2.386H14.239V15.352C14.239,13.128,9.781,12.011,7.557,12.011Zm7.636,0c-.277,0-.592.019-.926.048a4.028,4.028,0,0,1,1.88,3.293v2.386h5.727V15.352C21.875,13.128,17.417,12.011,15.193,12.011Z"
          transform="translate(-0.875 -4.375)"
          fill="#fff"
        />
      </svg>
    </template>
    <template v-slot:title>Event Contacts</template>
    <template v-slot:content>
      <div id="contact-carousel-top-wrapper">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="11.69"
          height="20"
          viewBox="0 0 11.69 23.616"
          class="arrow"
          @click="scrollToPreviousElement()"
        >
          <path
            id="Icon_ionic-ios-arrow-down"
            data-name="Icon ionic-ios-arrow-down"
            d="M11.812,8.166,20.742.429a1.869,1.869,0,0,1,2.384,0,1.337,1.337,0,0,1,0,2.07L13.008,11.265a1.878,1.878,0,0,1-2.327.043L.492,2.5A1.367,1.367,0,0,1,0,1.47,1.367,1.367,0,0,1,.492.435a1.869,1.869,0,0,1,2.384,0Z"
            transform="translate(11.69) rotate(90)"
            fill="#fff"
          />
        </svg>

        <div id="contact-carousel-wrapper">
          <event-page-contact-carousel-item
            v-for="(contact, index) in contacts"
            :key="contact.id"
            :contact="contact"
            :id="`${index + '-card'}`"
          ></event-page-contact-carousel-item>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="11.69"
          height="20"
          viewBox="0 0 11.69 23.616"
        >
          <path
            id="Icon_ionic-ios-arrow-down"
            data-name="Icon ionic-ios-arrow-down"
            d="M11.812,8.166,20.742.429a1.869,1.869,0,0,1,2.384,0,1.337,1.337,0,0,1,0,2.07L13.008,11.265a1.878,1.878,0,0,1-2.327.043L.492,2.5A1.367,1.367,0,0,1,0,1.47,1.367,1.367,0,0,1,.492.435a1.869,1.869,0,0,1,2.384,0Z"
            transform="translate(0 23.616) rotate(-90)"
            fill="#fff"
            @click="scrollToNextElement()"
          />
        </svg>
      </div>
    </template>
  </base-card>
</template>

<script>
import BaseCard from "../../UI/BaseCard.vue";
import EventPageContactCarouselItem from "./EventPageContactCarouselItem.vue";

export default {
  data() {
    return {};
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
  },
  components: { BaseCard, EventPageContactCarouselItem },
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
</style>