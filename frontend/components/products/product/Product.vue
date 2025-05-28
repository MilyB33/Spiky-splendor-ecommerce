<template>
  <Head>
    <Title>Product - {{ product?.title }}</Title>
  </Head>

  <v-progress-circular
    indeterminate
    v-if="isLoading"
  ></v-progress-circular>
  <div
    class="d-flex flex-column ga-8 w-100"
    v-else
  >
    <div
      class="d-flex ga-8"
      :class="isMobile ? 'flex-column align-center' : ''"
    >
      <div style="max-width: 400px; width: 100%">
        <v-carousel
          :height="isMobile ? 250 : 600"
          cycle
          hide-delimiters
        >
          <v-carousel-item
            rounded="lg"
            v-for="image in images"
            :src="image"
            cover
            max-width="400"
          ></v-carousel-item>
        </v-carousel>
      </div>

      <div class="w-100 py-4">
        <div class="d-flex flex-column ga-8">
          <h2 class="text-h3">{{ product?.title }}</h2>

          <p class="text-h5">{{ price }}</p>

          <ProductDescription :description="product?.description || ''" />

          <ProductAvailability
            v-if="product"
            :product="product"
            size="md"
          />

          <ProductCartAction
            v-if="product"
            :product="product"
          />

          <ProductDeliveryInfo />

          <ProductDetails
            v-if="product"
            :product="product"
          />

          <ProductContactSection />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { formatCurrency } from "~/utils/product";
import { useDisplay } from "vuetify";

const route = useRoute();
const { product, isLoading } = useProduct(route.params.handle as string);
const { region } = useRegions();
const { mobile: isMobile } = useDisplay({ mobileBreakpoint: "sm" });

const images = computed(() => {
  const images = product.value?.images;

  if (images?.length) {
    return images.map((image) => image.url as string);
  }

  return [];
});

const price = computed(() => {
  return formatCurrency(
    product.value?.variants[0].calculated_price_incl_tax || 0,
    region.value?.currency_code,
  );
});
</script>
