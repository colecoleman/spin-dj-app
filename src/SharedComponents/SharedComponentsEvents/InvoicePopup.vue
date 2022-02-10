<template>
  <backdrop @click="closePopup()" class="no-print"></backdrop>
  <section class="no-print">
    <div class="navigation-wrapper no-print">
      <base-card>
        <template v-slot:content>
          <div id="invoice-popup-right-column">
            <div class="invoice-item">
              <h5>Products:</h5>
              <div
                class="price-item"
                v-for="item in invoice.products"
                :key="item.name"
              >
                <p>
                  {{ item.name }} ({{
                    calculateEventTime(event.data) / (60 * 60 * 1000)
                  }}
                  hours):
                </p>
                <h5>{{ formatPrice(productTotal(item, event.data)) }}</h5>
              </div>
            </div>
            <div class="invoice-item">
              <h5>Add-Ons:</h5>
              <div
                class="price-item"
                v-for="item in invoice.addOns"
                :key="item.id"
              >
                <p>{{ item.name }} ({{ item.eventUnits }}):</p>
                <h5>{{ productTotal(item, event.date) }}</h5>
              </div>
            </div>
            <div class="summary-item">
              <h5>Subtotal:</h5>
              <h5>{{ formatPrice(subtotal(event.invoice, event.data)) }}</h5>
            </div>
            <div class="invoice-item">
              <h5>Adjustments:</h5>
              <div
                class="price-item"
                v-for="adjustment in invoice.adjustments"
                :key="adjustment.id"
              >
                <p>{{ adjustment.name }}:</p>
                <h5 v-if="adjustment.type === 'percentage'">
                  {{ adjustment.amount * 100 }}%
                </h5>
                <h5 v-if="adjustment.type === 'dollar'">
                  {{ formatPrice(adjustment.amount) }}
                </h5>
              </div>
            </div>
            <div class="summary-item">
              <h5>Invoice Total:</h5>
              <h5>{{ formatPrice(total(event.invoice, event.data)) }}</h5>
            </div>
            <div class="invoice-item">
              <h5>Payments Collected:</h5>
              <div
                class="price-item"
                v-for="payment in invoice.payments"
                :key="payment.referenceNumber"
              >
                <p>{{ payment.name }}</p>
                <h5>{{ formatPrice(payment.amount) }}</h5>
              </div>
            </div>
            <div class="summary-item">
              <h5>Outstanding Balance</h5>
              <h5>
                {{ formatPrice(balanceOutstanding(event.invoice, event.data)) }}
              </h5>
            </div>
          </div>
          <button-standard-with-icon
            text="Save / Print"
            @click="printInvoice()"
          />
        </template>
      </base-card>
    </div>
    <div id="invoice-document-view-wrapper">
      <invoice-popup-document-view
        :invoice="invoice"
        :event="event"
        :client="client"
      />
    </div>
  </section>
  <section id="print-format">
    <invoice-popup-document-view
      :invoice="invoice"
      :event="event"
      :client="client"
    />
  </section>
</template>


<script>
import Backdrop from "../SharedComponentsUI/Backdrop.vue";
import InvoicePopupDocumentView from "./InvoicePopupDocumentView.vue";
import {
  productTotal,
  calculateEventTime,
  formatPrice,
  subtotal,
  total,
  balanceOutstanding,
} from "../../helpers.js";

export default {
  computed: {
    adjustmentsTotal() {
      let agg = 0;
      this.invoice.adjustments.forEach((adj) => {
        agg = agg + adj.amount;
      });
      return agg;
    },
    paymentsTotal() {
      let agg = 0;
      this.invoice.paymentsCollected.forEach((pay) => {
        agg = agg + pay.amount;
      });
      return agg;
    },
  },
  methods: {
    productTotal,
    calculateEventTime,
    formatPrice,
    printInvoice() {
      window.print();
    },
    subtotal,
    total,
    balanceOutstanding,
    closePopup() {
      this.$emit("closePopup");
    },
  },
  emits: ["closePopup"],
  props: ["invoice", "event", "client"],

  components: {
    InvoicePopupDocumentView,
    Backdrop,
  },
};
</script>

<style scoped>
@media screen {
  #print-format {
    display: none;
  }
  section {
    filter: drop-shadow(0 0 20px rgba(0, 0, 0, 0.5));
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    height: 90%;
    width: 90%;
    margin: 5%;
    z-index: 3;
  }

  .navigation-wrapper {
    width: 350px;
    height: 100%;
    margin-right: 10px;
    display: flex;
    flex-direction: column;
  }

  #invoice-popup-content-wrapper {
    display: flex;
    flex-direction: row;
    /* min-height: 100%; */
  }

  #invoice-popup-left-menu,
  #invoice-popup-right-column {
    height: 100%;
    overflow: scroll;
  }

  #invoice-document-view-wrapper {
    overflow: scroll;
    width: 100%;
  }

  .invoice-item,
  .summary-item {
    padding-top: 20px;
  }

  .summary-item,
  .price-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .invoice-item > h5 {
    font-weight: 600;
    text-align: left;
  }

  .summary-item > h4 {
    text-align: left;
  }

  .summary-item h5 {
    font-weight: 600;
  }
}
@media print {
  .no-print {
    display: none;
  }
}
</style>