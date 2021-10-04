<template>
  <base-card :icon="icon" :actionIcon="editPen">
    <template v-slot:title>Contact</template>
    <template v-slot:action1></template>
    <template v-slot:content>
      <div id="wrapper">
        <div id="contact-card-upper-div">
          <img
            :src="
              contact.profilePicture
                ? contact.profilePicture
                : defaultProfilePicture
            "
            alt=""
          />
          <div id="contact-information">
            <div id="business-name-and-category">
              <h4 id="business-name">{{ contact.businessName }}</h4>

              <h4 v-if="contact.vendorCategory" id="vendor-category">
                {{ contact.vendorCategory }}
              </h4>
              <h4 v-if="!contact.vendorCategory" id="vendor-category">
                Uncategorized
              </h4>
            </div>
            <h4 id="first-name">{{ contact.given_name }}</h4>
            <h4 id="last-name">{{ contact.family_name }}</h4>
            <p class="contact-contact-information">
              {{ formatPhoneNumber(contact.phoneNumber) }}
            </p>
            <p class="contact-contact-information">
              {{ contact.email }}
            </p>
          </div>
        </div>
        <div id="contact-card-lower-div"></div>
      </div>
    </template>
  </base-card>
</template>

<script>
import defaultProfilePicture from "../../../../assets/default-profile-picture.svg";
import editPen from "../../../../assets/SVGs/edit-pen.svg";
import helpers from "../../../../helpers.js";
export default {
  data() {
    return {
      defaultProfilePicture,
      editPen,
    };
  },
  methods: {
    formatPhoneNumber: helpers.formatPhoneNumber,
  },
  props: ["contact", "icon"],
};
</script>

<style scoped>
#wrapper {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

img {
  width: 55px;
  padding: 10px;
}

#business-name-and-category {
  margin: 10px 0;
}

#business-name {
  margin-bottom: 5px;
  border-bottom: 1px solid black;
}

#vendor-category {
  font-size: 8pt;
}

#first-name,
#last-name {
  font-weight: normal;
}

#last-name {
  padding-bottom: 10px;
}

.contact-contact-information {
  font-size: 10pt;
  margin: 2px;
}

#contact-card-upper-div {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
}

#contact-information {
  text-align: left;
}

#contact-card-lower-div {
  display: flex;
  flex-direction: column;
  margin: 10px 0;
}

.contact-card-lower-div-half {
  width: 50%;
  justify-content: center;
  justify-items: center;
  align-content: center;
  align-items: center;
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
</style>