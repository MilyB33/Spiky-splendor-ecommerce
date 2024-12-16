<template>
  <section class="d-flex flex-column ga-4">
    <h4>Metody dostawy</h4>

    <v-progress-circular
      v-if="isFetchingShippingMethods"
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
            <td>{{ formatCurrency(method.price_incl_tax || 0, region?.currency_code) }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-radio-group>
  </section>
</template>

<script lang="ts" setup>
import { formatCurrency } from "~/utils/product";
import type { CheckoutSchemaValues } from "~/utils/validation/shipping-schema";

const { shippingMethods, isFetchingShippingMethods } = useCart();
const { region } = useRegions();

const { value: shippingMethod, errorMessage: shippingMethodError } =
  useField<CheckoutSchemaValues["shippingMethod"]>("shippingMethod");
</script>
