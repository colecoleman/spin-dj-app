

<template>
  <section>
    <base-card>
      <div id="heading-div">
        <h2>Packages</h2>
        <router-link to="/addnewpackage"
          ><svg
            id="plus-svg-for-head"
            width="18"
            height="18"
            viewBox="0 0 30.553 30.553"
          >
            <path
              d="M37.616,22.339H26.144V10.867a1.9,1.9,0,0,0-3.8,0V22.339H10.867a1.9,1.9,0,0,0,0,3.8H22.339V37.616a1.9,1.9,0,0,0,3.8,0V26.144H37.616a1.9,1.9,0,0,0,0-3.8Z"
              transform="translate(-8.965 -8.965)"
              fill="#fff"
            /></svg
        ></router-link>
      </div>
      <div id="body-div">
        <div v-for="item in packages" :key="item.id" class="package-item">
          <div class="package-heading-div">
            <h4>{{ item.packageName }}</h4>
            <div class="edit-and-delete-div">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 15 15"
                @click="editItem(item.id)"
              >
                <path
                  id="Icon_awesome-pen"
                  data-name="Icon awesome-pen"
                  d="M8.517,2.732l3.75,3.751L4.124,14.627.78,15A.7.7,0,0,1,0,14.219l.372-3.346L8.517,2.732Zm6.07-.558L12.826.413a1.407,1.407,0,0,0-1.989,0L9.18,2.069l3.75,3.751,1.657-1.657a1.407,1.407,0,0,0,0-1.99Z"
                  transform="translate(0.001 0)"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13.125"
                height="15"
                viewBox="0 0 13.125 15"
                @click="deleteItem(item)"
              >
                <path
                  id="Icon_awesome-trash"
                  data-name="Icon awesome-trash"
                  d="M12.656.938H9.141L8.865.39A.7.7,0,0,0,8.235,0H4.887A.7.7,0,0,0,4.26.39L3.984.938H.469A.469.469,0,0,0,0,1.406v.937a.469.469,0,0,0,.469.469H12.656a.469.469,0,0,0,.469-.469V1.406a.469.469,0,0,0-.469-.469ZM1.559,13.682A1.406,1.406,0,0,0,2.962,15h7.2a1.406,1.406,0,0,0,1.4-1.318l.621-9.932H.938Z"
                />
              </svg>
            </div>
          </div>
          <div class="main">
            <div class="side-by-side-image-div">
              <img v-if="item.photo" :src="item.photo" alt="" height="50" />
            </div>
            <div class="package-item-inner-wrapper">
              <div class="data-container">
                <div>
                  <div class="service-list-window">
                    <h4>Services:</h4>
                    <h5
                      v-for="service in item.selectedServices"
                      :key="service.id"
                      class="package-item-selected-equipment"
                    >
                      {{ service.serviceName }}
                    </h5>
                    <p class="package-item-needed-employees">
                      <b>Employees Needed:</b>
                      {{ item.employeesNeeded }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="package-item">
          <router-link to="addnewpackage" id="add-new-package-card">
            <h3>Add New package</h3>
            <svg
              id="plus-svg-for-head"
              width="18"
              height="18"
              viewBox="0 0 30.553 30.553"
            >
              <path
                d="M37.616,22.339H26.144V10.867a1.9,1.9,0,0,0-3.8,0V22.339H10.867a1.9,1.9,0,0,0,0,3.8H22.339V37.616a1.9,1.9,0,0,0,3.8,0V26.144H37.616a1.9,1.9,0,0,0,0-3.8Z"
                transform="translate(-8.965 -8.965)"
                fill="#fff"
              /></svg
          ></router-link>
        </div>
      </div>
    </base-card>
  </section>
</template>

<script>
import BaseCard from "../../UI/BaseCard.vue";

//TODO: MAKE DEFAULT IMAGE FOR package

export default {
  data() {
    return {
      packages: [],
      itemPriceDisplay: undefined,
    };
  },

  components: { BaseCard },
  created() {
    this.getpackagesList();
    console.log("created");
  },
};
</script>

<style scoped>
section {
  margin-top: 10px;
  height: calc(100% - 20px);
  width: calc(100%-10px);
}

#heading-div {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 90%;
  margin: auto;
}

#heading-div h2 {
  flex: 1;
  text-align: center;
  margin-left: 18px;
}

#body-div {
  width: 100%;
  height: 100%;
  max-height: 70vh;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-auto-flow: row;
  overflow: scroll;
}

.package-item {
  border: 1px solid white;
  min-height: 120px;
  height: calc(100%-20px);
  border-radius: 20px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
}

.package-item:hover {
  border-color: #00f5ff;
}

.main {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 85%;
  align-items: center;
  align-content: center;

  justify-content: center;
}

.edit-and-delete-div {
  width: 30%;
  padding-top: 5px;
  padding-right: 5px;
  height: calc(15%-5px);
  justify-content: flex-end;
  display: flex;
}

.edit-and-delete-div svg {
  justify-self: right;
  padding: 5px;
  cursor: pointer;
  fill: white;
  width: 20%;
}

.edit-and-delete-div svg:hover {
  fill: #00f5ff;
}

.package-item-inner-wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-items: center;
  justify-content: center;
  overflow: scroll;
}

.package-heading-div {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.package-heading-div h4 {
  width: 100%;
  text-align: center;
  padding: 10px;
}

.package-item-selected-equipment,
.package-item-needed-employees {
  font-size: 10px;
}

.side-by-side-image-div {
  width: 40%;
}

.data-container {
  display: flex;
  flex-direction: row;
  text-align: left;
  width: 100%;
}

img {
  clip-path: circle(25px at center);
}

p {
  margin: 2px;
}

span {
  font-weight: 400;
}

span::after {
  content: " ";
}

#add-new-package-card {
  height: calc(100% - 20px);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-items: center;
  justify-content: center;
  text-decoration: none;
  color: inherit;
}

h4 {
  margin: 0;
  text-transform: none;
  text-align: left;
  width: 80%;
}

#delete-guard {
  padding: 40px;
  /* height: 40%; */
  position: absolute;
  top: 50%;
  left: 50%;
  background: black;
  border: 1px solid white;
  border-radius: 25px;
  z-index: 1;
}
button {
  height: 40px;
  width: 40%;
  margin: 10px;
  background: none;
  border-radius: 20px;
  outline: none;
  border: 1px solid white;
  color: white;
  font-family: montserrat, helvetica, sans-serif;
  text-transform: uppercase;
}

button:hover {
  border: 1px solid #00f5ff;
  color: #00f5ff;
  cursor: pointer;
}

button:active {
  background: rgba(255, 255, 255, 1);
  color: black;
}
</style>
