<template>
  <div class="info-cards">
    <InfoCard
      variant="store"
      icon="mdi-truck-delivery"
      title="Fast delivery"
      content="We ship succulents Monday through Thursday to avoid delays. Carefully packed plants will reach you quickly and in perfect condition."
    />
    <InfoCard
      variant="store"
      icon="mdi-credit-card-outline"
      title="Secure payments"
      content="We provide fully safe and fast payment methods to make shopping comfortable and stress-free."
    />
    <InfoCard
      variant="store"
      icon="mdi-archive"
      title="Wide range"
      content="Discover the variety – from classic succulents to rare species. Perfect for both interior decoration and as a gift."
    />
    <InfoCard
      variant="store"
      icon="mdi-cash"
      title="Attractive prices"
      content="Succulents for everyone - unique plants at competitive prices."
    />
  </div>
</template>

<style lang="scss" scoped>
.info-cards {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(1, 1fr);

  @media (min-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 880px) {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
