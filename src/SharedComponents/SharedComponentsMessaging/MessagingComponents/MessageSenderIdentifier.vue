<template>
  <div
    :class="
      isCurrentUser ? 'sender-identifier current-user' : 'sender-identifier'
    "
  >
    <profile-picture
      contact="person"
      class="profile-picture"
      :profilePicture="contact ? contact.profilePicture : undefined"
    />
    <p>{{ contactFullName }}</p>
  </div>
</template>
<script>
import ProfilePicture from "../../../assets/ProfilePicture.vue";

export default {
  data() {
    return {
      contact: undefined,
    };
  },
  computed: {
    contactFullName() {
      if (this.contact) {
        return `${this.contact.given_name} ${this.contact.family_name}`;
      } else {
        return "";
      }
    },
    isCurrentUser() {
      return this.contactKey.userId === this.$store.state.user.userId;
    },
  },
  methods: {
    async getSender() {
      console.log("hi");
      if (this.contactKey.userId !== "system") {
        this.contact = await this.$store.dispatch(
          "getContactListItem",
          this.contactKey
        );
      } else {
        this.contact = {
          given_name: "Spin",
          family_name: "|| Cole",
          profilePicture:
            "https://spindjappstorage140016-prod.s3.amazonaws.com/public/f48f259e-37d9-4003-be97-7181858b98aa1649263424983",
        };
        console.log(this.contact);
      }
    },
  },
  created() {
    this.getSender();
  },
  components: {
    ProfilePicture,
  },
  props: ["contactKey"],
};
</script>
<style scoped>
.profile-picture {
  height: 20px;
  width: 20px;
  margin: 0 10px;
}

.sender-identifier {
  width: fit-content;
  display: flex;
  align-items: center;
}

.current-user {
  flex-direction: row-reverse;
  margin-left: auto;
}
</style>