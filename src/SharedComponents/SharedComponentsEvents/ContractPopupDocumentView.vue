<template>
  <div id="contract-popup-document-view" class="page">
    <div id="heading"><h4>Contract</h4></div>
    <div id="contract-copy">
      <p>{{ contractText }}</p>
    </div>
    <div id="contract-data">
      <h5>Signer Name:</h5>
      <p>First family_name</p>
      <h5>Date Signed:</h5>
      <p>12/31/2021</p>
      <h5>IP Address:</h5>
      <p>123.12.12.123</p>
    </div>
    <h4>Thank you for choosing Spin Entertainment!</h4>
  </div>
</template>

<script>
import logo from "../../assets/company-logo.svg";
export default {
  data() {
    return {
      logo,
    };
  },
  computed: {
    contractText() {
      console.log(this.contract);
      console.log(
        this.$store.state.businessSettings.contracts.find(
          (x) => x.id === this.contract
        )
      );

      return this.$store.state.businessSettings.contracts.find(
        (x) => x.id === this.contract
      ).contractBody;
    },
  },
  props: ["contract"],
};
</script>

<style scoped>
#contract-popup-document-view {
  background-color: white;
  width: 147mm;
  min-height: 207.9mm;
  height: fit-content;
  padding-bottom: 20px;
}

h1,
h2,
h3,
h4,
h5,
p {
  color: black;
}

#heading {
  display: flex;
  flex-direction: row;
  justify-content: center;
  justify-items: flex-end;
  align-items: center;
  align-content: center;
  padding: 20px;
}

#contract-copy {
  margin: 10px 50px;
}
</style>