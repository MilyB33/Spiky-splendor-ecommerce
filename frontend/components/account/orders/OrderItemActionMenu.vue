<template>
  <v-menu offset="4">
    <template v-slot:activator="{ props }">
      <v-btn
        icon="mdi-dots-vertical"
        variant="text"
        size="small"
        v-bind="props"
      />
    </template>

    <v-card class="d-flex flex-column bg-white rounded-lg">
      <div>
        <CreateReturnModal
          :order-id="orderId"
          :order-status="orderStatus"
          :order-items="orderItems"
          :returns="returns"
        />
      </div>
      <v-divider />
      <div>
        <ConfirmCancelOrderModal
          :order-id="orderId"
          :display-order-id="displayOrderId"
          :order-status="orderStatus"
          :fulfillment_status="fulfillmentStatus"
        />
      </div>
      <v-divider />
      <div>
        <GenerateInvoice
          :order-id="orderId"
          :payment-status="paymentStatus"
          :invoice="invoice"
        />
      </div>
    </v-card>
  </v-menu>
</template>

<script lang="ts" setup>
import type { FulfillmentStatus, Order, OrderStatus, Return } from "@medusajs/medusa";
import type { Invoice } from "~/types";

type OrderItemActionMenuProps = {
  orderId: string;
  displayOrderId: string;
  orderStatus: OrderStatus;
  orderItems: Order["items"];
  returns?: Return[];
  fulfillmentStatus: FulfillmentStatus;
  paymentStatus: string;
  invoice?: Invoice;
};

defineProps<OrderItemActionMenuProps>();
</script>
