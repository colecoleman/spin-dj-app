<template>
  <div id="section-wrapper">
    <div id="left-column">
      <div id="box-one">
        <contact-card-person
          :contact="contact"
          :icon="personsvg"
        ></contact-card-person>
      </div>
      <div id="box-two">
        <to-do-specific-client :id="contact.id"></to-do-specific-client>
      </div>
    </div>
    <div id="right-column">
      <div id="box-three">
        <specific-event-page-button-bar></specific-event-page-button-bar>
      </div>
      <div id="box-four">
        <contact-page-upcoming-events
          :id="contact.id"
          :icon="calendarsvg"
        ></contact-page-upcoming-events>
      </div>
      <div id="box-five">
        <div id="box-five-half">
          <automation-contact-component></automation-contact-component>
        </div>
        <div id="box-five-half-two">
          <base-card :icon="messageBubble">
            <template v-slot:title>Messages</template>
            <template v-slot:content>
              <messaging-single-component
                :contact="contact"
                :id="contact.id"
              ></messaging-single-component>
            </template>
          </base-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ContactCardPerson from "../ContactPageComponents/ContactCardPerson";
import ToDoSpecificClient from "./ToDoSpecificClient";
import BaseCard from "../../../../SharedComponents/SharedComponentsUI/BaseCard.vue";
import ContactPageUpcomingEvents from "../ContactPageComponents/ContactPageUpcomingEvents";
import AutomationContactComponent from "./AutomationContactComponent";
import MessagingSingleComponent from "../../../../SharedComponents/SharedComponentsMessaging/MessagingSingleComponent.vue";
import SpecificEventPageButtonBar from "../../AdminViewSpecificEventPage/SpecificEventPageButtonBar.vue";
import personsvg from "../../../../assets/SVGs/person.svg";
import messageBubble from "../../../../assets/SVGs/message-bubble.svg";
import calendarsvg from "../../../../assets/SVGs/calendar.svg";
import clipboardsvg from "../../../../assets/SVGs/clipboard.svg";
import automationsvg from "../../../../assets/SVGs/automation.svg";

export default {
  data() {
    return {
      personsvg,
      messageBubble,
      calendarsvg,
      clipboardsvg,
      automationsvg,
    };
  },
  computed: {
    contact() {
      return this.$store.state.contacts.clients[0];
    },
  },
  methods: {
    addToDo() {
      console.log("clicked!");
    },
  },
  components: {
    BaseCard,
    ContactCardPerson,
    ToDoSpecificClient,
    ContactPageUpcomingEvents,
    AutomationContactComponent,
    MessagingSingleComponent,
    SpecificEventPageButtonBar,
  },
};
</script>

<style scoped>
#section-wrapper {
  width: 100%;
  height: 95%;
  padding-top: 10px;
  display: flex;
  /* flex-direction: row; */
}

svg {
  fill: white;
}

#left-column {
  width: 30%;
  height: 100%;
  /* display: flex; */
  flex-direction: column;
}

#box-one {
  height: 60%;
}
#box-two {
  height: 40%;
}

#right-column {
  width: 70%;
  height: calc(100% - 5px);
}

#box-three {
  height: 18%;
}

#box-four {
  height: 40%;
}

#box-five {
  height: 42%;
  display: flex;
  flex-direction: row;
}

#box-five-half {
  width: 55%;
}

#box-five-half-two {
  width: 45%;
}
</style>