<template>
  <div
    id="add-button"
    @click="toggleClick()"
    @mousedown.prevent=""
    :class="isClicked ? `` : `pointer`"
  >
    <svg
      width="24"
      height="24"
      viewBox="0 0 30.553 30.553"
      :class="isClicked ? `clicked` : `unclicked`"
    >
      <path
        d="M37.616,22.339H26.144V10.867a1.9,1.9,0,0,0-3.8,0V22.339H10.867a1.9,1.9,0,0,0,0,3.8H22.339V37.616a1.9,1.9,0,0,0,3.8,0V26.144H37.616a1.9,1.9,0,0,0,0-3.8Z"
        transform="translate(-8.965 -8.965)"
        fill="#fff"
      />
    </svg>
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
                <router-link to="/addnewproposal"
                  ><h4>Quick Proposal</h4></router-link
                >
                <router-link to="/addnewevent"><h4>Event</h4></router-link>
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
// import BaseCardNoHeading from "../UI/BaseCardNoHeading.vue";
export default {
  data() {
    return {
      isClicked: false,
    };
  },
  methods: {
    toggleClick() {
      this.isClicked = !this.isClicked;
    },
  },
  computed: {
    clickHandler() {
      return this.isClicked === true ? "clicked" : "unclicked";
    },
  },
  // components: { BaseCardNoHeading },
};
</script>

<style scoped>
svg {
  transform: rotate(45deg);
}

/* h3 {
  font-size: 20px;
  width: 100%;
  padding: 5px;
} */

/* #popup-inner-wrapper { */
/* width: 100%; */
/* height: 100%; */
/* } */

#new-container {
  text-align: left;
  color: white;
  border-bottom: 1px solid white;
}

a {
  color: white;
  text-decoration: none;
}

#items {
  /* width: 100%; */
  line-height: 2.5;
}
#items h4:hover {
  text-decoration: solid underline white 1px;
}

#add-button-popup-container {
  position: absolute;
  left: calc(-50% - 20px);
  top: 0;
  padding: 30px;
  background-color: black;
  border: 1px solid white;
  border-radius: 25px;
  z-index: 3;

  cursor: default;
}

ul {
  list-style: none;
  padding: 5px;
  margin: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
}

#items {
  text-align: left;
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
  display: inline;
  position: relative;
  max-width: 60px;
  height: 60px;
  background-color: black;
  border-radius: 50px;
  margin: 10px;
  flex: 1;
}
svg {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 20px;
  z-index: 12;
}

.clicked {
  transform: rotate(315deg);
  transition-duration: 0.5s;
  fill: black;
}

.unclicked {
  transform: rotate(0);
  transition-duration: 0.5s;
}

.grow-enter-active {
  animation: grow-popup 0.5s;
}

.grow-leave-active {
  animation: grow-popup 0.5s reverse;
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

@keyframes grow-popup {
  from {
    width: 55px;
    height: 55px;
    position: absolute;
    right: 0px;
    bottom: 55px;
    opacity: 0;
    font-size: 0pt;
  }
  to {
    width: 200px;
    height: 160px;
    right: 0px;
    position: absolute;
    opacity: 1;
    font-size: 20pt;
  }
}

@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 0.5;
  }
}

@keyframes fade1 {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>