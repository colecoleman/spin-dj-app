<template>
  <popup-modal
    :title="`Send email to ${contact.given_name} ${contact.family_name}`"
    @close-popup="closeWindow()"
  >
    <template v-slot:window>
      <section>
        <input-with-title
          class="input"
          :options="emailAddresses"
          type="select"
          title="From:"
          :error="errors.source"
          :inputValue="email.Source"
          @input="fieldInput(email, 'Source', $event)"
        />
        <input-with-title
          class="input"
          type="email"
          title="To:"
          :error="errors.to"
          :inputValue="
            email.Destination.ToAddresses[
              email.Destination.ToAddresses.length - 1
            ]
          "
          @input="
            fieldInput(
              email.Destination.ToAddresses,
              [email.Destination.ToAddresses.length - 1],
              $event
            )
          "
        />
        <input-with-title
          class="input"
          title="Subject:"
          :error="errors.subject"
          :inputValue="email.Message.Subject.Data"
          @input="fieldInput(email.Message.Subject, 'Data', $event)"
        />
        <input-with-title
          class="input"
          title="Message:"
          type="textarea"
          :error="errors.contentEmpty"
          :inputValue="email.Message.Body[emailBodyType].Data"
          placeholder="Start typing your message..."
          @input="fieldInput(email.Message.Body[emailBodyType], 'Data', $event)"
        />
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
      </section>
    </template>
  </popup-modal>
</template>

<script>
import PopupModal from "../SharedComponentsUI/PopupModal.vue";
import InputWithTitle from "../SharedComponentsUI/ElementLibrary/InputWithTitle.vue";
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
    fieldInput(object, property, value) {
      if (object) {
        object[property] = value;
      } else {
        this[property] = value;
      }
    },
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
      return this.$store.getters.identity.emailAddresses;
    },
    businessName() {
      return this.$store.getters.identity.businessName;
    },
  },
  created() {
    this.email.Destination.ToAddresses.push(this.contact.email);
  },
  emits: ["closeWindow"],
  props: ["contact"],
  components: { PopupModal, InputWithTitle },
};
</script>

<style scoped>
section {
  display: flex;
  max-width: 500px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.input {
  width: 300px;
}

.button-container {
  width: 60%;
  height: 100px;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
</style>
