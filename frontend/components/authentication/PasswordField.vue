<template>
  <v-text-field
    label="Hasło"
    variant="outlined"
    :type="fieldType"
    hint="Enter a strong password"
    v-model="password"
    :error-messages="props['errorMessages']"
  >
    <template v-slot:append-inner>
      <v-btn
        :icon="buttonIcon"
        variant="plain"
        class="px-0"
        @click="togglePassword"
      />
    </template>
  </v-text-field>
</template>

<script setup lang="ts">
const password = defineModel<string>("password");
const props = defineProps<{ errorMessages?: string }>();

const isPasswordVisible = ref(false);

const togglePassword = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

const fieldType = computed(() => {
  return isPasswordVisible.value ? "text" : "password";
});

const buttonIcon = computed(() => {
  return isPasswordVisible.value ? "mdi-eye-off-outline" : "mdi-eye-outline";
});
</script>
