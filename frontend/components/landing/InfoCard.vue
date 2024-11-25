<template>
  <v-card class="info-card">
    <div class="d-flex ga-3 align-start text-green">
      <h4>
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

<style lang="scss" scoped>
.info-card {
  padding: 16px;
  gap: 16px;
  display: grid;
  grid-template-rows: 1fr 3fr;
}
</style>
