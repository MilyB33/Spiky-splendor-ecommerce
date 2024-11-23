export default async function () {
  const imports = (await import(
    "@medusajs/medusa/dist/api/routes/admin/store/index"
  )) as any;
  imports.allowedAdminStoreFields = [
    ...imports.allowedAdminStoreFields,
    "company",
    "city",
    "postal_code",
    "address",
  ];
  imports.defaultAdminStoreFields = [
    ...imports.defaultAdminStoreFields,
    "company",
    "city",
    "postal_code",
    "address",
  ];
}
