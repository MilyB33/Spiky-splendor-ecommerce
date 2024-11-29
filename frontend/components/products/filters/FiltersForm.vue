<template>
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

    <slot
      name="actions"
      :handleClear="handleClear"
    >
      <div
        class="d-flex ga-2 justify-space-between w-100"
        style="position: sticky; bottom: 10px"
      >
        <v-btn @click="handleClear">Wyczyść</v-btn>
        <v-btn type="submit">Szukaj</v-btn>
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
  snackbar.success("Wyczyszczono filtry");
};
</script>
