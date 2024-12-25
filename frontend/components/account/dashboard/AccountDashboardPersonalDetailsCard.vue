<template>
  <AccountDashboardCard
    title="Personal Details"
    icon="mdi-account"
    link="/account/details"
  >
    <AccountDashboardCardListItem
      label="First name"
      :value="customer?.first_name"
      link="/account/details"
    />
    <AccountDashboardCardListItem
      label="Last name"
      :value="customer?.last_name"
      link="/account/details"
    />
    <AccountDashboardCardListItem
      label="Email"
      :value="customer?.email"
      link="/account/details"
    />
    <AccountDashboardCardListItem
      label="Phone"
      :value="customer?.phone"
      link="/account/details"
    />
  </AccountDashboardCard>
</template>

<script setup lang="ts">
import type { Customer } from "@medusajs/medusa";

type AccountDashboardPersonalDetailsCardProps = {
  customer?: Omit<Customer, "password_hash">;
};

defineProps<AccountDashboardPersonalDetailsCardProps>();
</script>
