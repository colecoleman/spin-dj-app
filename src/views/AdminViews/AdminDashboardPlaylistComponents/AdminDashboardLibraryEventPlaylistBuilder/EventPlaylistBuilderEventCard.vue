<template>
  <base-card
    :title="event.title ? event.title : 'Event'"
    :subtitle="eventDate"
    :actionIcon="event ? 'back-arrow' : false"
    @action-one-clicked="backArrowClicked"
    svg="calendar"
  >
    <template v-slot:content>
      <div class="forms-dropdown-button">
        <button-with-dropdown
          :text="activeForm ? activeForm.name : 'Choose Form'"
          :actions="dropdownItems"
          @button-clicked="makeFormActive"
        ></button-with-dropdown>
      </div>
      <div v-if="activeForm" class="form-wrapper">
        <div
          class="field-item"
          v-for="(field, index) in activeForm.fields"
          :key="index"
        >
          <list-item-style-wrapper class="field-wrapper" :title="field.name">
            <div class="field-fields-wrapper">
              <div
                class="fields-fields-item"
                v-for="(field, index) in field.fields"
                :key="index"
              >
                <p class="input-title">{{ field.inputTitle }}</p>
                <p class="input-value">
                  {{ field.value ? field.value : "No Input" }}
                </p>
              </div>
              <div class="match-wrapper"></div>
            </div>
          </list-item-style-wrapper>
          <div class="search-match-wrapper" v-if="field.libraryMatch">
            <library-item
              class="match-item"
              v-if="field.libraryMatch"
              :track="field.libraryMatch"
            />
            <round-icon-button
              svg="x-icon"
              class="search-button"
              @click="deleteMatch(field)"
            />
          </div>
          <round-icon-button
            svg="search"
            class="search-button"
            v-if="!field.libraryMatch"
            @click="findMatch(field)"
          />
        </div>
        <button-standard-with-icon
          id="submit-button"
          text="Generate Playlist"
          @click="createPlaylistFile"
        />
      </div>
    </template>
  </base-card>
