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
    "water_demand",
  ];
  imports.defaultStoreProductsFields = [
    ...imports.defaultStoreProductsFields,
    "pot_diameter",
    "min_height",
    "max_height",
    "water_demand",
    "plant_placements",
  ];
}
