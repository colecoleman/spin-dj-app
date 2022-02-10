<template>
  <base-card
    :title="event.title ? event.title : 'Information'"
    :icon="SVGs.InfoIconSVG"
  >
    <template v-slot:content>
      <div id="contact-card-lower-div">
        <div class="contact-card-lower-div-half">
          <div class="indented-item">
            <p class="bold">
              Invoice Total: {{ formatPrice(total(event.invoice, event.data)) }}
            </p>
            <p class="indented"></p>
          </div>
          <div class="indented-item">
            <p class="bold">
              Payments Received:
              {{
                formatPrice(
                  total(event.invoice, event.data) -
                    balanceOutstanding(event.invoice, event.data)
                )
              }}
            </p>
            <p class="indented"></p>
          </div>
        </div>
        <div class="contact-card-lower-div-half">
          <div class="indented-item">
            <p class="bold">
              Balance Outstanding:
              {{ formatPrice(balanceOutstanding(event.invoice, event.data)) }}
            </p>
            <p class="indented"></p>
          </div>
        </div>
      </div>
    </template>
  </base-card>
</template>
<script>
import {
  formatDate,
  formatTime,
  subtotal,
  total,
  balanceOutstanding,
  formatPrice,
} from "../../../../helpers.js";
import SVGs from "../../../../assets/SVGs/svgIndex.js";
export default {
  data() {
    return {
      SVGs,
    };
  },
  methods: {
    formatDate,
    formatTime,
    subtotal,
    total,
    balanceOutstanding,
    formatPrice,
    toggleEditCard() {
      this.editCardOpen = !this.editCardOpen;
    },
  },
  props: ["event", "eventId"],

  created() {},
  components: {},
};
</script>
<style scoped>
p,
h5 {
  margin: 5px;
}

.indented-item {
  text-align: left;
  margin: 20px 4px;
}

.indented {
  text-align: right;
}
#contact-card-lower-div {
  display: flex;
  flex-direction: row;
}
.contact-card-lower-div-half {
  width: 45%;
}
</style>
