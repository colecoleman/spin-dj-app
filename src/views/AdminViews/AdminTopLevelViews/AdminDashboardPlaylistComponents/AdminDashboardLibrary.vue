<template>
  <base-card
    :title="matchingField ? matchingField.name : 'Tracks'"
    svg="disc"
    :searchIcon="error ? false : true"
    :actionIcon="libraryUploading ? 'loading' : 'import-playlist'"
    @action-one-clicked="importPlaylist"
    @search-input="updateSearchTerm"
    @search-blurred="searchForTrack"
  >
    <template v-slot:content>
      <div id="tracks-wrapper" @scroll="checkForReload">
        <h5 v-if="error">{{ error }}</h5>
        <h5 v-if="matches.length > 0">Matches</h5>
        <div class="match-item" v-for="(track, index) in matches" :key="index">
          <track-item :track="track" class="match-track" />
          <round-icon-button
            v-if="matchingField"
            svg="circle-checkmark"
            @click="appendToPlaylist(track)"
          />
        </div>
        <div v-if="matches.length === 0 && matchingField">
          <h5>No Matches Found</h5>
        </div>
        <h5 v-if="matches.length > 0">Library</h5>
        <track-item
          v-for="(track, index) in tracks"
          :key="index"
          :track="track"
        />
      </div>
    </template>
  </base-card>
</template>
<script>
import RoundIconButton from "../../../../SharedComponents/SharedComponentsUI/RoundIconButton.vue";
import TrackItem from "../../../../SharedComponents/SharedComponentsLibrary/LibrarySongItem.vue";
export default {
  data() {
    return {
      searchTerm: undefined,
    };
  },
  computed: {
    listWrapper() {
      return document.querySelector("#tracks-wrapper");
    },
  },
  methods: {
    appendToPlaylist(track) {
      this.$emit("appendToPlaylist", track);
    },
    updateSearchTerm(value) {
      this.searchTerm = value;
      this.searchForTrack();
    },
    searchForTrack() {
      this.$emit("searchForTrack", this.searchTerm);
    },
    importPlaylist() {
      this.$emit("importPlaylist");
    },
    checkForReload() {
      let scrollBottom =
        this.listWrapper.scrollTop + this.listWrapper.offsetHeight;
      let scrollTop = this.listWrapper.scrollTop;
      if (this.topIndex !== 0 && scrollTop === 0) {
        if (this.topIndex > 100) {
          scrollTop = 5;
          this.$emit("turnLibraryPage", {
            topIndex: this.topIndex - 100,
            bottomIndex: this.bottomIndex - 100,
          });
        } else if (this.topIndex <= 100) {
          this.$emit("turnLibraryPage", {
            topIndex: 0,
            bottomIndex: this.bottomIndex - this.topIndex,
          });
          scrollTop = 5;
        }
      }
      if (
        scrollBottom > this.listWrapper.scrollHeight - 60 &&
        this.bottomIndex !== this.$store.state.library.tracks.length
      ) {
        this.$emit("turnLibraryPage", {
          topIndex: this.topIndex + 100,
          bottomIndex: this.bottomIndex + 100,
        });
        this.listWrapper.scrollTop = 5;
      }
    },
  },
  created() {},
  components: { TrackItem, RoundIconButton },
  emits: ["searchForTrack", "turnLibraryPage", "importPlaylist"],
  props: [
    "tracks",
    "matches",
    "matchingField",
    "searchOpen",
    "topIndex",
    "bottomIndex",
    "error",
    "libraryUploading",
  ],
};
</script>
<style scoped>
#tracks-wrapper {
  height: 100%;
  width: 100%;
  overflow: scroll;
}

.match-item {
  width: 100%;
  display: flex;
  flex-direction: row;
}

.match-track {
  /* min-width: 90%;
  max-width: 100%;
  width: 100%; */
  width: 100%;
}

h5 {
  text-transform: uppercase;
  width: 100%;
  padding: 10px 0;
  background-color: var(--textColor);
  color: var(--foregroundColor);
}
</style>