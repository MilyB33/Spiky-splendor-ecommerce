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
import type { StorePostAuthReq } from "@medusajs/medusa";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useField, useForm } from "vee-validate";
import { API_QUERY_KEY } from "~/constant";
import { signInTypedSchema } from "~/utils/validation/sign-in-schema";

const client = useMedusaClient();
const form = useForm({ validationSchema: signInTypedSchema });
const { addCustomerToExistingWishlist } = useWishlist();
const { snackbar } = useSnackbar();
const queryClient = useQueryClient();
const { mutate, isPending } = useMutation({
  mutationFn: (params: StorePostAuthReq) => client.auth.authenticate(params),
  onError: (error) => {
    console.error(error);
    snackbar.error("Something went wrong.");
  },
  onSuccess: (data) => {
    form.handleReset();
    navigateTo("/");
    snackbar.success("Successfully logged in.");
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

.action-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
</style>
