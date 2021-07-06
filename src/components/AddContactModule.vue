<template>
  <div class="add-contact-module-wrapper">
    <div class="add-contact-button">
      <button-with-drop-down-selections
        :text="currentlySelectedType"
        :actions="selectableContactTypes"
        :clicked="actionsClicked"
      >
      </button-with-drop-down-selections>
    </div>
    <div id="form-container">
      <add-contact-module-new-client-form
        v-if="currentlySelectedType === `Client`"
      />
      <add-contact-module-new-prospect-form
        v-if="currentlySelectedType === `Prospect`"
      />
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
import AddContactModuleNewClientForm from "./Contact/AddContactModules/AddContactModuleNewClientForm";
import AddContactModuleNewProspectForm from "./Contact/AddContactModules/AddContactModuleNewProspectForm";
import AddContactModuleNewVendorForm from "./Contact/AddContactModules/AddContactModuleNewVendorForm";
import AddContactModuleNewEmployeeForm from "./Contact/AddContactModules/AddContactModuleNewEmployeeForm";
import AddContactModuleNewLocationForm from "./Contact/AddContactModules/AddContactModuleNewLocationForm";
import AddContactModuleNewOrganizerForm from "./Contact/AddContactModules/AddContactModuleNewOrganizerForm";
import ButtonWithDropDownSelections from "./UI/ButtonWithDropDownSelections.vue";

export default {
  data() {
    return {
      contactTypes: [
        {
          title: "Client",
          action: this.selectContactType,
          danger: false,
        },
        {
          title: "Prospect",
          action: this.selectContactType,
          danger: false,
        },
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
      currentlySelectedType: "Client",
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
      this.actionsClicked = !this.actionsClicked;
    },
  },
  components: {
    AddContactModuleNewClientForm,
    AddContactModuleNewProspectForm,
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
  max-height: 100%;
  height: 100%;
  width: 100%;
  justify-items: center;
  justify-content: center;
}

.add-contact-button {
  position: relative;
  min-height: 60px;
}

#form-container {
  z-index: 2;
}
</style>