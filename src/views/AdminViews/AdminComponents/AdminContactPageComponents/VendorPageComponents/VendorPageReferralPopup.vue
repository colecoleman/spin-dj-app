<template>
  <popup-modal
    :title="`Refer ${
      vendor.businessName
        ? vendor.businessName
        : vendor.given_name + vendor.family_name
    } to a client:`"
    @close-popup="closeWindow()"
  >
    <template v-slot:window>
      <div class="page-one">
        <div class="body">
          <input
            id="client-search"
            type="text"
            v-model="searchTerm"
            placeholder="Start Typing To Search..."
          />
          <div class="window">
            <div
              class="client-item"
              v-for="client in clients"
              :key="client.userId"
            >
              <div class="detail-wrapper">
                <img
                  :src="
                    client.profilePicture
                      ? client.profilePicture
                      : defaultProfilePicture
                  "
                  alt=""
                />
                <h5>{{ client.given_name }} {{ client.family_name }}</h5>
              </div>
              <div class="refer-button-wrapper">
                <button-standard-with-icon
                  :text="selectedClient == client ? 'Confirm' : 'Refer'"
                  @click="selectClient(client)"
                ></button-standard-with-icon>
              </div>
            </div>
          </div>
        </div>
        <button-standard-with-icon text="Cancel" @click="closeWindow()" />
      </div>
    </template>
  </popup-modal>
</template>

<script>
import defaultProfilePicture from "../../../../../assets/default-profile-picture.svg";
import PopupModal from "../../../../../SharedComponents/SharedComponentsUI/PopupModal.vue";

export default {
  data() {
    return {
      defaultProfilePicture,
      searchTerm: undefined,
      selectedClient: undefined,
    };
  },
  computed: {
    clients() {
      let clients = this.$store.state.contacts.clients;
      if (this.searchTerm) {
        clients = clients.filter(
          (x) =>
            x.given_name
              .toLowerCase()
              .includes(this.searchTerm.toLowerCase()) ||
            x.family_name.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      }
      return clients;
    },
  },
  props: ["vendor"],
  methods: {
    selectClient(client) {
      if (this.selectedClient === client) {
        this.sendReferral();
        this.selectedClient = undefined;
        return;
      }
      if (this.selectedClient !== client) {
        this.selectedClient = client;
        return;
      }
    },
    closeWindow() {
      this.$emit("close-referral-window");
    },
    sendReferral() {
      this.closeWindow();
    },
  },
  async mounted() {
    await this.$store.dispatch("getAdminUsers");
  },
  components: { PopupModal },
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
  justify-content: space-evenly;
  width: 80%;
  height: 60px;
}

.refer-button-wrapper {
  width: 20%;
}

.detail-wrapper {
  display: flex;
  flex-direction: row;
  width: 70%;
  align-items: center;
  justify-content: space-between;
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
  width: 100%;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
}

.button-div {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
</style>