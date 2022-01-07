<template>
  <popup-modal @close-popup="closePopup()" title="Availability Rules">
    <template v-slot:window>
      <div class="body">
        <h5>This employee has no rules! Click to add one.</h5>
        <div class="add-availability-container"></div>
        <div class="list-container" v-if="availabilityRules">
          <h5>Select Unavailable Times:</h5>
          <div class="availability-list-item">
            <p>Days Of The Week:</p>
            <div
              class="input-item"
              v-for="(value, key, index) in availabilityRules.dayOfWeek"
              :key="index"
            >
              <input
                type="checkbox"
                :name="daysOfWeek[key]"
                v-model="availabilityRules.dayOfWeek[key]"
              />
              <p>{{ daysOfWeek[index] }}</p>
            </div>
          </div>
          <div class="availability-list-item">
            <p>Months:</p>
            <div
              class="input-item"
              v-for="(month, index) in availabilityRules.months"
              :key="index"
            >
              <input
                type="checkbox"
                :name="months[index]"
                v-model="availabilityRules.months[index]"
              />
              <label :for="months[index]"
                ><p>{{ months[index] }} |</p></label
              >
            </div>
          </div>
          <div class="availability-list-item">
            <p>Date Ranges:</p>
            <p
              v-for="(range, index) in availabilityRules.dateRanges"
              :key="index"
            >
              {{
                new Date(range.start).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  timeZone: "UTC",
                })
              }}
              -
              {{
                new Date(range.end).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  timeZone: "UTC",
                })
              }}
              <img
                class="x-icon"
                :src="SVGs.XIconSvg"
                alt=""
                @click="removeDateRange(index)"
              />
            </p>
            <div class="date-range-input">
              <input type="date" v-model="dateRangeInput.start" />
              <p>-</p>
              <input type="date" v-model="dateRangeInput.end" />
              <img
                :src="SVGs.CircleCheckmarkSVG"
                @click="submitNewDateRange()"
              />
            </div>
            <p v-if="dateErrorMessage" class="danger">
              Oops! Looks like a date is missing?
            </p>
          </div>
          <button-standard-with-icon
            text="Save Changes"
            @click="saveChanges()"
          ></button-standard-with-icon>
        </div>
      </div>
    </template>
  </popup-modal>
</template>

<script>
import popupModal from "../../../../../../SharedComponents/SharedComponentsUI/PopupModal.vue";
import SVGs from "../../../../../../assets/SVGs/svgIndex.js";
export default {
  data() {
    return {
      SVGs,
      months: [
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
      ],
      daysOfWeek: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      availabilityRules: {
        dayOfWeek: {
          0: false,
          1: false,
          2: false,
          3: false,
          4: false,
          5: false,
          6: false,
        },
        months: {
          0: false,
          1: false,
          2: false,
          3: false,
          4: false,
          5: false,
          6: false,
          7: false,
          8: false,
          9: false,
          10: false,
          11: false,
        },
        dateRanges: [],
      },
      dateRangeInput: {
        start: undefined,
        end: undefined,
      },
      dateErrorMessage: false,
    };
  },
  methods: {
    closePopup() {
      this.$emit("close-popup");
    },
    saveChanges() {
      let payload = {
        variable: "availabilityRules",
        value: this.availabilityRules,
        clientId: this.employee.userId,
      };
      this.$store.dispatch("editContact", payload);
      this.closePopup();
    },
    submitNewDateRange() {
      if (this.dateRangeInput.start && this.dateRangeInput.end) {
        this.dateErrorMessage = false;
        let item = {
          start: new Date(this.dateRangeInput.start),
          end: new Date(this.dateRangeInput.end),
        };
        this.availabilityRules.dateRanges.push(item);
        this.dateRangeInput = {
          start: undefined,
          end: undefined,
        };
      } else if (!this.dateRangeInput.start || !this.dateRangeInput.end) {
        this.dateErrorMessage = true;
      }
    },
    removeDateRange(index) {
      this.availabilityRules.dateRanges.splice(index, 1);
    },
  },
  created() {
    if (this.employee.availabilityRules) {
      this.availabilityRules = this.employee.availabilityRules;
    }
  },

  props: ["employee"],
  emits: ["close-popup"],
  components: { popupModal },
};
</script>

<style scoped>
.availability-list-item {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.availability-list-item > p {
  width: 100%;
  font-weight: 600;
}

.input-item {
  display: flex;
  flex-direction: row;
  /* width: 100px; */
  align-items: center;
  justify-content: flex-start;
}

.input-item > p {
  width: fit-content;
}

.input-item > input {
  justify-self: left;
  width: 25px;
}

.date-range-input {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
}

.x-icon {
  height: 8px;
  width: 8px;
}

.date-range-input > input {
  padding: 0px;
  margin: 0 5px;
  text-align: center;
}

.date-range-input > img {
  height: 14px;
  width: 14px;
}

.danger {
  color: red;
}
</style>