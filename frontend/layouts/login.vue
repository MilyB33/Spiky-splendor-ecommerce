<template>
  <v-layout class="d-flex align-center justify-center px-2">
    <v-card
      elevation="4"
      class="login-layout__content"
      ><slot
    /></v-card>
  </v-layout>
</template>

<style scoped lang="scss">
.login-layout__content {
  width: 500px;
  min-height: 550px;
  background-color: #fff;
  border-radius: 16px;
  padding: 16px 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
