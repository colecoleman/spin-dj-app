<template>
  <Amplify-Authenticator>
    <admin-header></admin-header>
    <div class="content-container">
      <router-view name="content"></router-view>
    </div>
  </Amplify-Authenticator>
</template>

<script>
import AdminHeader from "../../SharedComponents/SharedComponentsHeader/AdminHeader.vue";
import { Auth } from "aws-amplify";
export default {
  components: { AdminHeader },
  async created() {
    let user;
    await Auth.currentAuthenticatedUser().then((res) => {
      user = res;
    });
    await this.$store.dispatch("setUser", user);
    await this.$store.dispatch("getAdminEvents");
    await this.$store.dispatch("setBusinessSettings");
  },
};
</script>

<style scoped>
.content-container {
  height: calc(100% - 130px);
  display: flex;
  width: calc(100% - 40px);
  padding: 20px;
}
</style>