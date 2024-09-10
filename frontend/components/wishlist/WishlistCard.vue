<!-- TODO: Create base component along with product card -->
<template>
  <v-sheet
    elevation="1"
    rounded
    class="overflow-hidden px-3 py-3 d-flex flex-column"
  >
    <div class="position-relative">
      <v-img
        v-if="wishlistItem.product.thumbnail"
        :width="225"
        :height="225"
        cover
        :src="wishlistItem.product.thumbnail"
        :alt="wishlistItem.product.title"
        class="thumbnail"
      ></v-img>

      <div class="favorite-button">
        <v-btn
          icon="mdi-close"
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
        {{ wishlistItem.product.title }}
      </h4>

      <h6
        class="category"
        v-if="wishlistItem.product.categories?.length"
      >
        {{ wishlistItem.product.categories[0].name }}
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

    <div class="d-flex flex-column align-center ga-1 mt-2">
      <v-btn
        size="small"
        color="green_primary"
        class="read-more-btn"
        append-icon="mdi-arrow-right"
        block
      >
        Read More
      </v-btn>

      <v-btn
        prepend-icon="mdi-cart-plus"
        variant="outlined"
        size="small"
        block
        :disabled="productQuantityStatus === PRODUCT_AVAILABILITY.OUT_OF_STOCK"
        >Add to Cart</v-btn
      >
    </div>
  </v-sheet>
</template>

<script setup lang="ts">
import { PRODUCT_AVAILABILITY, PRODUCT_AVAILABILITY_LABELS } from "~/constant";
import { useCommonStore } from "~/store/common";
import type { WishlistItem } from "~/types";
import { getProductAvailabilityStatus } from "~/utils/product";

type WishlistCardProps = {
  wishlistItem: WishlistItem;
};

const props = defineProps<WishlistCardProps>();
const productQuantityStatus = getProductAvailabilityStatus(props.wishlistItem.product);
const commonStore = useCommonStore();
const { selectedRegion } = storeToRefs(commonStore);
const { wishlist, removeFromWishlist, isRemovingFromWishlist } = useWishlist();

const wishlistItemId = computed(() => {
  return wishlist.value.find((item) => item.product_id === props.wishlistItem.product.id)?.id;
});

const isAddingOrRemovingWishlistItem = computed(() => {
  return isRemovingFromWishlist.value;
});

const onClick = () => {
  const { id: productID } = props.wishlistItem.product;

  if (!productID || !wishlistItemId.value) return;

  removeFromWishlist({ wishItemIDS: [wishlistItemId.value] });
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

const convertToDecimal = (amount: number) => {
  return Math.floor(amount) / 100;
};

const price = computed(() => {
  return props.wishlistItem.product.variants.reduce((prev, curr) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: selectedRegion.value?.currency_code || "usd",
    }).format(convertToDecimal(curr.calculated_price_incl_tax || 0));
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
