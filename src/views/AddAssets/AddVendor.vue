<template>
  <div id="container">
    <base-card>
      <div id="section-wrapper">
        <div id="top-wrapper">
          <div id="heading-div">
            <h1>Adding a new contact?</h1>
            <h3><i>You're absolutely crushing this networking thing.</i></h3>
          </div>
        </div>
        <div id="input-div">
          <form>
            <div id="form-div-one">
              <label for="First Name">First Name:*</label><br />
              <input
                type="text"
                name="First Name"
                placeholder="Ted"
                required
                v-model.lazy="firstName"
                :class="{ 'incomplete-field': firstNameMissing }"
              /><br />
              <label for="Last Name">Last Name:*</label><br />
              <input
                type="text"
                name="Last Name"
                placeholder="Mosby"
                required
                v-model.lazy="lastName"
                :class="{ 'incomplete-field': lastNameMissing }"
              /><br />
              <label for="Email Address">Email Address:*</label><br />
              <input
                type="email"
                name="Email Address"
                placeholder="tedmosby@domain.com"
                v-model.lazy="emailAddress"
                :class="{ 'incomplete-field': emailAddressMissing }"
              /><br />
              <label for="Phone Number"> Phone Number:*</label><br />
              <input
                type="tel"
                name="Phone Number"
                placeholder="(123) 456-7890"
                v-model.lazy="phoneNumber"
                :class="{ 'incomplete-field': phoneNumberMissing }"
              /><br />
            </div>
            <div id="form-div-two">
              <label for="Notes">Notes:</label><br />
              <textarea
                name="Notes"
                rows="1"
                placeholder="Put something descriptive here!"
                v-model.lazy="notes"
              /><br />
              <label for="AssociatedEvent">Associated Event?:</label><br />
              <input
                name="AssociatedEvent"
                type="text"
                placeholder="Start Typing Name or Date (MM/DD/YYYY)"
                v-model="searchTerm"
                autocomplete="off"
                @keyup="searchForEvents()"
                @keypress.enter="
                  assignEventToContact(
                    matchingEvents[0].id,
                    matchingEvents[0].client.firstName,
                    matchingEvents[0].client.lastName,
                    matchingEvents[0].eventDate
                  )
                "
              /><br />
              <div id="associated-events-window">
                <h3 v-if="!searchTerm">Search for an event</h3>
                <h3 v-if="matchingEvents[0] === undefined">No results found</h3>
                <associated-event-search-list-item
                  v-for="event in matchingEvents"
                  :key="event.id"
                  :firstName="event.client.firstName"
                  :lastName="event.client.lastName"
                  :eventDate="event.eventDate"
                  @click="
                    assignEventToContact(
                      event.id,
                      event.client.firstName,
                      event.client.lastName,
                      event.eventDate
                    )
                  "
                ></associated-event-search-list-item>
              </div>
            </div>
          </form>
        </div>
        <h5 v-if="missingFields">Please complete the missing fields</h5>
        <div id="button-div">
          <button
            id="submitButton"
            type="button"
            @click="
              validationCheck();
              submitContact();
            "
          >
            Submit
          </button>
          <button id="addAnother" type="button" @click="submitAndAddAnother()">
            Submit and Add Another
          </button>
          <button id="resetButton" type="button" @click="resetInput()">
            Reset
          </button>
        </div>
      </div>
    </base-card>
  </div>
</template>

<script>
import BaseCard from "../../components/UI/BaseCard.vue";
import AssociatedEventSearchListItem from "./AssociatedEventSearchListItem.vue";


