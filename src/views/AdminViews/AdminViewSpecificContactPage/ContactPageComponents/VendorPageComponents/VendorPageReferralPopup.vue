<template>
  <popup-modal>
    <template v-slot:window>
      <div class="page-one" v-if="activePage === 1">
        <div class="heading">
          <h4>
            Refer
            <span>
              {{
                `${
                  vendor.businessName
                    ? vendor.businessName
                    : vendor.firstName + vendor.lastName
                }`
              }}
            </span>
            to a client:
          </h4>
        </div>
        <div class="body">
          <input
            id="client-search"
            type="text"
            v-model="searchTerm"
            placeholder="Start Typing To Search..."
            @keyup="searchForClients()"
          />
          <div class="window">
            <div
              class="client-item"
              @click="selectClient(client)"
              v-for="client in clients"
              :key="client.id"
            >
              <img
                :src="
                  client.profilePicture
                    ? client.profilePicture
                    : defaultProfilePicture
                "
                alt=""
              />
              <h5>{{ client.firstName }} {{ client.lastName }}</h5>
            </div>
          </div>
        </div>
        <button-standard-with-icon text="Cancel" />
      </div>
      <div class="page-two" v-if="activePage === 2">
        <div class="heading">
          <h4>
            Send
            <span>
              {{
                `${
                  vendor.businessName
                    ? vendor.businessName
                    : vendor.firstName + vendor.lastName
                }`
              }}
            </span>

            to
            <span
              >{{ selectedClient.firstName }}
              {{ selectedClient.lastName }}</span
            >
          </h4>
        </div>
        <div class="client-item">
          <img
            :src="
              selectedClient.profilePicture
                ? selectedClient.profilePicture
                : defaultProfilePicture
            "
            alt=""
          />
          <h5>{{ selectedClient.firstName }} {{ selectedClient.lastName }}</h5>
        </div>
        <textarea id="message" v-model="referralMessageToClient"></textarea>
        <div class="button-div">
          <button-standard-with-icon
            text="Cancel Referral"
            @click="cancelReferral()"
          ></button-standard-with-icon>
          <button-standard-with-icon
            text="Send Referral"
            @click="sendReferral()"
          ></button-standard-with-icon>
        </div>
      </div>
    </template>
  </popup-modal>
</template>

<script>
import defaultProfilePicture from "../../../../../assets/default-profile-picture.svg";
import PopupModal from "../../../../../SharedComponents/SharedComponentsUI/PopupModal.vue";
import ButtonStandardWithIcon from "../../../../../SharedComponents/SharedComponentsUI/ButtonStandardWithIcon.vue";
export default {
  data() {
    return {
      defaultProfilePicture,
      activePage: 1,
      searchTerm: undefined,
      selectedClient: undefined,
      clients: undefined,
      referralMessageToClient: `Hi! I am sending you ${
        this.vendor.businessName
          ? this.vendor.businessName
          : this.vendor.firstName + this.vendor.lastName
      }'s information because I think you'll like their work!`,
    };
  },
  computed: {
    selectedClientFirstName() {
      return this.selectedClient ? this.selectedClient.firstName : "";
    },
  },
  props: ["vendor"],
  methods: {
    searchForClients() {
      this.clients = this.$store.state.contacts.clients.filter(
        (x) =>
          x.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          x.lastName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
    selectClient(client) {
      this.activePage = 2;
      this.selectedClient = client;
    },
    cancelReferral() {
      console.log("canceled");
      this.$emit("close-referral-window");
    },
    sendReferral() {
      console.log("sent!");
    },
  },
  components: { PopupModal, ButtonStandardWithIcon },
};
</script>

<style scoped>
h4 {
  font-weight: 400;
}
span {
  font-weight: 600;
}

.body {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-items: center; */
  justify-content: center;
}

#client-search,
#message {
  border: 1px solid rgba(0, 0, 0, 0.2);
  width: 80%;
  /* height: 30px; */
}

#client-search {
  text-align: center;
  margin: 20px;
}

#message {
  height: 200px;
  padding: 15px;
  text-align: left;
}

.client-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  width: 60%;
  margin-left: 10%;
  height: 60px;
}

.page-two {
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;
  justify-items: center;
}

img {
  height: 40px;
  width: 40px;
  margin: 5px;
}

.window {
  height: 200px;
  overflow: scroll;
  width: 80%;
  /* border: 1px solid rgba(0, 0, 0, 0.4); */
  /* display: flex; */
  flex-direction: column;
  align-items: center;
}

.button-div {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
</style>