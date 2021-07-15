<template>
  <section>
    <div id="top-content-div">
      <div id="box-1" class="box">
        <base-card>
          <sales-to-do-list></sales-to-do-list>
        </base-card>
      </div>
      <div id="box-2" class="box">
        <base-card>
          <sales-goals></sales-goals>
        </base-card>
      </div>
    </div>
    <div id="bottom-content-div">
      <div id="box-3" class="box">
        <base-card>
          <sales-pipeline></sales-pipeline>
        </base-card>
      </div>
      <div id="box-4">
        <sales-launchpad></sales-launchpad>
      </div>
    </div>
  </section>
</template>

<script>
import SalesToDoList from "../../components/modules/SalesModules/SalesToDoList/SalesToDoList.vue";
import SalesGoals from "../../components/modules/SalesModules/SalesGoals/SalesGoals.vue";
import SalesPipeline from "../../components/modules/SalesModules/SalesPipeline/SalesPipeline.vue";
import SalesLaunchpad from "../../components/modules/SalesModules/SalesLaunchpad/SalesLaunchpad.vue";
import BaseCard from "../../components/UI/BaseCard.vue";

export default {
  components: {
    SalesToDoList,
    SalesGoals,
    SalesPipeline,
    SalesLaunchpad,
    BaseCard,
  },
};
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  height: inherit;
  width: inherit;
}

.box {
  margin: 10px;
}
#top-content-div {
  display: flex;
  flex-direction: row;
  align-content: stretch;
  max-height: 50%;
}

#bottom-content-div {
  display: flex;
  flex-direction: row;
  align-content: stretch;
  max-height: 50%;
}

#box-1 {
  width: 45%;
}
#box-2 {
  width: 55%;
}

#box-3 {
  width: 70%;
}
#box-4 {
  width: 30%;
}
</style>