<template>
  <popup-modal
    :title="`Send email to ${contact.given_name} ${contact.family_name}`"
    @close-popup="closeWindow()"
  >
    <template v-slot:window>
      <h3 class="popup-heading"></h3>
      <h5 class="popup-text">From:</h5>
      <p class="danger" v-if="errors.to">
        Oops! You must choose a "From" address.
      </p>
      <select v-model="email.Source">
        <option
          :value="address"
          v-for="address in emailAddresses"
          :key="address"
        >
          {{ address }}
        </option>
      </select>
      <h5 class="popup-text">To:</h5>
      <p class="danger" v-if="errors.to">
        Oops! You must choose a "To" address.
      </p>
      <input
        type="text"
        id="to-email"
        v-model="
          email.Destination.ToAddresses[
            email.Destination.ToAddresses.length - 1
          ]
        "
      />
      <h5 class="popup-text">Subject:</h5>
      <p class="danger" v-if="errors.subject">
        Oops! You must include a "Subject".
      </p>
      <input type="text" id="to-email" v-model="email.Message.Subject.Data" />
      <h5 class="popup-text">Message:</h5>
      <p class="danger" v-if="errors.contentEmpty">
        We need some content here!
      </p>
      <p class="danger" v-if="errors.bodyNeedsText">
        Be sure to include some content for Plain Text also.
      </p>
      <!-- <div class="row-flex">
        <p
          @click="changeEmailBodyType('Text')"
          :class="emailBodyType === 'Text' ? 'bold' : ''"
        >
          Plain Text
        </p>
        <p
          @click="changeEmailBodyType('Html')"
          :class="emailBodyType === 'Html' ? 'bold' : ''"
        >
          HTML
        </p>
      </div> -->
      <p></p>
      <textarea
        name="email-message"
        id="email-message"
        cols="30"
        rows="10"
        placeholder="Start typing your message..."
        v-model="email.Message.Body[emailBodyType].Data"
      ></textarea>
      <div class="button-container">
        <button-standard-with-icon
          class="black-outline"
          text="Cancel Email"
          @click="closeWindow()"
        />
        <button-standard-with-icon
          class="black-outline"
          text="Send Email"
          @click="confirmSendEmail()"
        />
      </div>
    </template>
  </popup-modal>
</template>

<script>
import PopupModal from "../SharedComponentsUI/PopupModal.vue";
export default {
  data() {
    return {
      chosenFromEmail: undefined,
      errors: {
        to: false,
        source: false,
        subject: false,
        contentEmpty: false,
        bodyNeedsText: false,
      },
      emailBodyType: "Text",
      email: {
        Destination: {
          BccAddresses: [],
          CcAddresses: [],
          ToAddresses: [],
        },
        Message: {
          Body: {
            Html: {
              Charset: "UTF-8",
              Data: null,
            },
            Text: {
              Charset: "UTF-8",
              Data: null,
            },
          },
          Subject: {
            Charset: "UTF-8",
            Data: null,
          },
        },
        ReplyToAddresses: [this.$store.state.user.email],
        Source: null,
      },
    };
  },
  methods: {
    closeWindow() {
      this.$emit("closeWindow");
    },
    confirmSendEmail() {
      this.emailValidationBlock();
      this.email.Source = `${this.businessName} < ${this.email.Source} >`;
      if (Object.values(this.errors).every((v) => v === false)) {
        this.$store.dispatch("sendEmail", this.email).then(() => {
          this.closeWindow();
        });
      }
    },
    emailValidationBlock() {
      if (
        !this.email.Destination.ToAddresses[
          this.email.Destination.ToAddresses.length - 1
        ]
      ) {
        this.errors.to = true;
      } else {
        this.errors.to = false;
      }
      if (!this.email.Source) {
        this.errors.source = true;
      } else {
        this.errors.source = false;
      }
      if (!this.email.Message.Subject.Data) {
        this.errors.subject = true;
      } else {
        this.errors.subject = false;
      }
      if (
        !this.email.Message.Body.Html.Data &&
        !this.email.Message.Body.Text.Data
      ) {
        this.errors.contentEmpty = true;
      } else {
        this.errors.contentEmpty = false;
      }
      if (
        !this.email.Message.Body.Html.Data &&
        this.email.Message.Body.Text.Data
      ) {
        this.email.Message.Body.Html.Data = this.email.Message.Body.Text.Data;
      }
      if (
        this.email.Message.Body.Html.Data &&
        !this.email.Message.Body.Text.Data
      ) {
        this.errors.bodyNeedsText = true;
      } else {
        this.errors.bodyNeedsText = false;
      }
    },
  },
  computed: {
    emailAddresses() {
      return this.$store.state.businessSettings.identity.emailAddresses;
    },
    businessName() {
      return this.$store.state.businessSettings.identity.businessName;
    },
  },
  created() {
    // todo: after SES production is granted, remove below line, and uncomment other
    // this.email.Destination.ToAddresses.push("admin@simplecitysoftware.com");
    this.email.Destination.ToAddresses.push(this.contact.email);
  },
  emits: ["closeWindow"],
  props: ["contact"],
  components: { PopupModal },
};
</script>

<style scoped>
.popup-text {
  width: 100%;
  margin: 10px;
  text-align: left;
}

.row-flex {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-evenly;
}

.danger {
  color: red;
  text-align: left;
}

#from-email,
#to-email,
#email-message {
  width: 80%;
}

.button-container {
  width: 100%;
  padding-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.black-outline {
  border-radius: 5px;
}
</style>
