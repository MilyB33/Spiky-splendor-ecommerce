<template>
  <v-card class="pa-4 w-100 d-flex flex-column ga-4 align-center">
    <h1>Formularz kontaktowy</h1>

    <form class="d-flex flex-column ga-4 w-100">
      <div class="d-flex ga-4 w-100">
        <v-text-field
          density="compact"
          label="First name"
        />
        <v-text-field
          density="compact"
          label="Last name"
        />
      </div>
      <v-text-field
        density="compact"
        label="Email"
      />
      <v-text-field
        density="compact"
        label="Topic"
      />
      <v-textarea
        density="compact"
        label="Contents"
      />
      <v-btn color="primary">Send</v-btn>
    </form>
  </v-card>
</template>