</template>
<script>
// import ListItemStyleWrapper from "../../../../../Components/SharedComponentsUI/ListItemStyleWrapper.vue";
import LibraryItem from "../../../../Components/SharedComponentsLibrary/LibrarySongItem.vue";
import ListItemStyleWrapper from "../../../../Components/SharedComponentsUI/ListItemStyleWrapper.vue";
import RoundIconButton from "../../../../Components/SharedComponentsUI/RoundIconButton.vue";
import ButtonWithDropdown from "../../../../Components/SharedComponentsUI/ButtonWithDropDownSelections.vue";
import { formatDate } from "../../../../helpers.js";
export default {
  data() {
    return {
      playlistItems: [],
    };
  },
  methods: {
    makeFormActive(id) {
      this.$emit("form-chosen", id);
    },
    findMatch(field) {
      this.$emit("find-matches", field);
    },
    deleteMatch(field) {
      this.$emit("delete-match", field);
    },
    backArrowClicked() {
      this.$emit("back-arrow-clicked");
    },
    createTrackDetails(tracks) {
      let tracksString = "";
      tracks.forEach((track) => {
        let trackString = `<key>${track["Track ID"]}</key>
		<dict>`;
        Object.entries(track).forEach((entry) => {
          const [key, value] = entry;
          if (
            [
              "Track ID",
              "Minor Version",
              "Size",
              "Total Time",
              "Disc Number",
              "Disc Count",
              "Track Number",
              "Track Count",
              "Year",
              "Normalization",
              "Bit Rate",
              "Sample Rate",
              "Artwork Count",
              "File Folder Count",
              "Library Folder Count",
            ].includes(key)
          ) {
            trackString =
              trackString + `<key>${key}</key><integer>${value}</integer>`;
          } else if (value === "true" || value === "false") {
            trackString = trackString + `<key>${key}</key></true>`;
          } else if (
            [
              "Name",
              "Artist",
              "Album Artist",
              "Album",
              "Composer",
              "Genre",
              "Kind",
              "Sort Album",
              "Sort Artist",
              "Sort Name",
              "Persistent ID",
              "Purchased",
              "Track Type",
              "Location",
            ].includes(key)
          ) {
            trackString =
              trackString +
              `<key>${key}</key><string>${value.replaceAll(
                "&",
                "&#38;"
              )}</string>`;
          } else if (
            ["Date Modified", "Date Added", "Release Date"].includes(key)
          ) {
            trackString =
              trackString + `<key>${key}</key><date>${value}</date>`;
          } else {
            return;
          }
        });
        tracksString = tracksString + trackString + `</dict>`;
      });
      console.log(tracksString);
      return tracksString;
    },
    createTrackIds(tracks) {
      let tracksString = "";
      tracks.forEach((track) => {
        tracksString =
          tracksString +
          `	<dict>
					<key>Track ID</key><integer>${track["Track ID"]}</integer>
				</dict>`;
      });
      return tracksString;
    },
    createPlaylistFile() {
      let libraryMatches = this.activeForm.fields.map((x) => {
        if (x.libraryMatch) {
          return x.libraryMatch;
        } else {
          return;
        }
      });
      libraryMatches = libraryMatches.filter((x) => {
        return x;
      });
      let libraryMeta = this.$store.getters.libraryMeta;
      let iTunesPlaylistXML = `<?xml version="1.0" encoding="UTF-8"?>
        <!DOCTYPE plist  PUBLIC "-//Apple Computer//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
        <plist version="1.0">
        <dict>
          <key>Major Version</key><integer>${
            libraryMeta["Major Version"]
          }</integer>
          <key>Minor Version</key><integer>${
            libraryMeta["Minor Version"]
          }</integer>
          <key>Date</key><date>${new Date().toISOString()}</date>
          <key>Application Version</key><string>${
            libraryMeta["Application Version"]
          }</string>
          <key>Features</key><integer>${libraryMeta["Features"]}</integer>
          <key>Show Content Ratings</key><${
            libraryMeta["Show Content Ratings"]
          }/>
          <key>Music Folder</key><string>${libraryMeta["Music Folder"]}</string>
          <key>Library Persistent ID</key><string>${
            libraryMeta["Library Persistent ID"]
          }</string>
          <key>Tracks</key>
          <dict>
          ${this.createTrackDetails(libraryMatches)}
          </dict>
          <key>Playlists</key>
          <array>
            <dict>
              <key>Name</key><string>${this.event.title} - ${
        this.activeForm.name
      }</string>
              <key>Description</key><string>${this.event.title} - ${
        this.activeForm.name
      }, generated by Spin, a Simple City Software product designed specifically for DJs.</string>
              <key>Playlist ID</key><integer>${Date.now()}</integer>
              <key>Playlist Persistent ID</key><string>${Date.now()}</string>
              <key>All Items</key><true/>
              <key>Playlist Items</key>
              <array>
              ${this.createTrackIds(libraryMatches)}
              </array>
            </dict>
          </array>
        </dict>
        </plist>
        `;
      console.log(iTunesPlaylistXML);
      let fileName =
        this.event.title.replaceAll(/[^\w\s]/gi, "") +
        this.activeForm.name.replaceAll(/[^\w\s]/gi, "") +
        ".xml";
      var pom = document.createElement("a");
      var bb = new Blob([iTunesPlaylistXML], { type: "text/plain" });

      pom.setAttribute("href", window.URL.createObjectURL(bb));
      pom.setAttribute("download", fileName);

      pom.dataset.downloadurl = ["text/plain", pom.download, pom.href].join(
        ":"
      );
      pom.draggable = true;
      pom.classList.add("dragout");

      pom.click();
    },
  },
  computed: {
    eventDate() {
      return formatDate(this.event.data.startTime);
    },
    dropdownItems() {
      return this.event.forms.map((x) => {
        return {
          title: x.name,
          parameter: x.id,
        };
      });
    },
    activeForm() {
      return this.event.forms.find((x) => {
        return x.id === this.chosenForm;
      });
    },
  },
  components: {
    ButtonWithDropdown,
    ListItemStyleWrapper,
    RoundIconButton,
    LibraryItem,
  },
  emits: [
    "form-chosen",
    "find-matches",
    "create-playlist-file",
    "back-arrow-clicked",
  ],
  props: ["event", "chosenForm", "libraryMeta"],
};
</script>
<style scoped>
.forms-dropdown-button {
  width: 100%;
  position: relative;
  height: 50px;
}

p {
  text-align: center;
  width: 100%;
}

h5 {
  text-align: left;
  margin: 0px;
}

.form-wrapper {
  height: calc(100% - 50px);
  overflow-y: scroll;
  overflow-x: hidden;
}

#submit-button {
  margin-bottom: 20px;
}

p {
  width: 100%;
  text-align: left;
}

.field-item {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.field-wrapper {
  width: calc(100% - 20px);
  padding: 8px;
  margin: 10px 0;
}

.field-fields-wrapper {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  /* margin-left: 10px; */
}

.fields-fields-item {
  width: 33%;
}

.field-name {
  font-weight: 600;
  margin-bottom: 0;
}

.input-title {
  font-weight: 600;
}

.input-value {
  margin-left: 15px;
}

.search-button {
  /* margin-top: 0px; */
  height: 30px;
  width: 30px;
}

.search-match-wrapper {
  width: 90%;
  padding-left: 5%;
  margin-bottom: 20px;
  border-left: 1px solid var(--cardOutline);
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}

.match-item {
  width: 80%;
}
</style>