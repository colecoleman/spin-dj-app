<template>
  <div class="sidebar-button-wrapper">
    <round-icon-button
      class="button"
      svg="back-arrow"
      @click="backArrowClicked()"
      v-if="backArrowActive"
    />
  </div>
</template>
<script>
import RoundIconButton from "../../../../Components/SharedComponentsUI/RoundIconButton.vue";
export default {
  data() {
    return {};
  },
  methods: {
    backArrowClicked() {
      this.$emit("back-arrow-clicked");
    },
    importPlaylistClicked() {},
    async callDb() {
      await this.$store.dispatch("uploadLibrary", this.library);
    },
    createDOMElement(readXML) {
      var parser = new DOMParser();
      var doc = parser.parseFromString(readXML, "application/xml");
      console.log(doc);
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
  created() {},
  components: {
    RoundIconButton,
  },
  emits: ["back-arrow-clicked", "import-playlist-clicked"],
  props: ["backArrowActive"],
};
</script>
<style scoped>
.sidebar-button-wrapper {
  display: flex;
}

.button {
  /* outline: 1px solid var(--cardOutline); */
}
</style>