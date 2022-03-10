<template>
  <div class="to-do-contact-item">
    <profile-picture
      contact="person"
      :profilePicture="
        contactItem
          ? contactItem.profilePicture
            ? contactItem.profilePicture
            : undefined
          : undefined
      "
      :customStyle="'width: 25px; height: 25px; margin-left: 10px; padding: 5px;'"
    />
    <h5 v-if="contactItem">
      {{ contactItem.given_name + " " + contactItem.family_name }}
    </h5>
  </div>
</template>
<script>
import ProfilePicture from "../../assets/ProfilePicture.vue";
export default {
  data() {
    return {
      contactItem: undefined,
    };
  },
  methods: {},
  async created() {
    if (typeof this.contact !== "object") {
      this.contactItem = await this.$store
        .dispatch("nonAdminGetUser", this.contact)
        .then((res) => {
          return res;
        });
    } else {
      this.contactItem = this.contact;
    }
  },
  components: {
    ProfilePicture,
  },
  props: ["contact"],
};
</script>
<style scoped>
.to-do-contact-item {
  display: flex;
  align-items: center;
}

h5 {
  margin: 0;
  font-size: 8pt;
  text-transform: uppercase;
}
</style>