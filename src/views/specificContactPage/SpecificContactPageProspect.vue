<template>
  <div id="section-wrapper">
    <div id="left-column">
      <div id="box-one">
        <base-card>
          <template v-slot:icon
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
            >
              <path
                id="Icon_material-person"
                data-name="Icon material-person"
                d="M10.5,10.5A3.5,3.5,0,1,0,7,7,3.5,3.5,0,0,0,10.5,10.5Zm0,1.75c-2.336,0-7,1.172-7,3.5V17.5h14V15.75C17.5,13.422,12.836,12.25,10.5,12.25Z"
                transform="translate(-3.5 -3.5)"
              /></svg
          ></template>
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
        <base-card>
          <template v-slot:icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 17 18.667"
            >
              <g id="Group_97" data-name="Group 97" transform="translate(1 1)">
                <path
                  id="Path_5"
                  data-name="Path 5"
                  d="M6.167,6H17.833A1.643,1.643,0,0,1,19.5,7.619v11.33a1.643,1.643,0,0,1-1.667,1.619H6.167A1.643,1.643,0,0,1,4.5,18.948V7.619A1.643,1.643,0,0,1,6.167,6Z"
                  transform="translate(-4.5 -3.9)"
                  fill="none"
                  stroke="#fff"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <path
                  id="Path_6"
                  data-name="Path 6"
                  d="M24,3V7.2"
                  transform="translate(-13.167 -3)"
                  fill="none"
                  stroke="#fff"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <path
                  id="Path_7"
                  data-name="Path 7"
                  d="M12,3V7.2"
                  transform="translate(-7.833 -3)"
                  fill="none"
                  stroke="#fff"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <path
                  id="Path_8"
                  data-name="Path 8"
                  d="M4.5,15h15"
                  transform="translate(-4.5 -5.833)"
                  fill="none"
                  stroke="#fff"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
              </g>
            </svg>
          </template>
          <template v-slot:title>Upcoming Events</template>
          <template v-slot:content
            ><contact-page-upcoming-events
              :id="contact.id"
            ></contact-page-upcoming-events
          ></template>
        </base-card>
      </div>
      <div id="box-four">
        <base-card>
          <template v-slot:icon>
            <svg width="15.273" height="14" viewBox="0 0 15.273 21">
              <path
                d="M11.136,5.648V8.511l3.818-3.818L11.136.875V3.739a7.623,7.623,0,0,0-6.453,11.7l1.394-1.394a5.6,5.6,0,0,1-.668-2.673A5.732,5.732,0,0,1,11.136,5.648Zm6.453,1.661L16.2,8.7a5.718,5.718,0,0,1-5.059,8.4V14.239L7.318,18.057l3.818,3.818V19.011a7.623,7.623,0,0,0,6.453-11.7Z"
                transform="translate(-3.5 -0.875)"
                fill="#fff"
              />
            </svg>
          </template>
          <template v-slot:title>Automation</template>
          <template v-slot:content>
            <automation-contact-component></automation-contact-component>
          </template>
        </base-card>
      </div>
      <div id="box-five">
        <base-card>
          <template v-slot:icon>
            <svg width="16" height="14" viewBox="0 0 16 14.993">
              <path
                d="M10.571,3.856c4.418,0,8,2.91,8,6.5s-3.582,6.5-8,6.5a9.881,9.881,0,0,1-1.247-.079,7.791,7.791,0,0,1-5.753,2.072v-.421a3.183,3.183,0,0,0,2-2.572,3.018,3.018,0,0,0-.034-.448,6.119,6.119,0,0,1-2.966-5.052c0-3.59,3.582-6.5,8-6.5Z"
                transform="translate(-2.571 -3.856)"
                fill="#fff"
              />
            </svg>
          </template>
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

export default {
  data() {
    return {};
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