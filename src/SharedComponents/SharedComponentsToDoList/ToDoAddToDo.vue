<template>
  <div id="to-do-add-to-do-wrapper">
    <div id="input-wrapper">
      <input-with-title
        title="Title"
        type="text"
        @input="fieldInput(toDo, 'title', $event)"
      />
      <vue-svg svg="circle-checkmark" @clicked="submitToDo" />
    </div>
    <h5>Assign Contacts:</h5>
    <div class="bubble-wrapper">
      <input-with-binary-selection
        v-for="(contact, index) in eventContacts"
        :key="index"
        :item="`${contact.given_name} ${contact.family_name}`"
        :checked="checkToDoForContact(contact.userId)"
        @clicked="assignContactToToDo(contact.userId)"
      />
    </div>
  </div>
</template>
<script>
import VueSvg from "../../assets/VueSvg.vue";
import InputWithTitle from "../SharedComponentsUI/ElementLibrary/InputWithTitle.vue";
import InputWithBinarySelection from "../SharedComponentsUI/ElementLibrary/InputWithBinarySelection.vue";

export default {
  data() {
    return {
      contactSearchTerm: undefined,
      toDo: {
        id: "todo" + new Date().getTime(),
        associatedContacts: [],
        associatedEvents: [this.eventId],
        title: this.newToDo,
        completed: false,
      },
    };
  },
  computed: {},
  methods: {
    fieldInput(object, property, value) {
      console.log(value);
      if (object) {
        object[property] = value;
      } else {
        this[property] = value;
      }
    },
    checkToDoForContact(id) {
      return this.toDo.associatedContacts.includes(id);
    },
    assignContactToToDo(id) {
      let index = this.toDo.associatedContacts.indexOf(id);
      if (index > -1) {
        this.toDo.associatedContacts.splice(index, 1);
      } else {
        this.toDo.associatedContacts.push(id);
      }
    },
    submitToDo() {
      this.$emit("addToDo", this.toDo);
    },
  },
  created() {},
  components: {
    VueSvg,
    InputWithTitle,
    InputWithBinarySelection,
  },
  emits: ["addToDo"],
  props: ["eventId", "eventContacts"],
};
</script>
<style scoped>
#to-do-add-to-do-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: fit-content;
}
#input-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
}

#input-wrapper .text {
  width: 85%;
}

h5 {
  width: 100%;
  text-align: left;
  margin: 0;
  font-size: 8pt;
  text-transform: uppercase;
}

.bubble-wrapper {
  display: flex;
  flex-wrap: wrap;
  max-height: 150px;
  overflow: scroll;
}
</style>