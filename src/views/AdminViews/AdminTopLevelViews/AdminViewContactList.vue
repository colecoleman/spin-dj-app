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
        v-for="(value, contact_category) in contacts"
        :key="contact_category"
        :id="`${contact_category + `-card`}`"
      >
        <base-card
          :icon="SVGs.PersonSVG"
          :title="contact_category"
          :actionIcon="SVGs.SortAlphaSVG"
          @action-one-clicked="toggleSortMenuOpened(contact_category)"
        >
          <template v-slot:action1> Sort: </template>
          <template v-slot:dropdownContainer>
            <floating-menu-with-list-items
              v-if="sortMenuOpened === contact_category"
              :actions="sortItems"
              :identifier="contact_category"
              @actionClicked="selectSort"
            />
          </template>
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
                />
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
import SVGs from "../../../assets/SVGs/svgIndex.js";

export default {
  data() {
    return {
      SVGs,
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
  overflow: scroll;
}

#add-contact {
  grid-row: 1 / 2;
}

.contacts-container {
  height: 85%;
  width: 100%;
  margin-bottom: 10px;
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
    width: 100%;
    height: 100%;
    display: grid;
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
    grid-row: 1/2;
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
    overflow: scroll;
  }

  #scroll-container .contacts-container:last-child {
    padding-bottom: 12px;
  }
  /* #scroll-container .contacts-container:first-child {
    margin-top: 12px;
  } */

  #add-contact {
    grid-column: 3/4;
    grid-row: 1/3;
  }
}
</style>
