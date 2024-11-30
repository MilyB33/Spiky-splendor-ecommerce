<template>
  <div
    class="d-flex mb-2 pa-2 justify-space-between"
    :class="isMobile ? 'flex-column-reverse ga-3' : 'align-center ga-6'"
  >
    <v-dialog
      v-model="dialog"
      max-width="500"
      persistent
    >
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          v-bind="activatorProps"
          append-icon="mdi-close"
          >Usuń wszystkie</v-btn
        >
      </template>

      <v-card
        prepend-icon="mdi-alert-box"
        text="Jesteś pewien, że chcesz usunąć wszystkie produkty z ulubionych?"
      >
        <template v-slot:title><p>Usuwanie produktów</p></template>

        <v-card-actions class="d-flex flex-wrap justify-space-between">
          <v-btn
            @click="dialog = false"
            variant="tonal"
            color="red"
            class="flex-grow-1"
            :disabled="isRemovingFromWishlist"
          >
            Nie, daj mi się zastanowić!
          </v-btn>

          <v-btn
            @click="onClearAllItems"
            variant="tonal"
            color="green"
            class="flex-grow-1"
            :disabled="isRemovingFromWishlist"
          >
            Jestem w 100% pewny!
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-btn
      append-icon="mdi-cart-plus"
      color="green_primary"
      @click="addAllItemsToCart"
      >Dodaj wszystkie do koszyka</v-btn
    >
  </div>
</template>

<script lang="ts" setup>
import { useDisplay } from "vuetify";

const { wishlist, removeFromWishlist, isRemovingFromWishlist } = useWishlist();
const { addItemToCart } = useCart(true);
const { mobile: isMobile } = useDisplay({ mobileBreakpoint: "sm" });

const dialog = ref(false);

const onClearAllItems = () => {
  const itemsIds = wishlist.value.map((item) => item.id);

  removeFromWishlist({ wishItemIDS: itemsIds });
  dialog.value = false;
};

const addAllItemsToCart = () => {
  const ids = wishlist.value.map((item) => item.product.variants[0].id);

  ids.forEach(async (id) => {
    await addItemToCart({ variantId: id, quantity: 1 });
  });
};
</script>
