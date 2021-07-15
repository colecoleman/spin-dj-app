<template>
  <section>
    <div id="upper-div">
      <div id="upper-div-left-container">
        <event-page-contact-card
          :client="client"
          :event="event"
        ></event-page-contact-card>
      </div>
      <div id="upper-div-right-container">
        <div id="upper-div-right-upper-container">
          <specific-event-page-button-bar :event="event" :client="client" />
        </div>
        <div id="upper-div-right-lower-container">
          <div id="upper-div-right-lower-container-box-1">
            <specific-event-page-location-scroller
              :locations="event.eventLocations"
            ></specific-event-page-location-scroller>
          </div>
          <div id="upper-div-right-lower-container-box-2">
            <automation-event-component></automation-event-component>
          </div>
        </div>
      </div>
    </div>
    <div id="lower-div">
      <div id="lower-div-box-1">
        <event-page-contact-carousel
          :contacts="contacts"
        ></event-page-contact-carousel>
      </div>
      <div id="lower-div-box-2">
        <to-do-specific-event></to-do-specific-event>
      </div>
      <div id="lower-div-box-3">
        <recent-messages-event></recent-messages-event>
      </div>
    </div>
  </section>
</template>

<script>
import ToDoSpecificEvent from "./ToDoSpecificEvent.vue";
import RecentMessagesEvent from "../../components/Messaging/RecentMessagesEvent.vue";
import EventPageContactCard from "./EventPageContactCard.vue";
import EventPageContactCarousel from "./eventPageContactCarousel/EventPageContactCarousel.vue";
import SpecificEventPageLocationScroller from "./specificEventPageLocationScroller/SpecificEventPageLocationScroller.vue";
import AutomationEventComponent from "../../components/Automation/AutomationEventComponent.vue";
import SpecificEventPageButtonBar from "./SpecificEventPageButtonBar.vue";

export default {
  computed: {
    client() {
      return this.$store.state.contacts.clients[0];
    },
    event() {
      return this.$store.state.events[0];
    },
    contacts() {
      let associatedContacts = this.event.associatedContacts;
      let contacts = [];
      associatedContacts.forEach((element) => {
        let item = this.$store.state.contacts[`${element.role + "s"}`].find(
          (x) => x.id === element.id
        );
        item.role = element.role;
        if (item) {
          contacts.push(item);
        }
      });
      console.log(contacts);
      return contacts;
    },
  },
  components: {
    ToDoSpecificEvent,
    RecentMessagesEvent,
    EventPageContactCard,
    EventPageContactCarousel,

    SpecificEventPageLocationScroller,
    AutomationEventComponent,
    SpecificEventPageButtonBar,
  },
};
</script>

<style scoped>
section {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

#upper-div {
  height: 55%;
  width: 100%;
  display: flex;
  flex-direction: row;
}

#upper-div-left-container {
  height: 100%;
  width: 30%;
  display: flex;
}

#upper-div-right-container {
  width: 70%;
  height: 100%;
}

#upper-div-right-upper-container {
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: row;
}

#upper-div-right-lower-container {
  width: 100%;
  height: 70%;
  display: flex;
}

#upper-div-right-lower-container-box-1 {
  height: 100%;
  width: 45%;
  display: flex;
}

#upper-div-right-lower-container-box-2 {
  height: 100%;
  width: 55%;
  display: flex;
}

#lower-div {
  height: 45%;
  width: 100%;
  min-width: 100%;
  display: flex;
  justify-content: stretch;
  justify-items: stretch;
}

#lower-div-box-1 {
  max-width: 40%;
  min-width: 40%;
  width: 40%;
  height: 100%;
  display: flex;
}

#lower-div-box-2 {
  max-width: 30%;
  min-width: 30%;
  height: 100%;
  display: flex;
}

#lower-div-box-3 {
  width: 30%;
  min-width: 30%;
  height: 100%;
  display: flex;
}

svg {
  fill: white;
}
</style>