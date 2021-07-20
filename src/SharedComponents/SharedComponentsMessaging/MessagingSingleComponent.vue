<template>
  <div id="messaging-wrapper" :style="cssVars">
    <div id="contact-identification">
      <p @click="navigateToEventPage(contact.id)">
        {{ contact.firstName + " " + contact.lastName }}
      </p>
    </div>
    <div class="messages-container">
      <div class="message received">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
          temporibus unde illum. Molestiae inventore a quasi cumque quaerat
          voluptate eos amet delectus similique, ducimus libero dolorum
          doloribus ratione? Blanditiis, aut?
        </p>
      </div>
      <div class="message sent">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis sequi
          exercitationem, perferendis dolorem voluptatem alias? Qui est deleniti
          temporibus libero exercitationem perferendis dolorum ea ipsum. Illo
          molestias temporibus qui animi.
        </p>
      </div>
      <div class="message sent">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          alias earum sapiente provident adipisci quae expedita eos mollitia,
          illo natus debitis magni atque eligendi ducimus odit omnis optio
          accusamus totam!
        </p>
      </div>
      <div class="message received">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque quaerat
          rerum dignissimos repudiandae necessitatibus cupiditate fuga, labore
          veniam, dolores eligendi voluptas odio quasi. Nam tempore molestias
          hic necessitatibus praesentium nulla!
        </p>
      </div>
      <div class="message sent">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
          aliquam accusantium sunt fugiat odit error libero ea aspernatur ipsam
          voluptas, eaque aliquid accusamus a consequatur dolore asperiores
          nostrum reprehenderit quis.
        </p>
      </div>
    </div>
    <div class="input-field">
      <input type="text" placeholder="Start typing..." />
      <img :src="circleArrowUp" alt="" />
    </div>
  </div>
</template>

<script>
import circleArrowUp from "../../assets/SVGs/circle-arrow-up.svg";

export default {
  data() {
    return {
      circleArrowUp,
    };
  },
  methods: {
    navigateToEventPage(id) {
      this.$router.push("/contacts/clients/" + id);
    },
  },
  computed: {
    notificationItems() {
      return this.$store.state.notifications;
    },
    foregroundColor() {
      return this.$store.state.businessSettings.brandingPreferences
        .foregroundColor;
    },
    cardOutline() {
      return this.$store.state.businessSettings.brandingPreferences.cardOutline;
    },
    cssVars() {
      return {
        "--cardOutline": this.cardOutline,
        "--foregroundColor": this.foregroundColor,
      };
    },
  },
  props: ["contact", "id", "icon"],
};
</script>

<style scoped>
#messaging-wrapper {
  height: 100%;
  width: 100%;
  position: relative;
}
#contact-identification {
  position: absolute;
  background-color: var(--foregroundColor);
  z-index: 5;
  padding-right: 10px;
  top: -10px;
  border: 1px solid var(--cardOutline);
  border-top: 0;
  border-left: 0;
  border-radius: 0 0 10px 0;
  font-weight: 600;
  cursor: pointer;
}

.messages-container {
  height: 85%;
  width: 100%;
  overflow: scroll;
  display: flex;
  flex-direction: column-reverse;
}

.message {
  max-width: 60%;
  padding: 0px 15px;
  margin: 10px;
  text-align: left;
  font-size: 10pt;
}

.received {
  align-self: flex-start;
  background-color: aquamarine;
  color: black;
  border-radius: 15px 15px 15px 2px;
}

.sent {
  align-self: flex-end;
  background-color: white;
  color: black;
  border: 1px solid var(--cardOutline);
  border-radius: 15px 15px 2px 15px;
}

.input-field {
  height: 15%;
  justify-content: center;
  align-items: center;
  width: 100%;
  display: flex;
  flex-direction: row;
}

input {
  width: 95%;
  border-radius: 10px;
  height: 20px;
  font-family: Montserrat, sans-serif;
  padding-left: 20px;
}

input:focus {
  outline: none;
}

img {
  height: 20px;
  width: 20px;
  margin-left: 10px;
}
</style>