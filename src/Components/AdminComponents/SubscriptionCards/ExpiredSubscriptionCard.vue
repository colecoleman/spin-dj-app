<template>
  <small-floating-card>
    <div class="card-inner-wrapper">
      <h1>It looks like your subscription has expired or was cancelled.</h1>
      <!-- <h3>Let's get it fixed!</h3> -->
      <button-standard-with-icon
        class="button"
        text="Let's get it fixed!"
        :processing="processing"
        @click="updateSubscription"
      />
      <p class="">
        Issue? Shoot us an email and we'll get it fixed as soon as possible.
        <br /><b>admin@simplecitysoftware.com</b>
      </p>
    </div>
  </small-floating-card>
</template>
<script>
import ButtonStandardWithIcon from "../../SharedComponentsUI/ButtonStandardWithIcon.vue";
import SmallFloatingCard from "../../SharedComponentsUI/FloatingCards/SmallFloatingCard.vue";
export default {
  data() {
    return {
      processing: false,
    };
  },
  computed: {},
  methods: {
    updateSubscription() {
      this.processing = true;
      this.$store.dispatch("stripeCreatePortal").catch((e) => {
        console.log(e);
      });
    },
  },
  created() {},
  components: {
    ButtonStandardWithIcon,
    SmallFloatingCard,
  },
  props: [],
};
</script>
<style scoped>
.card-inner-wrapper {
  height: 100%;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}

.button {
  width: fit-content;
  color: var(--foregroundColor);
  background-color: var(--textColor);
}
</style>