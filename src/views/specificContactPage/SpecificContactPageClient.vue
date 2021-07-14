<template>
  <div id="section-wrapper">
    <div id="left-column">
      <div id="box-one">
        <base-card :icon="personsvg">
          <template v-slot:title>Contact</template>
          <template v-slot:content>
            <contact-card-person :contact="contact"></contact-card-person>
          </template>
        </base-card>
      </div>
      <div id="box-two">
        <to-do-specific-client :id="contact.id"></to-do-specific-client>
      </div>
    </div>
    <div id="right-column">
      <div id="box-three">
        <base-card :icon="calendarsvg">
          <template v-slot:title>Upcoming Events</template>
          <template v-slot:content
            ><contact-page-upcoming-events
              :id="contact.id"
            ></contact-page-upcoming-events
          ></template>
        </base-card>
      </div>
      <div id="box-four">
        <base-card :icon="automationsvg">
          <template v-slot:title>Automation</template>
          <template v-slot:content>
            <automation-contact-component></automation-contact-component>
          </template>
        </base-card>
      </div>
      <div id="box-five">
        <base-card :icon="messageBubble">
          <template v-slot:title>Messages</template>
          <template v-slot:content>
            <messaging-single-component></messaging-single-component>
          </template>
        </base-card>
      </div>
    </div>
  </div>
</template>

<script>
import ContactCardPerson from "../../components/Contact/ContactPageComponents/ContactCardPerson";
import ToDoSpecificClient from "../../components/ToDo/ToDoSpecificClient";
import BaseCard from "../../components/UI/BaseCard";
import ContactPageUpcomingEvents from "../../components/Contact/ContactPageComponents/ContactPageUpcomingEvents";
import AutomationContactComponent from "../../components/Automation/AutomationContactComponent";
import MessagingSingleComponent from "../../components/Messaging/MessagingSingleComponent.vue";
import personsvg from "../../assets/SVGs/person.svg";
import messageBubble from "../../assets/SVGs/message-bubble.svg";
import calendarsvg from "../../assets/SVGs/calendar.svg";
import clipboardsvg from "../../assets/SVGs/clipboard.svg";
import automationsvg from "../../assets/SVGs/automation.svg";

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
  width: 40%;
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
  width: 100%;
  height: calc(100% - 5px);
}

#box-three {
  height: 23%;
}

#box-four {
  height: 35%;
}

#box-five {
  height: 42%;
}
</style>