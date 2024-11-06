<template>
  <v-expansion-panels v-model="panel">
    <ShippingAddressPanel
      :panel="panel"
      v-if="!isCustomerHasMaxShippingAddresses"
    />

    <ShippingAddressPanel
      v-for="address in shippingAddresses"
      :address="address"
      :key="address.id"
      :panel="panel"
    />
  </v-expansion-panels>
</template>

<script lang="ts" setup>
const { shippingAddresses } = useAddresses();

const panel = ref<string[]>([]);

const isCustomerHasMaxShippingAddresses = computed(() => shippingAddresses.value.length === 5);
</script>
