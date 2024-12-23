<template>
  <div>
    <v-tabs
      v-model="tab"
      align-tabs="center"
      color="green"
      grow
    >
      <v-tab
        value="signIn"
        key="signIn"
        >Log in</v-tab
      >
      <v-tab
        value="signUp"
        key="signUp"
        >Create an account</v-tab
      >
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

onBeforeMount(() => {
  tab.value = authenticationTab;
});
</script>
