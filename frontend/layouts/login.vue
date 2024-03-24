<template>
  <v-layout class="login-layout">
    <v-card
      elevation="4"
      class="login-layout__content"
      ><slot
    /></v-card>
  </v-layout>
</template>

<style scoped lang="scss">
.login-layout {
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-layout__content {
  width: 500px;
  min-height: 550px;
  background-color: #fff;
  border-radius: 16px;
  padding: 24px 48px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
