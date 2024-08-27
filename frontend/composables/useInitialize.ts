import { useAuthStore } from "~/store/auth";
import { useCommonStore } from "~/store/common";
import { useProductStore } from "~/store/products";

export const useInitialize = () => {
  const authStore = useAuthStore();
  const productsStore = useProductStore();
  const commonStore = useCommonStore();

  const { isCheckingSession, isAuthenticated } = storeToRefs(authStore);
  const { isFetchingCategories, categories } = storeToRefs(productsStore);
  const { isFetchingRegions, regions } = storeToRefs(commonStore);

  onBeforeMount(async () => {
    if (!isAuthenticated.value && !isCheckingSession.value) {
      authStore.checkCustomerSession();
    }

    if (!categories.value?.count && !isFetchingCategories.value) {
      productsStore.retrieveCategoriesList();
    }

    if (!regions.value?.count && !isFetchingRegions.value) {
      commonStore.retrieveRegions();
    }
  });

  return {
    isLoading: isCheckingSession.value || isFetchingCategories.value || isFetchingRegions.value,
  };
};
