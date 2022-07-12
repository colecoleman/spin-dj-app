<template>
  <div class="admin-wrapper">
    <non-existent-subscription-card
      v-if="subscriptionStatus === 'non_existent'"
    />
    <expired-subscription-card
      v-if="
        subscriptionStatus === 'past_due' ||
        subscriptionStatus === 'unpaid' ||
        subscriptionStatus === 'canceled' ||
        subscriptionStatus === 'incomplete' ||
        subscriptionStatus === 'incomplete_expired' ||
        subscriptionStatus === 'ended'
      "
    />
    <div class="header-wrapper">
      <admin-header />
    </div>
    <div class="content-wrapper" v-if="loaded">
      <router-view name="content"></router-view>
    </div>
  </div>
</template>

<script>
import AdminHeader from "../../Components/SharedComponentsHeader/AdminHeader.vue";
import NonExistentSubscriptionCard from "../../Components/AdminComponents/SubscriptionCards/NonExistentSubscriptionCard.vue";
import ExpiredSubscriptionCard from "../../Components/AdminComponents/SubscriptionCards/ExpiredSubscriptionCard.vue";
export default {
  data() {
    return {
      loaded: false,
      subscriptionStatus: "active",
    };
  },
  components: {
    AdminHeader,
    NonExistentSubscriptionCard,
    ExpiredSubscriptionCard,
  },
  async created() {
    if (!this.$store.state.user) {
      await this.$store.dispatch("setUser");
    }
    console.log(this.$store.state.user);
    await this.$store.dispatch("setBusinessSettings");
    await this.$store.dispatch("getAdminUsers");
    this.loaded = true;
    this.subscriptionStatus = await this.$store.dispatch(
      "stripeCheckSubscription"
    );
    // switch (subscriptionStatus) {
    //   case "active":
    //   case "trialing":
    //     break;
    //   case "non_existent":
    //     this.subscriptionStatus = null;
    //     // context.dispatch("stripeCreateSubscription");
    //     break;
    //   case "past_due":
    //   case "unpaid":
    //   case "canceled":
    //   case "incomplete":
    //   case "incomplete_expired":
    //   case "ended":
    //     // context.dispatch("stripeCreatePortal");
    //     break;
    //   default:
    //     break;
    // }
    // console.log(subscriptionStatus);
    // await this.$store.dispatch("getLocations");
  },
};
</script>

<style scoped>
@media screen {
  .admin-wrapper {
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    overflow: scroll;
    overflow-x: hidden;
  }
  .header-wrapper {
    padding-bottom: 20px;
    z-index: 10;
  }
  .content-wrapper {
    z-index: 9;
    height: calc(100% - 80px);
  }
}

@media print {
  .admin-wrapper {
    overflow: visible !important;
    width: unset;
    height: auto;
    padding: 0px;
    box-sizing: unset;
    overflow-x: unset;
    display: block;
  }
  .header-wrapper {
    display: none;
  }
  .content-wrapper {
    overflow: visible !important;
    height: auto;
    display: block;
  }
}
</style>