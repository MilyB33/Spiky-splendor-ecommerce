<template>
  <v-card
    class="rounded-lg"
    height="650px"
  >
    <v-data-table
      class="h-100 bg-transparent"
      :items="ordersTableColumns"
      :items-per-page="SETTINGS.ORDERS_PAGE_LIMIT"
      :headers="columnsHeaders"
      disable-sort
      :loading="isFetchingOrders"
    >
      <template v-slot:bottom>
        <div class="text-center pt-2">
          <v-pagination
            v-model="params.page"
            :length="pageCount"
          ></v-pagination>
        </div>
      </template>

      <template v-slot:item.actions="{ item }">
        <OrderItemActionMenu
          :order-id="item.id"
          :display-order-id="item.order_id"
          :order-status="item.order_status"
          :order-items="item.items"
          :returns="item.returns"
          :fulfillment-status="item.fulfillments_status"
        />
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts" setup>
import { getOrdersTableColumnsHeaders, prepareOrdersTableColumns } from "~/utils/orders";
import { SETTINGS } from "~/constant";

const columnsHeaders = getOrdersTableColumnsHeaders();

const { orders, isFetchingOrders, params, pageCount } = useOrders();

const ordersTableColumns = computed(() =>
  prepareOrdersTableColumns(orders.value?.orders || [], orders.value?.orders[0]?.currency_code),
);
</script>
