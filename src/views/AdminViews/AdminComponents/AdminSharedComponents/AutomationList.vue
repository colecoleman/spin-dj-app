<template>
  <base-card :icon="SVGs.AutomationSVG">
    <template v-slot:title>Automation</template>
    <template v-slot:content>
      <div id="list-wrapper">
        <automation-list-item
          v-for="automation in automations"
          :key="automation.id"
          :automation="automation"
          @automation-deleted="automationDeleted"
          @automation-approved="automationApproved"
        ></automation-list-item>
        <div id="empty-automations" v-if="automations.length <= 0">
          <p class="bold">There are no automations for this event!</p>
          <p>Add some in settings to make your life easier.</p>
        </div>
      </div>
    </template>
  </base-card>
</template>

<script>
import AutomationListItem from "./AutomationListItem.vue";
import SVGs from "../../../../assets/SVGs/svgIndex.js";

export default {
  data() {
    return {
      SVGs,
      automations: [],
    };
  },
  methods: {
    automationDeleted(id) {
      console.log(id);
      let deleteIndex = this.automations.findIndex((x) => {
        return x.id === id;
      });
      this.automations.splice(deleteIndex, 1);
    },
    automationApproved(id) {
      console.log(id);
      let editIndex = this.automations.findIndex((x) => {
        return x.id === id;
      });
      this.automations[editIndex].approved = true;
    },
  },
  components: {
    AutomationListItem,
  },
  async created() {
    await this.$store
      .dispatch(`get${this.automationType}Automations`, this.$route.params.id)
      .then((res) => {
        console.log(res);
        this.automations.push(...res.Items);
      });
  },

  props: ["automationType", "id"],
};
</script>

<style scoped>
#list-wrapper {
  height: 90%;
  max-height: 90%;
  width: 100%;
  overflow-y: scroll;
  overflow-x: visible;
}

#empty-automations {
  height: 100%;
  align-content: center;
  align-items: center;
  justify-items: center;
  justify-content: center;
}

#button-container {
  width: 50%;
}
</style>