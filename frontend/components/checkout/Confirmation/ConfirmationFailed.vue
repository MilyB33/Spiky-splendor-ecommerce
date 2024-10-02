<template>
  <img
    src="/remove.png"
    alt="success check mark icon"
    width="100"
    height="100"
  />

  <h2>Payment Failed</h2>

  <div>
    <p>Payment failed. Please try again.</p>
  </div>

  <NuxtLink
    to="/checkout/payment"
    class="text-decoration-none w-100"
  >
    <v-btn
      block
      variant="text"
      color="red"
      >Try again</v-btn
    >
  </NuxtLink>
</template>
