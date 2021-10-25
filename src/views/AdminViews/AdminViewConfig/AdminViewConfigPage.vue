<template>
  <section id="config-wrapper">
    <base-navigation-card>
      <template v-slot:navigation>
        <admin-view-config-navigation-items />
      </template>
    </base-navigation-card>

    <div id="body">
      <div class="config-section" id="branding">
        <admin-view-config-identity></admin-view-config-identity>
      </div>
      <div class="config-section">
        <admin-view-config-services />
      </div>
      <div class="config-section">
        <admin-view-config-packages />
      </div>
      <div class="config-section">
        <admin-view-config-forms />
      </div>
      <div class="config-section">
        <admin-view-config-add-ons />
      </div>
      <div class="config-section">
        <admin-view-config-discounts />
      </div>
      <div class="config-section">
        <admin-view-config-automations />
      </div>
    </div>
  </section>
</template>

<script>
import BaseNavigationCard from "../../../SharedComponents/SharedComponentsUI/BaseNavigationCard.vue";

import AdminViewConfigNavigationItems from "./AdminViewConfigNavigationItems.vue";
import AdminViewConfigIdentity from "./AdminViewConfigCards/AdminViewConfigIdentity.vue";
import AdminViewConfigPackages from "./AdminViewConfigCards/AdminViewConfigPackages.vue";
import AdminViewConfigServices from "./AdminViewConfigCards/AdminViewConfigServices.vue";
import AdminViewConfigForms from "./AdminViewConfigCards/AdminViewConfigForms.vue";
import AdminViewConfigAddOns from "./AdminViewConfigCards/AdminViewConfigAddOns.vue";
import AdminViewConfigAutomations from "./AdminViewConfigCards/AdminViewConfigAutomations.vue";
import AdminViewConfigDiscounts from "./AdminViewConfigCards/AdminViewConfigDiscounts.vue";

export default {
  components: {
    BaseNavigationCard,
    AdminViewConfigNavigationItems,
    AdminViewConfigIdentity,
    AdminViewConfigPackages,
    AdminViewConfigServices,
    AdminViewConfigForms,
    AdminViewConfigAddOns,
    AdminViewConfigDiscounts,
    AdminViewConfigAutomations,
  },
};
</script>

<style scoped>
#config-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}

.config-section {
  height: auto;
}

#configuration-navigation {
  height: 100%;
  width: 20%;
}
#body {
  width: 80%;
  height: 100%;
  overflow: scroll;
}
</style>