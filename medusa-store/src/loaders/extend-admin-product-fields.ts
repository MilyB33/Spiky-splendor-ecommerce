export default async function () {
  const imports = (await import(
    "@medusajs/medusa/dist/api/routes/admin/products/index"
  )) as any;
  imports.allowedAdminProductsFields = [
    ...imports.allowedAdminProductsFields,
    "pot_diameter",
    "min_height",
    "max_height",
    "plant_forms",
    "plant_placements",
  ];
  imports.defaultAdminProductsFields = [
    ...imports.defaultAdminProductsFields,
    "pot_diameter",
    "min_height",
    "max_height",
    "plant_forms",
    "plant_placements",
  ];
  imports.defaultAdminProductsRelations = [
    ...imports.defaultAdminProductsRelations,
    "plant_forms",
    "plant_placements",
  ];
}
// TODO: this doesn't work for some reason maybe try something with product instead of products
