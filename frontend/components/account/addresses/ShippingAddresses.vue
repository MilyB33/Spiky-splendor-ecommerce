<template>
  <v-expansion-panels>
    <ShippingAddressPanel v-if="!isCustomerHasMaxShippingAddresses" />

    <ShippingAddressPanel
      v-for="address in shippingAddresses"
      :address="address"
      :key="address.id"
    />
  </v-expansion-panels>
</template>

<script lang="ts" setup>
const { shippingAddresses } = useAddresses();

const isCustomerHasMaxShippingAddresses = computed(() => shippingAddresses.value.length === 5);
</script>
