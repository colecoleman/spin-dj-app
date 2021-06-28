<template>
  <div class="add-contact-module-wrapper">
    <div class="actions-button-div">
      <div
        :class="actionsClicked ? 'actions-active' : 'actions-inactive'"
        @click="actionsClicked = !actionsClicked"
      >
        <h4>{{ currentlySelectedType }}</h4>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="13.604"
          height="13.604"
          viewBox="0 0 13.604 13.604"
          id="arrow"
        >
          <path
            id="Icon_awesome-arrow-alt-circle-down"
            data-name="Icon awesome-arrow-alt-circle-down"
            d="M14.2,7.4A6.8,6.8,0,1,1,7.4.594,6.8,6.8,0,0,1,14.2,7.4ZM6.189,4.214V7.4H4.244a.329.329,0,0,0-.233.562l3.151,3.135a.326.326,0,0,0,.464,0l3.151-3.135a.329.329,0,0,0-.233-.562H8.6V4.214a.33.33,0,0,0-.329-.329H6.518A.33.33,0,0,0,6.189,4.214Z"
            transform="translate(-0.594 -0.594)"
          />
        </svg>
        <div class="dropdown-menu" v-if="actionsClicked">
          <div
            class="dropdown-item"
            v-for="(item, index) in selectableContactTypes()"
            :key="index"
            @click="selectContactType(item)"
          >
            <h4>{{ item }}</h4>
          </div>
        </div>
      </div>
    </div>
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
</template>

<script>
import AddContactModuleNewClientForm from "./Contact/AddContactModules/AddContactModuleNewClientForm";
import AddContactModuleNewProspectForm from "./Contact/AddContactModules/AddContactModuleNewProspectForm";
import AddContactModuleNewVendorForm from "./Contact/AddContactModules/AddContactModuleNewVendorForm";
import AddContactModuleNewEmployeeForm from "./Contact/AddContactModules/AddContactModuleNewEmployeeForm";
import AddContactModuleNewLocationForm from "./Contact/AddContactModules/AddContactModuleNewLocationForm";
import AddContactModuleNewOrganizerForm from "./Contact/AddContactModules/AddContactModuleNewOrganizerForm";

export default {
  data() {
    return {
      actionsClicked: false,
      contactTypes: [
        "Client",
        "Prospect",
        "Employee",
        "Vendor",
        "Venue + Location",
        "Organizer",
      ],
      currentlySelectedType: "Client",
    };
  },
  methods: {
    selectContactType(type) {
      this.currentlySelectedType = type;
    },
    selectableContactTypes() {
      var currentSelection = this.currentlySelectedType;
      return this.contactTypes.filter(function (type) {
        return type !== currentSelection;
      });
    },
  },
  components: {
    AddContactModuleNewClientForm,
    AddContactModuleNewProspectForm,
    AddContactModuleNewEmployeeForm,
    AddContactModuleNewVendorForm,
    AddContactModuleNewLocationForm,
    AddContactModuleNewOrganizerForm,
  },
};
</script>

<style scoped>
.add-contact-module-wrapper {
  max-height: 80%;
}

.actions-button-div {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  justify-items: flex-end;
}

.actions-button-div h4 {
  font-size: 10pt;
}

.actions-active,
.actions-inactive {
  width: fit-content;
  min-width: 70%;
  display: flex;
  position: relative;
  margin: auto;
  padding: 5px 10px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  top: 100%;
  margin-top: 10%;
}

.actions-active h4,
.actions-active svg {
  z-index: 2;
}

.actions-active {
  border: 2px solid white;
  background-color: white;
  color: black;
  fill: black;
}

.actions-inactive {
  color: white;
  fill: white;
  border: 1px solid white;
}

.actions-active svg,
.actions-inactive svg {
  margin: 5px;
}

.actions-active #arrow {
  transform: rotate(180deg);
}

.dropdown-menu {
  width: 103.5%;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: left;
  height: fit-content;
  border-radius: 5px;
  padding-top: 20px;
  z-index: 1;
  top: 50%;
  left: -2%;
  background-color: white;
}

.dropdown-item {
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-items: center;
  justify-content: center;
  margin-bottom: 20px;
}
</style>