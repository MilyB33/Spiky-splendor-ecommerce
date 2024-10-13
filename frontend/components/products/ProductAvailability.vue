<template>
  <div class="d-flex align-center ga-1">
    <div
      class="status-circle"
      :class="productAvailabilityConfig.class"
    ></div>
    <span :class="size">{{ productAvailabilityConfig.label }}</span>
  </div>
</template>

<script lang="ts" setup>
import type { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import { getProductAvailabilityStatus } from "~/utils/product";
import { PRODUCT_AVAILABILITY, PRODUCT_AVAILABILITY_LABELS } from "~/constant";

type ProductCardProps = {
  product: PricedProduct;
  size: "sm" | "md";
};

const props = defineProps<ProductCardProps>();

const productQuantityStatus = getProductAvailabilityStatus(props.product);

const size = computed(() => {
  if (props.size === "sm") {
    return "text-body-2";
  }

  return undefined;
});

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
</script>

<style lang="scss" scoped>
.status-circle {
  width: 10px;
  height: 10px;
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
