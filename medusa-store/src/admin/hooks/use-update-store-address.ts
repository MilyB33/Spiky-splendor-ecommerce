import { useState, useEffect } from "react";
import { useAdminStore, useAdminUpdateStore } from "medusa-react";
import { Store } from "@medusajs/medusa";
import { SettingProps } from "@medusajs/admin";

export const API_QUERY_KEY = {
  STORE: "STORE",
} as const;

type Values = Pick<Store, "address" | "city" | "company" | "postal_code">;

export const useUpdateStoreAddress = ({ notify }: SettingProps) => {
  const [values, setValues] = useState<Values>({
    address: "",
    postal_code: "",
    city: "",
    company: "",
  });

  const store = useAdminStore({
    onSuccess: () => {
      notify.success("Address updated", "Address updated correctly");
    },
    onError: () => {
      notify.error("Error", "Something went wrong");
    },
  });
  const { mutateAsync: updateStore, isLoading: isUpdatingStore } =
    useAdminUpdateStore();

  const onChangeValues = (newValues: Partial<Values>) => {
    setValues((prev) => ({ ...prev, ...newValues }));
  };

  useEffect(() => {
    if (store.store) {
      setValues({
        address: store.store.address || "",
        postal_code: store.store.postal_code || "",
        city: store.store.city || "",
        company: store.store.company || "",
      });
    }
  }, [store.store]);

  const onSubmit = async () => {
    await updateStore(values);
  };

  return {
    store: store.store,
    isFetchingStore: store.isFetching,
    onSubmit,
    onChangeValues,
    values,
    isUpdatingStore,
  };
};
