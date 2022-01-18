<template>
  <div id="contract-popup-document-view" class="page">
    <div id="heading"><h4>Contract</h4></div>
    <div id="contract-copy">
      <p>{{ contract.contractBody }}</p>
    </div>
    <div id="contract-data">
      <h5>Signer Name:</h5>
      <p>{{ contract.signerName }}</p>
      <h5>Date Signed:</h5>
      <p>{{ contract.signerDate }}</p>
      <h5>Unique User ID:</h5>
      <p>{{ contract.signerUUID }}</p>
    </div>
    <h4>Thank you for choosing {{ businessName }}!</h4>
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
    businessName() {
      return this.$store.state.businessSettings.identity.businessName;
    },
  },
  props: ["contract"],
};
</script>

<style scoped>
#contract-popup-document-view {
  background-color: white;
  aspect-ratio: 8.5/11;
  height: fit-content;
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
  margin: 10px 60px;
}
</style>