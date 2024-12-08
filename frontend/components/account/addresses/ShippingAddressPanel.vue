<template>
  <v-expansion-panel :value="address?.id || 'new'">
    <v-expansion-panel-title> {{ address?.id || "Nowy adres" }} </v-expansion-panel-title>
    <v-expansion-panel-text>
      <form
        @submit="onSubmit"
        class="d-flex flex-column ga-4"
      >
        <v-text-field
          placeholder="Nazwa"
          variant="outlined"
          density="compact"
        />
        <AddressFields />

        <div class="d-flex ga-4 justify-end">
          <v-btn
            v-if="props.address?.id"
            color="red"
            :disabled="isLoading"
            @click="onDelete"
            style="grid-column: span 2"
            >Usuń</v-btn
          >
          <v-btn
            type="submit"
            :disabled="isLoading"
            style="grid-column: span 2"
            >Zapisz</v-btn
          >
        </div>
      </form>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script lang="ts" setup>
import { addressTypedSchema } from "~/utils/validation/address-schema";
import type { Address } from "@medusajs/medusa";

type ShippingAddressPanelProps = {
  address?: Address;
  panel: string[];
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
  name: props.address?.first_name || "",
  surname: props.address?.last_name || "",
  company: props.address?.company || "",
  address1: props.address?.address_1 || "",
  address2: props.address?.address_2 || "",
  country: props.address?.country?.name || "Poland",
  zipCode: props.address?.postal_code || "",
  city: props.address?.city || "",
  phoneNumber: props.address?.phone || "",
}));

const form = useForm({
  validationSchema: addressTypedSchema,
  initialValues: initialValues.value,
  keepValuesOnUnmount: true,
});

const onSubmit = form.handleSubmit(async (values) => {
  if (props.address?.id) {
    await updateShippingAddress({
      addressId: props.address.id,
      data: {
        first_name: values.name,
        last_name: values.surname,
        company: values.company || "",
        address_1: values.address1,
        address_2: values.address2 || "",
        country_code: values.country,
        postal_code: values.zipCode,
        city: values.city,
        phone: values.phoneNumber,
        metadata: {},
      },
    });

    return;
  }

  await createShippingAddress({
    first_name: values.name,
    last_name: values.surname,
    company: values.company || "",
    address_1: values.address1,
    address_2: values.address2 || "",
    country_code: values.country,
    postal_code: values.zipCode,
    city: values.city,
    phone: values.phoneNumber,
    metadata: {},
  });
  form.handleReset();

  // TODO: handle to close panel when saving new
});
</script>
