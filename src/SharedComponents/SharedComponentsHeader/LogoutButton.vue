<template>
  <div id="notification-button" @mousedown.prevent="">
    <img :src="exitDoor" alt="" @click="logout()" />
  </div>
</template>

<script>
import { Auth } from "aws-amplify";
import exitDoor from "../../assets/SVGs/exit-door.svg";

export default {
  data() {
    return {
      exitDoor,
    };
  },
  methods: {
    async logout() {
      try {
        await Auth.signOut();
        this.$router.push("/login");
      } catch (e) {
        this.$store.disatch("addStatus", {
          type: "error",
          note: `Something went wrong: ${e}`,
        });
      }
    },
  },
  computed: {},
};
</script>

<style scoped>
#notification-button {
  cursor: pointer;
  max-width: 60px;
  min-width: 60px;
  height: 60px;
  background-color: var(--foregroundColor);
  border: 1px solid var(--cardOutline);
  border-radius: 50px;
  margin: 10px;
}

#notification-button:hover {
  filter: drop-shadow(0px 0px 0.5px var(--textColor));
}

img {
  height: 35%;
  width: 35%;
  margin: 32.5%;
  cursor: pointer;
}
</style>

