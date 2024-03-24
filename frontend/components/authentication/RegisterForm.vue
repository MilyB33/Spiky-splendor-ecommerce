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
        color="orange_primary"
        type="submit"
      >
        Sign up
      </v-btn>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { useAuthStore } from "~/store/auth";
import { signUpTypedSchema } from "~/utils/validation/sign-up-schema";

const form = useForm({ validationSchema: signUpTypedSchema });
const authStore = useAuthStore();
const router = useRouter();

const { value: first_name, errorMessage: firstNameError } = useField<string>("first_name");
const { value: last_name, errorMessage: lastNameError } = useField<string>("last_name");
const { value: email, errorMessage: emailError } = useField<string>("email");
const { value: password, errorMessage: passwordError } = useField<string>("password");

const onSubmit = form.handleSubmit((values) => {
  authStore.registerUser(values);
  form.handleReset();
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
