<template>
  <base-card
    id="music-library-song-planner"
    :title="`Library (${this.$store.state.library.tracks.length})`"
    actionIcon="x-icon"
    svg="disc"
    :searchIcon="error ? false : true"
    :searchProcessing="searchProcessing"
    @action-one-clicked="closeSongPicker"
    @search-input="searchTracks"
  >
    <template v-slot:content>
      <div id="music-library-song-picker-song-list" @scroll="checkForReload">
        <h5 v-if="matches.length > 0">Matches</h5>
        <h5 v-if="error">{{ error }}</h5>
        <library-song-item
          v-for="(track, index) in matches"
          :key="index"
          :track="track"
          :plusSign="true"
          @plus-sign-clicked="emitTrack(track)"
        />
        <div v-if="matches.length === 0 && searchTerm">
          <h5>No Matches Found</h5>
        </div>
        <div v-if="matches.length > 0">
          <h5>Library</h5>
        </div>
        <library-song-item
          v-for="(track, index) in tracks"
          :key="index"
          :track="track"
          :plusSign="true"
          @plus-sign-clicked="emitTrack(track)"
        />
      </div>
    </template>
  </base-card>
</template>
<script>
import LibrarySongItem from "./LibrarySongItem.vue";
export default {
  data() {
    return {
      topIndex: 0,
      timer: null,
      bottomIndex: 100,
      matches: [],
      error: undefined,
      searchTerm: undefined,
      searchProcessing: false,
    };
  },
  computed: {
    listWrapper() {
      return document.querySelector("#music-library-song-picker-song-list");
    },

    tracks() {
      return this.$store.getters.libraryTracks(this.topIndex, this.bottomIndex);
    },
  },
  methods: {
    emitTrack(track) {
      this.$emit("emit-track", track);
    },
    closeSongPicker() {
      this.$emit("close-song-picker");
    },
    async searchTracks(field) {
      if (field) {
        if (this.timer) {
          clearTimeout(this.timeout);
          this.timer = null;
        }
        this.searchProcessing = true;
        this.timer = setTimeout(async () => {
          this.matches = [];
          let array = await this.$store.dispatch("searchTracks", field);
          this.matches.push(...array.splice(0, 100));
          this.searchProcessing = false;
        }, 1500);
      } else {
        this.matches = [];
      }
    },

    checkForReload() {
      let scrollBottom =
        this.listWrapper.scrollTop + this.listWrapper.offsetHeight;
      let scrollTop = this.listWrapper.scrollTop;
      if (this.topIndex !== 0 && scrollTop === 0) {
        if (this.topIndex > 100) {
          this.topIndex -= 100;
          this.bottomIndex -= 100;
          scrollTop =
            this.listWrapper.scrollHeight - this.listWrapper.offsetHeight;
        } else if (this.topIndex <= 100) {
          this.bottomIndex -= this.topIndex;
          this.topIndex = 0;
          scrollTop =
            this.listWrapper.scrollHeight - this.listWrapper.offsetHeight;
        }
      }
      if (
        scrollBottom > this.listWrapper.scrollHeight - 60 &&
        this.bottomIndex !== this.$store.state.library.tracks.length
      ) {
        this.topIndex += 100;
        this.bottomIndex += 100;
        this.listWrapper.scrollTop = 5;
      }
    },
  },
  async created() {
    if (this.$store.state.library.tracks.length === 0) {
      this.$store.dispatch("retrieveLibrary").catch((e) => {
        if (e.message) {
          this.error = e.message;
        }
      });
    }
  },
  components: { LibrarySongItem },
  props: [],
  emits: ["emit-track", "close-song-picker"],
};
</script>
<style scoped>
#music-library-song-planner {
  position: fixed;
  top: 10%;
  left: 10%;
  width: 80%;
  height: 80%;
  z-index: 100;
}

#music-library-song-picker-song-list {
  height: 100%;
  overflow: scroll;
}

h5 {
  text-transform: uppercase;
  width: 100%;
  padding: 10px 0;
  background-color: var(--textColor);
  color: var(--foregroundColor);
}
</style>