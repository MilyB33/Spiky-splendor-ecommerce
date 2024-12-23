<template>
  <div
    style="max-width: 150px"
    class="d-flex flex-column ga-8 w-100"
  >
    <NuxtLink
      to="/account"
      class="text-decoration-none text-black text-h5"
      exact-active-class="active-link"
    >
      Overview
    </NuxtLink>

    <NuxtLink
      to="/account/orders"
      class="text-decoration-none text-black text-h5"
      exact-active-class="active-link"
    >
      Orders
    </NuxtLink>

    <NuxtLink
      to="/account/returns"
      class="text-decoration-none text-black text-h5"
      exact-active-class="active-link"
    >
      Returns
    </NuxtLink>

    <NuxtLink
      to="/account/addresses"
      class="text-decoration-none text-black text-h5"
      exact-active-class="active-link"
    >
      Addresses
    </NuxtLink>

    <NuxtLink
      to="/account/details"
      class="text-decoration-none text-black text-h5"
      exact-active-class="active-link"
    >
      Personal details
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
.active-link {
  border-bottom: 2px solid black;
}
</style>
