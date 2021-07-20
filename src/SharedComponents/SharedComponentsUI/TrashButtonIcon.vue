  <template>
  <div class="square-button-icon" :style="cssVars">
    <img :src="trashCan" alt="" />
  </div>
</template>


<script>
import trashCan from "../../assets/SVGs/trash-can.svg";
export default {
  data() {
    return {
      trashCan,
    };
  },
  computed: {
    foregroundColor() {
      return this.$store.state.businessSettings.brandingPreferences
        .foregroundColor;
    },
    backgroundColor() {
      return this.$store.state.businessSettings.brandingPreferences
        .backgroundColor;
    },
    textColor() {
      return this.$store.state.businessSettings.brandingPreferences.textColor;
    },
    cssVars() {
      return {
        "--textcolor": this.textColor,
        "--backgroundColor": this.backgroundColor,
        "--foregroundColor": this.foregroundColor,
      };
    },
  },
  props: ["text", "icon"],
};
</script>

<style scoped>
img {
  height: 15px;
  width: 15px;
}

.square-button-icon {
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  justify-content: center;
  text-transform: uppercase;
  margin: 10px;
  padding: 15px;
  border: 1px solid var(--textcolor);
  border-radius: 7px;
}

.square-button-icon:hover {
  background-color: gray;
}
</style>