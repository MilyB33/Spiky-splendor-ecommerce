import { useAuthStore } from "~/store/auth";
import { useProductStore } from "~/store/products";

import { onMounted } from "vue";

export const useInitialize = () => {
  const authStore = useAuthStore();
  const productsStore = useProductStore();

  const { isCheckingSession, isAuthenticated } = storeToRefs(authStore);
  const { isFetchingCategories, categories } = storeToRefs(productsStore);

  onBeforeMount(async () => {
    if (!isAuthenticated.value && !isCheckingSession.value) {
      authStore.checkCustomerSession();
    }

    if (!categories.value?.count && !isFetchingCategories.value) {
      productsStore.retrieveCategoriesList();
    }
  });

  return {
    isLoading: isCheckingSession.value || isFetchingCategories.value,
  };
};
