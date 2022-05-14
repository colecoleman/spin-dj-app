<template>
  <div class="edit-card-wrapper">
    <base-card
      actionIcon="x-icon"
      title="Edit Event"
      @action-one-clicked="closeEditCard()"
    >
      <template v-slot:content>
        <div class="edit-card-inner-wrapper">
          <input-with-title
            type="select"
            title="Select Field To Edit"
            :options="fields"
            :inputValue="fields[fieldToEdit]"
            @input="fieldInput(undefined, 'fieldToEdit', $event.field)"
          />

          <input-with-title
            v-if="fieldToEdit != undefined"
            :title="fields[fieldToEdit].display"
            :type="fields[fieldToEdit].inputType"
            :inputValue="fields[fieldToEdit].value"
            @input="fieldInput(fields[fieldToEdit], 'value', $event)"
            :placeholder="
              fieldToEdit === 'date'
                ? formatDate(event.data[fieldToEdit])
                : fieldToEdit === ('startTime' || 'endTime')
                ? formatTime(event.data[fieldToEdit])
                : event[fieldToEdit]
            "
          />

          <button-standard-with-icon
            v-if="fieldToEdit != undefined"
            class="button"
            text="Save"
            @click="saveField()"
          />
        </div>
      </template>
    </base-card>
  </div>
</template>

<script>
import { formatDate, formatTime } from "../../helpers.js";
import InputWithTitle from "../../SharedComponents/SharedComponentsUI/ElementLibrary/InputWithTitle.vue";

export default {
  data() {
    return {
      photoFile: undefined,
      fieldToEdit: undefined,
      fields: {
        startTime: {
          field: "startTime",
          display: "Start Time",
          inputType: "time",
          value: undefined,
        },
        endTime: {
          field: "endTime",
          display: "End Time",
          inputType: "time",
          value: undefined,
        },
        date: {
          field: "date",
          display: "Date",
          inputType: "date",
          value: undefined,
        },
        title: {
          field: "title",
          display: "Title",
          inputType: "text",
          value: undefined,
        },
      },
    };
  },
  computed: {
    options() {
      let arr = Object.values(this.fields);
      return arr.map((x) => {
        return x.display;
      });
    },
  },
  methods: {
    formatDate,
    formatTime,
    closeEditCard() {
      this.$emit("closeEditCard");
    },
    fieldInput(object, property, value) {
      if (object) {
        object[property] = value;
      } else {
        this[property] = value;
      }
    },
    async saveField() {
      let payload = {
        eventKey: { userId: this.event.userId, tenantId: this.event.tenantId },
        variable: undefined,
        value: undefined,
      };
      if (this.fieldToEdit === "date") {
        let array = this.fields[this.fieldToEdit].value.split("-");
        let data = Object.assign({}, this.event.data);
        let date = new Date(array[0], array[1] - 1, array[2]);
        data.date = date;
        let start = new Date(data.startTime);
        let end = new Date(data.endTime);
        end.setMonth(date.getMonth());
        start.setMonth(date.getMonth());
        start.setDate(date.getDate());
        end.setDate(date.getDate());
        start.setFullYear(date.getFullYear());
        end.setFullYear(date.getFullYear());
        if (start > end) {
          end.setDate(end.getDate() + 1);
        }
        data.startTime = start;
        data.endTime = end;
        payload.value = data;
        payload.variable = "data";
      }
      if (this.fieldToEdit === "startTime") {
        let timeArray = this.fields.startTime.value.split(":");
        let eventDate = new Date(this.event.data.date);
        eventDate.setHours(eventDate.getHours() + timeArray[0]);
        eventDate.setMinutes(eventDate.getMinutes() + timeArray[1]);
        let data = Object.assign({}, this.event.data);
        data.startTime = eventDate;
        payload.value = data;
        payload.variable = "data";
      }
      if (this.fieldToEdit === "endTime") {
        let timeArray = this.fields.endTime.value.split(":");
        let eventDate = new Date(this.event.data.date);
        eventDate.setHours(eventDate.getHours() + timeArray[0]);
        eventDate.setMinutes(eventDate.getMinutes() + timeArray[1]);
        let data = Object.assign({}, this.event.data);
        if (new Date(data.startTime) > eventDate) {
          eventDate.setDate(eventDate.getDate() + 1);
        }
        data.endTime = eventDate;
        payload.value = data;
        payload.variable = "data";
      }
      if (this.fieldToEdit === "title") {
        payload.variable = "title";
        payload.value = this.fields[this.fieldToEdit].value;
      }

      this.$store.dispatch("editEvent", payload).then(() => {
        this.closeEditCard();
      });
    },
  },
  components: { InputWithTitle },
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

.button {
  width: 97%;
}
</style>
