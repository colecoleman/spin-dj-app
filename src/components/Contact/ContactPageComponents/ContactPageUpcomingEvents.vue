<template>
  <div id="wrapper">
    <svg
      width="11.69"
      height="18.616"
      viewBox="0 0 11.69 23.616"
      @click="changeEventBackward()"
      v-if="contactEvents.length > 1"
    >
      <path
        d="M11.812,8.166,20.742.429a1.869,1.869,0,0,1,2.384,0,1.337,1.337,0,0,1,0,2.07L13.008,11.265a1.878,1.878,0,0,1-2.327.043L.492,2.5A1.367,1.367,0,0,1,0,1.47,1.367,1.367,0,0,1,.492.435a1.869,1.869,0,0,1,2.384,0Z"
        transform="translate(11.69) rotate(90)"
        fill="#fff"
      />
    </svg>
    <div id="body" @click="navigateToEventPage()">
      <div id="venue-details">
        <h5>{{ contactEvents[eventScroller].eventLocations[0].venueName }}</h5>
        <p>{{ contactEvents[eventScroller].eventLocations[0].address1 }}</p>
        <p>{{ contactEvents[eventScroller].eventLocations[0].address2 }}</p>
      </div>
      <div id="time-date-payment-details">
        <p class="date-and-time">
          {{ formatDate(contactEvents[eventScroller].eventStartTime) }}
        </p>
        <p class="date-and-time">
          {{
            formatDate(undefined, contactEvents[eventScroller].eventStartTime)
          }}
          -
          {{ formatDate(undefined, contactEvents[eventScroller].eventEndTime) }}
        </p>
        <p class="balance-outstanding">
          ${{ contactEvents[eventScroller].balanceOutstanding * 0.01 }}
          outstanding
        </p>
      </div>
    </div>
    <svg
      width="11.69"
      height="18.616"
      viewBox="0 0 11.69 23.616"
      @click="changeEventForward()"
      v-if="contactEvents.length > 1"
    >
      <path
        d="M11.812,8.166,20.742.429a1.869,1.869,0,0,1,2.384,0,1.337,1.337,0,0,1,0,2.07L13.008,11.265a1.878,1.878,0,0,1-2.327.043L.492,2.5A1.367,1.367,0,0,1,0,1.47,1.367,1.367,0,0,1,.492.435a1.869,1.869,0,0,1,2.384,0Z"
        transform="translate(0 23.616) rotate(-90)"
        fill="#fff"
      />
    </svg>
  </div>
</template>

<script>
export default {
  data() {
    return {
      eventScroller: 0,
    };
  },
  methods: {
    changeEventForward() {
      if (this.eventScroller < this.contactEvents.length - 1) {
        this.eventScroller++;
        console.log("plus!");
      } else {
        this.eventScroller = 0;
      }
    },
    navigateToEventPage() {
      this.$router.push("/events/" + this.contactEvents[this.eventScroller].id);
    },
    changeEventBackward() {
      if (this.eventScroller > 0) {
        this.eventScroller--;
        console.log("minus!");
      } else {
        this.eventScroller = this.contactEvents.length - 1;
      }
    },
    formatDate(date, time) {
      if (date) {
        return date.toLocaleDateString("lookup", {
          day: "numeric",
          year: "numeric",
          month: "long",
        });
      }
      if (time) {
        return time.toLocaleString("lookup", {
          hour: "2-digit",
          minute: "2-digit",
        });
      }
      // return item;
    },
    // formatTime(time) {
    //   let t = time.split(":");
    //   let h = t[0];
    //   let m = t[1];
    //   let ampm;
    //   if (h > 12) {
    //     h = h % 12;
    //     ampm = "PM";
    //   }
    //   return `${h}:${m} ${ampm}`;
    // },
  },
  computed: {
    contactEvents() {
      console.log(
        this.$store.state.events.filter((event) =>
          event.associatedContacts.some((c) => c.id === 1)
        )
      );
      return this.$store.state.events.filter((event) =>
        event.associatedContacts.some((c) => c.id === 1)
      );
    },
  },
  props: ["id"],
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

svg {
  width: 5%;
}

#location-wrapper {
  min-width: 100%;
  overflow-y: scroll;
}

#body {
  width: 90%;
  display: flex;
  /* align-content: center; */
  /* align-items: center; */
  justify-content: space-around;
  /* justify-items: center; */
}

h5,
p {
  margin: 10px;
  font-size: 10pt;
}

#venue-details {
  text-transform: uppercase;
}

#time-date-payment-details {
  text-align: right;
}
</style>