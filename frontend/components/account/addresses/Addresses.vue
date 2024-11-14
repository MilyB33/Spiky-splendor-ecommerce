<template>
  <v-card class="pa-4 d-flex flex-column ga-4">
    <h2>Adres rozliczeniowy</h2>
    <CustomerAddressForm />
    <h2>
      Adresy wysyłkowe
      <v-tooltip
        text="Mozesz utworzyć tylko 5 adresów"
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
