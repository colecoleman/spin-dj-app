<template>
  <admin-dashboard-library
    :tracks="tracks"
    :matches="matches"
    :matchingField="matchingField"
    :searchOpen="searchOpen"
    :error="error"
    :topIndex="topIndex"
    :bottomIndex="bottomIndex"
    @append-to-playlist="appendToPlaylist"
    @search-for-track="searchForTrack"
    @turn-library-page="turnLibraryPage"
    @import-playlist="importPlaylist"
    class="track-list"
  />

  <admin-dashboard-library-events
    @event-clicked="eventClicked"
    class="sidebar-wrapper"
    v-if="!activeEvent"
  />
  <admin-library-playlist-builder-event-card
    v-if="activeEvent"
    :event="activeEvent"
    :chosenForm="chosenForm"
    @form-chosen="formChosen"
    @find-matches="findMatch"
    @delete-match="deleteMatch"
    @back-arrow-clicked="navigateBackwards"
    class="sidebar-wrapper"
  />
  <input
    id="import-input"
    type="file"
    @change="readFile"
    style="display: none"
  />
</template>
<script>
import AdminDashboardLibrary from "../AdminDashboardPlaylistComponents/AdminDashboardLibrary.vue";
import AdminDashboardLibraryEvents from "../AdminDashboardPlaylistComponents/AdminDashboardLibraryEventsList.vue";
import AdminLibraryPlaylistBuilderEventCard from "../AdminDashboardPlaylistComponents/AdminDashboardLibraryEventPlaylistBuilder/EventPlaylistBuilderEventCard.vue";

