<template>
  <div
    class="d-flex mb-2 pa-2 justify-space-between"
    :class="isMobile ? 'flex-column-reverse ga-3' : 'align-center ga-6'"
  >
    <v-dialog
      v-model="dialog"
      max-width="400"
      persistent
    >
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          v-bind="activatorProps"
          append-icon="mdi-close"
          >Clear all</v-btn
        >
      </template>

      <v-card
        prepend-icon="mdi-alert-box"
        text="Are you sure you want to remove all wishlist items?"
      >
        <template
          v-slot:title
          class="text-no-wrap"
          ><p>Removing all wishlist items!</p></template
        >

        <v-card-actions class="d-flex justify-space-between">
          <v-btn
            @click="dialog = false"
            variant="outlined"
            color="red"
            :disabled="isRemovingFromWishlist"
          >
            No let me think!
          </v-btn>

          <v-btn
            @click="onClearAllItems"
            variant="outlined"
            color="green"
            :disabled="isRemovingFromWishlist"
          >
            Im 100% sure!
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-btn
      append-icon="mdi-cart-plus"
      color="green_primary"
      >Add all to cart</v-btn
    >
  </div>
</template>

<script lang="ts" setup>
import { useDisplay } from "vuetify";

const { wishlist, removeFromWishlist, isRemovingFromWishlist } = useWishlist();
const { mobile: isMobile } = useDisplay({ mobileBreakpoint: "sm" });

const dialog = ref(false);

const onClearAllItems = () => {
  const itemsIds = wishlist.value.map((item) => item.id);

  removeFromWishlist({ wishItemIDS: itemsIds });
  dialog.value = false;
};
</script>
