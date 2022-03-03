<template>
  <popup-modal title="Reset User Password" @close-popup="togglePopup">
    <template v-slot:window>
      <div class="reset-user-password-wrapper">
        <input-with-title
          type="text"
          title="Choose New Password"
          placeholder="password"
          :inputValue="newUserPassword"
          @input="fieldInput(undefined, 'newUserPassword', $event)"
        />
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
import InputWithTitle from "../../../../../SharedComponents/SharedComponentsUI/ElementLibrary/InputWithTitle.vue";
export default {
  data() {
    return {
      newUserPassword: undefined,
    };
  },
  methods: {
    fieldInput(object, property, value) {
      if (object) {
        object[property] = value;
      } else {
        this[property] = value;
      }
    },
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
    InputWithTitle,
  },
  emits: ["togglePopup"],
  props: ["contact"],
};
</script>
<style scoped>
.reset-user-password-wrapper {
  padding: 50px;
  width: calc(100% - 100px);
  display: flex;
  flex-direction: column;
  align-items: center;
}

p {
  text-align: left;
}
</style>