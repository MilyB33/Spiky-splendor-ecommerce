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
const route = useRoute();
const { completeCart, isCompletingCart } = useCart(true);
const { isLoadingLastOrder, shouldFetchLastOrder, cartId, cartForOrder, isFetchingCartForOrder } =
  useOrders();

const stripePk = config.public.PUBLIC_STRIPE_KEY;
const stripe = ref<Stripe | null>(null);
const params = useUrlSearchParams("history");
const clientSecret = params["payment_intent_client_secret"] as string;
const isFail = ref(false);
const isMounting = ref(true);

watch(cartForOrder, async (oldCartValue) => {
  if (!oldCartValue?.cart) return;

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
      !cartForOrder.value?.cart.completed_at &&
      !isCompletingCart.value &&
      !!cartForOrder.value?.cart
    ) {
      await completeCart();
      shouldFetchLastOrder.value = true;
    }
  } catch (_) {
  } finally {
    shouldFetchLastOrder.value = true;

    isMounting.value = false;
  }
});

onMounted(() => {
  cartId.value = route.query.cart_id as string;
});

const isLoading = computed(
  () =>
    isMounting.value ||
    isCompletingCart.value ||
    isLoadingLastOrder.value ||
    isFetchingCartForOrder.value,
);
</script>
