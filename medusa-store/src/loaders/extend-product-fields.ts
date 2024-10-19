export default async function () {
  const imports = (await import(
    "@medusajs/medusa/dist/api/routes/store/products/index"
  )) as any;
  imports.allowedStoreProductsFields = [
    ...imports.allowedStoreProductsFields,
    "pot_diameter",
    "min_height",
    "max_height",
    "plant_forms",
    "plant_placements",
    "plant_water_demand_id",
    "plant_water_demand",
  ];
  imports.defaultStoreProductsFields = [
    ...imports.defaultStoreProductsFields,
    "pot_diameter",
    "plant_water_demand_id",
    "min_height",
    "max_height",
  ];
}
