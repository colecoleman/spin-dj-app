<template>
  <section id="contacts-wrapper">
    <base-navigation-card>
      <template v-slot:navigation>
        <contact-navigation></contact-navigation>
      </template>
    </base-navigation-card>

    <div id="left-container">
      <div
        class="contacts-container"
        v-for="(value, contact_category) in contacts"
        :key="contact_category"
        :id="`${contact_category + `-card`}`"
      >
        <base-card :icon="SVGs.PersonSVG">
          <template v-slot:action1>
            Sort:
            <img
              :src="SVGs.SortAlphaSVG"
              @click="toggleSortMenuOpened(contact_category)"
              alt=""
            />
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
            <div class="personal-contact-list" v-if="value.length > 0">
              <div
                class="personal-contact-item"
                v-for="contact in value"
                :key="contact.userId"
                :category="contact_category"
              >
                <contact-list-item
                  :contact="contact"
                  :category="contact_category"
                ></contact-list-item>
              </div>
            </div>
            <h4 v-if="value.length <= 0" class="placeholder-text">
              No {{ contact_category }} to view! Add some
            </h4>
          </template>
        </base-card>
      </div>
      <div id="scroll-padding"></div>
    </div>
    <div id="right-container">
      <base-card :icon="SVGs.AddPersonSVG">
        <template v-slot:title>Add new</template>
        <template v-slot:content>
          <add-contact-module></add-contact-module>
        </template>
      </base-card>
    </div>
  </section>
</template>

<script>
import ContactListItem from "../AdminComponents/AdminContactListComponents/ContactListItem.vue";
import AddContactModule from "../AdminComponents/AdminContactListComponents/AdminAddContactModules/AddContactModule.vue";

import BaseNavigationCard from "../../../SharedComponents/SharedComponentsUI/BaseNavigationCard.vue";
import ContactNavigation from "../AdminComponents/AdminContactListComponents/AdminViewContactListNavigation.vue";
import FloatingMenuWithListItems from "../../../SharedComponents/SharedComponentsUI/FloatingMenuWithListItems.vue";
import SVGs from "../../../assets/SVGs/svgIndex.js";

export default {
  data() {
    return {
      SVGs,
      sortMenuOpened: undefined,
      sortItems: [
        {
          title: "Alphabetically Descending",
          icon: undefined,
          logic: function (a, b) {
            let textA = a.family_name.toUpperCase();
            let textB = b.family_name.toUpperCase();
            return textA > textB ? -1 : textA < textB ? 1 : 0;
          },
        },
        {
          title: "Alphabetically Ascending",
          icon: undefined,
          logic: function (a, b) {
            let textA = a.family_name.toUpperCase();
            let textB = b.family_name.toUpperCase();
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
      return this.$store.state.contacts;
    },
  },

  mounted() {
  },
  components: {
    BaseNavigationCard,
    ContactListItem,
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
  height: 100%;
  /* padding-top: 5px; */
  /* overflow: hidden; */
}

#navigation {
  /* width: 20%; */
}

#left-container {
  width: 60%;
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
  width: 20%;
  margin-top: -5px;
  /* height: fit-content; */
  margin-bottom: 20px;
  max-height: 100%;
}

.placeholder-text {
  margin-top: 45%;
}
</style>
