<template>
  <v-card class="pa-4 d-flex flex-column ga-4">
    <h2>Billing address</h2>
    <CustomerAddressForm />
    <h2>
      Shipping addresses
      <v-tooltip
        text="You can only create 5 addresses"
        bottom
      >
        <template v-slot:activator="{ props }">
          <v-icon
            v-bind="props"
            color="green"
            size="small"
            >mdi-information</v-icon
          >
        </template>
      </v-tooltip>
    </h2>
    <ShippingAddresses />
  </v-card>
</template>
