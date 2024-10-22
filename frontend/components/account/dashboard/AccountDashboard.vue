<template>
  <div class="masonry-layout">
    <AccountDashboardCard
      title="Zamówienia"
      icon="mdi-cart-outline"
      link="/account/orders"
    >
      <p class="text-h4 my-auto">{{ customer?.customer.orders_count }}</p>
    </AccountDashboardCard>

    <AccountDashboardCard
      title="Zwroty"
      icon="mdi-arrow-left-bottom"
      link="/account/returns"
    >
      <p class="text-h4 my-auto">{{ customer?.customer.returns_count }}</p>
    </AccountDashboardCard>

    <AccountDashboardCard
      title="Dane osobowe"
      icon="mdi-account"
      link="/account/personal_data"
    >
      <AccountDashboardCardListItem
        label="Imię"
        :value="customer?.customer.first_name"
        link="/account/personal_data"
      />
      <AccountDashboardCardListItem
        label="Nazwisko"
        :value="customer?.customer.last_name"
        link="/account/personal_data"
      />
      <AccountDashboardCardListItem
        label="Email"
        :value="customer?.customer.email"
        link="/account/personal_data"
      />
      <AccountDashboardCardListItem
        label="Telefon"
        :value="customer?.customer.phone"
        link="/account/personal_data"
      />
    </AccountDashboardCard>

    <AccountDashboardCard
      title="Adres rozliczeniowy"
      icon="mdi-map-marker"
      link="/account/address"
    >
      <AccountDashboardCardListItem
        label="Kraj"
        :value="customer?.customer?.billing_address?.country"
        link="/account/address"
      />
      <AccountDashboardCardListItem
        label="Miasto"
        :value="customer?.customer?.billing_address?.city"
        link="/account/address"
      />
      <AccountDashboardCardListItem
        label="Ulica"
        :value="customer?.customer?.billing_address?.street"
        link="/account/address"
      />
      <AccountDashboardCardListItem
        label="Kod pocztowy"
        :value="customer?.customer?.billing_address?.postcode"
        link="/account/address"
      />
      <AccountDashboardCardListItem
        label="Województwo"
        :value="customer?.customer?.billing_address?.province"
        link="/account/address"
      />
    </AccountDashboardCard>

    <AccountDashboardCard
      v-if="!customer?.customer?.shipping_addresses?.length"
      :title="`Adres wysyłkowy 1`"
      icon="mdi-map-marker"
      link="/account/address"
    >
      <AccountDashboardCardListItem
        label="Kraj"
        :value="customer?.customer?.shipping_addresses[0]?.country"
        link="/account/address"
      />
      <AccountDashboardCardListItem
        label="Miasto"
        :value="customer?.customer?.shipping_addresses[0]?.city"
        link="/account/address"
      />
      <AccountDashboardCardListItem
        label="Ulica"
        :value="customer?.customer?.shipping_addresses[0]?.street"
        link="/account/address"
      />
      <AccountDashboardCardListItem
        label="Kod pocztowy"
        :value="customer?.customer?.shipping_addresses[0]?.postcode"
        link="/account/address"
      />
      <AccountDashboardCardListItem
        label="Województwo"
        :value="customer?.customer?.shipping_addresses[0]?.province"
        link="/account/address"
      />
    </AccountDashboardCard>

    <AccountDashboardCard
      v-if="customer?.customer?.shipping_addresses?.length"
      v-for="(address, index) in customer?.customer?.shipping_addresses"
      :key="address.id"
      :title="`Adres wysyłkowy ${index + 1}`"
      icon="mdi-map-marker"
      link="/account/address"
    >
      <AccountDashboardCardListItem
        label="Kraj"
        :value="address.country"
        link="/account/address"
      />
      <AccountDashboardCardListItem
        label="Miasto"
        :value="address.city"
        link="/account/address"
      />
      <AccountDashboardCardListItem
        label="Ulica"
        :value="address.street"
        link="/account/address"
      />
      <AccountDashboardCardListItem
        label="Kod pocztowy"
        :value="address.postcode"
        link="/account/address"
      />
      <AccountDashboardCardListItem
        label="Województwo"
        :value="address.province"
        link="/account/address"
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
