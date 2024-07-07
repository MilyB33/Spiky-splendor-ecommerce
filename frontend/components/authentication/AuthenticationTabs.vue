<template>
  <div>
    <v-tabs
      v-model="tab"
      align-tabs="center"
      color="orange_primary"
      grow
    >
      <v-tab value="signIn">Sign in</v-tab>
      <v-tab value="signUp">Sign up</v-tab>
    </v-tabs>

    <v-window
      v-model="tab"
      class="mt-8"
    >
      <v-window-item value="signIn">
        <LoginForm />
      </v-window-item>
      <v-window-item value="signUp">
        <RegisterForm />
      </v-window-item>
    </v-window>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const authenticationTab = route.query.register === "true" ? "signUp" : "signIn";

const tab = defineModel<"signIn" | "signUp">("tab");

onMounted(() => {
  tab.value = authenticationTab;
});
</script>
