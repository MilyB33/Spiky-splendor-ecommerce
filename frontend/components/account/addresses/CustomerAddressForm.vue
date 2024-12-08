<template>
  <form
    @submit="onSubmit"
    class="d-flex flex-column ga-4"
  >
    <AddressFields />
    <v-btn
      class="ml-auto"
      type="submit"
      style="grid-column: span 2"
      :disabled="isSavingBillingAddress"
      >Zapisz</v-btn
    >
  </form>
</template>

<script lang="ts" setup>
import { addressTypedSchema } from "~/utils/validation/address-schema";
const { billingAddress, isSavingBillingAddress, saveBillingAddress } = useAddresses();

const initialValues = computed(() => ({
  name: billingAddress?.value?.first_name || "",
  surname: billingAddress?.value?.last_name || "",
  company: billingAddress.value?.company || "",
  address1: billingAddress.value?.address_1 || "",
  address2: billingAddress.value?.address_2 || "",
  country: billingAddress.value?.country?.name || "Poland",
  zipCode: billingAddress.value?.postal_code || "",
  city: billingAddress.value?.city || "",
  phoneNumber: billingAddress.value?.phone || "",
}));

const form = useForm({
  validationSchema: addressTypedSchema,
  initialValues: initialValues.value,
});

const onSubmit = form.handleSubmit(async (values) => {
  await saveBillingAddress({
    first_name: values.name,
    last_name: values.surname,
    company: values.company,
    address_1: values.address1,
    address_2: values.address2,
    country_code: values.country,
    postal_code: values.zipCode,
    city: values.city,
    phone: values.phoneNumber,
  });
});
</script>

<style lang="scss" scoped>
.address-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
</style>
