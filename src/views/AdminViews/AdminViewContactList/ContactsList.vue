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
        <base-card :icon="personsvg">
          <template v-slot:action1>
            Sort:
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15.375"
              height="15.375"
              viewBox="0 0 18.375 18.375"
              style="margin-left: 10px"
              @click="toggleSortMenuOpened(contact_category)"
            >
              <path
                id="Icon_awesome-sort-alpha-down"
                data-name="Icon awesome-sort-alpha-down"
                d="M7.219,14.438H5.25V1.969a.656.656,0,0,0-.656-.656H3.281a.656.656,0,0,0-.656.656V14.438H.656a.657.657,0,0,0-.463,1.12L3.474,19.5a.656.656,0,0,0,.928,0l3.281-3.938A.657.657,0,0,0,7.219,14.438Zm9.844-2.625h-5.25a.656.656,0,0,0-.656.656v1.313a.656.656,0,0,0,.656.656h2.3L11.6,17.327a1.313,1.313,0,0,0-.441.981v.723a.656.656,0,0,0,.656.656h5.25a.656.656,0,0,0,.656-.656V17.719a.656.656,0,0,0-.656-.656h-2.3l2.513-2.89a1.312,1.312,0,0,0,.441-.981v-.723A.656.656,0,0,0,17.063,11.813Zm1.274-3.5L15.905,1.748a.656.656,0,0,0-.618-.436h-1.7a.656.656,0,0,0-.618.436L10.539,8.311a.656.656,0,0,0,.618.877h1.018a.656.656,0,0,0,.625-.454l.181-.53h2.912l.181.53a.656.656,0,0,0,.626.454h1.019a.656.656,0,0,0,.618-.877Zm-4.571-2.4.672-1.969.672,1.969Z"
                transform="translate(0 -1.313)"
                fill="currentColor"
              />
            </svg>
            <div id="floating-menu-container">
              <floating-menu-with-list-items
                v-if="sortMenuOpened === contact_category"
                :actions="sortItems"
                :identifier="contact_category"
                @actionClicked="selectSort"
              />
            </div>
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
      <base-card :icon="addPersonsvg">
        <template v-slot:title>Add new</template>
        <template v-slot:content>
          <add-contact-module></add-contact-module>
        </template>
      </base-card>
    </div>
  </section>
</template>

<script>
import ContactListView from "./ContactListView.vue";
import AddContactModule from "./AddContactModules/AddContactModule.vue";
import BaseCard from "../../../SharedComponents/SharedComponentsUI/BaseCard.vue";
import BaseNavigationCard from "../../../SharedComponents/SharedComponentsUI/BaseNavigationCard.vue";
import ContactNavigation from "./AdminContactListNavigation.vue";
import FloatingMenuWithListItems from "../../../SharedComponents/SharedComponentsUI/FloatingMenuWithListItems.vue";
import personsvg from "../../../assets/SVGs/person.svg";
import addPersonsvg from "../../../assets/SVGs/add-person.svg";

export default {
  data() {
    return {
      personsvg,
      addPersonsvg,
      sortMenuOpened: undefined,
      sortItems: [
        {
          title: "Alphabetically Descending",
          icon: undefined,
          sortLogic: function (a, b) {
            let textA = a.lastName.toUpperCase();
            let textB = b.lastName.toUpperCase();
            return textA > textB ? -1 : textA < textB ? 1 : 0;
          },
        },
        {
          title: "Alphabetically Ascending",
          icon: undefined,
          sortLogic: function (a, b) {
            let textA = a.lastName.toUpperCase();
            let textB = b.lastName.toUpperCase();
            return textA < textB ? -1 : textA > textB ? 1 : 0;
          },
        },
      ],
    };
  },
  methods: {
    toggleSortMenuOpened(cat) {
      if (this.sortMenuOpened !== cat) {
        this.sortMenuOpened = cat;
        return;
      } else {
        this.sortMenuOpened = undefined;
        return;
      }
    },
    selectSort(action, cat) {
      if (cat === this.sortMenuOpened) {
        this.contacts[cat].sort(action);
        this.toggleSortMenuOpened();
      }
    },
  },
  computed: {
    contacts() {
      let list = JSON.parse(JSON.stringify(this.$store.state.contacts));
      return list;
    },
  },
  components: {
    BaseCard,
    BaseNavigationCard,
    ContactListView,
    AddContactModule,
    ContactNavigation,
    FloatingMenuWithListItems,
  },
};
</script>

<style scoped>
#contacts-wrapper {
  display: flex;
  flex-direction: row;
  min-width: 100%;
  padding-top: 5px;
  /* overflow: hidden; */
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
  width: 99%;
}

.personal-contact-list {
  overflow-y: scroll;

  height: 100%;
}
#right-container {
  width: 45%;
  margin-top: -5px;
  /* height: fit-content; */
  margin-bottom: 20px;
  max-height: 100%;
}

#floating-menu-container {
  position: relative;
  width: fit-content;
  height: fit-content;
}
</style>
