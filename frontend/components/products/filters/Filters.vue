<template>
  <div
    class="d-flex flex-column ga-4"
    style="max-width: 240px"
  >
    <div class="d-flex align-center justify-center ga-4">
      <v-btn
        size="large"
        color="green"
        icon="mdi-filter-outline"
        readonly
      />
      <h2>Filtry</h2>
    </div>

    <form
      @submit="onSubmit"
      class="d-flex flex-column ga-4"
    >
      <PriceFilter />

      <v-divider></v-divider>

      <MultipleCheckboxFilter
        :options="categories"
        title="Kategorie"
        field-name="categories"
      />

      <v-divider></v-divider>

      <MultipleCheckboxFilter
        :options="plantForms"
        title="Typ rośliny"
        field-name="plantForms"
      />

      <v-divider></v-divider>

      <MultipleCheckboxFilter
        :options="plantPlacements"
        title="Umiejscowienie rośliny"
        field-name="plantPlacements"
      />

      <MultipleCheckboxFilter
        :options="plantWaterDemands"
        title="Zapotrzebowanie na wodę"
        field-name="plantWaterDemands"
      />

      <v-btn
        type="submit"
        style="position: sticky; top: 1px"
        >Szukaj</v-btn
      >
    </form>
  </div>
</template>

<script lang="ts" setup>
import {
  productFiltersTypedSchema,
  type ProductFiltersSchemaValues,
} from "~/utils/validation/product-filters-schema";

type FiltersProps = {
  onFiltersChange: (values: ProductFiltersSchemaValues) => void;
};

const props = defineProps<FiltersProps>();

const { plantForms, plantPlacements, plantWaterDemands, categories } = useFilters();

const form = useForm({
  validationSchema: productFiltersTypedSchema,
  initialValues: {
    // @ts-ignore
    minPrice: "0",
    // @ts-ignore
    maxPrice: "100000",
    categories: [],
    plantForms: [],
    plantPlacements: [],
    plantWaterDemands: [],
  },
});

const onSubmit = form.handleSubmit((values) => {
  props.onFiltersChange(values);
});
</script>
