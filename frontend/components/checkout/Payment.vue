<template>
  <div class="d-flex ga-4 w-100">
    <div class="d-flex flex-column ga-4 w-100">
      <v-card class="pa-4 w-100">
        <CheckoutTimeline is-payment-step />
      </v-card>

      <v-card class="pa-4 w-100">
        <PaymentMethod />
      </v-card>
    </div>

    <PaymentConfirmSummary :pay="finishPayment" />
  </div>
</template>

<script lang="ts" setup>
import {
  loadStripe,
  type Stripe,
  type StripeElements,
  type StripePaymentElement,
  type StripePaymentElementOptions,
  type Appearance,
} from "@stripe/stripe-js";

const config = useRuntimeConfig();
const { cart } = useCart();
const stripePk = config.public.PUBLIC_STRIPE_KEY;
let stripe: Stripe | null = null;
let elements: StripeElements | undefined;
let paymentElement: StripePaymentElement | undefined;
let clientSecret: string | undefined;

onMounted(async () => {
  setTimeout(async () => {
    clientSecret = cart.value?.cart.payment_session?.data.client_secret as string;
    if (!stripePk || !clientSecret) return;

    stripe = await loadStripe(stripePk);

    const appearance: Appearance = {
      theme: "flat",
      variables: { colorPrimaryText: "#262626" },
    };
    const options: StripePaymentElementOptions = {
      fields: {
        billingDetails: {
          name: "auto",
          email: "never",
        },
      },
    };
    elements = stripe?.elements({ clientSecret, appearance });
    paymentElement = elements?.create("payment", options);
    paymentElement?.mount("#payment-element");
  }, 2000);
});

const finishPayment = async () => {
  try {
    if (!stripe || !clientSecret || !paymentElement) return;

    await elements?.submit().then(async () => {
      if (!stripe || !clientSecret || !paymentElement) return;

      await stripe.confirmPayment({
        clientSecret,
        elements,
        redirect: "if_required",
        confirmParams: {
          return_url: config.public.PAYMENT_RETURN_URL,
          payment_method_data: {
            billing_details: {
              email: cart.value?.cart.email,
            },
          },
        },
      });
    });
  } catch (error) {
    console.error(error);
  }
};
</script>
