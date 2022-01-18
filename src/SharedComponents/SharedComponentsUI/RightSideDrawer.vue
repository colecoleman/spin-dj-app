<template>
  <transition name="fade">
    <div class="backdrop" @click="this.$emit('closeDrawer')" v-if="open"></div>
  </transition>
  <transition name="slide">
    <div id="right-side-drawer-wrapper" v-if="open">
      <h4 v-for="(item, index) in items" :key="index" @click="item.action">
        {{ item.text }}
      </h4>
    </div>
  </transition>
</template>

<script>
export default {
  props: ["items", "open"],
  emits: ["closeDrawer"],
};
</script>

<style scoped>
.backdrop {
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 3;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
#right-side-drawer-wrapper {
  position: fixed;
  display: flex;
  flex-direction: column;
  padding-top: 100px;
  right: 0;
  top: 0;
  border-left: 10px solid var(--textColor);
  background-color: var(--foregroundColor);
  width: 250px;
  height: 100%;
  z-index: 3;
}

#heading {
  padding: 10px;
  text-transform: uppercase;
  font-size: 20px;
}

h4 {
  text-decoration: none;
  text-align: left;
  font-size: 20px;
  padding: 20px;
  background-image: linear-gradient(90deg, var(--foregroundColor));
  transition: background-image 0.3s linear;
}

h4:hover {
  /* animation: background-slide 0.75s; */
  /* animation-fill-mode: forwards; */
  background: linear-gradient(
    90deg,
    var(--highlightColor),
    var(--foregroundColor) 95%
  );
}

.slide-enter-active {
  animation: slide 0.75s;
}

.slide-leave-active {
  animation: slide 0.75s reverse;
}

.fade-enter-active {
  animation: fade 0.5s;
}

.fade-leave-active {
  animation: fade 0.5s reverse;
}

@keyframes slide {
  from {
    left: calc(100% - 10px);
    /* right: calc(290px - 100%); */
  }
  to {
    /* left: auto; */
    left: calc(100% - 260px);
  }
}

@keyframes background-slide {
  from {
    background: linear-gradient(
      90deg,
      var(--highlightColor) 5%,
      var(--foregroundColor)
    );
  }
  to {
    background: linear-gradient(
      90deg,
      var(--highlightColor),
      var(--foregroundColor) 95%
    );
  }
}

@keyframes fade {
  from {
    opacity: 0;
  }
}
</style>