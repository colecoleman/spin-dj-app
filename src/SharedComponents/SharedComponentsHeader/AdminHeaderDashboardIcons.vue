<template>
  <div
    id="admin-header-dashboard-menu"
    :class="menuActive ? 'menuActive' : 'stack'"
    @click.self="menuSelected()"
  >
    <round-icon-button
      v-for="(icon, index) in icons"
      :key="index"
      :svg="icon.svg"
      :class="menuActive ? 'button' : 'stacked button'"
      :style="`z-index: ${index}; ${
        menuActive
          ? calculateExpandedMargin(index) + index
          : calculateStackedMargin(index)
      }`"
      @click="navigateToIconDashboard(icon)"
    />
  </div>
</template>
<script>
import RoundIconButton from "../SharedComponentsUI/RoundIconButton.vue";
export default {
  data() {
    return {
      icons: [
        {
          svg: "dashboard",
          routerName: "dashboard",
        },
        {
          svg: "music",
          routerName: "library",
        },
      ],
      menuActive: false,
    };
  },
  methods: {
    async navigateToIconDashboard(icon) {
      await this.$router.push({ name: icon.routerName });
      this.findmenuActiveIcon();
      this.menuSelected();
    },
    findmenuActiveIcon() {
      let routeName = this.$router.currentRoute.value.name;
      let matchingIcon = this.icons.findIndex((x) => {
        return x.routerName == routeName;
      });
      if (matchingIcon > -1) {
        let icon = this.icons[matchingIcon];
        this.icons.splice(matchingIcon, 1);
        this.icons.push(icon);
      }
      this.icons = [...this.icons];
    },
    calculateExpandedMargin(index) {
      console.log(window.innerWidth);
      let pxMultitude = undefined;
      if (window.innerWidth < 800) {
        pxMultitude = 40;
      } else if (window.innerWidth > 800 && window.innerWidth < 1200) {
        pxMultitude = 55;
      } else {
        pxMultitude = 70;
      }
      return `margin-bottom: ${index * pxMultitude}px;`;
    },
    calculateStackedMargin(index) {
      return `margin-top: ${index * 5}px`;
    },
    menuSelected() {
      this.menuActive = !this.menuActive;
    },
  },
  created() {
    this.findmenuActiveIcon();
  },
  components: { RoundIconButton },
  props: [],
};
</script>
<style scoped>
#admin-header-dashboard-menu {
  min-width: 30px;
  align-self: flex-start;
  display: flex;
  justify-content: space-between;
  z-index: 10;
  max-height: 90px;
}

.menuActive {
  background-color: var(--foregroundColor);
  outline: 1px solid var(--cardOutline);
  padding: 5px;
  flex-direction: column-reverse;
  align-content: flex-start;
  justify-content: flex-end;
  justify-items: flex-start;
  align-items: flex-end;
  border-radius: 100px;
  position: relative;
  min-height: 70px;
  margin: -5px 5px;
}

.stack {
  margin: 0 10px;
  display: unset;
  position: relative;
  height: 60px;
  max-height: 90px;
  margin-top: 0;
}

.button {
  position: absolute;
  min-width: 30px;
  height: 30px;
  min-height: 30px;
  margin-right: 0;
  margin-left: 0;
}
.stacked {
  position: absolute;
  margin-top: 0;
}

@media screen and (min-width: 800px) {
  #admin-header-dashboard-menu {
    min-width: 40px;
    max-height: 180px;
  }

  .menuActive {
    min-height: 95px;
  }

  .stack {
    height: 60px;
  }

  .button {
    width: 40px;
    min-width: 40px;
    min-height: 40px;
    height: 40px;
    border-radius: 40px;
  }
}
@media screen and (min-width: 1200px) {
  #admin-header-dashboard-menu {
    min-width: 60px;
    max-height: 180px;
  }

  .menuActive {
    min-height: 135px;
  }

  .stack {
    height: 60px;
  }

  .button {
    width: 60px;
    min-width: 60px;
    min-height: 60px;
    border-radius: 60px;
  }
}
</style>