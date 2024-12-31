<template>
  <form
    @submit="onSubmit"
    class="d-flex flex-column ga-4"
  >
    <PriceFilter />

    <v-divider></v-divider>

    <MultipleCheckboxFilter
      :options="categories"
      title="Categories"
      field-name="categories"
    />

    <v-divider></v-divider>

    <MultipleCheckboxFilter
      :options="plantForms"
      title="Plant form"
      field-name="plantForms"
    />

    <v-divider></v-divider>

    <MultipleCheckboxFilter
      :options="plantPlacements"
      title="Plant placement"
      field-name="plantPlacements"
    />

    <MultipleCheckboxFilter
      :options="plantWaterDemands"
      title="Water demand"
      field-name="plantWaterDemands"
    />

    <slot
      name="actions"
      :handleClear="handleClear"
    >
      <div
        class="d-flex ga-2 justify-space-between w-100 pa-4"
        style="position: sticky; bottom: 0px; background-color: #e0e0e0"
      >
        <v-btn @click="handleClear">Clear</v-btn>
        <v-btn type="submit">Search</v-btn>
      </div>
    </slot>
  </form>
</template>

<script lang="ts" setup>
import {
  productFiltersTypedSchema,
  type ProductFiltersSchemaValues,
} from "~/utils/validation/product-filters-schema";

type FiltersProps = {
  onFiltersChange: (values: ProductFiltersSchemaValues) => void;
  initialValues: ProductFiltersSchemaValues;
};

const props = defineProps<FiltersProps>();

const { plantForms, plantPlacements, plantWaterDemands, categories } = useFilters();
const { snackbar } = useSnackbar();

const form = useForm({
  validationSchema: productFiltersTypedSchema,
  initialValues: {
    ...props.initialValues,
  },
});

const onSubmit = form.handleSubmit((values) => {
  props.onFiltersChange(values);
});

const handleClear = () => {
  form.setValues({
    minPrice: 0,
    maxPrice: 100000,
    categories: [],
    plantForms: [],
    plantPlacements: [],
    plantWaterDemands: [],
  });
  snackbar.success("Filters cleared!");
};
</script>
