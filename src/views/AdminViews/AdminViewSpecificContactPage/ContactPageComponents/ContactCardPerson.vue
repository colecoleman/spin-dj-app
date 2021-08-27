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
            <h5 id="business-name" v-if="contact.businessName">
              {{ contact.businessName }}
            </h5>
            <h4 id="first-name">{{ contact.firstName }}</h4>
            <h4 id="last-name">{{ contact.lastName }}</h4>
            <p class="contact-contact-information">{{ contact.phoneNumber }}</p>
            <p class="contact-contact-information">
              {{ contact.emailAddress }}
            </p>
          </div>
        </div>
      </div>
    </template>
  </base-card>
</template>

<script>
import defaultProfilePicture from "../../../../assets/default-profile-picture.svg";
import editPen from "../../../../assets/SVGs/edit-pen.svg";

export default {
  data() {
    return {
      defaultProfilePicture,
      editPen,
    };
  },
  props: ["contact", "icon"],
};
</script>

<style scoped>
#wrapper {
  display: flex;
  flex-direction: column;
}

img {
  width: 55px;
  padding: 10px;
}

#first-name {
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
  padding: 10px;
}

#contact-information {
  text-align: left;
}

#contact-card-lower-div {
  display: flex;
  flex-direction: row;
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
  /* margin: 5px; */
  font-size: 8pt;
}

input {
  background-color: black;
  color: white;
  font-family: Montserrat, sans-serif;
  border: none;
  border-bottom: 1px solid white;
  width: 80%;
  margin: 0;
  text-align: right;
}

input:focus {
  outline: none;
}
</style>