<template>
  <full-page-popup>
    <template v-slot:icon
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="16.75"
        height="22"
        viewBox="0 0 16.75 22"
        class="no-print"
      >
        <path
          d="M15.463,4.307,11.447.287A.984.984,0,0,0,10.75,0H10.5V5.25h5.25V5A.981.981,0,0,0,15.463,4.307ZM9.188,5.578V0H.984A.982.982,0,0,0,0,.984V20.016A.982.982,0,0,0,.984,21H14.766a.982.982,0,0,0,.984-.984V6.563H10.172A.987.987,0,0,1,9.188,5.578ZM2.625,2.953a.328.328,0,0,1,.328-.328H6.234a.328.328,0,0,1,.328.328v.656a.328.328,0,0,1-.328.328H2.953a.328.328,0,0,1-.328-.328Zm0,3.281V5.578a.328.328,0,0,1,.328-.328H6.234a.328.328,0,0,1,.328.328v.656a.328.328,0,0,1-.328.328H2.953A.328.328,0,0,1,2.625,6.234ZM8.531,17.058v.989a.328.328,0,0,1-.328.328H7.547a.328.328,0,0,1-.328-.328v-1a2.349,2.349,0,0,1-1.287-.466.329.329,0,0,1-.023-.5l.482-.46a.337.337,0,0,1,.415-.03.987.987,0,0,0,.526.153H8.485a.516.516,0,0,0,.484-.541.535.535,0,0,0-.36-.522l-1.846-.554a1.856,1.856,0,0,1-1.3-1.78A1.826,1.826,0,0,1,7.218,10.5V9.516a.328.328,0,0,1,.328-.328H8.2a.328.328,0,0,1,.328.328v1a2.345,2.345,0,0,1,1.287.466.329.329,0,0,1,.023.5l-.482.46a.337.337,0,0,1-.415.03.984.984,0,0,0-.526-.153H7.265a.516.516,0,0,0-.484.541.535.535,0,0,0,.36.522l1.846.554a1.856,1.856,0,0,1,1.3,1.78A1.826,1.826,0,0,1,8.531,17.058Z"
          transform="translate(0.5 0.5)"
          fill="#fff"
        />
      </svg>
    </template>
    <template v-slot:title class="no-print">Invoice</template>
    <template v-slot:action1>
      <svg
        width="17.995"
        height="17.995"
        viewBox="0 0 17.995 17.995"
        @click="closePopup()"
        class="no-print"
      >
        <path
          d="M19.33,15.581h0l-5.459-5.459L19.33,4.663h0a.564.564,0,0,0,0-.8L16.751,1.289a.564.564,0,0,0-.8,0h0L10.5,6.748,5.038,1.289h0a.564.564,0,0,0-.8,0L1.664,3.868a.564.564,0,0,0,0,.8h0l5.459,5.459L1.664,15.581h0a.564.564,0,0,0,0,.8l2.579,2.579a.564.564,0,0,0,.8,0h0L10.5,13.5l5.459,5.459h0a.564.564,0,0,0,.8,0l2.579-2.579a.564.564,0,0,0,0-.8Z"
          transform="translate(-1.5 -1.125)"
          fill="#fff"
        />
      </svg>
    </template>
    <template v-slot:content>
      <div id="invoice-popup-content-wrapper">
        <div id="invoice-popup-left-menu">
          <h3>Document View</h3>
          <button-standard-with-icon text="Print" @click="printInvoice()">
            <template v-slot:icon
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="19.25"
                height="19.25"
                viewBox="0 0 19.25 19.25"
              >
                <g
                  id="Icon_feather-printer"
                  data-name="Icon feather-printer"
                  transform="translate(-0.875 -0.875)"
                >
                  <path
                    id="Path_129"
                    data-name="Path 129"
                    d="M5.25,7.875V1.75h10.5V7.875"
                    fill="none"
                    stroke="#fff"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.75"
                  />
                  <path
                    id="Path_130"
                    data-name="Path 130"
                    d="M5.25,15.75H3.5A1.75,1.75,0,0,1,1.75,14V9.625A1.75,1.75,0,0,1,3.5,7.875h14a1.75,1.75,0,0,1,1.75,1.75V14a1.75,1.75,0,0,1-1.75,1.75H15.75"
                    fill="none"
                    stroke="#fff"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.75"
                  />
                  <path
                    id="Path_131"
                    data-name="Path 131"
                    d="M5.25,12.25h10.5v7H5.25Z"
                    fill="none"
                    stroke="#fff"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.75"
                  />
                </g>
              </svg>
            </template>
          </button-standard-with-icon>
          <button-standard-with-icon text="Download" @click="saveInvoice()">
            <template v-slot:icon
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="19.25"
                height="19.25"
                viewBox="0 0 19.25 19.25"
              >
                <g
                  id="Icon_feather-printer"
                  data-name="Icon feather-printer"
                  transform="translate(-0.875 -0.875)"
                >
                  <path
                    id="Path_129"
                    data-name="Path 129"
                    d="M5.25,7.875V1.75h10.5V7.875"
                    fill="none"
                    stroke="#fff"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.75"
                  />
                  <path
                    id="Path_130"
                    data-name="Path 130"
                    d="M5.25,15.75H3.5A1.75,1.75,0,0,1,1.75,14V9.625A1.75,1.75,0,0,1,3.5,7.875h14a1.75,1.75,0,0,1,1.75,1.75V14a1.75,1.75,0,0,1-1.75,1.75H15.75"
                    fill="none"
                    stroke="#fff"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.75"
                  />
                  <path
                    id="Path_131"
                    data-name="Path 131"
                    d="M5.25,12.25h10.5v7H5.25Z"
                    fill="none"
                    stroke="#fff"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.75"
                  />
                </g>
              </svg>
            </template>
          </button-standard-with-icon>
        </div>
        <div id="invoice-document-view-wrapper">
          <invoice-popup-document-view
            :event="event"
            :client="client"
            :invoice="invoice"
            :subtotal="subtotal()"
            :total="total()"
            :balanceOutstanding="balanceOutstanding()"
          ></invoice-popup-document-view>
        </div>
        <div id="invoice-popup-right-column">
          <div class="invoice-item">
            <h5>Packages:</h5>
            <div
              class="price-item"
              v-for="item in invoice.packages"
              :key="item.id"
            >
              <p>{{ item.name }} ({{ item.eventHours }} hours):</p>
              <h5>{{ formatPrice(item.total()) }}</h5>
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
              <h5>{{ formatPrice(item.total()) }}</h5>
            </div>
          </div>
          <div class="summary-item">
            <h4>Subtotal:</h4>
            <h5>{{ formatPrice(subtotal()) }}</h5>
          </div>
          <div class="invoice-item">
            <h5>Adjustments:</h5>
            <div
              class="price-item"
              v-for="adjustment in invoice.adjustments"
              :key="adjustment.id"
            >
              <p>{{ adjustment.name }}:</p>
              <h5>{{ formatPrice(adjustment.amount) }}</h5>
            </div>
          </div>
          <div class="summary-item">
            <h4>Invoice Total:</h4>
            <h5>{{ formatPrice(total()) }}</h5>
          </div>
          <div class="invoice-item">
            <h5>Payments Collected:</h5>
            <div
              class="price-item"
              v-for="payment in invoice.paymentsCollected"
              :key="payment.referenceNumber"
            >
              <p>{{ payment.referenceNumber }}</p>
              <h5>{{ formatPrice(payment.amount) }}</h5>
            </div>
          </div>
          <div class="summary-item">
            <h4>Outstanding Balance</h4>
            <h5>{{ formatPrice(balanceOutstanding()) }}</h5>
          </div>
        </div>
      </div>
    </template>
  </full-page-popup>
