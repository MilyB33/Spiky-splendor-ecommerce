<template>
  <div>
    <p
      class="description"
      :class="{ truncate: !expanded }"
      ref="descriptionText"
    >
      {{ props.description }}
    </p>

    <v-btn
      v-if="showButton"
      variant="text"
      @click="toggleExpanded"
      block
    >
      {{ expanded ? "COLLAPSE DESCRIPTION" : "EXPAND DESCRIPTION" }}
      <v-icon>{{ expanded ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts" setup>
type ProductDescriptionProps = {
  description: string;
};

const props = defineProps<ProductDescriptionProps>();
const expanded = ref(false);
const showButton = ref<boolean>(false);
const descriptionText = ref<HTMLElement | null>(null);

const checkTextHeight = () => {
  const element = descriptionText.value;

  if (!element) return;

  const lineHeight = parseFloat(getComputedStyle(element).lineHeight);
  const maxLines = 3;

  if (element.scrollHeight > lineHeight * maxLines) {
    showButton.value = true;
  }
};

const toggleExpanded = () => {
  expanded.value = !expanded.value;
};

onMounted(() => {
  nextTick(() => {
    checkTextHeight();
  });
});
</script>

<style lang="scss" scoped>
.description {
  overflow: hidden;
  transition: max-height 0.5s ease;
}

.truncate {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; /* Limit to 3 lines */
  line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 4.5em; /* Approximate height for 3 lines */
}
</style>
