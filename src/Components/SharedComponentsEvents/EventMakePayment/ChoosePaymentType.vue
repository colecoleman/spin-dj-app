<template>
  <div id="choose-payment-type">
    <h4 class="main-body-heading">Choose Payment Type:</h4>
    <div id="selection-items">
      <item-tile
        v-for="(method, index) in paymentMethods"
        :key="index"
        @click="navigate(method.component)"
      >
        <p>{{ method.name }}</p>
        <div v-html="method.svg"></div>
      </item-tile>
    </div>
    <div class="admin-record-payment-wrapper" v-if="userRole === 'admin'">
      <p>or</p>
      <button-standard-with-icon
        text="Manually Record Payment"
        @click="navigate('manually-record-payment')"
      />
    </div>
  </div>
</template>
<script>
import ItemTile from "../../SharedComponentsUI/ItemTile.vue";
export default {
  computed: {
    userRole() {
      return this.$store.getters.userRole;
    },
    paymentMethods() {
      let array = [];
      let paymentSettings = this.$store.state.businessSettings.payments;
      if (paymentSettings.creditCard.enabled) {
        array.push({
          name: "Electronic",
          svg: ` <svg
              xmlns="http://www.w3.org/2000/svg"
              width="41.817"
              height="33.454"
              viewBox="0 0 41.817 33.454"
            >
              <path
                id="Icon_material-payment"
                data-name="Icon material-payment"
                d="M40.636,6H7.182a4.15,4.15,0,0,0-4.161,4.182L3,35.272a4.167,4.167,0,0,0,4.182,4.182H40.636a4.167,4.167,0,0,0,4.182-4.182V10.182A4.167,4.167,0,0,0,40.636,6Zm0,29.272H7.182V22.727H40.636Zm0-20.909H7.182V10.182H40.636Z"
                transform="translate(-3 -6)"
              />
            </svg>`,
          component: "chooseDigitalPaymentAmount",
        });
      }
      if (paymentSettings.check.enabled) {
        array.push({
          name: "Physical",
          svg: `<svg
              xmlns="http://www.w3.org/2000/svg"
              width="45"
              height="31.5"
              viewBox="0 0 45 31.5"
            >
              <path
                id="Icon_awesome-money-check-alt"
                data-name="Icon awesome-money-check-alt"
                d="M42.75,2.25H2.25A2.25,2.25,0,0,0,0,4.5v27a2.25,2.25,0,0,0,2.25,2.25h40.5A2.25,2.25,0,0,0,45,31.5V4.5A2.25,2.25,0,0,0,42.75,2.25Zm-30.375,20.8v1.133a.562.562,0,0,1-.562.563H10.688a.562.562,0,0,1-.562-.562V23.042a4.026,4.026,0,0,1-2.206-.8.563.563,0,0,1-.04-.854l.826-.788a.577.577,0,0,1,.712-.051,1.693,1.693,0,0,0,.9.262H12.3a.884.884,0,0,0,.83-.927.918.918,0,0,0-.617-.9l-3.164-.949a3.182,3.182,0,0,1-2.22-3.051,3.131,3.131,0,0,1,3-3.169V10.688a.562.562,0,0,1,.563-.562h1.125a.562.562,0,0,1,.563.563v1.145a4.021,4.021,0,0,1,2.206.8.563.563,0,0,1,.04.854l-.826.788a.577.577,0,0,1-.712.051,1.687,1.687,0,0,0-.9-.262H10.2a.884.884,0,0,0-.83.927.918.918,0,0,0,.617.9l3.164.949a3.182,3.182,0,0,1,2.22,3.051A3.131,3.131,0,0,1,12.375,23.054ZM29.25,21.938a.562.562,0,0,1-.562.563H20.813a.562.562,0,0,1-.562-.562V20.813a.562.562,0,0,1,.563-.562h7.875a.562.562,0,0,1,.563.563Zm11.25,0a.562.562,0,0,1-.562.563H34.313a.562.562,0,0,1-.562-.562V20.813a.562.562,0,0,1,.563-.562h5.625a.562.562,0,0,1,.563.563Zm0-6.75a.562.562,0,0,1-.562.563H20.813a.562.562,0,0,1-.562-.562V14.063a.562.562,0,0,1,.563-.562H39.938a.562.562,0,0,1,.563.563Z"
                transform="translate(0 -2.25)"
              />
            </svg>`,
          component: "PhysicalPaymentInstructions",
        });
      }
      if (paymentSettings.custom.instructions.length > 5) {
        array.push({
          name: "Other",
          svg: ` <svg
              xmlns="http://www.w3.org/2000/svg"
              width="45.001"
              height="31.5"
              viewBox="0 0 45.001 31.5"
            >
              <path
                id="Icon_awesome-money-bill-wave-alt"
                data-name="Icon awesome-money-bill-wave-alt"
                d="M43.675,3.829A20.822,20.822,0,0,0,35.49,2.25c-8.66,0-17.32,4.383-25.98,4.383A21.333,21.333,0,0,1,3,5.669a2.4,2.4,0,0,0-.728-.114A2.237,2.237,0,0,0,0,7.791V30.1A2.236,2.236,0,0,0,1.325,32.17,20.81,20.81,0,0,0,9.51,33.75c8.66,0,17.321-4.384,25.981-4.384a21.333,21.333,0,0,1,6.514.965,2.4,2.4,0,0,0,.728.114A2.237,2.237,0,0,0,45,28.208V5.9a2.239,2.239,0,0,0-1.325-2.072ZM22.5,24.75c-3.107,0-5.625-3.023-5.625-6.75s2.519-6.75,5.625-6.75,5.625,3.022,5.625,6.75S25.606,24.75,22.5,24.75Z"
                transform="translate(0 -2.25)"
              />
            </svg>`,
          component: "OtherPaymentInstructions",
        });
      }
      return array;
    },
  },
  methods: {
    navigate(component) {
      this.$emit("navigate-forward", component);
    },
  },
  created() {
    // console.log(this.$store.state.businessSettings.payments);
  },
  components: { ItemTile },
  emits: ["navigate-forward"],
};
</script>
<style scoped>
.main-body-heading {
  text-transform: unset;
  margin: 30px;
}

#selection-items {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 20px;
}

#selection-items div {
  margin: 10px;
}

@media screen and (min-width: 800px) {
  .main-body-heading {
    margin: 0 0 30px 0;
  }

  #selection-items {
    flex-direction: row;
  }
}
</style>