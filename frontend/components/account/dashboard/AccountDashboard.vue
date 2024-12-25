<template>
  <div class="masonry-layout">
    <AccountDashboardCard
      title="Orders"
      icon="mdi-cart-outline"
      link="/account/orders"
    >
      <p class="text-h4 my-auto">{{ customer?.customer.orders_count }}</p>
    </AccountDashboardCard>

    <AccountDashboardCard
      title="Returns"
      icon="mdi-arrow-left-bottom"
      link="/account/returns"
    >
      <p class="text-h4 my-auto">{{ customer?.customer.returns_count }}</p>
    </AccountDashboardCard>

    <AccountDashboardPersonalDetailsCard :customer="customer?.customer" />

    <AccountAddressCard
      :address="customer?.customer.billing_address"
      title="Billing address"
    />

    <AccountDashboardCard
      v-if="!customer?.customer?.shipping_addresses?.length"
      title="Add new shipping address"
      icon="mdi-map-marker"
      link="/account/addresses"
    >
      <NuxtLink
        class="ma-auto text-green"
        to="/account/addresses"
      >
        <v-btn
          class="ma-auto"
          variant="outlined"
          size="x-large"
          icon="mdi-plus"
        ></v-btn>
      </NuxtLink>
    </AccountDashboardCard>

    <AccountAddressCard
      v-if="customer?.customer?.shipping_addresses?.length"
      v-for="(address, index) in customer?.customer?.shipping_addresses"
      :address="address"
      :title="address.metadata.name"
    />
  </div>
</template>

<script lang="ts" setup>
const { customer } = useCustomer();
</script>

<style lang="scss" scoped>
.masonry-layout {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}
</style>
