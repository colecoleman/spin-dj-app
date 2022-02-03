<template>
  <popup-modal title="Reset User Password" @close-popup="togglePopup">
    <template v-slot:window>
      <div class="reset-user-password-wrapper">
        <h5>Choose New Password:</h5>
        <input type="text" placeholder="password" v-model="newUserPassword" />
        <div class="button-wrapper">
          <button-standard-with-icon
            text="Submit New Password"
            @click="resetPassword"
          />
        </div>
        <p>Password must contain:</p>
        <ul>
          <li>
            <p>At least one lowercase letter</p>
          </li>
          <li>
            <p>At least one capital letter</p>
          </li>
          <li>
            <p>At least one number</p>
          </li>
          <li>
            <p>At least one symbol (e.g.: $, *, !, @, #)</p>
          </li>
        </ul>
      </div>
    </template>
  </popup-modal>
</template>
<script>
import PopupModal from "../../../../../SharedComponents/SharedComponentsUI/PopupModal.vue";
export default {
  data() {
    return {
      newUserPassword: undefined,
    };
  },
  methods: {
    async resetPassword() {
      var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      if (re.test(this.newUserPassword)) {
        this.newUserPasswordError = false;
        let payload = {
          username: this.contact.username,
          password: this.newUserPassword,
          userId: this.contact.userId,
        };
        await this.$store.dispatch("resetUserPassword", payload);
        this.togglePopup;
      } else {
        this.newUserPasswordError = true;
      }
    },
    togglePopup() {
      this.$emit("togglePopup");
    },
  },
  created() {},
  components: {
    PopupModal,
  },
  emits: ["togglePopup"],
  props: ["contact"],
};
</script>
<style scoped>
.button-wrapper {
  /* width: 70%; */
  margin: auto;
  padding: 20px;
}

.reset-user-password-wrapper {
  margin: 50px;
}

p {
  text-align: left;
}
</style>