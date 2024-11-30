<template>
  <v-sheet
    elevation="1"
    rounded
    class="overflow-hidden px-3 py-3 d-flex flex-column"
  >
    <div class="position-relative">
      <v-img
        v-if="product.thumbnail"
        :width="180"
        :height="180"
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

      <ProductAvailability
        :product="props.product"
        size="sm"
      />

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

      <NuxtLink :to="`/products/${product.handle}`">
        <v-btn
          size="small"
          color="green_primary"
          class="read-more-btn"
          append-icon="mdi-arrow-right"
          rounded
        >
          Więcej
        </v-btn>
      </NuxtLink>
    </div>
  </v-sheet>
</template>

<script setup lang="ts">
import type { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import { PRODUCT_AVAILABILITY } from "~/constant";
import { getProductAvailabilityStatus, formatCurrency } from "~/utils/product";

type ProductCardProps = {
  product: PricedProduct;
};

const props = defineProps<ProductCardProps>();
const productQuantityStatus = getProductAvailabilityStatus(props.product);
const { wishlist, removeFromWishlist, addToWishlist, isRemovingFromWishlist, isAddingToWishlist } =
  useWishlist();
const { addItemToCart, cart } = useCart();
const { region } = useRegions();

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
    addItemToCart({ variantId: props.product.variants[0].id, quantity: 1 });
  }
};

const price = computed(() => {
  return props.product.variants.reduce((prev, curr) => {
    return formatCurrency(curr.calculated_price_incl_tax || 0, region.value?.currency_code);
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
</style>
