<template>
  <div id="not-found-wrapper">
    <div id="copy-wrapper">
      <h1>Well, darn.</h1>
      <div>
        <p>
          We've tried everything we can think of, and we can't seem to find what
          you're looking for.
        </p>
        <p><span>Try one of these links here to get back on track!</span></p>
      </div>
    </div>
    <div id="button-group">
      <button-standard-with-icon text="Log Out" @click="logout" />
      <button-standard-with-icon text="Go To Dashboard" @click="home" />
    </div>
  </div>
</template>
<script>
import ButtonStandardWithIcon from "../../Components/SharedComponentsUI/ButtonStandardWithIcon.vue";
import { Auth } from "aws-amplify";
export default {
  data() {
    return {};
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
    home() {
      this.$router.push("/");
    },
  },
  created() {},
  components: { ButtonStandardWithIcon },
  props: [],
};
</script>
<style scoped>
#not-found-wrapper {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  overflow: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

#copy-wrapper,
#button-group {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 30%;
  width: 80%;
}

#button-group {
  max-width: 300px;
}

#button-group div {
  margin: 10px;
}

p,
h1 {
  text-align: right;
}

h1 {
  text-transform: uppercase;
}
p {
  font-size: 1em;
}

span {
  font-style: italic;
}

@media screen and (min-width: 800px) {
  #not-found-wrapper {
    flex-direction: row;
    justify-items: space-evenly;
    align-items: center;
  }

  #copy-wrapper,
  #button-group {
    height: unset;
    width: 40%;
  }
}
</style>