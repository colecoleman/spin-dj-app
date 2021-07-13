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
        <h5>{{ formatDate.date }}</h5>
        <h5>
          {{ formatDate.startTime }} -
          {{ formatDate.endTime }}
        </h5>
      </div>
      <div id="event-invoice-metadata">
        <p>
          ${{ (event.balanceOutstanding * 0.01).toLocaleString() }} Outstanding
        </p>
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
      let firstClient = this.event.associatedContacts.find(
        (x) => x.role === "client"
      );
      let item = this.$store.state.contacts[`${firstClient.role + "s"}`].find(
        (x) => x.id === firstClient.id
      );
      item.role = firstClient.role;
      console.log(this.event.eventStartTime.toLocaleDateString());
      return item;
    },
    formatDate() {
      let date = {
        date: undefined,
        startTime: undefined,
        endTime: undefined,
      };
      date.date = this.event.eventStartTime.toLocaleDateString("lookup", {
        day: "numeric",
        year: "numeric",
        month: "long",
      });
      console.log(date.date);
      date.startTime = this.event.eventStartTime.toLocaleString("lookup", {
        hour: "2-digit",
        minute: "2-digit",
      });
      date.endTime = this.event.eventEndTime.toLocaleString("lookup", {
        hour: "2-digit",
        minute: "2-digit",
      });
      return date;
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
  cursor: pointer;
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