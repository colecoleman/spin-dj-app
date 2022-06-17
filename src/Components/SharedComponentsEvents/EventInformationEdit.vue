<template>
  <backdrop id="edit-card-wrapper" @click.self="closeEditCard">
    <div id="edit-card">
      <div id="information-edit-section">
        <div
          class="information-item"
          v-for="(item, key, index) in fields"
          :key="index"
        >
          <p>{{ key }}:</p>
          <div
            class="information-and-pen"
            v-if="!checkIfEditArrayContainsField(key)"
          >
            <p>
              <span>{{ item.display }}</span>
            </p>
            <round-icon-button svg="edit-pen" @click="toggleEditField(key)" />
          </div>
          <div
            class="information-and-pen"
            v-if="checkIfEditArrayContainsField(key)"
          >
            <component
              :is="item.component"
              v-bind="item.componentParameters"
              :processing="processing"
              @date-chosen="dateChosen"
              @save-time="timeChosen"
              @input="textInput"
              @actionable-icon-clicked="actionableIconClicked"
              @close="toggleEditField(key)"
            />
          </div>
        </div>
      </div>
    </div>
  </backdrop>
</template>

<script>
import { formatDate, formatTime } from "../../helpers.js";
import Backdrop from "../SharedComponentsUI/Backdrop.vue";
import RoundIconButton from "../SharedComponentsUI/RoundIconButton.vue";
import InputWithActionableIcon from "../SharedComponentsUI/ElementLibrary/InputWithActionableIcon.vue";
import DatePicker from "../SharedComponentsUI/ElementLibrary/DatePicker.vue";
import TimePicker from "../SharedComponentsUI/ElementLibrary/TimePicker.vue";

export default {
  data() {
    return {
      photoFile: undefined,
      fieldToEdit: undefined,
      titleInput: undefined,
      activeEditField: undefined,
      processing: false,
    };
  },
  computed: {
    fields() {
      const {
        data: { date, startTime, endTime },
        title,
      } = this.event;

      return {
        "Event Title": {
          data: title,
          display: title,
          component: InputWithActionableIcon,
          componentParameters: {
            placeholder: title,
            svg: this.processing ? "loading" : "circle-checkmark",
          },
        },
        "Start Time": {
          data: startTime,
          display: formatTime(startTime),
          component: TimePicker,
          componentParameters: {
            date: date,
            time: startTime,
          },
        },
        "End Time": {
          data: endTime,
          display: formatTime(endTime),
          component: TimePicker,
          componentParameters: {
            date: date,
            time: endTime,
          },
        },
        "Event Date": {
          data: date,
          display: formatDate(date),
          component: DatePicker,
          componentParameters: {
            chosenDate: date,
          },
        },
      };
    },
  },
  methods: {
    async dateChosen(date) {
      this.processing = true;
      let payload = {
        eventKey: { userId: this.event.userId, tenantId: this.event.tenantId },
        variable: undefined,
        value: undefined,
      };
      let data = Object.assign({}, this.event.data);
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
      await this.$store.dispatch("editEvent", payload);
      this.processing = false;
      this.toggleEditField("Event Date");
    },
    async timeChosen(time) {
      this.processing = true;
      let payload = {
        eventKey: { userId: this.event.userId, tenantId: this.event.tenantId },
        variable: undefined,
        value: undefined,
      };
      if (this.activeEditField === "Start Time") {
        let eventDate = new Date(this.event.data.date);
        eventDate.setHours(time.getHours());
        eventDate.setMinutes(time.getMinutes());
        let data = Object.assign({}, this.event.data);
        data.startTime = eventDate;
        payload.value = data;
        payload.variable = "data";
        await this.$store.dispatch("editEvent", payload);
      }
      if (this.activeEditField === "End Time") {
        let eventDate = new Date(this.event.data.date);
        eventDate.setHours(time.getHours());
        eventDate.setMinutes(time.getMinutes());
        let data = Object.assign({}, this.event.data);
        if (new Date(data.startTime) > eventDate) {
          eventDate.setDate(eventDate.getDate() + 1);
        }
        data.endTime = eventDate;
        payload.value = data;
        payload.variable = "data";
        await this.$store.dispatch("editEvent", payload);
      }
      this.processing = false;
      this.closeEditCard();
    },
    textInput(val) {
      this.titleInput = val;
    },
    async actionableIconClicked() {
      this.processing = true;
      let payload = {
        eventKey: { userId: this.event.userId, tenantId: this.event.tenantId },
        variable: undefined,
        value: undefined,
      };
      payload.variable = "title";
      payload.value = this.titleInput;
      await this.$store.dispatch("editEvent", payload);
      this.processing = false;
      this.closeEditCard();
    },
    closeEditCard() {
      this.$emit("close-edit-card");
    },
    checkIfEditArrayContainsField(field) {
      if (field === this.activeEditField) {
        return true;
      } else {
        return false;
      }
    },
    toggleEditField(field) {
      if (field !== this.activeEditField) {
        this.activeEditField = field;
      } else {
        this.activeEditField = undefined;
      }
    },
    fieldInput(object, property, value) {
      if (object) {
        object[property] = value;
      } else {
        this[property] = value;
      }
    },
  },
  components: {
    Backdrop,
    RoundIconButton,
    InputWithActionableIcon,
    DatePicker,
    TimePicker,
  },
  props: ["event"],
  emits: ["close-edit-card"],
};
</script>

<style scoped>
#edit-card-wrapper {
  z-index: 100;
  backdrop-filter: blur(3px);
}
#edit-card {
  background-color: var(--foregroundColor);
  position: absolute;
  right: 30%;
  left: calc(50% - 150px);
  top: 32.5%;
  width: 40%;
  min-width: 300px;
  height: fit-content;
  border-radius: 10px;
  filter: drop-shadow(0px 4px 3px var(--cardOutline));
}

#information-edit-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-wrap: wrap;
  height: 100%;
  box-sizing: border-box;
  padding: 10%;
}
.information-item {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 20px;
}

.information-and-pen {
  display: flex;
  align-items: center;
  /* position: relative; */
}

.input-with-title {
  height: 10px;
  width: 60px;
  padding: 0;
  margin: 0;
  border-color: var(--cardOutline);
  height: fit-content;
}

p {
  text-align: left;
  margin: 0px;
}

p > span {
  font-weight: 600;
  cursor: pointer;
}
@media screen and (min-width: 800px) {
  #edit-card-wrapper {
    z-index: 100;
    backdrop-filter: blur(3px);
  }
  #edit-card {
    background-color: var(--foregroundColor);
    position: absolute;
    right: 30%;
    left: 30%;
    top: 32.5%;
    width: 40%;
    height: 35%;
    border-radius: 10px;
    filter: drop-shadow(0px 4px 3px var(--cardOutline));
  }

  #information-edit-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    flex-wrap: wrap;
    height: 100%;
    box-sizing: border-box;
    padding: 10%;
  }
  .information-item {
    flex: 1 1 50px;
    display: flex;
    flex-direction: column;
    max-width: 50%;
    padding-bottom: unset;
  }

  .information-and-pen {
    display: flex;
    align-items: center;
    /* position: relative; */
  }

  .input-with-title {
    height: 10px;
    width: 60px;
    padding: 0;
    margin: 0;
    border-color: var(--cardOutline);
    height: fit-content;
  }

  p {
    text-align: left;
    margin: 0px;
  }

  p > span {
    font-weight: 600;
    cursor: pointer;
  }
}
</style>
