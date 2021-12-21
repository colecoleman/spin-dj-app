<template>
  <base-card :icon="infoIconSvg">
    <template v-slot:title>Details</template>
    <template v-slot:content>
      <div id="title">
        <h4>{{ clientFullName }}{{ possessive }}</h4>
        <h4>{{ event.eventTitle }}</h4>
      </div>
      <div id="date">
        <p>{{ formatDate(event.data.date) }}</p>
        <p>
          {{ formatTime(event.data.startTime) }} -
          {{ formatTime(event.data.endTime) }}
        </p>
      </div>
      <div id="contact-card-lower-div">
        <div class="contact-card-lower-div-half">
          <div class="indented-item">
            <h5>Invoice Total:</h5>
            <h5 class="indented">
              {{ formatPrice(total(event.invoice, event.data)) }}
            </h5>
          </div>
          <div class="indented-item">
            <h5>Payments Received:</h5>
            <h5 class="indented">
              {{
                formatPrice(
                  total(event.invoice, event.data) -
                    balanceOutstanding(event.invoice, event.data)
                )
              }}
            </h5>
          </div>
          <div class="indented-item">
            <h5>Balance Outstanding:</h5>
            <h5 class="indented">
              {{ formatPrice(balanceOutstanding(event.invoice, event.data)) }}
            </h5>
          </div>
        </div>
        <div class="contact-card-lower-div-half">
          <!-- <div class="indented-item">
            <h5>Employees Needed:</h5>
            <h5 class="indented" v-if="!editEmployeesNeededOpen">
              <svg
                width="8"
                height="8"
                viewBox="0 0 10 10"
                @click="editEmployeesNeededOpen = true"
              >
                <path
                  d="M5.678,1.821l2.5,2.5L2.749,9.751.52,10A.469.469,0,0,1,0,9.479L.251,7.248,5.678,1.821Zm4.047-.372L8.551.275a.938.938,0,0,0-1.326,0l-1.1,1.1,2.5,2.5,1.1-1.1a.938.938,0,0,0,0-1.326Z"
                  transform="translate(0 0)"
                />
              </svg>
              {{ event.employeesNeeded }}
            </h5>
            <input
              type="number"
              :placeholder="event.employeesRequired"
              v-model="editEmployeesNeeded"
              v-if="editEmployeesNeededOpen"
              @keyup.enter="
                editEventField(`employeesNeeded`, editEmployeesNeeded);
                editEmployeesNeededOpen = false;
              "
            /><svg
              width="11"
              height="11"
              viewBox="0 0 13.6 13.6"
              v-if="editEmployeesNeededOpen"
            >
              <path
                d="M13.928,7.128a6.8,6.8,0,1,1-6.8-6.8A6.8,6.8,0,0,1,13.928,7.128Zm-7.587,3.6,5.045-5.045a.439.439,0,0,0,0-.62l-.62-.62a.439.439,0,0,0-.62,0L6.031,8.557,4.11,6.636a.439.439,0,0,0-.62,0l-.62.62a.439.439,0,0,0,0,.62l2.852,2.852A.439.439,0,0,0,6.342,10.729Z"
                transform="translate(-0.328 -0.328)"
                fill="#fff"
                @click="
                  editEventField(`employeesNeeded`, editEmployeesNeeded);
                  editEmployeesNeededOpen = false;
                "
              />
            </svg>
          </div> -->
          <!-- <div class="indented-item">
            <h5>Contact Source:</h5>
            <h5 class="indented" v-if="!editClientSourceOpen">
              <svg
                width="8"
                height="8"
                viewBox="0 0 10 10"
                @click="editClientSourceOpen = true"
              >
                <path
                  d="M5.678,1.821l2.5,2.5L2.749,9.751.52,10A.469.469,0,0,1,0,9.479L.251,7.248,5.678,1.821Zm4.047-.372L8.551.275a.938.938,0,0,0-1.326,0l-1.1,1.1,2.5,2.5,1.1-1.1a.938.938,0,0,0,0-1.326Z"
                  transform="translate(0 0)"
                />
              </svg>
              {{ client.source }}
            </h5>
            <input
              type="text"
              :placeholder="client.source"
              v-model="editClientSourceField"
              v-if="editClientSourceOpen"
              @keyup.enter="
                editEventField('source', editClientSourceField);
                editClientSourceOpen = false;
              "
            /><svg
              width="11"
              height="11"
              viewBox="0 0 13.6 13.6"
              v-if="editClientSourceOpen"
            >
              <path
                d="M13.928,7.128a6.8,6.8,0,1,1-6.8-6.8A6.8,6.8,0,0,1,13.928,7.128Zm-7.587,3.6,5.045-5.045a.439.439,0,0,0,0-.62l-.62-.62a.439.439,0,0,0-.62,0L6.031,8.557,4.11,6.636a.439.439,0,0,0-.62,0l-.62.62a.439.439,0,0,0,0,.62l2.852,2.852A.439.439,0,0,0,6.342,10.729Z"
                transform="translate(-0.328 -0.328)"
                fill="#fff"
                @click="
                  editEventField('source', editClientSourceField);
                  editClientSourceOpen = false;
                "
              />
            </svg>
          </div> -->
        </div>
      </div>
    </template>
  </base-card>
</template>

<script>
import infoIconSvg from "../../assets/SVGs/info-icon.svg";
import helpers from "../../helpers.js";

export default {
  data() {
    return {
      infoIconSvg,
      editEmployeesNeededOpen: false,
      editEmployeesNeeded: undefined,
      editClientSourceOpen: false,
      editClientSourceField: undefined,
    };
  },

  computed: {
    clientFullName() {
      return this.client.given_name + " " + this.client.family_name;
    },
    possessive() {
      if (this.clientFullName.slice(-1) == "s") {
        return `'`;
      } else {
        return `'s`;
      }
    },
  },
  methods: {
    formatDate: helpers.formatDate,
    formatTime: helpers.formatTime,
    subtotal: helpers.subtotal,
    total: helpers.total,
    balanceOutstanding: helpers.balanceOutstanding,
    formatPrice: helpers.formatPrice,
    editEventField(key, value) {
      if (key === "source") {
        this.editSourceOpen = false;
      }
      if (key === "employeesNeeded") {
        this.editLifetimeValueOpen = false;
      }
      let id = this.event.id;
      this.$store.dispatch("editEvent", { id, key, value });
    },
  },
  props: ["client", "event"],
};
</script>

<style scoped>
#date {
  margin-top: 20px;
}

p {
  margin: 3px;
}
#contact-card-lower-div {
  display: flex;
  flex-direction: row;
  margin: 10px 0;
  justify-content: space-between;
}

.contact-card-lower-div-half {
  width: 45%;
  justify-content: center;
  justify-items: center;
  align-content: center;
  align-items: center;
}

svg {
  fill: white;
}

.indented-item {
  text-align: left;
  margin: 25px 4px;
}

.indented {
  text-align: right;
}

h5 {
  text-transform: uppercase;
  margin: 5px;
  font-size: 8pt;
}

input {
  background-color: black;
  color: white;
  border: none;
  border-bottom: 1px solid white;
  width: 80%;
  margin: 0;
  text-align: right;
}

input:focus {
  outline: none;
}
</style>