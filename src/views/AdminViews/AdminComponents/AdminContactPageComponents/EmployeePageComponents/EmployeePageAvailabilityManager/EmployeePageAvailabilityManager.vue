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
            <div
              class="date-range"
              v-for="(range, index) in availabilityRules.dateRanges"
              :key="index"
            >
              <p>
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
              </p>
              <vue-svg
                svg="x-icon"
                :customStyle="svgStyling"
                @clicked="removeDateRange(index)"
              />
            </div>
            <div class="date-range-input">
              <input type="date" v-model="dateRangeInput.start" />
              <p>-</p>
              <input type="date" v-model="dateRangeInput.end" />
              <vue-svg
                svg="circle-checkmark"
                :customStyle="svgStyling"
                @clicked="submitNewDateRange()"
              />
            </div>
            <p v-if="dateErrorMessage" class="danger">
              Oops! Looks like a date is missing?
            </p>
          </div>
          <button-standard-with-icon
            text="Save Changes"
            @click="saveChanges()"
          />
        </div>
      </div>
    </template>
  </popup-modal>
</template>

<script>
import popupModal from "../../../../../../SharedComponents/SharedComponentsUI/PopupModal.vue";
import VueSvg from "../../../../../../assets/VueSvg.vue";
export default {
  data() {
    return {
      svgStyling: "height: 8px; width: 8px;",
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
        contactKey: {
          tenantId: this.employee.tenantId,
          userId: this.employee.userId,
        },
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
  components: { VueSvg, popupModal },
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

.date-range {
  display: flex;
  align-items: center;
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
  align-content: center;
}

.date-range-input > input {
  padding: 0px;
  margin: 0 5px;
  text-align: center;
}

.danger {
  color: red;
}
</style>