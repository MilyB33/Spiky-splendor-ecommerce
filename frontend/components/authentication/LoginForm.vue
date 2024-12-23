<template>
  <form @submit.prevent="onSubmit">
    <div class="py-4 d-flex flex-column ga-2">
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
        Log in
      </v-btn>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { signInTypedSchema } from "~/utils/validation/sign-in-schema";

const { signCustomerIn, isSigningCustomerIn } = useAuth();
const form = useForm({ validationSchema: signInTypedSchema });

const { value: email, errorMessage: emailError } = useField<string>("email");
const { value: password, errorMessage: passwordError } = useField<string>("password");
const isSubmitting = computed(() => form.isSubmitting.value || isSigningCustomerIn.value);

const onSubmit = form.handleSubmit(async (values) => {
  await signCustomerIn(values);
  form.handleReset();
});
</script>
