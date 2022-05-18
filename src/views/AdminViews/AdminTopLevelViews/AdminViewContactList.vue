<template>
  <section id="contact-section">
    <base-card id="navigation">
      <template v-slot:content>
        <contact-navigation />
      </template>
    </base-card>

    <div id="scroll-container">
      <base-card
        class="contacts-container"
        v-for="(items, key, index) in contactTypes"
        :key="index"
        :id="`${key + `-card`}`"
        svg="person"
        :title="key"
        actionIcon="sort-alpha"
        @action-one-clicked="toggleSortMenuOpened(key)"
      >
        <template v-slot:dropdownContainer>
          <floating-menu-with-list-items
            v-if="sortMenuOpened === key"
            :actions="sortItems"
            :identifier="key"
            @actionClicked="selectSort"
          />
        </template>
        <template v-slot:content>
          <div class="personal-contact-list">
            <contact-list-item
              v-for="contact in items()"
              :key="contact.userId"
              class="contact-list-item"
              :contact="contact"
              :category="key"
            />
          </div>
          <h4 v-if="items().length <= 0" class="placeholder-text">
            No {{ key }} to view! Add some
          </h4>
        </template>
      </base-card>
    </div>
    <base-card id="add-contact" svg="add-person" title="Add New">
      <template v-slot:content>
        <add-contact-module />
      </template>
    </base-card>
  </section>
</template>

<script>
import ContactListItem from "../AdminComponents/AdminContactListComponents/ContactListItem.vue";
import AddContactModule from "../AdminComponents/AdminContactListComponents/AdminAddContactModules/AddContactModule.vue";
import ContactNavigation from "../AdminComponents/AdminContactListComponents/AdminViewContactListNavigation.vue";
import FloatingMenuWithListItems from "../../../SharedComponents/SharedComponentsUI/FloatingMenuWithListItems.vue";

export default {
  data() {
    return {
      sortMenuOpened: undefined,
      sortItems: [
        {
          title: "Alpha Descending",
          icon: undefined,
          logic: function (a, b) {
            let textA;
            let textB;
            if (a.family_name && b.family_name) {
              textA = a.family_name.toUpperCase();
              textB = b.family_name.toUpperCase();
            } else if (a.name && b.name) {
              textA = a.name.toUpperCase();
              textB = b.name.toUpperCase();
            }
            return textA > textB ? -1 : textA < textB ? 1 : 0;
          },
        },
        {
          title: "Alpha Ascending",
          icon: undefined,
          logic: function (a, b) {
            let textA;
            let textB;
            if (a.family_name && b.family_name) {
              textA = a.family_name.toUpperCase();
              textB = b.family_name.toUpperCase();
            } else if (a.name && b.name) {
              textA = a.name.toUpperCase();
              textB = b.name.toUpperCase();
            }
            return textA < textB ? -1 : textA > textB ? 1 : 0;
          },
        },
      ],
      activeSort: {
        clients: undefined,
        employees: undefined,
        locations: undefined,
        organizers: undefined,
        vendors: undefined,
      },
    };
  },
  computed: {
    contactTypes() {
      let store = this.$store;
      let sort = this.activeSort;

      return {
        clients() {
          return store.getters.clients(sort["clients"]);
        },
        employees() {
          return store.getters.employees(sort["employees"]);
        },
        locations() {
          return store.getters.locations(sort["locations"]);
        },
        organizers() {
          return store.getters.organizers(sort["organizers"]);
        },
        vendors() {
          return store.getters.vendors(sort["vendors"]);
        },
      };
    },
  },
  methods: {
    toggleSortMenuOpened(cat) {
      if (this.sortMenuOpened === cat) {
        this.sortMenuOpened = undefined;
      } else {
        this.sortMenuOpened = cat;
      }
    },
    selectSort(action, cat) {
      if (cat === this.sortMenuOpened) {
        this.activeSort[cat] = action;
        this.toggleSortMenuOpened(undefined);
      }
    },
  },
  mounted() {
    this.$store.dispatch("getAdminUsers");
  },
  components: {
    ContactListItem,
    AddContactModule,
    ContactNavigation,
    FloatingMenuWithListItems,
  },
};
</script>

<style scoped>
#contact-section {
  max-height: 100%;
  display: grid;
  gap: 10px;
  grid-template-columns: 100%;
  grid-template-rows: fit-content() 2fr;
  overflow: scroll;
}

#navigation {
  display: none;
}

#scroll-container {
  grid-row: 2 / 3;
  overflow: visible;
}

#add-contact {
  grid-row: 1 / 2;
}

.contacts-container {
  max-height: 85%;
  height: 400px;
  width: 100%;
  margin-bottom: 10px;
  overflow: scroll;
}

.personal-contact-list {
  overflow-y: scroll;
  height: 100%;
}

.placeholder-text {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

@media screen and (min-width: 800px) {
  #contact-section {
    grid-template-columns: 1fr 35%;
    grid-template-rows: 1fr;
  }

  #scroll-container {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    overflow: scroll;
  }

  #add-contact {
    grid-column: 2/3;
  }
}
@media screen and (min-width: 1200px) {
  #contact-section {
    overflow: hidden;
    grid-template-columns: 20% 1fr 25%;
    grid-template-rows: 50% 1fr;
  }

  #navigation {
    display: unset;
    grid-column: 1 / 2;
    grid-row: 1 / 3;
  }

  #scroll-container {
    grid-column: 2 / 3;
    grid-row: 1 / 4;
  }

  #add-contact {
    grid-column: 3/4;
    grid-row: 1/3;
  }
}
</style>
