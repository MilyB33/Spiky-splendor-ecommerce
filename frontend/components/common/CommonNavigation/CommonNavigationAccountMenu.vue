<template>
  <v-menu
    open-on-hover
    :close-on-content-click="false"
    location="bottom"
    offset="8"
    open-delay="0"
    transition="fade-transition"
  >
    <template v-slot:activator="{ props }">
      <v-btn
        prepend-icon="mdi-account-circle-outline"
        v-bind="props"
      >
        <template v-slot:prepend>
          <v-icon size="x-large" />
        </template>

        Account
      </v-btn>
    </template>

    <v-card min-width="200">
      <AuthenticationButton to="/sign_in">Sign in</AuthenticationButton>

      <v-divider
        thickness="2"
        class="mx-4"
      />

      <AuthenticationButton to="/sign_up">Sign up</AuthenticationButton>
    </v-card>
  </v-menu>
</template>
