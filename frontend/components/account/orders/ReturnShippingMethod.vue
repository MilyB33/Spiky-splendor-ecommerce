<template>
  <section class="d-flex flex-column ga-4">
    <h4>Metoda zwrotu</h4>

    <v-progress-circular
      v-if="isLoadingShippingMethods"
      color="primary"
      indeterminate
    ></v-progress-circular>

    <v-radio-group
      hide-details="auto"
      v-else
      v-model="shippingMethod"
      :error-messages="shippingMethodError"
    >
      <v-table>
        <tbody>
          <tr v-for="method in shippingMethods">
            <td>
              <v-radio
                :label="method.name"
                :value="{ methodId: method.id, price: method.price_incl_tax }"
                color="green"
              ></v-radio>
            </td>
            <td>
              {{ formatCurrency(method.price_incl_tax || 0, region?.currency_code) }}
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-radio-group>

    <span class="text-grey text-caption"
      >Adres zwrotu znajdziesz w naszym
      <NuxtLink
        class="text-grey"
        to="/faq"
        >FAQ</NuxtLink
      ></span
    >
  </section>
</template>

<script lang="ts" setup>
import type { PricedShippingOption } from "@medusajs/medusa/dist/types/pricing";
import { formatCurrency } from "~/utils/product";
import { type ReturnSchemaValues } from "~/utils/validation/return-schema";

type ReturnShippingMethodProps = {
  shippingMethods: PricedShippingOption[];
  isLoadingShippingMethods: boolean;
};

defineProps<ReturnShippingMethodProps>();

const { region } = useRegions();

const { value: shippingMethod, errorMessage: shippingMethodError } =
  useField<ReturnSchemaValues["shippingMethod"]>("shippingMethod");
</script>
