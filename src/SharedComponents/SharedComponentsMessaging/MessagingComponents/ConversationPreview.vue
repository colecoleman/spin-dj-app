<template>
  <list-item-style-wrapper
    class="message-preview-list-item"
    :title="contactFullName"
  >
    <profile-picture
      :profilePicture="contact ? contact.profilePicture : undefined"
      contact="person"
      class="profile-picture"
    />
    <div class="message-preview-text">
      <p>{{ textPreview }}</p>
    </div>
  </list-item-style-wrapper>
</template>
<script>
import ListItemStyleWrapper from "../../SharedComponentsUI/ListItemStyleWrapper.vue";
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
    textPreview() {
      let recentMessage =
        this.conversation.messages[this.conversation.messages.length - 1].body;
      if (recentMessage.length > 90) {
        return recentMessage;
        // .slice(0, 90) + "...";
      } else {
        return recentMessage;
      }
    },
  },
  methods: {
    async getContact() {
      let participants = this.conversation.participantKeys.filter((x) => {
        return x.userId !== this.$store.state.user.userId;
      });
      this.contact = await this.$store.dispatch(
        "getContactListItem",
        participants[0]
      );
      //   console.log(contact);
      //   this.contact = contact;
    },
  },
  created() {
    this.getContact();
  },
  components: {
    ListItemStyleWrapper,
    ProfilePicture,
  },
  props: ["conversation"],
};
</script>
<style scoped>
.message-preview-list-item {
  /* padding-left: 5px; */
  /* padding-right: 5px; */
  height: 60px;
  display: flex;
  align-items: center;
}

.profile-picture {
  width: 30px;
  height: 30px;
}

.message-preview-text {
  text-align: left;
  width: calc(100% - 60px);
  padding: 0 10px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
p {
  overflow: hidden;
}
</style>