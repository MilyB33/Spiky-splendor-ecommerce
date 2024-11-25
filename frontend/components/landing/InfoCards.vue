<template>
  <div class="info-cards">
    <InfoCard
      variant="store"
      icon="mdi-truck-delivery"
      title="Szybka dostawa"
      content="Wysyłamy sukulenty od poniedziałku do czwartku, aby uniknąć opóźnień. Starannie pakowane rośliny dotrą do Ciebie szybko i w idealnym stanie."
    />
    <InfoCard
      variant="store"
      icon="mdi-credit-card-outline"
      title="Bezpieczne płatności"
      content="Zapewniamy w pełni bezpieczne i szybkie metody płatności, aby zakupy były komfortowe i bezstresowe."
    />
    <InfoCard
      variant="store"
      icon="mdi-archive"
      title="Szeroki asortyment"
      content="Odkryj różnorodność – od klasycznych sukulentów po rzadkie gatunki. Idealne zarówno do dekoracji wnętrz, jak i na prezent!"
    />
    <InfoCard
      variant="store"
      icon="mdi-cash"
      title="Atrakcyjne ceny"
      content="Sukulenty dla każdego – wyjątkowe rośliny w konkurencyjnych cenach."
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
