<template>
  <v-card class="d-flex flex-column ga-3 w-100 pa-4">
    <div class="d-flex ga-3 align-start text-green">
      <h4 :style="`min-height: ${variant === 'plant' ? '60' : '20'}px`">
        <v-icon
          :icon="icon"
          class="mr-2"
        ></v-icon
        >{{ title }}
      </h4>
    </div>
    <p class="text-subtitle-2">{{ content }}</p>
  </v-card>
</template>

<script lang="ts" setup>
type InfoCardProps = {
  title: string;
  content: string;
  icon: string;
  variant: "plant" | "store";
};

defineProps<InfoCardProps>();
</script>