export default {
  data() {
    return {
      firstName: null,
      lastName: null,
      phoneNumber: null,
      emailAddress: null,
      firstNameMissing: false,
      lastNameMissing: false,
      phoneNumberMissing: false,
      emailAddressMissing: false,
      associatedEventIds: [],
      searchTerm: null,
      notes: null,
      matchingEvents: [],
      missingFields: false,
    };
  },
  computed: {
    events() {
      return this.$store.state.clientEventCombined;
    },
  },
  methods: {
    assignEventToContact(eventId, firstName, lastName, eventDate) {
      this.associatedEventIds.push(eventId);
      this.searchTerm = `${firstName} ${lastName}, ${eventDate}`;
    },
    validationCheck() {
      if (
        this.firstName === null ||
        this.firstName.trim() === "" ||
        this.firstName === undefined
      ) {
        this.firstNameMissing = true;
      } else {
        this.firstNameMissing = false;
      }
      if (
        this.lastName === null ||
        this.lastName.trim() === "" ||
        this.lastName === undefined
      ) {
        this.lastNameMissing = true;
      } else {
        this.lastNameMissing = false;
      }
      if (
        this.phoneNumber === null ||
        this.phoneNumber.trim() === "" ||
        this.phoneNumber === undefined
      ) {
        this.phoneNumberMissing = true;
      } else {
        this.phoneNumberMissing = false;
      }
      if (
        this.emailAddress === null ||
        this.emailAddress.trim() === "" ||
        this.emailAddress === undefined
      ) {
        this.emailAddressMissing = true;
      } else {
        this.emailAddressMissing = false;
      }
      if (
        this.firstNameMissing ||
        this.lastNameMissing ||
        this.emailAddressMissing ||
        this.phoneNumberMissing
      ) {
        this.missingFields = true;
      } else this.missingFields = false;
    },
    submitContact() {
      if (this.missingFields) {
        return;
      } else {
        console.log(
          this.firstName,
          this.lastName,
          this.phoneNumber,
          this.emailAddress,
          this.notes,
          this.associatedEventIds
        );
       
      }
    },
    resetInput() {
      this.firstName = null;
      this.lastName = null;
      this.phoneNumber = null;
      this.emailAddress = null;
      this.notes = null;
      this.searchTerm = null;
      this.associatedEventIds = [];
    },
    fetchData() {
      this.$store.dispatch("getClients");
      this.$store.dispatch("getEvents");
    },
    combineData() {
      this.$store.dispatch("getCombined");
    },
    searchForEvents() {
      if (this.searchTerm === "") {
        this.searchTerm = null;
        this.matchingEvents = [];
      } else if (this.searchTerm != null) {
        console.log(this.searchTerm);
        this.matchingEvents = [];
        this.events.forEach((event) => {
          let combinedName = event.client.firstName.concat(
            " ",
            event.client.lastName
          );
          if (
            event.client.firstName
              .toLowerCase()
              .includes(this.searchTerm.toLowerCase()) ||
            event.client.lastName
              .toLowerCase()
              .includes(this.searchTerm.toLowerCase()) ||
            combinedName
              .toLowerCase()
              .includes(this.searchTerm.toLowerCase()) ||
            event.eventDate.includes(this.searchTerm)
          ) {
            this.matchingEvents.push(event);
          }
        });
      }
    },
  },
  components: { BaseCard, AssociatedEventSearchListItem },
  created() {
    this.loading = true;
    this.fetchData();
  },

  mounted() {
    this.combineData();
  },
};
</script>

<style scoped>
#container {
  margin: 10px;
  height: calc(100% - 20px);
  width: calc(100% - 20px);
}

.incomplete-field {
  border: 1px solid red;
}
#section-wrapper {
  display: flex;
  flex-direction: column;
  align-content: center;
  width: 100%;
  height: 100%;
}

#associated-events-window {
  max-height: 85px;
  min-height: 85px;
  border: 1px solid white;
  border-radius: 20px;
  overflow: scroll;
}
#associated-events-window h3 {
  margin: auto;
  text-align: center;
  align-self: center;
  margin-top: 30px;
}
#form-div-one {
  display: flex;
  flex-direction: column;
  width: 50%;
}
#form-div-two {
  display: flex;
  flex-direction: column;
  width: 50%;
}
#top-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
}

#heading-div {
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  margin: auto;
  align-items: center;
}

h1 {
  width: 60%;
  text-transform: uppercase;
  text-align: left;
  background-color: none;
  background-image: linear-gradient(transparent 95%, #00f5ff 99%);
  background-size: 55px;
  margin: 10px;
}

h3 {
  width: 60%;
  margin: 0px;

  text-align: right;
  align-self: right;
}

input,
textarea {
  color: white;
  font-family: montserrat, helvetica, sans-serif;
  width: 80%;
  background: none;
  border: 1px solid white;
  border-radius: 20px;
  height: 30px;
  padding-left: 20px;
}

input:focus,
textarea:focus {
  outline: inherit;
  border: 1px solid #00f5ff;
}
input::placeholder,
textarea::placeholder {
  color: rgba(255, 255, 255, 0.35);
  font-family: Montserrat, Helvetica, sans-serif;
}

textarea {
  height: 100px;
  width: 95%;
  padding: 10px 0 0 20px;
}

label {
  text-align: left;
  margin-left: 15px;
}
form {
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 5% 5% 1% 5%;
}

#input-div {
  height: 100%;
  width: 100%;
  padding: 1px;
  display: flex;
}
button {
  height: 40px;
  background: none;
  border-radius: 20px;
  outline: none;
  border: 1px solid white;
  color: white;
  font-family: montserrat, helvetica, sans-serif;
  text-transform: uppercase;
}

button:hover {
  border: 1px solid #00f5ff;
  color: #00f5ff;
  cursor: pointer;
}

button:active {
  background: rgba(255, 255, 255, 1);
  color: black;
}

#button-div {
  display: flex;

  flex-direction: row;
  width: 50%;
  align-items: center;
  align-self: center;
}

#button-div button {
  padding-left: 15px;
  padding-right: 15px;
  margin: auto;
}

h5 {
  color: red;
}
</style>