<template>
  <v-card
    class="rounded-lg"
    height="650px"
  >
    <v-data-table
      class="h-100 bg-transparent"
      :items="returnsTableColumns"
      :items-per-page="SETTINGS.RETURNS_PAGE_LIMIT"
      :headers="columnsHeaders"
      disable-sort
      fixed-header
      :loading="isFetchingReturns"
    >
      <template v-slot:bottom>
        <div class="text-center pt-2">
          <v-pagination
            v-model="params.page"
            :length="pageCount"
          ></v-pagination>
        </div>
      </template>

      <template v-slot:item.items="{ item }">
        <ReturnItemColumn
          v-for="(returnItem, index) in item.items"
          :item="returnItem"
          :index="index + 1"
        />
      </template>
      <template v-slot:item.actions="{ item }">
        <ConfirmCancelReturnModal
          :return-id="item.id"
          :return-status="item.return_status"
        />
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts" setup>
import type { ReturnItem } from "@medusajs/medusa";
import { SETTINGS } from "~/constant";
import { getReturnsTableColumnsHeaders, prepareReturnsTableColumns } from "~/utils/returns";

const columnsHeaders = getReturnsTableColumnsHeaders();

const { returns, isFetchingReturns, params, pageCount } = useReturns();

const returnsTableColumns = computed(() => prepareReturnsTableColumns(returns.value));
</script>
