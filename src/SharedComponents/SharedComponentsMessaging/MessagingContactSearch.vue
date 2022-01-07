<template>
  <div id="messaging-contact-search-wrapper">
    <input
      v-model="searchTerm"
      type="text"
      id="contact-search-field"
      placeholder="Search for contacts..."
    />
    <div v-for="(contact, index) in contacts" :key="index">
      <div v-if="typeof contact === 'string'" class="contact-category-heading">
        <h5>{{ contact }}</h5>
      </div>
      <div v-if="typeof contact === 'object'" class="contact-item">
        <div class="contact-identifier">
          <img class="profile-picture" :src="defaultProfilePicture" alt="" />
          <div class="flex-column">
            <p>
              <b>{{ `${contact.given_name}` }}</b>
            </p>
            <p>
              <b>{{ `${contact.family_name}` }}</b>
            </p>
          </div>
        </div>
        <button-standard-with-icon
          text="Message"
          @click="selectContact(contact)"
        ></button-standard-with-icon>
      </div>
    </div>
  </div>
</template>
<script>
import defaultProfilePicture from "../../assets/default-profile-picture.svg";

export default {
  data() {
    return {
      defaultProfilePicture,
      searchTerm: undefined,
    };
  },
  computed: {
    contacts() {
      let contactsArr = this.$store.state.contacts;
      let contacts = [
        "Clients",
        ...contactsArr.clients,
        "Vendors",
        ...contactsArr.vendors,
        "Organizers",
        ...contactsArr.organizers,
        "Employees",
        ...contactsArr.employees,
      ];
      if (this.searchTerm) {
        contacts = contacts.filter(
          (x) =>
            x.given_name
              .toLowerCase()
              .includes(this.searchTerm.toLowerCase()) ||
            x.family_name.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      }
      return contacts;
    },
  },
  methods: {
    selectContact(contact) {
      this.$emit("contactSelected", contact);
    },
  },
  created() {},
  components: {},
  props: [],
};
</script>
<style scoped>
#messaging-contact-search-wrapper {
  width: 97%;
}

#contact-search-field {
  width: 100%;
}

.contact-item {
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
  justify-content: space-between;
  align-items: center;
}

.contact-category-heading {
  width: 100%;
  margin: 2px;
  margin-bottom: 15px;
  text-transform: uppercase;
  border-top: 1px solid var(--textColor);
  border-bottom: 1px solid var(--textColor);
}

.contact-category-heading > h5 {
  margin: 0px;
}

.contact-identifier {
  display: flex;
  width: 40%;
  flex-direction: row;
}

.flex-column {
  display: flex;
  flex-direction: column;
  text-align: left;
}

p {
  margin: 2px;
}

img {
  height: 35px;
  margin: 0 10px 0 0;
}
</style>