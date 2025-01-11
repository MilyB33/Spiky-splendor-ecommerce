<template>
  <form @submit.prevent="onSubmit">
    <div class="py-4 form">
      <div class="customer-info">
        <v-text-field
          label="First name"
          variant="outlined"
          v-model="first_name"
          :error-messages="firstNameError"
        />
        <v-text-field
          label="Last name"
          variant="outlined"
          v-model="last_name"
          :error-messages="lastNameError"
        />
      </div>

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

      <v-btn
        block
        color="green"
        type="submit"
        :loading="isSubmitting"
      >
        Create an account
      </v-btn>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { signUpTypedSchema } from "~/utils/validation/sign-up-schema";

const { registerCustomer, isRegisteringCustomer } = useAuth();
const form = useForm({ validationSchema: signUpTypedSchema });

const { value: first_name, errorMessage: firstNameError } = useField<string>("first_name");
const { value: last_name, errorMessage: lastNameError } = useField<string>("last_name");
const { value: email, errorMessage: emailError } = useField<string>("email");
const { value: password, errorMessage: passwordError } = useField<string>("password");
const isSubmitting = computed(() => form.isSubmitting.value || isRegisteringCustomer.value);

const onSubmit = form.handleSubmit(async (values) => {
  try {
    await registerCustomer(values);
    form.handleReset();
  } catch (error) {
    // handled in mutation query composable
  }
});
</script>

<style scoped lang="scss">
.form {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.customer-info {
  display: flex;
  gap: 8px;
}
</style>
