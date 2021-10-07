<template>
  <div
    id="add-button"
    @click="isClicked = !isClicked"
    @mousedown.prevent=""
    :class="isClicked ? `` : `pointer`"
  >
    <img
      :src="plusButton"
      :class="isClicked ? `clicked` : `unclicked`"
      alt=""
    />

    <div id="add-button-popup-div">
      <transition name="fade1">
        <div v-if="isClicked" id="add-button-popup-container">
          <!-- <base-card-no-heading> -->
          <div id="popup-inner-wrapper">
            <div id="new-container">
              <h3>NEW</h3>
            </div>
            <div id="items">
              <ul>
                <router-link to="/admin/addnewproposal"
                  ><h4>Quick Proposal</h4></router-link
                >
                <router-link to="/admin/saddnewevent"
                  ><h4>Event</h4></router-link
                >
              </ul>
            </div>
          </div>
          <!-- </base-card-no-heading> -->
        </div>
      </transition>
      <transition name="fade">
        <div id="backdrop" v-if="isClicked"></div>
      </transition>
    </div>
  </div>
</template>

<script>
import plusButton from "../../assets/SVGs/plus-sign.svg";

export default {
  data() {
    return {
      plusButton,
      isClicked: false,
    };
  },
};
</script>

<style scoped>
img {
  width: 35%;
  height: 35%;
  margin: 32.5%;
}

#new-container {
  text-align: left;
  border-bottom: 1px solid var(--textColor);
}

h4 {
  text-decoration: none;
}

#items {
  line-height: 2.5;
}
h4:hover {
  text-decoration: solid underline var(--textColor) 1px;
}

#add-button-popup-container {
  position: absolute;
  left: calc(-50% - 20px);
  top: 0;
  padding: 30px;
  background-color: var(--foregroundColor);
  border: 1px solid var(--cardOutline);
  border-radius: 25px;
  z-index: 2;
  cursor: default;
}

ul {
  list-style: none;
  padding: 5px;
  margin: 0;
}

.pointer {
  cursor: pointer;
}
#backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  background-color: black;
  opacity: 0.5;
}
#add-button-popup-div {
  position: relative;
  width: 270px;
}

#add-button {
  cursor: pointer;
  position: relative;
  max-width: 60px;
  height: 60px;
  background-color: var(--foregroundColor);
  border: 1px solid var(--cardOutline);
  border-radius: 50px;
}

.clicked {
  transform: rotate(315deg);
  transition-duration: 0.5s;
}

.unclicked {
  transform: rotate(0);
  transition-duration: 0.5s;
}

.fade-enter-active {
  animation: fade 0.5s;
}

.fade-leave-active {
  animation: fade 0.5s reverse;
}
.fade1-enter-active {
  animation: fade1 0.5s;
}

.fade1-leave-active {
  animation: fade1 0.5s reverse;
}

@keyframes fade {
  from {
    opacity: 0;
  }
}

@keyframes fade1 {
  from {
    opacity: 0;
  }
}
</style>