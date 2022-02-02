<template>
  <base-card
    title="Make Payment"
    :icon="SVGs.CreditCardSVG"
    :actionIcon="SVGs.DownArrowSVG"
    :subtitle="paymentMethod.title"
    @action-one-clicked="togglePaymentMethodsOpen"
  >
    <template v-slot:dropdownContainer>
      <floating-menu-with-list-items
        v-if="paymentMethodsOpen"
        :actions="paymentMethods"
        @actionClicked="selectPaymentMethod"
      ></floating-menu-with-list-items>
    </template>
    <template v-slot:content>
      <div id="payment-method-wrapper">
        <event-make-payment
          :event="event"
          :eventId="eventId"
          v-if="paymentMethod.title === 'Card'"
        />
        <div
          v-if="
            paymentMethod.title === 'Check' || paymentMethod.title === 'Custom'
          "
        >
          <p>{{ paymentMethod.info.instructions }}</p>
        </div>
      </div>
      <div id="contact-card-lower-div">
        <div class="contact-card-lower-div-half">
          <div class="indented-item">
            <p class="bold">
              Invoice Total: {{ formatPrice(total(event.invoice, event.data)) }}
            </p>
            <p class="indented"></p>
          </div>
          <div class="indented-item">
            <p class="bold">
              Payments Received:
              {{
                formatPrice(
                  total(event.invoice, event.data) -
                    balanceOutstanding(event.invoice, event.data)
                )
              }}
            </p>
            <p class="indented"></p>
          </div>
        </div>
        <div class="contact-card-lower-div-half">
          <div class="indented-item">
            <p class="bold">
              Balance Outstanding:
              {{ formatPrice(balanceOutstanding(event.invoice, event.data)) }}
            </p>
            <p class="indented"></p>
          </div>
        </div></div
    ></template>
  </base-card>
</template>
<script>
import EventMakePayment from "./EventMakePayment.vue";
import FloatingMenuWithListItems from "../../../SharedComponents/SharedComponentsUI/FloatingMenuWithListItems.vue";
import helpers from "../../../helpers.js";
import SVGs from "../../../assets/SVGs/svgIndex.js";

export default {
  data() {
    return {
      SVGs,
      paymentMethodsOpen: false,
      selectedPaymentMethod: undefined,
      paymentMethod: undefined,
    };
  },
  computed: {
    paymentMethods() {
      let paymentSettings = this.$store.state.businessSettings.payments;
      let paymentMethods = [];
      if (paymentSettings.creditCard.enabled) {
        paymentMethods.push({
          title: "Card",
          icon: undefined,
          logic: {
            title: "Card",
            info: paymentSettings.creditCard,
          },
        });
      }
      if (paymentSettings.check.enabled) {
        paymentMethods.push({
          title: "Check",
          icon: undefined,
          logic: {
            title: "Check",
            info: paymentSettings.check,
          },
        });
      }
      if (paymentSettings.custom) {
        if (paymentSettings.custom.instructions) {
          paymentMethods.push({
            title: paymentSettings.custom.name,
            icon: undefined,
            logic: {
              title: "Custom",
              info: paymentSettings.custom,
            },
          });
        }
      }
      return paymentMethods;
    },
  },
  components: { EventMakePayment, FloatingMenuWithListItems },
  methods: {
    formatDate: helpers.formatDate,
    formatTime: helpers.formatTime,
    subtotal: helpers.subtotal,
    total: helpers.total,
    balanceOutstanding: helpers.balanceOutstanding,
    formatPrice: helpers.formatPrice,
    togglePaymentMethodsOpen() {
      this.paymentMethodsOpen = !this.paymentMethodsOpen;
    },
    selectPaymentMethod(method) {
      console.log(method);
      this.paymentMethod = method;
      console.log(this.paymentMethod);
      this.togglePaymentMethodsOpen();
    },
  },
  props: ["event", "eventId"],
  created() {
    this.paymentMethod = this.paymentMethods[0];
    console.log(this.$store.state.businessSettings);
  },
};
</script>

<style scoped>
p,
h5 {
  margin: 5px;
}

.indented-item {
  text-align: left;
  margin: 20px 4px;
}

.indented {
  text-align: right;
}
#contact-card-lower-div {
  display: flex;
  flex-direction: row;
}
.contact-card-lower-div-half {
  width: 45%;
}
</style>