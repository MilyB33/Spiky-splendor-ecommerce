<template>
  <form
    class="d-flex flex-column ga-4"
    @submit="onSubmit"
  >
    <ReturnShippingMethod
      :shipping-methods="shippingMethods"
      :is-loading-shipping-methods="isLoadingShippingMethods"
    />
    <ReturnItemsSelectTable :order-items="orderItems" />

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn
        variant="outlined"
        @click="isActive.value = false"
        :disabled="isCreatingReturn"
      >
        Cancel
      </v-btn>

      <v-btn
        variant="outlined"
        type="submit"
        :disabled="isCreatingReturn"
      >
        Create a return
      </v-btn>
    </v-card-actions>
  </form>
</template>

<script lang="ts" setup>
import type { Order } from "@medusajs/medusa";
import { returnTypedSchema } from "~/utils/validation/return-schema";

type CreateReturnFormProps = {
  orderId: string;
  orderItems: Order["items"];
  isActive: Ref<boolean>;
};

const props = defineProps<CreateReturnFormProps>();
const { createReturn, isCreatingReturn, shippingMethods, isLoadingShippingMethods } =
  useReturnOrder();

const form = useForm({
  validationSchema: returnTypedSchema,
  initialValues: {
    shippingMethod: shippingMethods
      ? {
          methodId: shippingMethods.value[0]?.id || "",
          price: shippingMethods.value[0]?.price_incl_tax || 0,
        }
      : undefined,
    items: props.orderItems.map((item) => ({
      id: item.id,
      quantity: 1,
      isSelected: false,
    })),
  },
});

const onSubmit = form.handleSubmit(async (values) => {
  try {
    await createReturn({
      order_id: props.orderId,
      return_shipping: {
        option_id: values.shippingMethod.methodId,
      },
      items: values.items
        .filter((item) => item.isSelected)
        .map((item) => ({
          item_id: item.id,
          quantity: item.quantity,
        })),
    });

    props.isActive.value = false;
  } catch (error) {
    // handled in mutation query composable
  }
});
</script>
