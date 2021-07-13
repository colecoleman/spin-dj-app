<template>
  <div id="single-event-item">
    <div id="client-event-identifier">
      <img :src="defaultProfilePicture" alt="" />
      <h5 id="client-name">
        {{ matchedClient.firstName }} <br />
        <span> {{ matchedClient.lastName }}</span>
      </h5>
    </div>
    <div class="event-location-identifier">
      <h4 class="venue-name">{{ event.eventLocations[0].venueName }}</h4>
      <div class="event-address">
        <h5>{{ event.eventLocations[0].address1 }}</h5>
        <h5>{{ event.eventLocations[0].address2 }}</h5>
      </div>
    </div>
    <div id="event-metadata-identifier">
      <div id="date-and-time-identifier">
        <h5>{{ formatDate }}</h5>
        <h5>
          {{ formatTime(event.eventStartTime) }} -
          {{ formatTime(event.eventEndTime) }}
        </h5>
      </div>
      <div id="event-invoice-metadata">
        <p>${{ "TODO" }} Outstanding</p>
      </div>
    </div>
  </div>
</template>

<script>
import defaultProfilePicture from "../../../../assets/default-profile-picture.svg";

export default {
  data() {
    return {
      defaultProfilePicture,
    };
  },
  methods: {
    formatTime(time) {
      let t = time.split(":");
      let h = t[0];
      let m = t[1];
      let ampm;
      if (h > 12) {
        h = h % 12;
        ampm = "PM";
      }
      return `${h}:${m} ${ampm}`;
    },
    calculateBalanceOutstanding() {
      // let total;
      // this.event.eventInvoice.packages.forEach((element) => {});
      // let total;
      // if (this.$props.total) {
      //   total = this.$props.total.replace("$", "");
      // } else {
      //   total = 0;
      // }
      // return total - this.calculatePaymentAmount();
    },
    calculatePaymentAmount() {
      // let total;
      // Array.prototype.forEach.call(this.$props.payments, (payment) => {
      //   if (payment.paymentAmount) {
      //     console.log(payment.paymentAmount);
      //     total = total + payment.paymentAmount;
      //   }
      // });
      // // console.log(total);
      // if (total === undefined || isNaN(total)) {
      //   total = 0;
      // }
      // return parseInt(total);
    },
  },
  computed: {
    matchedClient() {
      let firstClient = this.event.associatedContacts[0];
      let item = this.$store.state.contacts[`${firstClient.role + "s"}`].find(
        (x) => x.id === firstClient.id
      );
      item.role = firstClient.role;
      return item;
    },
    formatDate() {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      console.log(this.event.eventDate);
      let date = this.event.eventDate;
      let splitDate = date.split("-");
      console.log(splitDate);
      let m = splitDate[1] - 1;
      console.log(m);
      let month = monthNames[m];
      return month + " " + splitDate[2] + ", " + splitDate[0];
    },
  },
  props: ["event"],
};
</script>

<style scoped>
#client-event-identifier,
.event-location-identifier,
#event-metadata-identifier {
  display: flex;
  max-width: 33%;
  width: 33%;
}
#single-event-item {
  display: flex;
  flex-direction: row;
  padding-bottom: 20px;
}

#client-event-identifier {
  flex-direction: row;
  align-items: center;
}

#client-event-identifier img {
  height: 40px;
  width: 40px;
  margin: 10px;
}
#client-name {
  font-size: 10pt;
  display: flex;
  flex-direction: column;
  text-align: left;
  text-transform: uppercase;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.event-location-identifier {
  font-size: 10pt;
  flex-direction: column;
  justify-content: center;
}

.venue-name {
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
}

h5 {
  font-weight: 300;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-transform: capitalize;
}

h5 span {
  font-weight: 600;
}

#event-metadata-identifier {
  flex-direction: column;
  font-size: 10pt;
  text-align: right;
}
</style>