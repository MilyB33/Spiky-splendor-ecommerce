<template>
  <v-dialog
    max-width="500"
    v-model:model-value="isActive"
    persistent
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="{ ...activatorProps, ...props }"
        variant="text"
        block
        :disabled="isDisabled"
        style="pointer-events: auto"
      >
        Zwróć
      </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card
        class="text-center pa-4"
        title="Utwórz zwrot"
      >
        <CreateReturnForm
          :order-id="orderId"
          :order-items="orderItems"
          :is-active="isActive"
        />
      </v-card>
    </template>
  </v-dialog>
</template>

<script lang="ts" setup>
import type { Order, OrderStatus, Return } from "@medusajs/medusa";

type CreateReturnModalProps = {
  orderId: string;
  orderStatus: OrderStatus;
  orderItems: Order["items"];
  returns?: Return[];
};

const isActive = ref(false);

const props = defineProps<CreateReturnModalProps>();
const isDisabled = computed(
  () =>
    props.orderStatus === "pending" || props.returns?.some((item) => item.status === "requested"),
);
</script>
