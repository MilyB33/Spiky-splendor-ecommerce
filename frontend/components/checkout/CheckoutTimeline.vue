<template>
  <v-timeline direction="horizontal">
    <v-timeline-item
      icon="mdi-check"
      dot-color="green"
    >
      <h4>Koszyk</h4>
    </v-timeline-item>

    <v-timeline-item
      :icon="props.isPaymentStep ? 'mdi-check' : undefined"
      :dot-color="props.isPaymentStep ? 'green' : 'blue'"
    >
      <template v-slot:opposite>
        <h4>Dostawa</h4>
      </template>
      <template
        v-if="!props.isPaymentStep"
        v-slot:icon
      >
        2
      </template>
    </v-timeline-item>

    <v-timeline-item :dot-color="props.isPaymentStep ? 'blue' : 'white'">
      <h4>Płatność</h4>
      <template v-slot:icon> 3 </template>
    </v-timeline-item>
  </v-timeline>
</template>

<script lang="ts" setup>
type CheckoutTimeline = {
  isPaymentStep?: boolean;
};

const props = defineProps<CheckoutTimeline>();
</script>
