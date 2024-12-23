<template>
  <v-dialog
    fullscreen
    scrollable
    v-model="modal"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        color="green"
        size="small"
        icon="mdi-filter"
        @click="modal = true"
      ></v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card class="pa-4 position-relative">
        <v-btn
          icon="mdi-close"
          size="small"
          @click="isActive.value = false"
          style="position: fixed; top: 10px; right: 16px; z-index: 100000"
        ></v-btn>

        <FiltersForm
          :onFiltersChange="onChangeFilters"
          :initialValues="initialFilters"
        >
          <template v-slot:actions="props">
            <div
              class="d-flex ga-4 ml-auto"
              style="position: sticky; bottom: 10px"
            >
              <v-btn @click="props.handleClear">Clear</v-btn>
              <v-btn
                text="Close"
                color="black"
                @click="isActive.value = false"
              ></v-btn>
              <v-btn type="submit">Search</v-btn>
            </div>
          </template>
        </FiltersForm>
      </v-card>
    </template>
  </v-dialog>
</template>

<script lang="ts" setup>
import type { ProductFiltersSchemaValues } from "~/utils/validation/product-filters-schema";

type FiltersModalProps = {
  onFiltersChange: (values: ProductFiltersSchemaValues) => void;
  initialFilters: ProductFiltersSchemaValues;
};

const modal = ref(false);

const props = defineProps<FiltersModalProps>();
const onChangeFilters = (values: ProductFiltersSchemaValues) => {
  modal.value = false;
  props.onFiltersChange(values);
};
</script>
