<template>
  <v-dialog
    max-width="500"
    v-model:model-value="isActive"
    persistent
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-tooltip
        :disabled="!isDisabled"
        text="Zamówienie zostało wysłane lub anulowane."
        location="bottom"
      >
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="{ ...activatorProps, ...props }"
            variant="text"
            block
            :disabled="isDisabled"
            style="pointer-events: auto"
          >
            Anuluj
          </v-btn>
        </template>
      </v-tooltip>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card
        class="text-center pa-4"
        :title="`Anuluj zamówienie ${displayOrderId}`"
      >
        <v-card-text> Czy jesteś pewien, ze chcesz anulować to zamówienie? </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            variant="outlined"
            @click="isActive.value = false"
            :disabled="isCancellingOrder"
          >
            Nie
          </v-btn>

          <v-btn
            variant="tonal"
            color="red"
            @click="onCancel"
            :disabled="isCancellingOrder"
          >
            Tak, anuluj
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script lang="ts" setup>
import type { FulfillmentStatus, OrderStatus } from "@medusajs/medusa";

type ConfirmCancelOrderModalProps = {
  orderId: string;
  displayOrderId: string;
  orderStatus: OrderStatus;
  fulfillment_status: FulfillmentStatus;
};

const { cancelOrder, isCancellingOrder } = useOrders();

const isActive = ref(false);

const props = defineProps<ConfirmCancelOrderModalProps>();

const isDisabled = computed(
  () => props.orderStatus !== "pending" || props.fulfillment_status !== "not_fulfilled",
);

const onCancel = async () => {
  await cancelOrder(props.orderId);

  isActive.value = false;
};
</script>
