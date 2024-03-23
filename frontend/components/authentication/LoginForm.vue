<template>
  <div class="py-4 form">
    <v-text-field
      label="Email"
      variant="outlined"
      type="email"
    />

    <PasswordField />

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
    >
      Sign in
    </v-btn>
  </div>
</template>

<script setup lang="ts"></script>

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
