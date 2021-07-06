<template>
  <section>
    <div class="name-and-photo">
      <img
        :src="
          contact.profilePicture
            ? contact.profilePicture
            : defaultProfilePicture
        "
      />
      <h5 id="client-name">
        {{ contact.firstName }} <br />
        <span> {{ contact.lastName }}</span>
      </h5>
    </div>
    <div class="email-and-phone">
      <h5>{{ contact.phoneNumber }}</h5>
      <h5>{{ contact.emailAddress }}</h5>
    </div>
    <div class="button-wrapper">
      <button-with-drop-down-selections
        text="Actions"
        :actions="actions"
        :clicked="actionsClicked"
      ></button-with-drop-down-selections>
    </div>
  </section>
</template>

<script>
import defaultProfilePicture from "../assets/default-profile-picture.svg";
import ButtonWithDropDownSelections from "./UI/ButtonWithDropDownSelections.vue";

export default {
  data() {
    return {
      defaultProfilePicture,
      actionsClicked: false,
      actions: [
        {
          title: "View",
          danger: false,
          action: this.viewContact,
          args: [this.contact_category, this.contact],
        },
        {
          title: "Email",
          danger: false,
          action: this.composeEmail,
        },
        {
          title: "Edit",
          danger: false,
          action: this.editContact,
        },
        {
          title: "Delete",
          danger: true,
          action: this.deleteContact,
        },
      ],
    };
  },
  methods: {
    viewContact(cat, id) {
      this.$router.push("/contacts/" + cat + "/" + id);
    },
  },
  props: ["contact", "contact_category"],
  components: { ButtonWithDropDownSelections },
};
</script>

<style scoped>
section {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  height: 100px;
  max-height: 100px;
}
img {
  height: 50px;
  margin: 10px;
}

.name-and-photo,
.email-and-phone {
  width: 30%;
  min-width: 30%;
  max-width: 30%;
}
.button-wrapper {
  width: 25%;
  position: relative;
  align-self: center;
  margin: 20px 0px;
  /* height: 100%; */
  min-height: 60px;
}

.name-and-photo {
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: left;
}

.name-and-photo h5 {
  font-weight: normal;
  text-transform: uppercase;
  max-width: 80%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.name-and-photo h5 span {
  font-weight: bold;
}
.email-and-phone h5 {
  margin: 3px;
  font-weight: normal;
}

</style>