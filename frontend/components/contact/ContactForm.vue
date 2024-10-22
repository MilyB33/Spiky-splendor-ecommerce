<template>
  <v-card class="pa-4 w-100 d-flex flex-column ga-4 align-center">
    <h1>Formularz kontaktowy</h1>

    <form class="d-flex flex-column ga-4 w-100">
      <div class="d-flex ga-4 w-100">
        <v-text-field
          density="compact"
          label="Imię"
        />
        <v-text-field
          density="compact"
          label="Nazwisko"
        />
      </div>
      <v-text-field
        density="compact"
        label="Email"
      />
      <v-text-field
        density="compact"
        label="Temat"
      />
      <v-textarea
        density="compact"
        label="Treść"
      />
      <v-btn color="primary">Wyślij</v-btn>
    </form>
  </v-card>
</template>
