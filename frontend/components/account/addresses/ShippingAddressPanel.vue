<template>
  <v-expansion-panel>
    <v-expansion-panel-title>
      {{ address?.metadata.name || "New address" }}
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <form
        @submit="onSubmit"
        class="d-flex flex-column ga-4"
      >
        <v-text-field
          placeholder="Name"
          variant="outlined"
          density="compact"
          v-model="addressName"
          :error-messages="addressNameError"
        />
        <AddressFields />

        <div class="d-flex ga-4 justify-end">
          <v-btn
            v-if="props.address?.id"
            color="red"
            :disabled="isLoading"
            @click="onDelete"
            style="grid-column: span 2"
            >Delete</v-btn
          >
          <v-btn
            type="submit"
            :disabled="isLoading"
            style="grid-column: span 2"
            >Save</v-btn
          >
        </div>
      </form>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script lang="ts" setup>
import {
  extendedShippingAddressTypedSchema,
  type ExtendedShippingAddressSchemaValues,
} from "~/utils/validation/address-schema";
import type { Address } from "@medusajs/medusa";
import { getInitialValues } from "~/utils/addresses";

type ShippingAddressPanelProps = {
  address?: Address;
};

const props = defineProps<ShippingAddressPanelProps>();

const {
  createShippingAddress,
  updateShippingAddress,
  deleteShippingAddress,
  isCreatingShippingAddress,
  isUpdatingShippingAddress,
  isDeletingShippingAddress,
} = useAddresses();

const isLoading = computed(
  () =>
    isCreatingShippingAddress.value ||
    isUpdatingShippingAddress.value ||
    isDeletingShippingAddress.value,
);

const onDelete = () => {
  if (!props.address?.id) return;

  deleteShippingAddress(props.address.id);
};

const initialValues = computed(() => ({
  ...getInitialValues(props.address),
  addressName: (props.address?.metadata.name as string) || "",
}));

const form = useForm({
  validationSchema: extendedShippingAddressTypedSchema,
  initialValues: initialValues.value,
  keepValuesOnUnmount: true,
});

const { value: addressName, errorMessage: addressNameError } = useField<string>("addressName");

const mapValues = (values: ExtendedShippingAddressSchemaValues) => {
  return {
    first_name: values.name,
    last_name: values.surname,
    company: values.company || "",
    address_1: values.address1,
    address_2: values.address2 || "",
    country_code: values.country,
    postal_code: values.zipCode,
    city: values.city,
    phone: values.phoneNumber,
    metadata: { name: values.addressName },
  };
};

const onSubmit = form.handleSubmit(async (values) => {
  const mappedValues = mapValues(values);

  if (props.address?.id) {
    await updateShippingAddress({
      addressId: props.address.id,
      data: mappedValues,
    });

    return;
  }

  await createShippingAddress(mappedValues);
  form.handleReset();
});
</script>
