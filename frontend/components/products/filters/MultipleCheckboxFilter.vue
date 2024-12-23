<template>
  <div
    class="d-flex flex-column ga-4"
    style="width: fit-content"
  >
    <p class="text-h6">{{ title }}</p>
    <div class="d-flex flex-column">
      <v-checkbox
        v-for="option in optionsToShow"
        :key="option.id"
        v-model="value"
        color="blue"
        :label="option.name"
        :value="option.id"
        hide-details
        density="compact"
      ></v-checkbox>
    </div>

    <v-btn
      v-if="options.length > 5"
      @click="toggleOptions"
      variant="text"
      >{{ showAll ? "Show less" : "Show more" }}</v-btn
    >
  </div>
</template>

<script lang="ts" setup>
type MultipleCheckboxFilterProps = {
  options: (Record<string, unknown> & { id: string; name: string })[];
  title: string;
  fieldName: string;
};

const props = defineProps<MultipleCheckboxFilterProps>();

const showAll = ref(false);
const optionsToShow = computed(() => {
  if (!props.options) return [];

  if (showAll.value) return props.options;

  return props.options.slice(0, 5);
});

const toggleOptions = () => {
  showAll.value = !showAll.value;
};

const { value } = useField<string[]>(props.fieldName);
</script>
