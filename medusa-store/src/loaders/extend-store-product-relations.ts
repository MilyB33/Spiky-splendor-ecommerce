export default async function () {
  const imports = (await import(
    "@medusajs/medusa/dist/api/routes/store/products/index"
  )) as any;
  imports.allowedStoreProductsRelations = [
    ...imports.allowedStoreProductsRelations,
    "plant_forms",
    "plant_placements",
  ];
}
