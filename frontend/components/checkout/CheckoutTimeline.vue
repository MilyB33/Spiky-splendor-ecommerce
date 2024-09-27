<template>
  <v-timeline direction="horizontal">
    <v-timeline-item
      icon="mdi-check"
      dot-color="green"
    >
      <h2>Cart</h2>
    </v-timeline-item>

    <v-timeline-item dot-color="blue">
      <template v-slot:opposite>
        <h2>Shipping</h2>
      </template>
      <template v-slot:icon> 2 </template>
    </v-timeline-item>

    <v-timeline-item dot-color="white">
      <h2>Payment</h2>
      <template v-slot:icon> 3 </template>
    </v-timeline-item>
  </v-timeline>
</template>

<style></style>
