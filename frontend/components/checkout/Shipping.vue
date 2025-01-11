<template>
  <form
    @submit.prevent="onSubmit"
    class="d-flex ga-4 w-100"
    :class="isMobile && 'flex-column'"
  >
    <ShippingCustomerFormFields
      :isLoading="isLoading"
      :setFormValues="form.setValues"
    />
  </form>
</template>

<script lang="ts" setup>
import { useForm } from "vee-validate";
import { getShippingInitialValues, prepareCheckoutDataBeforePayment } from "~/utils/checkout";
import { useDisplay } from "vuetify";

import {
  checkoutSchema,
  checkoutTypedSchema,
  type CheckoutSchemaValues,
} from "~/utils/validation/shipping-schema";
const {
  updateCart,
  addShippingMethod,
  createPaymentSession,
  shippingMethods,
  isUpdatingCart,
  isAddingShippingMethod,
  isCreatingPaymentSession,
  isFetchingCart,
} = useCart();
const { mobile: isMobile } = useDisplay({ mobileBreakpoint: "md" });
const { snackbar } = useSnackbar();
const { customer } = useCustomer();

const initialShippingMethod = computed<CheckoutSchemaValues["shippingMethod"]>(() => {
  return {
    methodId: shippingMethods.value[0]?.id || "0",
    price: shippingMethods.value[0]?.price_incl_tax || 0,
  };
});

const initialValues = computed<Partial<CheckoutSchemaValues>>(() => {
  return {
    shippingCustomerType: "individual",
    billingCustomerType: "individual",
    shippingMethod: initialShippingMethod.value,
    shippingCustomerAddress: customer.value?.customer.shipping_addresses?.[0]?.id,
    ...getShippingInitialValues({
      billingAddress: customer.value?.customer.billing_address,
      shippingAddress: customer.value?.customer.shipping_addresses[0],
      customerEmail: customer.value?.customer.email,
    }),
  };
});

const initialErrors = computed(() => {
  const result = checkoutSchema.safeParse(initialValues.value);

  const errors = result.error?.errors.map((error) => [error.path[0], error.message]);

  const filteredErrors = errors?.filter(([path]) => {
    const entries = Object.entries(initialValues.value);

    const searchedEntry = entries.find((entry) => entry[0] === path);

    return searchedEntry?.[1] !== undefined;
  });

  return Object.fromEntries(filteredErrors || []);
});

const form = useForm({
  validationSchema: checkoutTypedSchema,
  initialValues: initialValues.value,
  initialErrors: initialErrors.value,
  keepValuesOnUnmount: true,
});

const isCreatingPaymentMethodDelayed = ref(false);

const isLoading = computed(() => {
  return (
    isUpdatingCart.value ||
    isAddingShippingMethod.value ||
    isCreatingPaymentSession.value ||
    isCreatingPaymentMethodDelayed.value ||
    isFetchingCart.value
  );
});

const onSubmit = form.handleSubmit(async (values) => {
  try {
    const parsedData = checkoutSchema.safeParse(values);

    if (!parsedData.success) return;
    const { shippingMethod, ...rest } = parsedData.data;

    const preparedData = prepareCheckoutDataBeforePayment(rest);

    await updateCart(preparedData);
    await addShippingMethod(shippingMethod.methodId);

    // TODO: remove this after testing (for now it's needed as there is some race condition in the backend https://github.com/medusajs/medusa/issues/6331) maybe 2 second needs to be added
    isCreatingPaymentMethodDelayed.value = true;
    setTimeout(async () => {
      await createPaymentSession();

      isCreatingPaymentMethodDelayed.value = false;

      navigateTo("/checkout/payment");
    }, 3000);
  } catch (error) {
    snackbar.error("Something went wrong!");
  }
});
</script>
