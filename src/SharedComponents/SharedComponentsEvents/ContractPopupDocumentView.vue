<template>
  <div id="contract-popup-document-view" class="page">
    <div id="heading"><h4>Contract</h4></div>
    <div id="contract-copy">
      <p>{{ contract.contractBody }}</p>
    </div>
    <div class="signatures">
      <div class="contract-data">
        <h5>Signer Name:</h5>
        <p>{{ contract.signerName }}</p>
        <h5>Date Signed:</h5>
        <p>{{ contract.signerDate }}</p>
        <h5>Unique User ID:</h5>
        <p>{{ contract.signerUUID }}</p>
      </div>
      <div class="contract-data" v-if="contract.admin">
        <h5>Admin Signer Name:</h5>
        <p>{{ contract.admin.signerName }}</p>
        <h5>Admin Date Signed:</h5>
        <p>{{ contract.admin.signerDate }}</p>
        <h5>Admin Unique User ID:</h5>
        <p>{{ contract.admin.signerUUID }}</p>
      </div>
    </div>
    <h4>Thank you for choosing {{ businessName }}!</h4>
  </div>
</template>

<script>
export default {
  data() {
    return {};
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

.signatures {
  display: flex;
  width: 100%;
  justify-content: space-evenly;
}

.contract-data {
  width: 50%;
}

@media print {
  p,
  h1,
  h2,
  h3,
  h4,
  h5 {
    font-family: Georgia, "Times New Roman", Times, serif;
  }
}
</style>
