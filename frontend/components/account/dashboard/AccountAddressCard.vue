<template>
  <AccountDashboardCard
    :title="title"
    icon="mdi-map-marker"
    link="/account/addresses"
  >
    <AccountDashboardCardListItem
      label="Country"
      :value="country?.name"
      link="/account/addresses"
    />
    <AccountDashboardCardListItem
      label="City"
      :value="address?.city"
      link="/account/addresses"
    />
    <AccountDashboardCardListItem
      label="Address 1"
      :value="address?.address_1"
      link="/account/addresses"
    />
    <AccountDashboardCardListItem
      label="Address 2"
      :value="address?.address_2"
      link="/account/addresses"
    />
    <AccountDashboardCardListItem
      label="Zip code"
      :value="address?.postal_code"
      link="/account/addresses"
    />
  </AccountDashboardCard>
</template>

<script lang="ts" setup>
import type { Address } from "@medusajs/medusa";
import { getCountryByName } from "~/utils/addresses";

type AccountAddressCardProps = {
  title: string;
  address?: Address;
};

const props = defineProps<AccountAddressCardProps>();

const country = getCountryByName(props.address?.country_code);
</script>
