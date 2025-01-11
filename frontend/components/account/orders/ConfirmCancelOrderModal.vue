<template>
  <v-dialog
    max-width="500"
    v-model:model-value="isActive"
    persistent
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-tooltip
        :disabled="!isDisabled"
        text="The order has been shipped, canceled or payment was not captured yet."
        location="bottom"
        max-width="300"
      >
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="{ ...activatorProps, ...props }"
            variant="text"
            block
            :disabled="isDisabled"
            style="pointer-events: auto"
          >
            Cancel
          </v-btn>
        </template>
      </v-tooltip>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card
        class="text-center pa-4"
        :title="`Cancel order ${displayOrderId}`"
      >
        <v-card-text> Are you sure you want to cancel this order? </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            variant="outlined"
            @click="isActive.value = false"
            :disabled="isCancellingOrder"
          >
            No
          </v-btn>

          <v-btn
            variant="tonal"
            color="red"
            @click="onCancel"
            :disabled="isCancellingOrder"
          >
            Yes, cancel
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
  paymentStatus: string;
};

const { cancelOrder, isCancellingOrder } = useOrders();

const isActive = ref(false);

const props = defineProps<ConfirmCancelOrderModalProps>();
console.log(props.paymentStatus);
const isDisabled = computed(
  () =>
    props.orderStatus !== "pending" ||
    props.fulfillment_status !== "not_fulfilled" ||
    props.paymentStatus !== "captured",
);

const onCancel = async () => {
  try {
    await cancelOrder(props.orderId);

    isActive.value = false;
  } catch (error) {
    // handled in mutation query composable
  }
};
</script>
