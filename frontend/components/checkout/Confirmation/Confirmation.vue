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
const { completeCart } = useCart();
const { isFetchingLastOrder, setOrderId } = useOrders();

const stripePk = config.public.PUBLIC_STRIPE_KEY;
let stripe: Stripe | null = null;
const params = useUrlSearchParams("history");
const clientSecret = params["payment_intent_client_secret"] as string;
const isFail = ref(false);
const isMounting = ref(true);
const isLoading = computed(() => isMounting.value || isFetchingLastOrder.value);

onMounted(async () => {
  isMounting.value = true;
  console.log("isMounting");
  if (!stripePk || !clientSecret) return;

  stripe = await loadStripe(stripePk);
  console.log("loadedStripe");
  const paymentIntent = await stripe?.retrievePaymentIntent(clientSecret);

  if (
    paymentIntent?.paymentIntent?.status !== "succeeded" &&
    paymentIntent?.paymentIntent?.status !== "processing" &&
    paymentIntent?.paymentIntent?.last_payment_error?.message
  ) {
    isFail.value = true;
  }
  console.log("loadedPaymentIntent", isFail.value);
  if (!isFail.value) {
    const cart = await completeCart();

    if (cart?.type === "order") {
      setOrderId(cart.data.id);
    }
  }

  isMounting.value = false;
});
</script>
