<template>
  <base-card :icon="icon">
    <template v-slot:title>Upcoming Events</template>
    <template v-slot:content>
      <div id="wrapper">
        <img
          :src="leftArrow"
          @click="changeEventBackward()"
          v-if="contactEvents.length > 1"
          alt=""
        />
        <div id="body" @click="navigateToEventPage()">
          <div id="venue-details">
            <div class="map-box"></div>
            <div class="venue">
              <h5 class="venue-name">
                {{ contactEvents[eventScroller].eventLocations[0].venueName }}
              </h5>
              <p class="times">
                {{ formatDate(contactEvents[eventScroller].eventStartTime) }}
              </p>
              <p class="times">
                {{ formatTime(contactEvents[eventScroller].eventStartTime) }} -
                {{ formatTime(contactEvents[eventScroller].eventEndTime) }}
              </p>
              <p>
                {{ contactEvents[eventScroller].eventLocations[0].address1 }}
              </p>
              <p>
                {{ contactEvents[eventScroller].eventLocations[0].address2 }}
              </p>
            </div>
          </div>
          <div id="date-payment-details">
            <p>
              Invoice Total: ${{
                (contactEvents[eventScroller].total * 0.01).toLocaleString()
              }}
            </p>
            <p>
              Amount Paid: ${{
                (
                  contactEvents[eventScroller].paymentTotal * 0.01
                ).toLocaleString()
              }}
            </p>
            <p>
              Balance Outstanding: ${{
                (
                  contactEvents[eventScroller].balanceOutstanding * 0.01
                ).toLocaleString()
              }}
            </p>
          </div>
        </div>
        <img
          :src="rightArrow"
          @click="changeEventForward()"
          v-if="contactEvents.length > 1"
          alt=""
        />
      </div>
    </template>
  </base-card>
</template>

<script>
import rightArrow from "../../../../assets/SVGs/right-arrow.svg";
import leftArrow from "../../../../assets/SVGs/left-arrow.svg";
import helpers from "../../../../helpers.js";
export default {
  data() {
    return {
      rightArrow,
      leftArrow,
      eventScroller: 0,
    };
  },
  methods: {
    formatDate: helpers.formatDate,
    formatTime: helpers.formatTime,
    changeEventForward() {
      if (this.eventScroller < this.contactEvents.length - 1) {
        this.eventScroller++;
        console.log("plus!");
      } else {
        this.eventScroller = 0;
      }
    },
    changeEventBackward() {
      if (this.eventScroller > 0) {
        this.eventScroller--;
        console.log("minus!");
      } else {
        this.eventScroller = this.contactEvents.length - 1;
      }
    },
    navigateToEventPage() {
      this.$router.push("/events/" + this.contactEvents[this.eventScroller].id);
    },
  },
  computed: {
    contactEvents() {
      let events = this.$store.state.events.filter((event) =>
        event.associatedContacts.some((c) => c.id === 1)
      );
      let today = new Date();
      console.log(events[0]);
      return events.filter((event) => event.eventStartTime > today);
    },
    cardOutline() {
      return this.$store.state.businessSettings.brandingPreferences.cardOutline;
    },
    cssVars() {
      return {
        "--cardOutline": this.cardOutline,
      };
    },
  },
  props: ["id", "icon"],
};
</script>

<style scoped>
#wrapper {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  padding: 0;
  justify-items: center;
  justify-content: center;
  align-items: center;
  align-content: center;
}

.map-box {
  border: 1px solid var(--cardOutline);
  border-radius: 10px;
  width: 50%;
  height: 75px;
  margin: 10px;
  min-height: 50%;
}

img {
  width: 14px;
  height: 14px;
}

#body {
  width: 90%;
  display: flex;
  justify-content: space-around;
}

h5,
p {
  margin: 5px;
  font-size: 10pt;
  text-align: left;
}

#venue-details {
  width: 50%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.venue-name {
  font-weight: 600;
}

.times {
  margin-bottom: 15px;
}

#venue {
  width: 40%;
}

#date-payment-details {
  text-align: right;
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
}
</style>