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
        :loading="isSubmitting"
      >
        Sign up
      </v-btn>
    </div>
  </form>
</template>

<script setup lang="ts">
import type { StorePostCustomersReq } from "@medusajs/medusa";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useField, useForm } from "vee-validate";
import { API_QUERY_KEY } from "~/constant";
import { signUpTypedSchema } from "~/utils/validation/sign-up-schema";

const client = useMedusaClient();
const form = useForm({ validationSchema: signUpTypedSchema });
const { addCustomerToExistingWishlist } = useWishlist();
const { snackbar } = useSnackbar();
const queryClient = useQueryClient();
const { mutate, isPending } = useMutation({
  mutationFn: (params: StorePostCustomersReq) => client.customers.create(params),
  onError: (error) => {
    console.error(error);
    snackbar.error("Something went wrong.");
  },
  onSuccess: (data) => {
    form.handleReset();
    navigateTo("/");
    snackbar.success("Account created.");
    // TODO: This should be somewhere on top of app and watching customer
    if (data.customer.wishlist_id) {
      queryClient.invalidateQueries({ queryKey: [API_QUERY_KEY.CUSTOMER] });
    } else {
      addCustomerToExistingWishlist().then(() => {
        queryClient.invalidateQueries({ queryKey: [API_QUERY_KEY.CUSTOMER] });
      });
    }
  },
});

const { value: first_name, errorMessage: firstNameError } = useField<string>("first_name");
const { value: last_name, errorMessage: lastNameError } = useField<string>("last_name");
const { value: email, errorMessage: emailError } = useField<string>("email");
const { value: password, errorMessage: passwordError } = useField<string>("password");
const isSubmitting = computed(() => form.isSubmitting.value || isPending.value);

const onSubmit = form.handleSubmit((values) => {
  mutate(values);
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
