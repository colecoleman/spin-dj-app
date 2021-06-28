<template>
  <div id="sales-pipeline-wrapper">
    <div id="sales-pipeline-heading">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="17"
        height="20"
        viewBox="0 0 29 23.2"
      >
        <path
          id="Icon_awesome-funnel-dollar"
          data-name="Icon awesome-funnel-dollar"
          d="M19.641,7.519,24.227,2.45A1.435,1.435,0,0,0,23.212,0H1.438A1.435,1.435,0,0,0,.423,2.45L8.7,11.6v7.065a1.813,1.813,0,0,0,.725,1.45l3.625,2.719a1.8,1.8,0,0,0,2.683-.615,8.68,8.68,0,0,1,3.908-14.7ZM21.75,8.7A7.25,7.25,0,1,0,29,15.95,7.25,7.25,0,0,0,21.75,8.7Zm.725,10.87v.73a.362.362,0,0,1-.363.363h-.725a.362.362,0,0,1-.363-.363v-.738a2.6,2.6,0,0,1-1.421-.514.363.363,0,0,1-.026-.55l.532-.508a.372.372,0,0,1,.459-.033,1.091,1.091,0,0,0,.581.169h1.274a.57.57,0,0,0,.535-.6.591.591,0,0,0-.4-.577l-2.039-.612a2.051,2.051,0,0,1-1.431-1.966,2.018,2.018,0,0,1,1.933-2.042V11.6a.362.362,0,0,1,.363-.363h.725a.362.362,0,0,1,.363.363v.738a2.591,2.591,0,0,1,1.421.514.363.363,0,0,1,.026.55l-.532.508a.372.372,0,0,1-.459.033,1.087,1.087,0,0,0-.581-.169H21.076a.57.57,0,0,0-.535.6.591.591,0,0,0,.4.577l2.039.612a2.051,2.051,0,0,1,1.431,1.966,2.017,2.017,0,0,1-1.933,2.042Z"
          transform="translate(0)"
          fill="#fff"
        />
      </svg>
      <h4>Pipeline</h4>
    </div>
    <div id="pipeline-body">
      <sales-pipeline-list-item
        v-for="item in salesPipeline"
        :key="item.id"
        :name="item.name"
        :status="item.status"
        :value="item.value"
        :emailAddress="item.emailAddress"
        :phoneNumber="item.phoneNumber"
        :lastContactDate="item.lastContactDate"
        :lastContactType="item.lastContactType"
      ></sales-pipeline-list-item>
    </div>
  </div>
</template>

<script>
import SalesPipelineListItem from "./SalesPipelineListItem.vue";
export default {
  data() {
    return {
      salesPipeline: [
        {
          id: 1,
          name: "Anna Smith",
          status: "Proposal Sent",
          value: 1000,
          emailAddress: "annasmith@domain.com",
          phoneNumber: "123-456-7890",
          lastContactDate: "03-04-2021",
          lastContactType: "Email, Opened",
        },
        {
          id: 2,
          name: "Anna Smith",
          status: "Proposal Sent",
          value: 1000,
          emailAddress: "annasmith@domain.com",
          phoneNumber: "123-456-7890",
          lastContactDate: "03-04-2021",
          lastContactType: "Email, Opened",
        },
        {
          id: 3,
          name: "Anna Smith",
          status: "Proposal Sent",
          value: 1000,
          emailAddress: "annasmith@domain.com",
          phoneNumber: "123-456-7890",
          lastContactDate: "03-04-2021",
          lastContactType: "Email, Opened",
        },
        {
          id: 4,
          name: "Anna Smith",
          status: "Proposal Sent",
          value: 1000,
          emailAddress: "annasmith@domain.com",
          phoneNumber: "123-456-7890",
          lastContactDate: "03-04-2021",
          lastContactType: "Email, Opened",
        },
        {
          id: 5,
          name: "Anna Smith",
          status: "Proposal Sent",
          value: 1000,
          emailAddress: "annasmith@domain.com",
          phoneNumber: "123-456-7890",
          lastContactDate: "03-04-2021",
          lastContactType: "Email, Opened",
        },
        {
          id: 6,
          name: "Anna Smith",
          status: "Proposal Sent",
          value: 1000,
          emailAddress: "annasmith@domain.com",
          phoneNumber: "123-456-7890",
          lastContactDate: "03-04-2021",
          lastContactType: "Email, Opened",
        },
      ],
    };
  },
  components: { SalesPipelineListItem },
};
</script>

<style scoped>
#sales-pipeline-wrapper {
  height: 100%;
}
#sales-pipeline-heading {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  align-content: center;
}

#sales-pipeline-heading svg {
  padding: 5px;
}

#pipeline-body {
  overflow: scroll;
  height: 85%;
}
</style>
