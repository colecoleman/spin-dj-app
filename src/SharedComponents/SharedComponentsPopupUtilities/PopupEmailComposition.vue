<template>
  <popup-modal>
    <template v-slot:window>
      <h3 class="popup-heading">
        Send email to {{ contact.firstName }} {{ contact.lastName }}
      </h3>
      <h5 class="popup-text">From:</h5>
      <select name="from-email" id="from-email" v-model="emailFields.fromEmail">
        <option
          :value="address.address"
          v-for="address in emailAddresses"
          :key="address.address"
        >
          {{ address.address }}
        </option>
      </select>
      <h5 class="popup-text">To:</h5>
      <input type="text" id="to-email" v-model="emailFields.toEmail" />
      <h5 class="popup-text">Message:</h5>
      <textarea
        name="email-message"
        id="email-message"
        cols="30"
        rows="10"
        placeholder="Start typing your message..."
        v-model="emailFields.emailMessage"
      ></textarea>
      <div class="button-container">
        <button-standard-with-icon
          class="black-outline"
          text="Cancel Email"
          @click="cancelSendEmail()"
        ></button-standard-with-icon>
        <button-standard-with-icon
          class="black-outline"
          text="Send Email"
          @click="confirmSendEmail()"
        ></button-standard-with-icon>
      </div>
    </template>
  </popup-modal>
</template>

<script>
import PopupModal from "../SharedComponentsUI/PopupModal.vue";
import ButtonStandardWithIcon from "../SharedComponentsUI/ButtonStandardWithIcon.vue";
export default {
  data() {
    return {
      emailFields: {
        fromEmail: this.emailAddresses,
        toEmail: this.contact.emailAddress,
        emailMessage: undefined,
      },
    };
  },
  methods: {
    cancelSendEmail() {
      this.$emit("cancelSendEmail");
    },
    confirmSendEmail() {
      console.log(this.emailFields);
    },
  },
  computed: {
    emailAddresses() {
      return this.$store.state.businessSettings.businessInfo
        .businessEmailAddresses;
    },
  },
  props: ["contact", "category"],
  components: { PopupModal, ButtonStandardWithIcon },
};
</script>

<style scoped>
.popup-heading,
.popup-text {
  color: black;
}

.popup-text {
  width: 80%;
  margin: 10px;
  text-align: left;
}

#from-email,
#to-email,
#email-message {
  width: 80%;
}

.button-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  color: black;
}

.black-outline {
  border-color: black;
  border-radius: 5px;
}
</style>