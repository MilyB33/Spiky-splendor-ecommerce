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

    <AccountDashboardCard
      title="Personal Details"
      icon="mdi-account"
      link="/account/details"
    >
      <AccountDashboardCardListItem
        label="First name"
        :value="customer?.customer.first_name"
        link="/account/details"
      />
      <AccountDashboardCardListItem
        label="Last name"
        :value="customer?.customer.last_name"
        link="/account/details"
      />
      <AccountDashboardCardListItem
        label="Email"
        :value="customer?.customer.email"
        link="/account/details"
      />
      <AccountDashboardCardListItem
        label="Phone"
        :value="customer?.customer.phone"
        link="/account/details"
      />
    </AccountDashboardCard>

    <AccountDashboardCard
      title="Billing address"
      icon="mdi-map-marker"
      link="/account/addresses"
    >
      <AccountDashboardCardListItem
        label="Country"
        :value="customer?.customer?.billing_address?.country"
        link="/account/addresses"
      />
      <AccountDashboardCardListItem
        label="City"
        :value="customer?.customer?.billing_address?.city"
        link="/account/addresses"
      />
      <AccountDashboardCardListItem
        label="Street"
        :value="customer?.customer?.billing_address?.street"
        link="/account/addresses"
      />
      <AccountDashboardCardListItem
        label="Zip code"
        :value="customer?.customer?.billing_address?.postcode"
        link="/account/addresses"
      />
    </AccountDashboardCard>

    <AccountDashboardCard
      v-if="!customer?.customer?.shipping_addresses?.length"
      :title="`Shipping address 1`"
      icon="mdi-map-marker"
      link="/account/addresses"
    >
      <AccountDashboardCardListItem
        label="Kraj"
        :value="customer?.customer?.shipping_addresses[0]?.country"
        link="/account/addresses"
      />
      <AccountDashboardCardListItem
        label="Miasto"
        :value="customer?.customer?.shipping_addresses[0]?.city"
        link="/account/addresses"
      />
      <AccountDashboardCardListItem
        label="Ulica"
        :value="customer?.customer?.shipping_addresses[0]?.street"
        link="/account/addresses"
      />
      <AccountDashboardCardListItem
        label="Kod pocztowy"
        :value="customer?.customer?.shipping_addresses[0]?.postcode"
        link="/account/addresses"
      />
      <AccountDashboardCardListItem
        label="Województwo"
        :value="customer?.customer?.shipping_addresses[0]?.province"
        link="/account/addresses"
      />
    </AccountDashboardCard>

    <AccountDashboardCard
      v-if="customer?.customer?.shipping_addresses?.length"
      v-for="(address, index) in customer?.customer?.shipping_addresses"
      :key="address.id"
      :title="`Shipping address ${index + 1}`"
      icon="mdi-map-marker"
      link="/account/addresses"
    >
      <AccountDashboardCardListItem
        label="Country"
        :value="address.country"
        link="/account/addresses"
      />
      <AccountDashboardCardListItem
        label="City"
        :value="address.city"
        link="/account/addresses"
      />
      <AccountDashboardCardListItem
        label="Street"
        :value="address.street"
        link="/account/addresses"
      />
      <AccountDashboardCardListItem
        label="Zip code"
        :value="address.postcode"
        link="/account/addresses"
      />
    </AccountDashboardCard>
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
