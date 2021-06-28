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

    <div class="actions-button-div">
      <div
        :class="actionsClicked ? 'actions-active' : 'actions-inactive'"
        @click="actionsClicked = !actionsClicked"
      >
        <h4>Actions</h4>
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
          <div class="dropdown-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="11.25"
              viewBox="0 0 15 11.25"
            >
              <g
                id="Icon_feather-eye"
                data-name="Icon feather-eye"
                transform="translate(0 -1.875)"
              >
                <path
                  id="Path_181"
                  data-name="Path 181"
                  d="M.625,7.5s2.5-5,6.875-5,6.875,5,6.875,5-2.5,5-6.875,5S.625,7.5.625,7.5Z"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.25"
                />
                <path
                  id="Path_182"
                  data-name="Path 182"
                  d="M9.375,7.5A1.875,1.875,0,1,1,7.5,5.625,1.875,1.875,0,0,1,9.375,7.5Z"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.25"
                />
              </g>
            </svg>
            <h4>View</h4>
          </div>
          <div class="dropdown-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12.5"
              height="10"
              viewBox="0 0 12.5 10"
            >
              <path
                id="Icon_material-email"
                data-name="Icon material-email"
                d="M12.5,2.5H2.5A1.248,1.248,0,0,0,1.256,3.75l-.006,7.5A1.254,1.254,0,0,0,2.5,12.5h10a1.254,1.254,0,0,0,1.25-1.25V3.75A1.254,1.254,0,0,0,12.5,2.5Zm0,2.5-5,3.125L2.5,5V3.75l5,3.125,5-3.125Z"
                transform="translate(-1.25 -2.5)"
              />
            </svg>
            <h4>Email</h4>
          </div>
          <div class="dropdown-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13.1"
              height="13.303"
              viewBox="0 0 19.1 19.303"
            >
              <path
                id="Icon_feather-edit-2"
                data-name="Icon feather-edit-2"
                d="M14.875,2.625a2.475,2.475,0,0,1,3.5,3.5L6.563,17.938,1.75,19.25l1.313-4.812Z"
                transform="translate(-0.875 -0.822)"
                fill="none"
                stroke="#000"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.75"
              />
            </svg>
            <h4>Edit</h4>
          </div>
          <div class="dropdown-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13.5"
              height="15.25"
              viewBox="0 0 17.5 19.25"
            >
              <g
                id="Icon_feather-trash-2"
                data-name="Icon feather-trash-2"
                transform="translate(-1.75 -0.875)"
              >
                <path
                  id="Path_141"
                  data-name="Path 141"
                  d="M2.625,5.25h15.75"
                  fill="none"
                  stroke="red"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.75"
                />
                <path
                  id="Path_142"
                  data-name="Path 142"
                  d="M16.625,5.25V17.5a1.75,1.75,0,0,1-1.75,1.75H6.125a1.75,1.75,0,0,1-1.75-1.75V5.25M7,5.25V3.5A1.75,1.75,0,0,1,8.75,1.75h3.5A1.75,1.75,0,0,1,14,3.5V5.25"
                  fill="none"
                  stroke="red"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.75"
                />
                <path
                  id="Path_143"
                  data-name="Path 143"
                  d="M8.75,9.625v5.25"
                  fill="none"
                  stroke="red"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.75"
                />
                <path
                  id="Path_144"
                  data-name="Path 144"
                  d="M12.25,9.625v5.25"
                  fill="none"
                  stroke="red"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.75"
                />
              </g>
            </svg>
            <h4 id="delete">Delete</h4>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import defaultProfilePicture from "../assets/default-profile-picture.svg";

export default {
  data() {
    return {
      defaultProfilePicture,
      actionsClicked: false,
    };
  },
  computed: {
    actionsActive() {
      return {
        actionsActive: this.actionsClicked,
      };
    },
  },
  props: ["contact"],
};
</script>

<style scoped>
section {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  max-height: 100px;
}
img {
  height: 50px;
  margin: 10px;
}

.name-and-photo,
.email-and-phone,
.actions-button-div {
  width: 30%;
  min-width: 30%;
  max-width: 30%;
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

.actions-button-div {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  justify-items: flex-end;
}

.actions-button {
  outline: 1px solid white;
  width: fit-content;
  display: flex;
  padding: 5px 10px;
  align-items: center;
  justify-items: center;

  border-radius: 5px;
  /* align-content: center; */
  /* justify-content: center; */
}

.actions-active,
.actions-inactive {
  width: fit-content;
  display: flex;
  position: relative;
  margin: auto;
  padding: 5px 10px;
  align-items: center;
  justify-items: center;
  border-radius: 5px;
  top: 100%;
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
  height: 150px;
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
  margin-left: 10px;
}
</style>