<template>
  <div class="info-cards">
    <InfoCard
      variant="plant"
      icon="mdi-clock-outline"
      title="Perfect plants for busy people"
      content="Succulents are extremely easy to care for - they need a minimum amount of water and cope well in a variety of conditions. Perfect for people who want to enjoy greenery without daily watering."
    />
    <InfoCard
      variant="plant"
      icon="mdi-leaf"
      title="Incredible diversity"
      content="From rosette-shaped echeverias to spiky aloes - succulents come in hundreds of species that surprise with their unique appearance. They will add character to any interior!"
    />
    <InfoCard
      variant="plant"
      icon="mdi-air-filter"
      title="Natural masters of air purification"
      content="Succulents not only look beautiful, but also improve air quality by absorbing harmful substances and releasing oxygen. The perfect choice for home and office."
    />
    <InfoCard
      variant="plant"
      icon="mdi-shield-check"
      title="A symbol of strength and perseverance"
      content="Succulents are plants adapted to difficult conditions, thanks to which they symbolize resistance and strength. They are a perfect gift that carries a unique message."
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
