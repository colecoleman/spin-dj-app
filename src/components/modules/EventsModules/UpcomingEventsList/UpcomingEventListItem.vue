<template>
  <div id="single-event-item">
    <div id="client-event-identifier">
      <img :src="defaultProfilePicture" alt="" />
      <h5 id="client-name">
        {{ firstName }} <br />
        <span> {{ lastName }}</span>
      </h5>
    </div>
    <div class="event-location-identifier">
      <h4 class="venue-name">{{ venueName }}</h4>
      <div class="event-address">
        <h5>{{ address1 }}</h5>
        <h5>{{ address2 }}</h5>
      </div>
    </div>
    <div id="event-metadata-identifier">
      <div id="date-and-time-identifier">
        <h5>{{ formatDate }}</h5>
        <h5>{{ eventStartTime }} - {{ eventEndTime }}</h5>
      </div>
      <div id="event-invoice-metadata">
        <p>${{ balanceOutstanding }} Outstanding</p>
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
      console.log(this.eventDate);
      let date = this.eventDate;
      let splitDate = date.split("-");
      console.log(splitDate);
      let m = splitDate[0] - 1;
      console.log(m);
      let month = monthNames[m];
      return month + ", " + splitDate[1] + ", " + splitDate[2];
    },
  },
  props: [
    "total",
    "payments",
    "venueName",
    "address1",
    "address2",
    "eventDate",
    "eventStartTime",
    "eventEndTime",
    "firstName",
    "lastName",
    "balanceOutstanding",
  ],
};
</script>

<style scoped>
#single-event-item {
  display: flex;
  flex-direction: row;
  padding-bottom: 20px;
  border-width: 1px;
  border-color: white;
}

#client-event-identifier {
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: center;
}

#client-event-identifier img {
  height: 40px;
  margin: 10px;
}
#client-name {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.event-location-identifier {
  flex: 1;
  flex-direction: column;
  align-items: center;
  display: flex;
  justify-content: center;
  width: 200px;
}

.venue-name {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
}

#event-address {
  margin: 5px;
}

h5 {
  font-weight: 300;
}

h5 span {
  font-weight: 600;
}

#event-metadata-identifier {
  flex: 1;
  display: flex;
  flex-direction: column;

  text-align: right;
  display: flex;
  justify-content: center;
}

h5 {
  margin: 0;
}

p {
  font-size: 11px;
}
</style>