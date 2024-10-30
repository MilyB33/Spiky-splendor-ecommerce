export default defineNuxtRouteMiddleware(async (to, from) => {
  const { cart, isLoadingCart } = useCart();

  const isCartEmpty = computed(() => !cart.value?.cart.items.length);

  if (isCartEmpty.value && !isLoadingCart.value) {
    return navigateTo("/cart");
  }
});
