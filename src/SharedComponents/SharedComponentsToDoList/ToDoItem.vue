<template>
  <div id="to-do-item">
    <vue-svg
      svg="fillable-circle"
      @clicked="clickToDo(toDo)"
      :customStyle="toDo.completed ? completedSvg : uncompletedSvg"
    />
    <h4 :class="toDo.completed ? `strike` : ``">{{ toDo.title }}</h4>
    <div class="people-wrapper">
      <profile-picture
        v-for="(contact, index) in matchedContacts"
        :key="index"
        contact="person"
        :profilePicture="
          contact.profilePicture ? contact.profilePicture : undefined
        "
        :customStyle="'width: 25px; height: 25px; margin: -13px; fill: var(--foregroundColor);'"
      />
    </div>
    <vue-svg
      svg="down-arrow"
      @clicked="toggleExpansion"
      :customStyle="expansionActive ? 'transform: rotate(180deg);' : ''"
    />
  </div>
  <div class="expanded-to-do" v-if="expansionActive">
    <div
      class="to-do-contact-item"
      v-for="(contact, index) in matchedContacts"
      :key="index"
    >
      <profile-picture
        contact="person"
        :profilePicture="
          contact.profilePicture ? contact.profilePicture : undefined
        "
        :customStyle="'width: 25px; height: 25px; margin-left: 10px; padding: 5px;'"
      />
      <h5>{{ contact.given_name + " " + contact.family_name }}</h5>
    </div>
  </div>
</template>

<script>
import VueSvg from "../../assets/VueSvg.vue";
import ProfilePicture from "../../assets/ProfilePicture.vue";
export default {
  data() {
    return {
      expansionActive: false,
      completedSvg:
        "width: 14px; height: 14px; fill: currentColor: stroke: currentColor",
      uncompletedSvg: "fill: none; stroke: currentColor",
    };
  },
  computed: {
    matchedContacts() {
      if (this.contacts.length > 0 && this.toDo.associatedContacts.length > 0) {
        return this.toDo.associatedContacts.map((x) => {
          return this.contacts.find((c) => x == c.userId);
        });
      } else {
        return [];
      }
    },
  },
  methods: {
    toggleExpansion() {
      this.expansionActive = !this.expansionActive;
    },
    clickToDo(toDo) {
      toDo.completed = !toDo.completed;
      this.$store.dispatch("completeToDo", {
        id: toDo.userId,
        variable: "completed",
        value: !toDo.completed,
      });
    },
  },
  props: ["toDo", "contacts"],
  components: { VueSvg, ProfilePicture },
};
</script>

<style scoped>
#to-do-item {
  height: 30px;
  display: flex;
  align-items: center;
}

h4 {
  margin: 10px;
  font-size: 10pt;
}

.people-wrapper {
  margin: 0 10px 0 0;
}

.expanded-to-do {
  margin-bottom: 25px;
}

.to-do-contact-item {
  display: flex;
  align-items: center;
}

h5 {
  margin: 0;
  font-size: 8pt;
  text-transform: uppercase;
}

@keyframes strike {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}
.strike {
  position: relative;
}
.strike::after {
  content: " ";
  position: absolute;
  top: 50%;
  left: 0;
  height: 1px;
  background: var(--textColor);
  animation-name: strike;
  animation-duration: 0.3s;
  animation-timing-function: linear;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
</style>