<template>
  <base-card>
    <template v-slot:icon>
      <svg width="20.344" height="20.344" viewBox="0 0 20.344 20.344">
        <path
          d="M10.5.328A10.172,10.172,0,1,0,20.672,10.5,10.173,10.173,0,0,0,10.5.328Zm0,4.512A1.723,1.723,0,1,1,8.777,6.563,1.723,1.723,0,0,1,10.5,4.84Zm2.3,10.418a.492.492,0,0,1-.492.492H8.7a.492.492,0,0,1-.492-.492v-.984a.492.492,0,0,1,.492-.492h.492V11.156H8.7a.492.492,0,0,1-.492-.492V9.68A.492.492,0,0,1,8.7,9.188H11.32a.492.492,0,0,1,.492.492v4.1H12.3a.492.492,0,0,1,.492.492Z"
          transform="translate(-0.328 -0.328)"
          fill="#fff"
        />
      </svg>
    </template>
    <template v-slot:title>Details</template>
    <template v-slot:content>
      <div id="title">
        <h4>{{ clientFullName }}{{ possessive }}</h4>
        <h4>{{ event.eventTitle }}</h4>
      </div>
      <div id="date">
        <p>{{ formatDate.date }}</p>
        <p>
          {{ formatDate.startTime }} -
          {{ formatDate.endTime }}
        </p>
      </div>
      <div id="contact-card-lower-div">
        <div class="contact-card-lower-div-half">
          <div class="indented-item">
            <h5>Invoice Total:</h5>
            <h5 class="indented">
              ${{ (event.total * 0.01).toLocaleString() }}
            </h5>
          </div>
          <div class="indented-item">
            <h5>Payments Received:</h5>
            <h5 class="indented">
              ${{ (event.paymentTotal * 0.01).toLocaleString() }}
            </h5>
          </div>
          <div class="indented-item">
            <h5>Balance Outstanding:</h5>
            <h5 class="indented">
              ${{ (event.balanceOutstanding * 0.01).toLocaleString() }}
            </h5>
          </div>
        </div>
        <div class="contact-card-lower-div-half">
          <div class="indented-item">
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
          </div>
          <div class="indented-item">
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
          </div>
        </div>
      </div>
    </template>
  </base-card>
</template>

<script>
import BaseCard from "../UI/BaseCard.vue";
export default {
  data() {
    return {
      editEmployeesNeededOpen: false,
      editEmployeesNeeded: undefined,
      editClientSourceOpen: false,
      editClientSourceField: undefined,
    };
  },

  computed: {
    clientFullName() {
      return this.client.firstName + " " + this.client.lastName;
    },
    possessive() {
      if (this.clientFullName.slice(-1) == "s") {
        return `'`;
      } else {
        return `'s`;
      }
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
  methods: {
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
  components: { BaseCard },
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
  font-family: Montserrat, sans-serif;
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