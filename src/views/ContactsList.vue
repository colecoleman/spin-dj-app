<template>
  <section id="contacts-wrapper">
    <div id="navigation">
      <base-navigation-card>
        <template v-slot:navigation>
          <contact-navigation></contact-navigation>
        </template>
      </base-navigation-card>
    </div>
    <div id="left-container">
      <div
        class="contacts-container"
        v-for="(value, contact_category) in contacts"
        :key="contact_category"
        :id="`${contact_category + `-card`}`"
      >
        <base-card>
          <template v-slot:icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              viewBox="0 0 21 21"
            >
              <g
                id="Group_305"
                data-name="Group 305"
                transform="translate(-338 -660.793)"
              >
                <g
                  id="Component_6_13"
                  data-name="Component 6 – 13"
                  transform="translate(338 660.793)"
                >
                  <g
                    id="Group_306"
                    data-name="Group 306"
                    transform="translate(-2 -4.793)"
                  >
                    <g id="Group_307" data-name="Group 307">
                      <path
                        id="Intersection_1"
                        data-name="Intersection 1"
                        d="M0,12.086a14.393,14.393,0,0,1,6.593-1.722A14.62,14.62,0,0,1,13,11.975a10.333,10.333,0,0,1-13,.111Zm2.428-7.94A4.166,4.166,0,1,1,6.593,8.291,4.154,4.154,0,0,1,2.428,4.146Z"
                        transform="translate(6 9.834)"
                        fill="#fff"
                      />
                      <g
                        id="Path_108"
                        data-name="Path 108"
                        transform="translate(2 4.793)"
                        fill="none"
                      >
                        <path
                          d="M10.5,0A10.5,10.5,0,1,1,0,10.5,10.5,10.5,0,0,1,10.5,0Z"
                          stroke="none"
                        />
                        <path
                          d="M 10.5 2 C 5.813079833984375 2 2 5.813079833984375 2 10.5 C 2 15.18692016601562 5.813079833984375 19 10.5 19 C 15.18692016601562 19 19 15.18692016601562 19 10.5 C 19 5.813079833984375 15.18692016601562 2 10.5 2 M 10.5 0 C 16.29899024963379 0 21 4.701009750366211 21 10.5 C 21 16.29899024963379 16.29899024963379 21 10.5 21 C 4.701009750366211 21 0 16.29899024963379 0 10.5 C 0 4.701009750366211 4.701009750366211 0 10.5 0 Z"
                          stroke="none"
                          fill="#fff"
                        />
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </template>
          <template v-slot:title>{{ contact_category }}</template>
          <template v-slot:content>
            <div class="personal-contact-list">
              <div
                class="personal-contact-item"
                v-for="contact in value"
                :key="contact.id"
                :category="contact_category"
              >
                <contact-list-view
                  :contact="contact"
                  :category="contact_category"
                ></contact-list-view>
              </div>
            </div>
          </template>
        </base-card>
      </div>
      <div id="scroll-padding"></div>
    </div>
    <div id="right-container">
      <base-card>
        <template v-slot:icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="15.273"
            viewBox="0 0 21 15.273"
          >
            <path
              id="Icon_material-person-add"
              data-name="Icon material-person-add"
              d="M14.239,11.136A3.818,3.818,0,1,0,10.42,7.318,3.817,3.817,0,0,0,14.239,11.136ZM5.648,9.227V6.364H3.739V9.227H.875v1.909H3.739V14H5.648V11.136H8.511V9.227Zm8.591,3.818c-2.549,0-7.636,1.279-7.636,3.818v1.909H21.875V16.864C21.875,14.325,16.787,13.045,14.239,13.045Z"
              transform="translate(-0.875 -3.5)"
              fill="#fff"
            />
          </svg>
        </template>
        <template v-slot:title>Add new</template>
        <template v-slot:content>
          <add-contact-module></add-contact-module>
        </template>
      </base-card>
    </div>
  </section>
</template>

<script>
import ContactListView from "../components/ContactListView.vue";
import AddContactModule from "../components/AddContactModule.vue";
import BaseCard from "../components/UI/BaseCard.vue";
import BaseNavigationCard from "../components/UI/BaseNavigationCard.vue";
import ContactNavigation from "../navigationItems/ContactNavigation.vue";
export default {
  computed: {
    contacts() {
      return this.$store.state.contacts;
    },
  },
  methods: {
    
  },
  components: {
    BaseCard,
    BaseNavigationCard,
    ContactListView,
    AddContactModule,
    ContactNavigation,
  },
};
</script>

<style scoped>
#contacts-wrapper {
  display: flex;
  flex-direction: row;
  min-width: 100%;
  padding-top: 5px;
}

#navigation {
  min-width: 20%;
}

#left-container {
  width: 100%;
  height: 108%;
  overflow: scroll;
}

#scroll-padding {
  min-height: calc(15% - 5px);
  min-width: 100%;
}

.contacts-container {
  height: 85%;
  width: 100%;
}

.personal-contact-item {
  z-index: 1;
}
#right-container {
  width: 45%;
  margin-top: -5px;
  /* height: fit-content; */
  margin-bottom: 20px;
  max-height: 100%;
}
</style>