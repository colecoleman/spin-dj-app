<template>
  <div class="edit-card-wrapper">
    <base-card
      :actionIcon="SVGs.XIconSVG"
      title="Edit Event"
      @action-one-clicked="closeEditCard()"
    >
      <template v-slot:action1></template>
      <template v-slot:content>
        <div class="edit-card-inner-wrapper">
          <select v-model="fieldToEdit">
            <option v-for="(field, key) in fields" :key="key" :value="key">
              {{ field.display }}
            </option>
          </select>
          <div v-if="fieldToEdit != undefined">
            <input
              :type="fields[fieldToEdit].inputType"
              v-model="fields[fieldToEdit].value"
              :placeholder="
                fieldToEdit === 'date'
                  ? formatDate(event.data[fieldToEdit])
                  : fieldToEdit === ('startTime' || 'endTime')
                  ? formatTime(event.data[fieldToEdit])
                  : event[fieldToEdit]
              "
            />
            <div class="button-wrapper">
              <button-standard-with-icon text="Save" @click="saveField()" />
            </div>
          </div>
        </div>
      </template>
    </base-card>
  </div>
</template>

<script>
import { formatDate, formatTime } from "../../helpers.js";
import SVGs from "../../assets/SVGs/svgIndex.js";

export default {
  data() {
    return {
      SVGs,
      photoFile: undefined,
      fieldToEdit: undefined,
      fields: {
        startTime: {
          display: "Start Time",
          inputType: "time",
          value: undefined,
        },
        endTime: {
          display: "End Time",
          inputType: "time",
          value: undefined,
        },
        date: {
          display: "Date",
          inputType: "date",
          value: undefined,
        },
        title: {
          display: "Title",
          inputType: "text",
          value: undefined,
        },
      },
    };
  },
  methods: {
    formatDate,
    formatTime,
    closeEditCard() {
      this.$emit("closeEditCard");
    },
    async saveField() {
      let payload = {
        eventId: this.event.userId,
        variable: undefined,
        value: undefined,
      };
      if (this.fieldToEdit === "date") {
        let array = this.fields[this.fieldToEdit].value.split("-");
        let data = Object.assign({}, this.event.data);
        data.date = new Date(array[0], array[1] - 1, array[2]);
        payload.value = data;
        payload.variable = "data";
      }
      if (this.fieldToEdit === "startTime") {
        let timeArray = this.fields.startTime.value.split(":");
        let eventDate = new Date(payload.value.date);
        eventDate.setHours(eventDate.getHours() + timeArray[0]);
        eventDate.setMinutes(eventDate.getMinutes() + timeArray[1]);
        let data = Object.assign({}, this.event.data);
        data.startTime = eventDate;
        payload.value = data;
        payload.variable = "data";
      }
      if (this.fieldToEdit === "endTime") {
        let timeArray = this.fields.endTime.value.split(":");
        let eventDate = new Date(payload.value.date);
        eventDate.setHours(eventDate.getHours() + timeArray[0]);
        eventDate.setMinutes(eventDate.getMinutes() + timeArray[1]);
        if (new Date(payload.value.startTime) > eventDate) {
          eventDate.setDate(eventDate.getDate() + 1);
        }
        let data = Object.assign({}, this.event.data);
        data.endTime = eventDate;
        payload.value = data;
        payload.variable = "data";
      }
      if (this.fieldToEdit === "title") {
        payload.variable = "title";
        payload.value = this.fields[this.fieldToEdit].value;
      }

      this.$store.dispatch("editEvent", payload).then((res) => {
        this.$emit("editEvent", res.data.Attributes);
        this.$store.commit("addStatus", {
          type: "success",
          note: "Event Successfully Edited",
        });
        this.closeEditCard();
      });
    },
  },
  emits: ["editEvent"],
  props: ["event"],
};
</script>

<style scoped>
.edit-card-wrapper {
  position: absolute;
  right: -50px;
  top: -100%;
  z-index: 3;
  width: 300px;
}

.button-wrapper {
  padding: 10px;
}
input {
  margin: 10px;
}
</style>
