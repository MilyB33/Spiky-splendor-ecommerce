<template>
  <div>
    <p class="text-truncate">{{ index }}. {{ item.item.title }} x {{ item.quantity }}</p>
  </div>
</template>

<script lang="ts" setup>
import type { ReturnItem } from "@medusajs/medusa";

type ReturnItemColumnProps = {
  item: ReturnItem;
  index: number;
};

defineProps<ReturnItemColumnProps>();
</script>
