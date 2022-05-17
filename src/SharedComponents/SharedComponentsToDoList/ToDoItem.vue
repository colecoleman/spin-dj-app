<template>
  <div id="to-do-item">
    <vue-svg
      svg="fillable-circle"
      @clicked="clickToDo(toDo)"
      :class="toDo.completed ? 'completed svg' : 'uncompleted svg'"
    />
    <h4 :class="toDo.completed ? `strike` : ``">{{ toDo.title }}</h4>
    <div class="people-wrapper">
      <profile-picture
        v-for="(contact, index) in contacts"
        :key="index"
        contact="person"
        :profilePicture="
          contact
            ? contact.profilePicture
              ? contact.profilePicture
              : undefined
            : undefined
        "
        :customStyle="'width: 25px; height: 25px; margin: -13px; fill: var(--foregroundColor);'"
      />
    </div>
    <vue-svg
      svg="down-arrow"
      @clicked="toggleExpansion"
      :class="exansionActive ? 'up-arrow svg' : 'down-arrow svg'"
    />
  </div>
  <div class="expanded-to-do" v-if="expansionActive">
    <div
      class="to-do-contact-item"
      v-for="(contact, index) in contacts"
      :key="index"
    >
      <to-do-item-person-item :contact="contact" />
    </div>
  </div>
</template>

<script>
import VueSvg from "../../assets/VueSvg.vue";
import ToDoItemPersonItem from "./ToDoItemPersonItem.vue";
import ProfilePicture from "../../assets/ProfilePicture.vue";
export default {
  data() {
    return {
      expansionActive: false,
      contacts: [],
    };
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
        value: toDo.completed,
      });
    },
  },
  async created() {
    this.contacts = await Promise.all(
      this.toDo.associatedContacts.map(async (x) => {
        let userId = x.key ? x.key.userId : x;
        let tenantId = x.key ? x.key.tenantId : this.toDo.tenantId;
        let key = { userId, tenantId };
        let contact = await this.$store.dispatch("getContactListItem", key);
        if (contact) {
          return contact;
        } else {
          return x;
        }
      })
    );
  },
  props: ["toDo", "listType"],
  components: { VueSvg, ProfilePicture, ToDoItemPersonItem },
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
.svg {
  width: 14px;
  height: 14px;
}
.up-arrow {
  transform: rotate(180deg);
}
.completed {
  fill: currentColor;
  stroke: currentColor;
}
.uncompleted {
  fill: none;
  stroke: currentColor;
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