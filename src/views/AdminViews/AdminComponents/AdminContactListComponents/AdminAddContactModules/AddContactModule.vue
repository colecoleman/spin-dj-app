<template>
  <div class="add-contact-module-wrapper">
    <div class="add-contact-button">
      <button-with-drop-down-selections
        :text="currentlySelectedType ? currentlySelectedType : 'Click to add'"
        :actions="selectableContactTypes"
      >
        <template v-slot:icon
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="13.604"
            height="13.604"
            viewBox="0 0 13.604 13.604"
            id="arrow"
            style="margin: 5px"
          >
            <path
              id="Icon_awesome-arrow-alt-circle-down"
              data-name="Icon awesome-arrow-alt-circle-down"
              d="M14.2,7.4A6.8,6.8,0,1,1,7.4.594,6.8,6.8,0,0,1,14.2,7.4ZM6.189,4.214V7.4H4.244a.329.329,0,0,0-.233.562l3.151,3.135a.326.326,0,0,0,.464,0l3.151-3.135a.329.329,0,0,0-.233-.562H8.6V4.214a.33.33,0,0,0-.329-.329H6.518A.33.33,0,0,0,6.189,4.214Z"
              transform="translate(-0.594 -0.594)"
            /></svg
        ></template>
      </button-with-drop-down-selections>
    </div>
    <div id="form-container">
      <add-contact-module-new-client-form
        v-if="currentlySelectedType === `Client`"
      />
      <!-- <add-contact-module-new-prospect-form
        v-if="currentlySelectedType === `Prospect`"
      /> -->
      <add-contact-module-new-vendor-form
        v-if="currentlySelectedType === `Vendor`"
      />
      <add-contact-module-new-employee-form
        v-if="currentlySelectedType === `Employee`"
      />
      <add-contact-module-new-location-form
        v-if="currentlySelectedType === `Venue + Location`"
      />
      <add-contact-module-new-organizer-form
        v-if="currentlySelectedType === `Organizer`"
      />
    </div>
  </div>
</template>

<script>
import AddContactModuleNewClientForm from "./AddContactModuleNewClientForm";
// import AddContactModuleNewProspectForm from "./AddContactModuleNewProspectForm";
import AddContactModuleNewVendorForm from "./AddContactModuleNewVendorForm";
import AddContactModuleNewEmployeeForm from "./AddContactModuleNewEmployeeForm";
import AddContactModuleNewLocationForm from "./AddContactModuleNewLocationForm";
import AddContactModuleNewOrganizerForm from "./AddContactModuleNewOrganizerForm";
import ButtonWithDropDownSelections from "../../../../../SharedComponents/SharedComponentsUI/ButtonWithDropDownSelections.vue";

export default {
  data() {
    return {
      contactTypes: [
        {
          title: "Client",
          action: this.selectContactType,
          danger: false,
        },
        // {
        //   title: "Prospect",
        //   action: this.selectContactType,
        //   danger: false,
        // },
        {
          title: "Employee",
          action: this.selectContactType,
          danger: false,
        },
        {
          title: "Vendor",
          action: this.selectContactType,
          danger: false,
        },
        {
          title: "Venue + Location",
          action: this.selectContactType,
          danger: false,
        },
        {
          title: "Organizer",
          action: this.selectContactType,
          danger: false,
        },
      ],
      currentlySelectedType: undefined,
    };
  },
  computed: {
    selectableContactTypes() {
      var currentSelection = this.currentlySelectedType;
      return this.contactTypes.filter(function (type) {
        return type.title !== currentSelection;
      });
    },
  },
  methods: {
    selectContactType(type) {
      this.currentlySelectedType = type;
      // this.actionsClicked = !this.actionsClicked;
    },
  },
  components: {
    AddContactModuleNewClientForm,
    // AddContactModuleNewProspectForm,
    AddContactModuleNewEmployeeForm,
    AddContactModuleNewVendorForm,
    AddContactModuleNewLocationForm,
    AddContactModuleNewOrganizerForm,
    ButtonWithDropDownSelections,
  },
};
</script>

<style scoped>
.add-contact-module-wrapper {
  height: 100%;
  display: grid;
  grid-template-rows: 60px 1fr;
  grid-template-columns: 1fr;
}

.add-contact-button {
  position: relative;
  width: 100%;
  grid-column: 1;
  grid-row: 1/2;
  min-height: 60px;
}

#form-container {
  grid-row: 2/ 3;
  /* height: 100%; */
  overflow: scroll;
}
</style>