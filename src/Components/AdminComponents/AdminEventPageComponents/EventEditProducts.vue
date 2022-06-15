<template>
  <div id="edit-product-wrapper">
    <div class="event-products products">
      <h4>Event Products:</h4>
      <div
        class="event-product"
        v-for="(product, index) in products"
        :key="product.id"
      >
        <div class="product-title" @click="toggleActiveProduct(product.id)">
          <vue-svg
            svg="down-arrow"
            :class="
              product.id === activeEventProduct
                ? 'arrow'
                : ' arrow inactive-arrow'
            "
          />
          <vue-svg
            svg="x-icon"
            v-if="activeEventProduct === product.id"
            class="product-title-svg"
            @click="removeProductFromEvent(index)"
          />

          <h4>{{ product.name }}</h4>
        </div>
        <div v-if="product.id === activeEventProduct" class="product-wrapper">
          <div
            v-if="product.type === 'Service' || 'Package'"
            class="price-details"
          >
            <div v-if="product.priceOption == 'Hourly'">
              <p>
                Base Time: <b>{{ product.pricing.baseTime }} Hours</b>
              </p>
              <p>
                Base Rate: <b>{{ formatPrice(product.pricing.baseRate) }}</b>
              </p>
              <p>
                Additional Hourly:
                <b>{{ formatPrice(product.pricing.addHourly) }}</b>
              </p>
            </div>
            <div v-if="product.priceOption == 'Flat'">
              <p>
                Rate: <b>{{ formatPrice(product.pricing.baseRate) }}</b>
              </p>
            </div>
          </div>
          <div v-if="product.type === 'Add-On'" class="price-details">
            <div v-if="product.priceOption == 'Flat'">
              <p>
                Rate: <b>{{ formatPrice(product.pricing.baseRate) }} flat</b>
              </p>
            </div>
            <div v-if="product.priceOption == 'Unit'">
              <p>
                Rate: <b>{{ formatPrice(product.pricing.unitRate) }}/unit</b>
              </p>
              <div class="row-flex">
                <p>
                  Units: <b>{{ product.pricing.units }}</b>
                </p>

                <vue-svg
                  svg="edit-pen"
                  v-if="addOnQuantityEditIndex !== index"
                  @click="editQuantityOfAddOnUnits(index)"
                  style="edit-pen-svg"
                />
                <input
                  type="number"
                  v-if="addOnQuantityEditIndex === index"
                  v-model="product.pricing.units"
                  @blur="saveProducts"
                  @keydown.enter="saveProducts"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="business-products products">
      <h4>Business Products:</h4>
      <div
        class="event-product"
        v-for="(product, index) in storeProducts"
        :key="product.id"
      >
        <div
          class="product-title"
          @click="toggleActiveStoreProduct(product.id)"
        >
          <vue-svg
            svg="down-arrow"
            :class="
              product.id === activeEventProduct
                ? 'arrow'
                : ' arrow inactive-arrow'
            "
          />

          <vue-svg
            svg="plus-sign"
            class="product-title-svg"
            v-if="activeStoreProduct === product.id"
            @click="addProductToEvent(product)"
          />
          <h4>{{ product.name }}</h4>
        </div>
        <div v-if="product.id === activeStoreProduct" class="product-wrapper">
          <div
            v-if="
              product.id.includes('service') || product.id.includes('package')
            "
            class="price-details"
          >
            <div v-if="product.priceOption == 'Hourly'">
              <p>
                Base Time: <b>{{ product.pricing.baseTime }} Hours</b>
              </p>
              <p>
                Base Rate: <b>{{ formatPrice(product.pricing.baseRate) }}</b>
              </p>
              <p>
                Additional Hourly:
                <b>{{ formatPrice(product.pricing.addHourly) }}</b>
              </p>
            </div>
            <div v-if="product.priceOption == 'Flat'">
              <p>
                Rate: <b>{{ formatPrice(product.pricing.baseRate) }}</b>
              </p>
            </div>
          </div>
          <div v-if="product.id.includes('addOn')">
            <div v-if="product.priceOption == 'Flat'">
              <p>
                Rate: <b>{{ formatPrice(product.pricing.baseRate) }}</b>
              </p>
            </div>
            <div v-if="product.priceOption == 'Unit'">
              <p>
                Rate: <b>{{ formatPrice(product.pricing.unitRate) }}</b>
              </p>
              <p>
                Quantity:
                <input type="number" v-model="storeProducts[index].units" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VueSvg from "../../../assets/VueSvg.vue";
import { formatPrice } from "../../../helpers.js";
export default {
  data() {
    return {
      activeEventProduct: undefined,
      activeStoreProduct: undefined,
      addOnQuantityEditIndex: undefined,
    };
  },
  methods: {
    formatPrice,
    toggleActiveProduct(id) {
      this.activeEventProduct === id
        ? (this.activeEventProduct = undefined)
        : (this.activeEventProduct = id);
    },
    toggleActiveStoreProduct(id) {
      this.activeStoreProduct === id
        ? (this.activeStoreProduct = undefined)
        : (this.activeStoreProduct = id);
    },
    editQuantityOfAddOnUnits(index) {
      this.addOnQuantityEditIndex = index;
    },
    saveProducts() {
      this.$emit("saveProducts");
    },
    removeProductFromEvent(product) {
      this.$emit("removeProductFromEvent", product);
    },
    addProductToEvent(product) {
      if (product.type === "Add-On" && !product.pricing.units) {
        product.pricing.units = product.pricing.minUnits;
      }
      this.$emit("addProductToEvent", product);
    },
  },
  computed: {
    services() {
      let services = this.$store.getters.services.filter((x) => {
        return !this.products.find((ef) => {
          return x.id === ef.id;
        });
      });
      return services.map((x) => ({
        ...x,
        type: "Service",
      }));
    },
    addOns() {
      let products = this.$store.getters.addOns.filter((x) => {
        return !this.products.find((ef) => {
          return x.id === ef.id;
        });
      });
      return products.map((x) => ({
        ...x,
        type: "Add-On",
      }));
    },
    packages() {
      let packages = this.$store.getters.packages.filter((x) => {
        return !this.products.find((ef) => {
          return x.id === ef.id;
        });
      });
      return packages.map((x) => ({
        ...x,
        type: "Package",
      }));
    },
    storeProducts() {
      return [...this.services, ...this.addOns, ...this.packages];
    },
  },
  created() {},
  components: { VueSvg },
  emits: ["addProductToEvent", "removeProductFromEvent", "saveProducts"],
  props: ["products"],
};
</script>
<style scoped>
#edit-product-wrapper {
  height: 100%;
}
.arrow {
  width: 18px;
  height: 18px;
}
.inactive-arrow {
  rotate: 270deg;
}

.product-title-svg {
  height: 12px;
  width: 12px;
  margin: 15px;
}

.edit-pen-svg {
  height: 10px;
  margin-left: 5px;
}

.products {
  height: 45%;
  overflow: scroll;
}

.product-title {
  margin: 20px;
  display: flex;
  align-items: center;
}

.product-wrapper {
  text-align: left;
}

.row-flex {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.price-details {
  margin-left: 20px;
}

input {
  width: 50px;
}
</style>
