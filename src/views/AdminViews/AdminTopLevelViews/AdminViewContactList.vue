<template>
  <section id="contact-section">
    <div id="navigation">
      <base-card>
        <template v-slot:content>
          <contact-navigation />
        </template>
      </base-card>
    </div>
    <div id="scroll-container">
      <div
        class="contacts-container"
        v-for="(type, index) in contactTypes"
        :key="index"
        :id="`${type + `-card`}`"
      >
        <base-card
          svg="person"
          :title="type"
          actionIcon="sort-alpha"

          @action-one-clicked="toggleSortMenuOpened(type)"
        >
          <template v-slot:dropdownContainer>
            <floating-menu-with-list-items
              v-if="sortMenuOpened === type"
              :actions="sortItems"
              :identifier="type"
              @actionClicked="selectSort"
            />
          </template>
          <template v-slot:content>
            <div class="personal-contact-list">
              <div
                v-for="contact in $store.getters[type]"
                :key="contact.userId"
                :category="type"
                class="contact-list-item"
              >
                <contact-list-item :contact="contact" :category="type" />
              </div>
            </div>
            <h4 v-if="type.length <= 0" class="placeholder-text">
              No {{ type }} to view! Add some
            </h4>
          </template>
        </base-card>
      </div>
    </div>
    <div id="add-contact">
      <base-card svg="add-person" title="Add New">
        <template v-slot:content>
          <add-contact-module />
        </template>
      </base-card>
    </div>
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
            let textA = a.family_name.toUpperCase();
            let textB = b.family_name.toUpperCase();
            return textA > textB ? -1 : textA < textB ? 1 : 0;
          },
        },
        {
          title: "Alpha Ascending",
          icon: undefined,
          logic: function (a, b) {
            let textA = a.family_name.toUpperCase();
            let textB = b.family_name.toUpperCase();
            return textA < textB ? -1 : textA > textB ? 1 : 0;
          },
        },
      ],
      contactTypes: [
        "clients",
        "employees",
        "locations",
        "organizers",
        "vendors",
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
  width: 100%;
  height: 100%;
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
  display: flex;
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

  /* #scroll-container .contacts-container:last-child {
    padding-bottom: 12px;
  } */

  #add-contact {
    grid-column: 3/4;
    grid-row: 1/3;
  }
}
</style>
