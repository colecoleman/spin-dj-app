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
      <h5>{{ contact.given_name }}</h5>
      <h5>
        <span>{{ contact.family_name }}</span>
      </h5>
    </div>

    <div id="contact-carousel-item-contact-information">
      <p>{{ contact.phoneNumber }}</p>
      <p>{{ contact.email }}</p>
    </div>
  </div>
</template>

<script>
import defaultProfilePicture from "../../../assets/default-profile-picture.svg";
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
  width: 65px;
  height: 65px;
  padding: 10px;
  object-fit: cover;
  border-radius: 50%;
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
  margin: 5px;
}
</style>