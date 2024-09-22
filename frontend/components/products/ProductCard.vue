<template>
  <v-sheet
    elevation="1"
    rounded
    class="overflow-hidden px-3 py-3 d-flex flex-column"
  >
    <div class="position-relative">
      <v-img
        v-if="product.thumbnail"
        :width="225"
        :height="225"
        cover
        :src="product.thumbnail"
        :alt="product.title"
        class="thumbnail"
      ></v-img>

      <div class="favorite-button">
        <v-btn
          :icon="!!wishlistItemId ? 'mdi-heart' : 'mdi-heart-outline'"
          size="small"
          variant="elevated"
          color="light_green"
          style="color: white !important"
          @click="onClick"
          :disabled="isAddingOrRemovingWishlistItem"
        >
        </v-btn>
      </div>
    </div>
    <div class="mt-2 d-flex flex-column ga-1">
      <h4>
        {{ product.title }}
      </h4>

      <h6
        class="category"
        v-if="product.categories?.length"
      >
        {{ product.categories[0].name }}
      </h6>

      <div class="d-flex align-center ga-1">
        <div
          class="status-circle"
          :class="productAvailabilityConfig.class"
        ></div>
        <span class="text-body-2">{{ productAvailabilityConfig.label }}</span>
      </div>

      <div class="">
        <span>{{ price }}</span>
      </div>
    </div>

    <div class="d-flex align-center ga-1 mt-2 justify-space-between">
      <v-btn
        icon="mdi-cart-plus"
        size="x-small"
        color="green_primary"
        :disabled="productQuantityStatus === PRODUCT_AVAILABILITY.OUT_OF_STOCK"
        @click="onAddToCart"
      />

      <v-btn
        size="small"
        color="green_primary"
        class="read-more-btn"
        append-icon="mdi-arrow-right"
        rounded
      >
        Read More
      </v-btn>
    </div>
  </v-sheet>
</template>

<script setup lang="ts">
import type { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import { PRODUCT_AVAILABILITY, PRODUCT_AVAILABILITY_LABELS } from "~/constant";
import { useCommonStore } from "~/store/common";
import { getProductAvailabilityStatus, formatCurrency } from "~/utils/product";

type ProductCardProps = {
  product: PricedProduct;
};

const props = defineProps<ProductCardProps>();
const productQuantityStatus = getProductAvailabilityStatus(props.product);
const commonStore = useCommonStore();
const { selectedRegion } = storeToRefs(commonStore);
const { wishlist, removeFromWishlist, addToWishlist, isRemovingFromWishlist, isAddingToWishlist } =
  useWishlist();
const { addItemToCart, cart } = useCart();

const wishlistItemId = computed(() => {
  return wishlist.value.find((item) => item.product_id === props.product.id)?.id;
});

const isAddingOrRemovingWishlistItem = computed(() => {
  return isRemovingFromWishlist.value || isAddingToWishlist.value;
});

const onClick = () => {
  const { id: productID } = props.product;

  if (!productID) return;

  if (!wishlistItemId.value) {
    addToWishlist({ productID });
  } else {
    removeFromWishlist({ wishItemIDS: [wishlistItemId.value] });
  }
};

const onAddToCart = () => {
  if (props.product.variants[0].id) {
    addItemToCart(props.product.variants[0].id);
  }
};

const productAvailabilityConfig = computed(() => {
  switch (productQuantityStatus) {
    case PRODUCT_AVAILABILITY.OUT_OF_STOCK: {
      return {
        class: "status-circle--out-of-stock",
        label: PRODUCT_AVAILABILITY_LABELS[PRODUCT_AVAILABILITY.OUT_OF_STOCK],
      };
    }
    case PRODUCT_AVAILABILITY.LOW_STOCK: {
      return {
        class: "status-circle--low-stock",
        label: PRODUCT_AVAILABILITY_LABELS[PRODUCT_AVAILABILITY.LOW_STOCK],
      };
    }
    case PRODUCT_AVAILABILITY.AVAILABLE: {
      return {
        class: "status-circle--available",
        label: PRODUCT_AVAILABILITY_LABELS[PRODUCT_AVAILABILITY.AVAILABLE],
      };
    }
    case PRODUCT_AVAILABILITY.OUT_OF_STOCK:
    default: {
      return {
        class: "status-circle--out-of-stock",
        label: PRODUCT_AVAILABILITY_LABELS[PRODUCT_AVAILABILITY.OUT_OF_STOCK],
      };
    }
  }
});

const price = computed(() => {
  return props.product.variants.reduce((prev, curr) => {
    return formatCurrency(curr.calculated_price_incl_tax || 0, selectedRegion.value?.currency_code);
  }, "");
});
</script>

<style scoped lang="scss">
.thumbnail {
  width: 225px;
  height: 225px;
  border-radius: 5px;
  object-fit: cover;
}

.favorite-button {
  position: absolute;
  top: 10px;
  right: 10px;
}

.category {
  color: #8d99ae;
}

.status-circle {
  width: 8px;
  height: 8px;
  border-radius: 50%;

  &--available {
    background-color: #80b918;
  }

  &--low-stock {
    background-color: #ff8800;
  }

  &--out-of-stock {
    background-color: #cc0000;
  }
}
</style>
