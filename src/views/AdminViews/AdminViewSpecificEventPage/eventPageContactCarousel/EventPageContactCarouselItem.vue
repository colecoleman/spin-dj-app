<template>
  <div class="contact-carousel-item-wrapper">
    <div id="contact-carousel-item-title-and-picture">
      <h4>{{ contact.role }}</h4>
      <img
        :src="
          contact.profilePicture
            ? contact.profilePicture
            : defaultProfilePicture
        "
        alt="Profile Picture"
      />
    </div>
    <div id="contact-carousel-item-name">
      <h5>{{ contact.firstName }}</h5>
      <h5>
        <span>{{ contact.lastName }}</span>
      </h5>
    </div>

    <div id="contact-carousel-item-contact-information">
      <p>{{ contact.phoneNumber }}</p>
      <p>{{ contact.emailAddress }}</p>
    </div>
  </div>
</template>

<script>
import defaultProfilePicture from "../../../../assets/default-profile-picture.svg";
export default {
  data() {
    return {
      defaultProfilePicture,
    };
  },
  props: ["contact"],
};
</script>

<style scoped>
.contact-carousel-item-wrapper {
  max-width: 40%;
  min-width: 40%;
  height: 95%;
  padding: 5%;
  flex-direction: column;
  justify-content: space-between;
}

img {
  height: 75px;
  width: 75px;
}

h5 {
  font-weight: 300;
  margin: 2px;
  text-transform: uppercase;
}

h5 span {
  font-weight: 600;
}

p {
  font-size: 8pt;
}
</style>