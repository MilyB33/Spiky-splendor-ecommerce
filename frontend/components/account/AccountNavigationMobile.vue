<template>
  <v-slide-group
    v-model="activeItem"
    show-arrows
    center-active
  >
    <v-slide-group-item value="/account">
      <NuxtLink
        to="/account"
        class="text-decoration-none text-black text-h6 mx-2"
        exact-active-class="active-link"
      >
        Przegląd
      </NuxtLink>
    </v-slide-group-item>

    <v-slide-group-item value="/account/orders">
      <NuxtLink
        to="/account/orders"
        class="text-decoration-none text-black text-h6 mx-2"
        exact-active-class="active-link"
      >
        Zamówienia
      </NuxtLink>
    </v-slide-group-item>

    <v-slide-group-item value="/account/returns">
      <NuxtLink
        to="/account/returns"
        class="text-decoration-none text-black text-h6 mx-2"
        exact-active-class="active-link"
      >
        Zwroty
      </NuxtLink>
    </v-slide-group-item>
    <v-slide-group-item value="/account/addresses">
      <NuxtLink
        to="/account/addresses"
        class="text-decoration-none text-black text-h6 mx-2"
        exact-active-class="active-link"
      >
        Adresy
      </NuxtLink>
    </v-slide-group-item>
    <v-slide-group-item value="/account/details">
      <NuxtLink
        to="/account/details"
        class="text-decoration-none text-black text-h6 mx-2"
        exact-active-class="active-link"
      >
        Dane osobowe
      </NuxtLink>
    </v-slide-group-item>
  </v-slide-group>
</template>

<script setup>
const activeItem = ref(null);
const route = useRoute();

watch(
  () => route.path,
  (newPath) => {
    activeItem.value = newPath;
  },
  { immediate: true },
);
</script>

<style lang="scss" scoped>
.active-link {
  border-bottom: 2px solid black;
}
</style>