</template>


<script>
import ButtonStandardWithIcon from "../../components/UI/ButtonStandardWithIcon.vue";
import FullPagePopup from "../../components/UI/FullPagePopup.vue";
import InvoicePopupDocumentView from "./InvoicePopupDocumentView.vue";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default {
  data() {
    return {};
  },
  computed: {
    packagesTotal() {
      let agg = 0;
      for (let index = 0; index < this.invoice.packages.length; index++) {
        const item = this.invoice.packages[index];
        agg = agg + item.total();
        console.log(agg);
      }
      return agg;
    },
    servicesTotal() {
      let agg = 0;
      if (this.invoice.services > 0) {
        for (let index = 0; index < this.invoice.services.length; index++) {
          const item = this.invoice.services[index];
          agg = agg + item.total();
          console.log(agg);
        }
        return agg;
      } else return 0;
    },
    addOnTotal() {
      let agg = 0;
      for (let index = 0; index < this.invoice.addOns.length; index++) {
        const item = this.invoice.addOns[index];
        agg = agg + item.total();
        console.log(agg);
      }
      return agg;
    },
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
    closePopup() {
      this.$emit("closePopup");
    },
    saveInvoice() {
      html2canvas(
        document.getElementById("invoice-popup-document-view"),
        {}
      ).then(function (canvas) {
        console.log("starting downloading");
        var imgData = canvas.toDataURL("image/png");
        console.log("done downloading");
        var imgWidth = 210;
        var pageHeight = 260;
        var imgHeight = (canvas.height * imgWidth) / canvas.width;
        var heightLeft = imgHeight;

        var doc = new jsPDF("p", "mm", "a4", true);
        var position = 0;

        doc.addImage(
          imgData,
          "JPEG",
          5,
          position,
          imgWidth,
          imgHeight,
          undefined,
          "FAST"
        );
        heightLeft -= pageHeight;
        console.log("main page done");
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          doc.addPage();
          doc.addImage(
            imgData,
            "JPEG",
            5,
            position,
            imgWidth,
            imgHeight,
            undefined,
            "FAST"
          );
          heightLeft -= pageHeight;
        }
        console.log("downloading");
        doc.save("file.pdf");
      });
    },
    printInvoice() {
      html2canvas(
        document.getElementById("invoice-popup-document-view"),
        {}
      ).then(function (canvas) {
        console.log("starting downloading");
        var imgData = canvas.toDataURL("image/png");
        console.log("done downloading");
        var imgWidth = 210;
        var pageHeight = 260;
        var imgHeight = (canvas.height * imgWidth) / canvas.width;
        var heightLeft = imgHeight;

        var doc = new jsPDF("p", "mm", "a4", true);
        var position = 0;

        doc.addImage(
          imgData,
          "JPEG",
          5,
          position,
          imgWidth,
          imgHeight,
          undefined,
          "FAST"
        );
        heightLeft -= pageHeight;
        console.log("main page done");
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          doc.addPage();
          doc.addImage(
            imgData,
            "JPEG",
            5,
            position,
            imgWidth,
            imgHeight,
            undefined,
            "FAST"
          );
          heightLeft -= pageHeight;
        }
        console.log("downloading");
        doc.autoPrint();
        doc.output("dataurlnewwindow");
      });
    },
    formatPrice(n) {
      let price = n / 100;
      return `${"$" + price.toLocaleString()}`;
    },
    subtotal() {
      return this.servicesTotal + this.packagesTotal + this.addOnTotal;
    },
    total() {
      let t = this.subtotal() + this.adjustmentsTotal;
      return t;
    },
    balanceOutstanding() {
      let b = this.total() - this.paymentsTotal;
      return b;
    },
  },
  props: ["invoice", "event", "client"],

  components: {
    FullPagePopup,
    InvoicePopupDocumentView,
    ButtonStandardWithIcon,
  },
};
</script>

<style scoped>
#invoice-popup-content-wrapper {
  display: flex;
  flex-direction: row;
  min-height: 100%;
  height: 100%;
}

#invoice-popup-left-menu,
#invoice-popup-right-column {
  width: 20%;
  padding: 15px;
}

#invoice-document-view-wrapper {
  overflow: scroll;
  height: 100%;
}

.invoice-item,
.summary-item {
  padding-top: 20px;
  /* border-bottom: 1px solid white; */
}

.summary-item,
.price-item {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.invoice-item > h5 {
  width: 50%;
  font-weight: 600;
  text-align: left;
}

.price-item > p {
  width: 50%;

  text-align: left;
  margin-left: 20px;
}

.price-item > h5 {
  width: 50%;

  text-align: right;
  /* font-weight: 600; */
}

.summary-item > h4 {
  width: 50%;
  text-align: left;
}

.summary-item h5 {
  width: 50%;

  text-align: right;
  font-weight: 600;
}
</style>