<template>
  <base-card-no-heading>
    <div class="button-parent">
      <div class="button-div">
        <button-standard-with-icon
          text="View Forms"
          @click="openForms()"
        ></button-standard-with-icon>
      </div>
      <div class="button-div">
        <button-standard-with-icon
          text="View Invoice"
          @click="openInvoice()"
        ></button-standard-with-icon>
      </div>
      <div class="button-div">
        <button-standard-with-icon
          text="View Contract"
          @click="openContract()"
        ></button-standard-with-icon>
      </div>
      <div class="button-div">
        <button-with-drop-down-selections
          text="Actions"
          :actions="actionsItems"
          :clicked="actionsClicked"
          class="dropdown-button"
        >
        </button-with-drop-down-selections>
      </div>
    </div>
  </base-card-no-heading>
</template>

<script>
import BaseCardNoHeading from "../../../SharedComponents/SharedComponentsUI/BaseCardNoHeading.vue";
import ButtonStandardWithIcon from "../../../SharedComponents/SharedComponentsUI/ButtonStandardWithIcon.vue";
import ButtonWithDropDownSelections from "../../../SharedComponents/SharedComponentsUI/ButtonWithDropDownSelections.vue";

export default {
  data() {
    return {
      actionsItems: [
        {
          title: "postpone",
          action: this.postponeEvent,
          danger: false,
          icon: passingTime,
        },
        {
          title: "edit",
          action: this.editEvent,
          danger: false,
          icon: editPen,
        },
        {
          title: "delete",
          action: this.deleteEvent,
          danger: true,
          icon: trashCan,
        },
      ],
    };
  },
  components: {
    BaseCardNoHeading,
    ButtonStandardWithIcon,
    ButtonWithDropDownSelections,
  },
  props: ["buttons", "dropdown"],
};
</script>

<style scoped>
.button-parent {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.button-div {
  width: 25%;
  height: 100%;
  align-items: center;
  align-content: center;
  justify-content: center;
}

.dropdown-button {
  display: flex;
  flex-direction: column;

  width: 90%;
  margin-top: 8.5px;
  margin-left: 5px;
  text-transform: uppercase;
  padding: 5px 5px 5px 5px;

  border-radius: 7px;
  fill: white;
  position: relative;
}

.dropdown-button > {
  height: calc(100% - 17px);
  /* align-self: center; */
}
</style>