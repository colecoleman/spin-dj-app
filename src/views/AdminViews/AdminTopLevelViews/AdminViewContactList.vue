<template>
  <section>
    <div id="navigation">
      <base-card>
        <template v-slot:content>
          <contact-navigation></contact-navigation>
        </template>
      </base-card>
    </div>
    <div id="scroll-container">
      <div
        class="contacts-container"
        v-for="(value, contact_category) in contacts"
        :key="contact_category"
        :id="`${contact_category + `-card`}`"
      >
        <base-card :icon="SVGs.PersonSVG" :title="contact_category">
          <!-- <template v-slot:action1>
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
          </template> -->
          <template v-slot:content>
            <div class="personal-contact-list" v-if="value.length > 0">
              <div
                v-for="contact in value"
                :key="contact.userId"
                :category="contact_category"
                class="contact-list-item"
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
    </div>
    <div id="add-contact">
      <base-card :icon="SVGs.AddPersonSVG" title="Add New">
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
import ContactNavigation from "../AdminComponents/AdminContactListComponents/AdminViewContactListNavigation.vue";
// import FloatingMenuWithListItems from "../../../SharedComponents/SharedComponentsUI/FloatingMenuWithListItems.vue";
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

  mounted() {},
  components: {
    ContactListItem,
    AddContactModule,
    ContactNavigation,
    // FloatingMenuWithListItems,
  },
};
</script>

<style scoped>
section {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 20% 55% 25%;
  grid-template-rows: 50% 50% 20px;
}

#navigation {
  grid-column: 1 / 2;
  grid-row: 1 / 3;
}

#scroll-container {
  grid-column: 2 / 3;
  grid-row: 1 / 4;
  overflow: scroll;
}

#scroll-container .contacts-container:last-child {
  padding-bottom: 12px;
}
#scroll-container .contacts-container:first-child {
  margin-top: 12px;
}

#add-contact {
  grid-column: 3/4;
  grid-row: 1/3;
}

.contacts-container {
  height: 85%;
  width: 100%;
}

.personal-contact-list {
  overflow-y: scroll;
  height: 100%;
}

.placeholder-text {
  margin-top: 45%;
}
</style>
