<template>
  <div
    class="d-flex ga-4 w-100"
    :class="isMobile && 'flex-column'"
  >
    <div class="d-flex flex-column ga-4 w-100">
      <v-card class="pa-4 w-100">
        <CheckoutTimeline is-payment-step />
      </v-card>

      <v-card class="pa-4 w-100">
        <PaymentMethod />
      </v-card>
    </div>

    <PaymentConfirmSummary
      :pay="finishPayment"
      :is-paying="isLoading"
    />
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
import { useDisplay } from "vuetify";

const config = useRuntimeConfig();
const { cart } = useCart();
const stripePk = config.public.PUBLIC_STRIPE_KEY;
let stripe: Stripe | null = null;
let elements: StripeElements | undefined;
let paymentElement: StripePaymentElement | undefined;
let clientSecret: string | undefined;
const isLoading = ref(false);

const { mobile: isMobile } = useDisplay({ mobileBreakpoint: "md" });

onMounted(async () => {
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
});

const finishPayment = async () => {
  try {
    isLoading.value = true;
    console.log(stripe, clientSecret, paymentElement);
    if (!stripe || !clientSecret || !paymentElement) return;

    await elements?.submit().then(async () => {
      console.log("submitted");
      if (!stripe || !clientSecret || !paymentElement) return;
      console.log("confirmation");
      await stripe.confirmPayment({
        clientSecret,
        elements,
        // TODO: Maybe this can be applied for cards (needs to be implemented separately)
        // redirect: "if_required",
        confirmParams: {
          return_url: config.public.PAYMENT_RETURN_URL,
          payment_method_data: {
            billing_details: {
              email: cart.value?.cart.email,
            },
          },
        },
      });
      console.log("after confirmation");
    });
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};
</script>
