export default defineNuxtRouteMiddleware(async (to, from) => {
  const { cart } = useCart();

  const isCartEmpty = computed(() => !cart.value?.cart.items.length);

  if (isCartEmpty.value) {
    return navigateTo("/cart");
  }
});
