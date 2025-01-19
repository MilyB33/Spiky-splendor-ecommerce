<template>
  <div
    v-if="isWishlistEmpty"
    class="d-flex justify-center w-100"
    :class="isMobile ? 'mt-4' : 'mt-12'"
  >
    <WishlistEmptyState />
  </div>

  <div
    v-else-if="isFetchingWishlist"
    class="d-flex justify-center align-center fill-height"
  >
    <v-progress-circular
      size="80"
      width="8"
      indeterminate
    />
  </div>

  <div v-else>
    <WishlistHeader />
    <WishlistActions />

    <div class="list">
      <WishlistSaveOnAccountCard v-if="!isAuthenticated" />

      <WishlistCard
        v-for="wishlistItem in wishlist"
        :wishlist-item="wishlistItem"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify";

const { mobile: isMobile } = useDisplay({ mobileBreakpoint: "md" });
const { wishlist, isFetchingWishlist } = useWishlist();
const { isAuthenticated } = useCustomer();

const isWishlistEmpty = computed(() => {
  return !wishlist.value?.length && !isFetchingWishlist.value;
});
</script>

<style scoped lang="scss">
.list {
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
