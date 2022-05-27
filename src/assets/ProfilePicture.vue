<template>
  <div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="211"
      height="211"
      viewBox="0 0 211 211"
      @click="clicked"
      :style="customStyle ? customStyle : ''"
      v-if="contact === 'person' && !profilePicture"
    >
      <g id="Group_628" data-name="Group 628" transform="translate(-211 -586)">
        <g
          id="Ellipse_60"
          data-name="Ellipse 60"
          transform="translate(211 586)"
          fill="var(--foregroundColor)"
          stroke="currentColor"
          stroke-width="3px"
        >
          <circle cx="105.5" cy="105.5" r="105.5" stroke="none" />
          <circle cx="105.5" cy="105.5" r="105" fill="var(--foregroundColor)" />
        </g>
        <path
          id="Intersection_2"
          data-name="Intersection 2"
          d="M0,128.219c17.34-15.37,53.468-23.1,74.256-23.1,20.1,0,54.556,7.227,72.486,21.6A103.919,103.919,0,0,1,0,128.219ZM32.209,42.05A42.049,42.049,0,1,1,74.256,84.1,42.037,42.037,0,0,1,32.209,42.05Z"
          transform="translate(243.741 637.751)"
          fill="currentColor"
          z-index="2"
        />
      </g>
    </svg>
    <img
      v-if="profilePicture"
      :src="profilePicture"
      :style="customStyle ? customStyle : ''"
      alt="contact-profile-picture"
    />
    <svg
      @click="clicked"
      :style="customStyle ? customStyle : ''"
      v-if="contact === 'location' && !profilePicture"
      xmlns="http://www.w3.org/2000/svg"
      width="53.341"
      height="53.341"
      viewBox="0 0 53.341 53.341"
    >
      <path
        id="Icon_material-add-location"
        data-name="Icon material-add-location"
        fil="currentColor"
        d="M18,3A10.512,10.512,0,0,0,7.5,13.5C7.5,21.375,18,33,18,33S28.5,21.375,28.5,13.5A10.512,10.512,0,0,0,18,3Z"
        transform="translate(8.671 8.67)"
      />
      <path
        id="Icon_feather-circle"
        data-name="Icon feather-circle"
        d="M53.341,28.171A25.171,25.171,0,1,1,28.171,3,25.171,25.171,0,0,1,53.341,28.171Z"
        transform="translate(-1.5 -1.5)"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1"
      />
    </svg>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    clicked() {
      this.$emit("clicked");
    },
  },
  created() {},
  components: {},
  emits: ["clicked"],
  props: ["contact", "customStyle", "profilePicture"],
};
</script>
<style scoped>
@media screen and (min-width: 320px) {
  svg,
  img {
    /* width: 40px;
    height: 40px;
    padding: 10px;
    object-fit: cover; */
    height: 100%;
    width: 100%;
  }

  img {
    border-radius: 50%;
  }
}
@media screen and (min-width: 700px) {
  svg,
  img {
    /* padding: 5px; */
  }
}
@media screen and (min-width: 800px) {
  svg,
  img {
    /* width: 65px;
    height: 65px; */
    /* padding: 10px; */
  }
}
</style>