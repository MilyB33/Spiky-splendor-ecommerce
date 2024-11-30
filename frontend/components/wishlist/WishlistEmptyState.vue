<template>
  <div
    class="d-flex align-center flex-column text-center text-subtitle-1"
    :class="isMobile ? 'ga-4' : 'ga-6'"
  >
    <div class="d-flex align-center flex-column ga-4 mr-auto ml-auto pa-2">
      <v-img
        src="/cactus-flower.png"
        :width="isMobile ? 200 : 248"
        :height="isMobile ? 200 : 248"
        :class="isMobile ? 'mb-4' : 'mb-8'"
      >
      </v-img>
      <p>Wygląda na to, że nie masz jeszcze ulubionego produktu.</p>
      <p>Spójrz na nasze produkty, może coś wpadnie Ci w oko.</p>
    </div>

    <v-divider
      v-if="!isAuthenticated"
      :thickness="5"
      width="90%"
      class="opacity-100"
    ></v-divider>

    <div
      v-if="!isAuthenticated"
      class="d-flex align-center flex-column ga-4 mr-auto ml-auto pa-2"
    >
      <p>Chciałbyś zapisać ulubione na swoim koncie?</p>

      <NuxtLink to="/login?login=true">
        <v-btn
          color="black"
          size="small"
        >
          Zaloguj się lub stwórz konto
        </v-btn>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useDisplay } from "vuetify";

const { mobile: isMobile } = useDisplay({ mobileBreakpoint: "md" });
const { isAuthenticated } = useCustomer();
</script>
