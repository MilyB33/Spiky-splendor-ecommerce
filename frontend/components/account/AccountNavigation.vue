<template>
  <div class="d-flex flex-column ga-8">
    <NuxtLink
      to="/account"
      class="text-decoration-none text-black text-h5"
      exact-active-class="active-link"
    >
      Przegląd
    </NuxtLink>

    <NuxtLink
      to="/account/orders"
      class="text-decoration-none text-black text-h5"
      exact-active-class="active-link"
    >
      Zamówienia
    </NuxtLink>

    <NuxtLink
      to="/account/returns"
      class="text-decoration-none text-black text-h5"
      exact-active-class="active-link"
    >
      Zwroty
    </NuxtLink>

    <NuxtLink
      to="/account/addresses"
      class="text-decoration-none text-black text-h5"
      exact-active-class="active-link"
    >
      Adresy
    </NuxtLink>

    <NuxtLink
      to="/account/details"
      class="text-decoration-none text-black text-h5"
      exact-active-class="active-link"
    >
      Dane osobowe
    </NuxtLink>

    <NuxtLink
      to="/account/privacy"
      class="text-decoration-none text-black text-h5"
      exact-active-class="active-link"
    >
      Prywatność
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
.active-link {
  border-bottom: 2px solid black;
}
</style>
