<template>
  <base-card
    title="Make Payment"
    svg="credit-card"
    actionIcon="down-arrow"
    :subtitle="paymentMethod.title"
    @action-one-clicked="togglePaymentMethodsOpen"
  >
    <template v-slot:dropdownContainer>
      <floating-menu-with-list-items
        v-if="paymentMethodsOpen"
        :actions="paymentMethods"
        @actionClicked="selectPaymentMethod"
      />
    </template>
    <template v-slot:content>
      <div id="payment-method-wrapper">
        <event-make-payment
          :event="event"
          :eventId="eventId"
          v-if="paymentMethod.title === 'Card'"
          @close-card="closePopup()"
        />
        <div
          v-if="
            paymentMethod.title === 'Check' || paymentMethod.title === 'Custom'
          "
        >
          <p>{{ paymentMethod.info.instructions }}</p>
        </div>
      </div>
      <!-- <div id="contact-card-lower-div">
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
        </div>
      </div> -->
    </template>
  </base-card>
</template>
<script>
import EventMakePayment from "./EventMakePayment.vue";
import FloatingMenuWithListItems from "../../../Components/SharedComponentsUI/FloatingMenuWithListItems.vue";
import {
  formatDate,
  formatTime,
  subtotal,
  total,
  balanceOutstanding,
  formatPrice,
} from "../../../helpers.js";

export default {
  data() {
    return {
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
    formatDate,
    formatTime,
    subtotal,
    total,
    balanceOutstanding,
    formatPrice,
    togglePaymentMethodsOpen() {
      this.paymentMethodsOpen = !this.paymentMethodsOpen;
    },
    closePopup() {
      this.$emit("closePopup");
    },
    selectPaymentMethod(method) {
      this.paymentMethod = method;
      this.togglePaymentMethodsOpen();
    },
  },
  props: ["event", "eventId"],
  emits: ["closePopup"],
  created() {
    this.paymentMethod = this.paymentMethods[0];
  },
};
</script>

<style scoped>
p,
h5 {
  margin: 5px;
}

#payment-method-wrapper {
  height: 100%;
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