<template>
  <div id="wrapper">
    <div id="contact-card-upper-div">
      <img
        :src="
          contact.profilePicture
            ? contact.profilePicture
            : defaultProfilePicture
        "
        alt=""
      /><svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 10 10"
      >
        <path
          id="Icon_awesome-pen"
          data-name="Icon awesome-pen"
          d="M5.678,1.821l2.5,2.5L2.749,9.751.52,10A.469.469,0,0,1,0,9.479L.251,7.248,5.678,1.821Zm4.047-.372L8.551.275a.938.938,0,0,0-1.326,0l-1.1,1.1,2.5,2.5,1.1-1.1a.938.938,0,0,0,0-1.326Z"
          transform="translate(0 0)"
        />
      </svg>
      <h4 id="first-name">{{ contact.firstName }}</h4>
      <h4 id="last-name">{{ contact.lastName }}</h4>
      <p class="contact-contact-information">{{ contact.phoneNumber }}</p>
      <p class="contact-contact-information">{{ contact.emailAddress }}</p>
    </div>
    <div id="contact-card-lower-div">
      <div class="contact-card-lower-div-half">
        <div class="indented-item">
          <h5>Created:</h5>
          <h5 class="indented">{{ contact.createdDate }}</h5>
        </div>
        <div class="indented-item">
          <h5>Last Login:</h5>
          <h5 class="indented">{{ contact.lastLogin }}</h5>
        </div>
      </div>
      <div class="contact-card-lower-div-half">
        <div class="indented-item">
          <h5>Source:</h5>
          <h5 class="indented" v-if="!editSourceOpen">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="8"
              height="8"
              viewBox="0 0 10 10"
              @click="editSourceOpen = true"
            >
              <path
                id="Icon_awesome-pen"
                data-name="Icon awesome-pen"
                d="M5.678,1.821l2.5,2.5L2.749,9.751.52,10A.469.469,0,0,1,0,9.479L.251,7.248,5.678,1.821Zm4.047-.372L8.551.275a.938.938,0,0,0-1.326,0l-1.1,1.1,2.5,2.5,1.1-1.1a.938.938,0,0,0,0-1.326Z"
                transform="translate(0 0)"
              />
            </svg>
            {{ contact.source }}
          </h5>
          <input
            type="text"
            :placeholder="contact.source"
            v-model="editSourceField"
            v-if="editSourceOpen"
            @keyup.enter="editContactField(`source`, editSourceField)"
          /><svg
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="11"
            viewBox="0 0 13.6 13.6"
            v-if="editSourceOpen"
          >
            <path
              id="Icon_awesome-check-circle"
              data-name="Icon awesome-check-circle"
              d="M13.928,7.128a6.8,6.8,0,1,1-6.8-6.8A6.8,6.8,0,0,1,13.928,7.128Zm-7.587,3.6,5.045-5.045a.439.439,0,0,0,0-.62l-.62-.62a.439.439,0,0,0-.62,0L6.031,8.557,4.11,6.636a.439.439,0,0,0-.62,0l-.62.62a.439.439,0,0,0,0,.62l2.852,2.852A.439.439,0,0,0,6.342,10.729Z"
              transform="translate(-0.328 -0.328)"
              fill="#fff"
              @click="editContactField(`source`, editSourceField)"
            />
          </svg>
        </div>
        <div class="indented-item">
          <h5>Lifetime Value:</h5>
          <h5 class="indented" v-if="!editLifetimeValueOpen">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="8"
              height="8"
              viewBox="0 0 10 10"
              @click="editLifetimeValueOpen = true"
            >
              <path
                id="Icon_awesome-pen"
                data-name="Icon awesome-pen"
                d="M5.678,1.821l2.5,2.5L2.749,9.751.52,10A.469.469,0,0,1,0,9.479L.251,7.248,5.678,1.821Zm4.047-.372L8.551.275a.938.938,0,0,0-1.326,0l-1.1,1.1,2.5,2.5,1.1-1.1a.938.938,0,0,0,0-1.326Z"
                transform="translate(0 0)"
              />
            </svg>
            {{ `$${contact.lifetimeValue * 0.01} ` }}
          </h5>
          <input
            type="text"
            :placeholder="contact.lifetimeValue * 0.01"
            v-model="editLifetimeValueField"
            v-if="editLifetimeValueOpen"
            @keyup.enter="
              editContactField('lifetimeValue', editLifetimeValueField * 100)
            "
          /><svg
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="11"
            viewBox="0 0 13.6 13.6"
            v-if="editLifetimeValueOpen"
          >
            <path
              id="Icon_awesome-check-circle"
              data-name="Icon awesome-check-circle"
              d="M13.928,7.128a6.8,6.8,0,1,1-6.8-6.8A6.8,6.8,0,0,1,13.928,7.128Zm-7.587,3.6,5.045-5.045a.439.439,0,0,0,0-.62l-.62-.62a.439.439,0,0,0-.62,0L6.031,8.557,4.11,6.636a.439.439,0,0,0-.62,0l-.62.62a.439.439,0,0,0,0,.62l2.852,2.852A.439.439,0,0,0,6.342,10.729Z"
              transform="translate(-0.328 -0.328)"
              fill="#fff"
              @click="
                editContactField('lifetimeValue', editLifetimeValueField * 100)
              "
            />
          </svg>
        </div>
      </div>
    </div>
    <h5>Reset user password</h5>
  </div>
</template>

<script>
import defaultProfilePicture from "../../../assets/default-profile-picture.svg";

export default {
  data() {
    return {
      defaultProfilePicture,
      editSourceOpen: false,
      editSourceField: undefined,
      editLifetimeValueOpen: false,
      editLifetimeValueField: undefined,
    };
  },
  methods: {
    editContactField(key, value) {
      if (key === "source") {
        this.editSourceOpen = false;
      }
      if (key === "lifetimeValue") {
        this.editLifetimeValueOpen = false;
      }
      let id = this.contact.id;
      this.$store.dispatch("editClient", { id, key, value });
    },
  },
  props: ["contact"],
};
</script>

<style scoped>
#wrapper {
  display: flex;
  flex-direction: column;
}
svg {
  fill: white;
  cursor: pointer;
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
}

#contact-card-upper-div > svg {
  position: absolute;
  top: calc(25% - 16px);
  cursor: pointer;
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
  margin: 5px;
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