// import AdminLibraryPlaylistBuilderFormCard from "../AdminDashboardPlaylistComponents/AdminDashboardLibraryEventPlaylistBuilder/EventPlaylistBuilderFormCard.vue";
export default {
  data() {
    return {
      activeEvent: false,
      searchOpen: false,
      chosenForm: undefined,
      matchingField: undefined,
      matches: [],
      error: undefined,
      topIndex: 0,
      bottomIndex: 100,
      timer: null,
      file: undefined,
      library: {
        tracks: [],
        playlists: [],
        meta: {},
      },
    };
  },
  methods: {
    eventClicked(id) {
      this.activeEvent = id;
    },
    formChosen(form) {
      this.chosenForm = form;
    },
    async searchForTrack(field) {
      if (field) {
        if (this.timer) {
          clearTimeout(this.timeout);
          this.timer = null;
        }
        this.timer = setTimeout(async () => {
          this.matches = [];
          let array = await this.$store.dispatch("searchTracks", field);
          this.matches.push(...array);
        }, 1500);
      } else {
        this.matches = [];
      }
    },
    async findMatch(field) {
      this.matchingField = field;
      console.log(field);
      this.searchOpen = true;
      this.matches = [];
      let searchItems = field.fields.map((x) => {
        return x.value;
      });
      searchItems = searchItems.filter((x) => {
        return typeof x === "string";
      });
      let searchString = "";
      searchItems.forEach((x) => {
        searchString += x += " ";
      });
      console.log(searchString);
      let array = await this.$store.dispatch("searchTracks", searchString);
      this.matches.push(...array);
    },
    turnLibraryPage(coordinates) {
      console.log(coordinates);
      this.topIndex = coordinates.topIndex;
      this.bottomIndex = coordinates.bottomIndex;
    },
    deleteMatch(field) {
      delete field.libraryMatch;
    },
    appendToPlaylist(match) {
      this.matchingField.libraryMatch = match;
      this.searchOpen = false;
      this.matchingField = undefined;
      this.matches = [];
    },
    navigateBackwards() {
      this.activeEvent = false;
    },
    importPlaylist() {
      document.getElementById("import-input").click();
    },
    async callDb() {
      await this.$store.dispatch("uploadLibrary", this.library);
    },
    createDOMElement(readXML) {
      var parser = new DOMParser();
      var doc = parser.parseFromString(readXML, "application/xml");
      return doc;
    },
    createLibraryPlaylists(dom) {
      let playlist = {};
      for (let i = 0; i < dom.children.length; i++) {
        let playlistElement = dom.children[i];
        for (let n = 0; n < playlistElement.children.length - 1; n += 2) {
          let playlistElementDetailName =
            playlistElement.children[n].textContent;
          let playlistElementDetailValue = playlistElement.children[n + 1];
          let value;
          if (
            playlistElementDetailValue.tagName === "true" ||
            playlistElementDetailValue.tagName === "false"
          ) {
            value = playlistElementDetailValue.tagName;
          } else if (playlistElementDetailValue.tagName === "array") {
            let tracks = [];
            for (
              let y = 0;
              y < playlistElementDetailValue.children.length;
              y++
            ) {
              let track = {};
              const playlistElementDetailMap =
                playlistElementDetailValue.children[y];
              for (
                let z = 0;
                z < playlistElementDetailMap.children.length - 1;
                z += 2
              ) {
                const key = playlistElementDetailMap.children[z].textContent;
                let trackId =
                  playlistElementDetailMap.children[z + 1].textContent;
                track[key] = trackId;
                tracks.push(track);
              }
              value = tracks;
            }
          } else {
            value = playlistElementDetailValue.textContent;
          }
          playlist[playlistElementDetailName] = value;
        }
        console.log(playlist);
        this.library.playlists.push({ ...playlist });
        this.playlist;
      }
    },
    createLibraryTracks(dom) {
      for (let i = 0; i < dom.children.length - 1; i += 2) {
        let track = {};
        for (let n = 0; n < dom.children[i + 1].children.length - 1; n += 2) {
          let trackDetailName = dom.children[i + 1].children[n].textContent;
          let trackDetail = dom.children[i + 1].children[n + 1].textContent;
          track[trackDetailName] = trackDetail;
        }
        this.library.tracks.push(track);
      }
    },
    createLibraryMeta(dom, index) {
      let key = dom.children[index].textContent.replaceAll('"', "");
      let value = dom.children[index + 1];
      if (value.tagName === "true" || value.tagName === "false") {
        value = value.tagName;
      } else {
        value = value.textContent;
      }
      this.library.meta[key] = value;
    },
    async readFile(e) {
      let file = e.target.files[0];
      var reader = new FileReader();
      reader.onload = (e) => {
        let readXML = e.target.result;
        let doc = this.createDOMElement(readXML);
        console.log(doc);
        const child = doc.children[0];
        console.log(child);
        if (child.nodeName === "plist") {
          let playlistNode = child;
          console.log(playlistNode.children);
          let playlistChildren = playlistNode.children[0];
          // console.log(playlistChildren);
          if (playlistChildren.nodeType === 1) {
            for (let x = 0; x < playlistChildren.children.length - 1; x += 2) {
              switch (playlistChildren.children[x + 1].tagName) {
                case "array":
                  this.createLibraryPlaylists(playlistChildren.children[x + 1]);
                  break;
                case "dict":
                  this.createLibraryTracks(playlistChildren.children[x + 1]);
                  break;
                default:
                  this.createLibraryMeta(playlistChildren, x);
                  break;
              }
            }
          }
        }

        console.log(this.library);
        this.callDb();
      };
      reader.readAsText(file);
    },
  },
  computed: {
    tracks() {
      return this.$store.getters.libraryTracks(this.topIndex, this.bottomIndex);
    },
    playlists() {
      return this.$store.getters.libraryPlaylists;
    },
    meta() {
      return this.$store.getters.libraryMeta;
    },
    backArrowActive() {
      if (this.activeEvent) {
        return true;
      } else {
        return false;
      }
    },
  },
  async created() {
    if (!this.$store.state.user) {
      await this.$store.dispatch("setUser");
    }
    this.$store.dispatch("getAdminEvents");
    this.$store.dispatch("retrieveLibrary").catch((e) => {
      if (e.message) {
        console.log(e);
        this.error = e.message;
      }
    });
  },
  components: {
    AdminDashboardLibrary,
    AdminDashboardLibraryEvents,
    AdminLibraryPlaylistBuilderEventCard,
  },
  props: [],
};
</script>
<style scoped>
.track-list {
  grid-row: 3/6;
  grid-column: 1 / 2;
}

.sidebar-wrapper {
  grid-row: 2/3;
  grid-column: 1/2;
}

.events-list,
.event-card {
  height: calc(100% - 60px);
}

.playlist-builder {
  height: 100%;
  max-height: 100%;
}
@media screen and (min-width: 800px) {
  .track-list {
    grid-row: 3/5;
    grid-column: 1 / 3;
  }

  .sidebar-wrapper {
    grid-row: 2/3;
    grid-column: 1/3;
  }

  .playlist-builder {
    height: 100%;
    max-height: 100%;
  }
}

@media screen and (min-width: 1000px) {
  .track-list {
    grid-row: 1 /3;
    grid-column: 2 / 3;
  }

  .sidebar-wrapper {
    grid-row: 1/3;
    grid-column: 3/ 4;
  }
  .playlist-builder {
    height: 100%;
    max-height: 100%;
  }
}

/* .event-card,
.form-card {
  height: calc(100% - 5px);
} */

/* .playlist-builder > div {
  margin-bottom: 10px;
} */
</style>