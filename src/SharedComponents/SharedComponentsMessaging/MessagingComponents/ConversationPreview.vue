<template>
  <list-item-style-wrapper
    class="message-preview-list-item"
    hoverable="true"
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
    messages() {
      if (this.conversation) {
        if (this.conversation.messages) {
          return Object.values(this.conversation.messages);
        } else {
          return [];
        }
      } else {
        return [];
      }
    },
    textPreview() {
      if (this.messages.length > 0) {
        let recentMessage = this.messages[this.messages.length - 1].body;
        if (recentMessage.length > 90) {
          return recentMessage;
        } else {
          return recentMessage;
        }
      } else {
        return "No messages in this thread.";
      }
    },
  },
  methods: {
    async getContact() {
      let participants = this.conversation.participantKeys.filter((x) => {
        return x.userId !== this.$store.state.user.userId;
      });
      if (participants[0].userId !== "system") {
        this.contact = await this.$store.dispatch(
          "getContactListItem",
          participants[0]
        );
      } else {
        this.contact = {
          given_name: "Spin",
          family_name: "|| Cole",
          profilePicture:
            "https://spindjappstorage140016-prod.s3.amazonaws.com/public/f48f259e-37d9-4003-be97-7181858b98aa1649263424983",
        };
      }
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
