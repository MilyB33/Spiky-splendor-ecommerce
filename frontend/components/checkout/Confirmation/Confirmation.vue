<template>
  <div class="d-flex h-100 justify-center align-center">
    <v-card
      width="300"
      class="d-flex flex-column align-center ga-8 text-center pa-8"
    >
      <v-progress-circular
        v-if="isLoading"
        indeterminate
        :size="128"
        :width="12"
      ></v-progress-circular>

      <template v-else>
        <ConfirmationFailed v-if="isFail" />
        <ConfirmationSucceeded v-if="!isFail" />
      </template>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import { loadStripe, type Stripe } from "@stripe/stripe-js";

const config = useRuntimeConfig();
const { cart, isFetchingCart, completeCart, isCompletingCart } = useCart();
const { isFetchingLastOrder, shouldFetchLastOrder, cartId, isLoadingOrder } = useOrders();

const stripePk = config.public.PUBLIC_STRIPE_KEY;
const stripe = ref<Stripe | null>(null);
const params = useUrlSearchParams("history");
const clientSecret = params["payment_intent_client_secret"] as string;
const isFail = ref(false);
const isMounting = ref(true);

onMounted(async () => {
  isMounting.value = true;

  if (!stripePk || !clientSecret) return;

  stripe.value = await loadStripe(stripePk);

  const paymentIntent = await stripe.value?.retrievePaymentIntent(clientSecret);

  if (
    paymentIntent?.paymentIntent?.status !== "succeeded" &&
    paymentIntent?.paymentIntent?.status !== "processing" &&
    paymentIntent?.paymentIntent?.last_payment_error?.message
  ) {
    isFail.value = true;
  }

  try {
    if (
      !isFail.value &&
      !cart.value?.cart.completed_at &&
      !isCompletingCart.value &&
      !!cart.value?.cart
    ) {
      const response = await completeCart();

      if (response.type === "order") {
        cartId.value = response.data.cart_id;
      }
    } else {
      shouldFetchLastOrder.value = true;
    }
  } catch (_) {}

  isMounting.value = false;
});

const isLoading = computed(
  () =>
    isMounting.value ||
    isCompletingCart.value ||
    isFetchingLastOrder.value ||
    isFetchingCart.value ||
    isLoadingOrder.value,
);
</script>
