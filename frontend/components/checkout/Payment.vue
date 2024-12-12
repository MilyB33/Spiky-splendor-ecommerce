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
const stripe = ref<Stripe | null>(null);
const elements = ref<StripeElements | null | undefined>(null);
const paymentElement = ref<StripePaymentElement | null | undefined>(null);
let clientSecret: string | undefined;
const isLoading = ref(false);
const { snackbar } = useSnackbar();

const { mobile: isMobile } = useDisplay({ mobileBreakpoint: "md" });

onMounted(async () => {
  clientSecret = cart.value?.cart.payment_session?.data.client_secret as string;

  if (!stripePk || !clientSecret) return;

  stripe.value = await loadStripe(stripePk);

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

  elements.value = stripe.value?.elements({ clientSecret, appearance });
  paymentElement.value = elements.value?.create("payment", options);
  paymentElement.value?.mount("#payment-element");
});

const finishPayment = async () => {
  isLoading.value = true;
  try {
    if (!stripe.value || !clientSecret || !paymentElement.value || !elements.value) return;

    await elements.value?.submit().then(async () => {
      if (!stripe.value || !clientSecret || !paymentElement.value || !elements.value) return;

      await stripe.value.confirmPayment({
        clientSecret,
        elements: elements.value,
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
    });
  } catch (error) {
    snackbar.error("Something went wrong! Try again");
  } finally {
    isLoading.value = false;
  }
};
</script>
