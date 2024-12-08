export default defineNuxtRouteMiddleware(async (to, from) => {
  const { isLoadingCart, isCartEmpty } = useGetCart();

  if (isCartEmpty.value && !isLoadingCart.value) {
    return navigateTo("/cart");
  }
});
