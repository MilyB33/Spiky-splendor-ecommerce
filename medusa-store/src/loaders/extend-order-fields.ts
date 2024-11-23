export default async function () {
  const imports = (await import(
    "@medusajs/medusa/dist/api/routes/store/orders/index"
  )) as any;
  imports.allowedStoreOrdersFields = [
    ...imports.allowedStoreOrdersFields,
    "invoice",
  ];
  imports.defaultStoreOrdersFields = [
    ...imports.defaultStoreOrdersFields,
    "invoice",
  ];
  imports.allowedStoreOrdersRelations = [
    ...imports.allowedStoreOrdersRelations,
    "invoice",
  ];
}
