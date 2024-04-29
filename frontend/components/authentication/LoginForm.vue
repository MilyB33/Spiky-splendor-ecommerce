<template>
  <form @submit.prevent="onSubmit">
    <div class="py-4 form">
      <v-text-field
        label="Email"
        variant="outlined"
        type="email"
        v-model="email"
        :error-messages="emailError"
      />

      <PasswordField
        v-model:password="password"
        :error-messages="passwordError"
      />

      <div class="action-buttons">
        <v-checkbox-btn label="Remember me" />
        <v-btn
          variant="text"
          color="orange_primary"
        >
          Forgot password?
        </v-btn>
      </div>

      <v-btn
        block
        color="orange_primary"
        type="submit"
        :loading="isSubmitting"
      >
        Sign in
      </v-btn>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { useAuthStore } from "~/store/auth";
import { signInTypedSchema } from "~/utils/validation/sign-in-schema";

const form = useForm({ validationSchema: signInTypedSchema });
const authStore = useAuthStore();
const { snackbar } = useSnackbar();

const { value: email, errorMessage: emailError } = useField<string>("email");
const { value: password, errorMessage: passwordError } = useField<string>("password");
const isSubmitting = form.isSubmitting;

const onSubmit = form.handleSubmit(async (values) => {
  try {
    await authStore.authenticateCustomer(values);
    form.handleReset();
    navigateTo("/");
    snackbar.success("Successfully logged in.");
  } catch (error) {
    console.error(error);
    snackbar.error("Something went wrong.");
  }
});
</script>

<style scoped lang="scss">
.form {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
</style>
