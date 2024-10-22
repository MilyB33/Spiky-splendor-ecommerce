<template>
  <NuxtLayout name="default">
    <div class="w-100">
      <AccountHeader />

      <v-divider
        class="my-8"
        :thickness="2"
      />

      <div class="d-flex ga-12">
        <AccountNavigation />

        <slot />
      </div>
    </div>
  </NuxtLayout>
</template>
