<template>
  <div id="contact-search-scroll-window">
    <p v-if="searchResults.lenght > 0">Results</p>
    <contact-search-item
      v-for="(result, index) in searchResults"
      :key="index"
      :contact="result"
      @click="selectContact(result)"
    />
    <p>All Contacts</p>
    <contact-search-item
      v-for="(contact, index) in contacts"
      :key="index"
      :contact="contact"
      @click="selectContact(contact)"
    />
  </div>
</template>
<script>
import ContactSearchItem from "../MessagingComponents/ContactSearchItem.vue";
export default {
  data() {
    return {};
  },
  computed: {
    contacts() {
      if (this.restrictedContacts) {
        return this.restrictedContacts;
      } else if (
        this.$store.getters.user.userId !== this.$store.getters.user.tenantId
      ) {
        console.log(this.$store.state.user.tenants);
        return this.$store.state.user.tenants;
      } else {
        return [
          ...this.$store.getters.clients(),
          ...this.$store.getters.organizers(),
          ...this.$store.getters.employees(),
          ...this.$store.getters.vendors(),
        ];
      }
    },
    searchResults() {
      if (this.searchTerm) {
        return this.contacts.filter((x) => {
          let contactName = `${x.given_name.toLowerCase()} ${x.family_name.toLowerCase()}`;
          let searchTerm = this.searchTerm.toLowerCase();
          return (
            searchTerm.includes(x.given_name.toLowerCase()) ||
            searchTerm.includes(x.family_name.toLowerCase()) ||
            contactName.includes(searchTerm)
          );
        });
      } else {
        return [];
      }
    },
  },
  methods: {
    selectContact(contact) {
      this.$emit("contact-selected", contact);
    },
  },
  created() {},
  components: { ContactSearchItem },
  props: ["searchTerm", "restrictedContacts"],
  emits: ["contact-selected"],
};
</script>
<style scoped>
#contact-search-scroll-window {
  height: 100%;
  overflow: scroll;
}
</style>
