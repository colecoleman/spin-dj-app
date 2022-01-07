<template>
  <div id="notification-button" @mousedown.prevent="">
    <img :src="SVGs.NotificationBellSVG" alt="" @click="toggleClick()" />
    <transition name="fade1">
      <div id="notification-button-popup-container">
        <base-card
          v-if="isClicked"
          :icon="SVGs.NotificationBellSVG"
          title="Notifications"
        >
          <template v-slot:action1>
            <img
              :src="SVGs.XIconSVG"
              alt=""
              class="x-icon"
              @click="toggleClick()"
            />
          </template>
          <template v-slot:content>
            <div id="popup-inner-wrapper">
              <notification-button-item
                v-for="notification in notificationItems"
                :key="notification.id"
                :notification="notification"
              ></notification-button-item>
            </div>
          </template>
        </base-card>
      </div>
    </transition>
    <transition name="fade">
      <div id="backdrop" v-if="isClicked" @click="toggleClick()"></div>
    </transition>
  </div>
</template>

<script>
import NotificationButtonItem from "./NotificationButtonItem.vue";
import SVGs from "../../../assets/SVGs/svgIndex.js";

export default {
  data() {
    return {
      SVGs,
      isClicked: false,
    };
  },
  methods: {
    toggleClick() {
      this.isClicked = !this.isClicked;
    },
  },
  computed: {
    notificationItems() {
      return this.$store.state.notifications;
    },
  },
  components: { NotificationButtonItem },
};
</script>

<style scoped>
#notification-button-popup-container {
  position: absolute;
  right: -10px;
  top: -10px;
  width: 350px;
  z-index: 3;
  cursor: default;
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

#popup-inner-wrapper {
  height: 350px;
  overflow-y: scroll;
  overflow-x: hidden;
}

#notification-button {
  cursor: pointer;
  position: relative;
  max-width: 60px;
  min-width: 60px;
  height: 60px;
  background-color: var(--foregroundColor);
  border: 1px solid var(--cardOutline);
  border-radius: 50px;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
img {
  height: 20px;
  width: 20px;
  cursor: pointer;
}

.x-icon {
  width: 14px;
  height: 14px;
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

