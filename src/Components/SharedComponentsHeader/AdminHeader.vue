<template>
  <div class="site-header">
    <div class="left buttons">
      <admin-header-dashboard-icons />
      <router-link to="/admin/contacts">
        <round-icon-button class="round-button" svg="group-people" />
      </router-link>
      <router-link to="/admin/config">
        <round-icon-button class="round-button" svg="wrench-gear" />
      </router-link>
    </div>
    <img :src="businessLogo" alt="" />

    <div class="right buttons">
      <router-link to="/admin/createnewevent">
        <round-icon-button class="round-button" svg="plus-sign" />
      </router-link>
      <round-icon-button
        class="round-button"
        @click="logout()"
        svg="exit-door"
      />
    </div>
  </div>
</template>

<script>
import { Auth } from "aws-amplify";
import AdminHeaderDashboardIcons from "./AdminHeaderDashboardIcons.vue";
import RoundIconButton from "../SharedComponentsUI/RoundIconButton.vue";

export default {
  computed: {
    businessLogo() {
      return this.$store.getters.businessLogo;
    },
  },
  methods: {
    async logout() {
      try {
        await Auth.signOut();
        this.$router.push("/login");
      } catch (e) {
        this.$store.dispatch("addStatus", {
          type: "error",
          note: `Something went wrong: ${e}`,
        });
      }
    },
  },

  components: {
    AdminHeaderDashboardIcons,
    RoundIconButton,
  },
};
</script>

<style scoped>
@media screen and (min-width: 320px) {
  .site-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
  }
  .buttons {
    width: 40%;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .right {
    justify-content: flex-end;
  }

  .left {
    justify-content: flex-start;
  }

  .dashboard-button {
    margin: 5px;
    min-width: 30px;
  }

  .site-header img {
    height: 80%;
    max-height: 80%;
    margin: 10px;
  }
  .round-button {
    margin: 5px;
    min-width: 30px;
    height: 30px;
    border-radius: 30px;
  }
  .search {
    height: 30px;
    display: none;
  }
}
@media screen and (min-width: 800px) {
  .site-header {
    height: 40px;
  }
  .round-button {
    width: 40px;
    min-width: 40px;
    min-height: 40px;
    height: 40px;
    border-radius: 40px;
  }
  .dashboard-button {
    min-width: 40px;
  }
  .search {
    min-width: 40px;
    min-height: 40px;
    padding: 0;
    height: 40px;
    border-radius: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
@media screen and (min-width: 1200px) {
  .site-header {
    height: 60px;
  }
  .round-button {
    width: 60px;
    min-width: 60px;
    height: 60px;
    border-radius: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .dashboard-button {
    min-width: 60px;
  }
  .search {
    min-width: 60px;
    height: 60px;
    border-radius: 60px;
  }
}
</style>