<template>
  <div id="wrapper">
    <div id="sales-launchpad-heading">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="17"
        height="17"
        viewBox="0 0 29 29.008"
      >
        <path
          id="Icon_awesome-rocket"
          data-name="Icon awesome-rocket"
          d="M28.615,1.082a.9.9,0,0,0-.691-.691A20.561,20.561,0,0,0,23.25,0C17.4,0,13.9,3.127,11.279,7.252h-5.9a2.719,2.719,0,0,0-2.429,1.5l-2.8,5.6a1.36,1.36,0,0,0,1.218,1.967H7.244L5.971,17.59a1.813,1.813,0,0,0,0,2.564l2.884,2.884a1.813,1.813,0,0,0,2.564,0l1.273-1.273v5.883a1.36,1.36,0,0,0,1.966,1.218l5.592-2.8a2.714,2.714,0,0,0,1.5-2.431V17.721C25.864,15.1,29,11.58,29,5.762a20.1,20.1,0,0,0-.388-4.68ZM21.757,9.518a2.266,2.266,0,1,1,2.266-2.266,2.266,2.266,0,0,1-2.266,2.266Z"
          transform="translate(-0.004)"
        />
      </svg>

      <h4>Launch</h4>
    </div>
    <div class="launchpad-item-wrapper">
      <base-card>
        <div class="launchpad-item">
          <a href="https://www.gmail.com" target="_blank"><h3>Email</h3></a>
        </div>
      </base-card>
    </div>
    <div class="launchpad-item-wrapper">
      <base-card>
        <div class="launchpad-item">
          <a href="https://www.theknotpro.com" target="_blank"
            ><h3>The Knot Pro</h3></a
          >
        </div>
      </base-card>
    </div>
    <div class="launchpad-item-wrapper">
      <base-card>
        <div class="launchpad-item">
          <a href="https://www.weddingwire.com" target="_blank"
            ><h3>Wedding Wire</h3></a
          >
        </div>
      </base-card>
    </div>
    <div class="launchpad-item-wrapper">
      <base-card>
        <div class="launchpad-item">
          <a href="https://www.facebook.com" target="_blank"
            ><h3>Facebook</h3></a
          >
        </div>
      </base-card>
    </div>
  </div>
</template>

<script>
import BaseCard from "../../../UI/BaseCard.vue";
export default {
  components: { BaseCard },
};
</script>

<style scoped>
#wrapper {
  height: 97%;
  display: flex;
  flex-direction: column;
}
h3 {
  margin: 0;
  text-transform: uppercase;
}
h4 {
  color: black;
}

#sales-launchpad-heading {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  align-content: center;
  padding: 10px;
}

#sales-launchpad-heading svg {
  margin: 5px;
}

.launchpad-item {
  width: 100%;
  align-items: center;
  justify-content: center;
  justify-items: center;
}

.launchpad-item-wrapper {
  margin: auto;
  width: 100%;
}

a {
  color: white;
  text-decoration: none;
}
a.clicked {
  color: white;
}
</style>
