export default async function () {
  const imports = (await import(
    "@medusajs/medusa/dist/api/routes/store/customers/index"
  )) as any;
  imports.allowedStoreCustomersFields = [
    ...imports.allowedStoreCustomersFields,
    "wishlist_id",
  ];
  imports.defaultStoreCustomersFields = [
    ...imports.defaultStoreCustomersFields,
    "wishlist_id",
  ];
}
